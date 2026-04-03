import { useMemo } from 'react';
import { getLayerColor, NODE_TYPES } from '../utils/graphHelpers';

export const useGraphData = (graphData, expandedClasses, expandedMethods) => {
  return useMemo(() => {
    const rawNodes = graphData?.nodes || graphData?.Nodes || [];
    const rawEdges = graphData?.edges || graphData?.Edges || [];
    
    const visibleMethodIds = new Set();
    const visibleParamIds = new Set();

    rawEdges.forEach(e => {
      const sId = e.source?.id || e.source?.Id || e.source || e.Source;
      const tId = e.target?.id || e.target?.Id || e.target || e.Target;
      const rel = e.relation || e.Relation || e.relationType || e.RelationType;
      
      if (rel === 'Contains' && expandedClasses.has(sId)) visibleMethodIds.add(tId);
      if (rel === 'HasParameter' && expandedMethods.has(sId) && visibleMethodIds.has(sId)) visibleParamIds.add(tId);
    });

    const filteredNodes = rawNodes
      .filter(n => {
        const type = n.type || n.Type;
        const id = n.id || n.Id;
        return type === NODE_TYPES.CLASS || type === NODE_TYPES.EXTERNAL || visibleMethodIds.has(id) || visibleParamIds.has(id);
      })
      .map(n => {
        const type = n.type || n.Type;
        const metadata = n.metadata || n.Metadata || {}; // Backend'den gelen metrikler
        const layer = metadata.Layer || 'Other';
        let color = getLayerColor(layer);
        
        if (type === NODE_TYPES.METHOD) {
          color = metadata.HealthStatus === 'Warning' ? '#ef4444' : '#e2e8f0';
        }
        
        if (type === NODE_TYPES.PARAMETER) color = '#94a3b8';

        return {
          ...n,
          id: n.id || n.Id,
          name: n.name || n.Name || n.label || n.Label,
          type,
          layer,
          color,
          metadata,
          val: type === NODE_TYPES.CLASS ? 6 : type === NODE_TYPES.METHOD ? 4 : 1.5
        };
      });

    const filteredNodeIds = new Set(filteredNodes.map(n => n.id));
    
    const filteredLinks = rawEdges
      .filter(e => {
        const sId = e.source?.id || e.source?.Id || e.source || e.Source;
        const tId = e.target?.id || e.target?.Id || e.target || e.Target;
        return filteredNodeIds.has(sId) && filteredNodeIds.has(tId);
      })
      .map(e => ({
        source: e.source?.id || e.source?.Id || e.source || e.Source,
        target: e.target?.id || e.target?.Id || e.target || e.Target,
        relation: e.relation || e.Relation || e.relationType || e.RelationType
      }));

    const uniqueLayers = [...new Set(filteredNodes
      .filter(n => n.type === NODE_TYPES.CLASS || n.type === NODE_TYPES.EXTERNAL)
      .map(n => n.layer))];

    return { nodes: filteredNodes, links: filteredLinks, uniqueLayers };
  }, [graphData, expandedClasses, expandedMethods]);
};