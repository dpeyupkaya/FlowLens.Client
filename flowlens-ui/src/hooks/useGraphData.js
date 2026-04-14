import { useMemo } from 'react';
import { getLayerColor, NODE_TYPES } from '../utils/graphHelpers';
import { useFlowStore } from '../store/useFlowStore';

export const useGraphData = () => {
  const rawNodes = useFlowStore(state => state.rawNodes);
  const rawEdges = useFlowStore(state => state.rawEdges);
  const expandedClasses = useFlowStore(state => state.expandedClasses);
  const expandedMethods = useFlowStore(state => state.expandedMethods);

  return useMemo(() => {
    if (!rawNodes || rawNodes.length === 0) return { nodes: [], edges: [], uniqueLayers: [] };

    const visibleMethodIds = new Set();
    const visibleParamIds = new Set();
    const nodesWithConnections = new Set();

    rawEdges.forEach(e => {
      const sId = typeof e.source === 'object' ? (e.source?.id || e.source?.Id) : e.source;
      const tId = typeof e.target === 'object' ? (e.target?.id || e.target?.Id) : e.target;
      const rel = e.relationType || e.relation || e.Relation || e.RelationType;
      
      nodesWithConnections.add(sId);
      nodesWithConnections.add(tId);

      if (rel === 'Contains' && expandedClasses.has(sId)) {
        visibleMethodIds.add(tId);
      }
      if (rel === 'HasParameter' && expandedMethods.has(sId) && visibleMethodIds.has(sId)) {
        visibleParamIds.add(tId);
      }
    });

    const filteredNodes = rawNodes
      .filter(n => {
        const type = n.type || n.Type;
        const id = n.id || n.Id;
        
        if ((type === NODE_TYPES.CLASS || type === NODE_TYPES.EXTERNAL) && !nodesWithConnections.has(id)) {
            return false; 
        }

        return type === NODE_TYPES.CLASS || type === NODE_TYPES.EXTERNAL || visibleMethodIds.has(id) || visibleParamIds.has(id);
      })
      .map(n => {
        const type = n.type || n.Type;
        const metadata = n.metadata || n.Metadata || {};
        const layer = metadata.Layer || 'Unknown';
        
        let color = getLayerColor(layer);
        if (type === NODE_TYPES.METHOD) {
          color = metadata.HealthStatus === 'Warning' ? '#ef4444' : '#e2e8f0';
        } else if (type === NODE_TYPES.PARAMETER) {
          color = '#94a3b8';
        }

        return {
          ...n,
          id: n.id || n.Id,
          name: n.name || n.Name || n.label || n.Label,
          type,
          layer,
          color,
          metadata
        };
      });

    const filteredNodeIds = new Set(filteredNodes.map(n => n.id));
    
    // 4. Kenarları (Edges) Filtrele
    const filteredEdges = rawEdges
      .filter(e => {
        const sId = typeof e.source === 'object' ? (e.source?.id || e.source?.Id) : e.source;
        const tId = typeof e.target === 'object' ? (e.target?.id || e.target?.Id) : e.target;
        return filteredNodeIds.has(sId) && filteredNodeIds.has(tId);
      })
      .map(e => ({
        source: typeof e.source === 'object' ? (e.source?.id || e.source?.Id) : e.source,
        target: typeof e.target === 'object' ? (e.target?.id || e.target?.Id) : e.target,
        relationType: e.relationType || e.relation || e.Relation || e.RelationType,
        originalRelation: e.relationType || e.relation || e.Relation || e.RelationType // Stilleme için saklıyoruz
      }));

    const uniqueLayers = [...new Set(filteredNodes
      .filter(n => n.type === NODE_TYPES.CLASS || n.type === NODE_TYPES.EXTERNAL)
      .map(n => n.layer)
    )];

    return { nodes: filteredNodes, edges: filteredEdges, uniqueLayers };
  }, [rawNodes, rawEdges, expandedClasses, expandedMethods]);
};