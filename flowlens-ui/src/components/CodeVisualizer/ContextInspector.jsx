import React, { useMemo } from 'react';
import { getLayerColor } from '../../utils/graphHelpers';
import { FunctionOutlined, CodeOutlined, SwapRightOutlined } from '@ant-design/icons';

const ContextInspector = ({ activeNodeId, rawNodes, rawEdges }) => {
  const contextData = useMemo(() => {
    if (!activeNodeId || !rawNodes || !rawEdges || rawNodes.length === 0) return null;


    const activeNode = rawNodes.find(n => (n.id || n.Id) === activeNodeId);
    if (!activeNode) return null;

    const type = activeNode.type || activeNode.Type;
    if (type !== 'Class' && type !== 'ExternalType') return null;

    const methodEdges = rawEdges.filter(e => {
      const sId = typeof e.source === 'object' ? (e.source.id || e.source.Id) : e.source;
      const rel = e.relationType || e.relation || e.RelationType || e.Relation;
      return sId === activeNodeId && rel === 'Contains';
    });
    

    const methods = methodEdges.map(edge => {
      const tId = typeof edge.target === 'object' ? (edge.target.id || edge.target.Id) : edge.target;
      const methodNode = rawNodes.find(n => (n.id || n.Id) === tId);
      if (!methodNode) return null;

      const paramEdges = rawEdges.filter(e => {
        const psId = typeof e.source === 'object' ? (e.source.id || e.source.Id) : e.source;
        const rel = e.relationType || e.relation || e.RelationType || e.Relation;
        return psId === (methodNode.id || methodNode.Id) && rel === 'HasParameter';
      });
      
      const parameters = paramEdges.map(pe => {
        const ptId = typeof pe.target === 'object' ? (pe.target.id || pe.target.Id) : pe.target;
        return rawNodes.find(n => (n.id || n.Id) === ptId);
      }).filter(Boolean);

      return {
        name: methodNode.name || methodNode.Name,
        metadata: methodNode.metadata || methodNode.Metadata,
        parameters: parameters.map(p => ({
          name: p.name || p.Name,
          metadata: p.metadata || p.Metadata
        }))
      };
    }).filter(Boolean);

    return { 
      name: activeNode.name || activeNode.Name, 
      layer: (activeNode.metadata || activeNode.Metadata)?.Layer || 'Unknown', 
      methods 
    };
  }, [activeNodeId, rawNodes, rawEdges]);

  // Eğer metot yoksa paneli gizle
  if (!contextData || contextData.methods.length === 0) return null;

  const { name, layer, methods } = contextData;
  const nodeColor = getLayerColor(layer);

  return (
    <div className="absolute top-20 right-4 z-40 w-80 max-h-[70vh] overflow-y-auto custom-scrollbar bg-slate-950/95 border border-slate-700 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.6)] backdrop-blur-xl flex flex-col transition-all duration-300">
      <div className="sticky top-0 bg-slate-900/95 border-b border-slate-700 p-4 z-10 shadow-md">
        <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest mb-1.5 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_currentColor]" style={{ backgroundColor: nodeColor, color: nodeColor }}></div>
          Aktif Bağlam
        </div>
        <div className="text-white font-bold text-sm truncate" title={name}>{name}</div>
      </div>

      <div className="p-3 flex flex-col gap-3">
        {methods.map((method, idx) => {
          const isWarning = method.metadata?.HealthStatus === 'Warning';
          
          return (
            <div key={idx} className={`bg-slate-900/50 rounded-lg border ${isWarning ? 'border-red-500/40' : 'border-slate-800'} p-3 shadow-inner`}>
              <div className="flex items-start gap-2.5 mb-2">
                <FunctionOutlined className={isWarning ? "text-red-400 mt-1" : "text-emerald-400 mt-1"} />
                <div className="flex flex-col">
                  <span className={`text-[12px] font-mono font-bold break-all ${isWarning ? 'text-red-300' : 'text-slate-200'}`}>
                    {method.name}
                  </span>
                  {method.metadata?.Complexity && (
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">
                      Complexity: <b className={isWarning ? "text-red-400" : "text-emerald-400"}>{method.metadata.Complexity}</b>
                    </span>
                  )}
                </div>
              </div>

              {method.parameters && method.parameters.length > 0 && (
                <div className="ml-5 pl-3 border-l border-slate-700 flex flex-col gap-2 mt-3 pt-1">
                  {method.parameters.map((param, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-[11px] font-mono">
                      <SwapRightOutlined className="text-slate-600" />
                      <CodeOutlined className="text-blue-400" />
                      <span className="text-slate-400 break-all">{param.name}</span>
                      {param.metadata?.DataType && (
                        <span className="text-[9px] text-teal-400 bg-teal-400/10 px-1.5 py-0.5 rounded ml-auto">
                          {param.metadata.DataType}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContextInspector;