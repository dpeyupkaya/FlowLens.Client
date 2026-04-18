import React, { useMemo } from 'react';
import { getLayerColor } from '../../utils/graphHelpers';
import { FunctionOutlined, CodeOutlined, SwapRightOutlined } from '@ant-design/icons';

const ContextInspector = ({ activeNodeId, rawNodes }) => {
  const contextData = useMemo(() => {
    if (!activeNodeId || !rawNodes || rawNodes.length === 0) return null;

    const activeNode = rawNodes.find(n => (n.id || n.Id) === activeNodeId);
    if (!activeNode) return null;

    const type = activeNode.type || activeNode.Type;
    if (type !== 'Class' && type !== 'Interface' && type !== 'Record') return null;

    const metadata = activeNode.metadata || activeNode.Metadata || {};
    const rawMethods = metadata.Methods || metadata.methods || [];

    const methods = rawMethods.map(m => {
      const parameters = (m.Parameters || m.parameters || []).map(pString => {
        const parts = pString.split(' ');
        const pName = parts.pop(); // Son kelime genelde parametrenin adıdır
        const pType = parts.join(' '); // Geriye kalanlar veri tipidir
        
        return { name: pName, type: pType, raw: pString };
      });

      return {
        name: m.Name || m.name,
        returnType: m.ReturnType || m.returnType,
        accessModifier: m.AccessModifier || m.accessModifier,
        // İleride MetricsWalker'dan metot bazlı karmaşıklık eklersek diye burayı açık bırakıyoruz
        complexity: m.Complexity || m.complexity, 
        parameters: parameters
      };
    });

    return { 
      name: activeNode.name || activeNode.Name, 
      layer: metadata.Layer || metadata.layer || 'Unknown', 
      methods 
    };
  }, [activeNodeId, rawNodes]);

  if (!contextData || contextData.methods.length === 0) return null;

  const { name, layer, methods } = contextData;
  const nodeColor = getLayerColor(layer);

  return (
    <div className="absolute top-20 right-4 z-40 w-80 max-h-[70vh] overflow-y-auto custom-scrollbar bg-slate-950/95 border border-slate-700 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.6)] backdrop-blur-xl flex flex-col transition-all duration-300">
      <div className="sticky top-0 bg-slate-900/95 border-b border-slate-700 p-4 z-10 shadow-md">
        <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest mb-1.5 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_currentColor]" style={{ backgroundColor: nodeColor, color: nodeColor }}></div>
          Aktif Bağlam: {layer}
        </div>
        <div className="text-white font-bold text-sm truncate" title={name}>{name}</div>
      </div>

      <div className="p-3 flex flex-col gap-3">
        {methods.map((method, idx) => {
          const isWarning = method.complexity > 10; 
          
          return (
            <div key={idx} className={`bg-slate-900/50 rounded-lg border ${isWarning ? 'border-red-500/40' : 'border-slate-800'} p-3 shadow-inner`}>
              <div className="flex items-start gap-2.5 mb-2">
                <FunctionOutlined className={isWarning ? "text-red-400 mt-1" : "text-emerald-400 mt-1"} />
                <div className="flex flex-col">
                  <span className={`text-[12px] font-mono font-bold break-all ${isWarning ? 'text-red-300' : 'text-slate-200'}`}>
                    {method.name}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    {method.accessModifier && (
                      <span className="text-[9px] text-slate-500 uppercase tracking-widest border border-slate-700 px-1 rounded">
                        {method.accessModifier}
                      </span>
                    )}
                    {method.returnType && method.returnType !== 'void' && (
                      <span className="text-[9px] text-purple-400 truncate max-w-[120px]" title={method.returnType}>
                        {method.returnType}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {method.parameters && method.parameters.length > 0 && (
                <div className="ml-5 pl-3 border-l border-slate-700 flex flex-col gap-2 mt-3 pt-1">
                  {method.parameters.map((param, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-[11px] font-mono">
                      <SwapRightOutlined className="text-slate-600" />
                      <CodeOutlined className="text-blue-400" />
                      <span className="text-slate-400 break-all">{param.name}</span>
                      {param.type && (
                        <span className="text-[9px] text-teal-400 bg-teal-400/10 px-1.5 py-0.5 rounded ml-auto max-w-[80px] truncate" title={param.type}>
                          {param.type}
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