import React, { useMemo } from 'react';
import { getLayerColor } from '../../utils/graphHelpers';
import { FunctionOutlined, CodeOutlined, SwapRightOutlined } from '@ant-design/icons';

const ContextInspector = ({ activeNodeId, rawNodes }) => {
  const contextData = useMemo(() => {
    if (!activeNodeId || !rawNodes || rawNodes.length === 0) return null;

    const activeNode = rawNodes.find(n => (n.id || n.Id) === activeNodeId);
    if (!activeNode) return null;

    const type = activeNode.type || activeNode.Type;
    if (!['Class', 'Interface', 'Record', 'Python Module', 'Base Class', 'Database Entity', 'API Endpoint', 'Struct', 'File', 'Module', 'External Package', 'UI Component', 'Controller'].includes(type)) return null;

    const metadata = activeNode.metadata || activeNode.Metadata || {};
    const rawMethods = metadata.Methods || metadata.methods || [];
    const rawProperties = metadata.Properties || metadata.properties || [];
    const frameworks = metadata.Frameworks || metadata.frameworks || [];
    const route = metadata.Route || metadata.route || null;
    const pkg = metadata.Package || metadata.package || null;

    const methods = rawMethods.map(m => {
      const parameters = (m.Parameters || m.parameters || []).map(pString => {
        const parts = pString.split(' ');
        const pName = parts.pop(); 
        const pType = parts.join(' '); 
        
        return { name: pName, type: pType, raw: pString };
      });

      return {
        name: m.Name || m.name,
        returnType: m.ReturnType || m.returnType,
        accessModifier: m.AccessModifier || m.accessModifier,
        complexity: m.Complexity || m.complexity, 
        parameters: parameters
      };
    });

    const properties = rawProperties.map(p => ({
      name: p.Name || p.name,
      type: p.Type || p.type
    }));

    return { 
      name: activeNode.name || activeNode.Name, 
      layer: metadata.Layer || metadata.layer || 'Unknown', 
      methods,
      properties,
      frameworks,
      route,
      pkg
    };
  }, [activeNodeId, rawNodes]);

  if (!contextData || (contextData.methods.length === 0 && contextData.properties.length === 0 && contextData.frameworks.length === 0 && !contextData.route && !contextData.pkg)) return null;

  const { name, layer, methods, properties, frameworks, route, pkg } = contextData;
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
        
        {frameworks && frameworks.length > 0 && (
          <div className="mb-1">
            <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mb-2 pl-1">Kullanılan Teknolojiler</div>
            <div className="flex flex-wrap gap-2">
              {frameworks.map((fw, idx) => (
                <span key={idx} className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-1 rounded-md text-[10px] font-bold tracking-wider">
                  {fw}
                </span>
              ))}
            </div>
          </div>
        )}

        {route && (
          <div className="mb-1">
            <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mb-2 pl-1">URL Yolu / Endpoint</div>
            <div className="bg-slate-900/50 rounded-lg border border-slate-800 p-2.5 shadow-inner">
              <span className="text-[12px] font-mono text-emerald-400 break-all">{route}</span>
            </div>
          </div>
        )}

        {pkg && (
          <div className="mb-1">
            <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mb-2 pl-1">Paket / Modül</div>
            <div className="bg-slate-900/50 rounded-lg border border-slate-800 p-2.5 shadow-inner">
              <span className="text-[12px] font-mono text-teal-400 break-all">{pkg}</span>
            </div>
          </div>
        )}

        {properties && properties.length > 0 && (
          <div className="mb-1">
            <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mb-2 pl-1">Değişkenler</div>
            <div className="flex flex-col gap-2">
              {properties.map((prop, idx) => (
                <div key={`p-${idx}`} className="bg-slate-900/50 rounded-lg border border-slate-800 p-2.5 shadow-inner flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-300 break-all">{prop.name}</span>
                  {prop.type && (
                    <span className="text-[9px] text-teal-400 bg-teal-400/10 px-1.5 py-0.5 rounded truncate max-w-[100px]" title={prop.type}>
                      {prop.type}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {methods && methods.length > 0 && (
          <div>
            <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mb-2 pl-1 mt-1">Fonksiyonlar</div>
            <div className="flex flex-col gap-3">
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
        )}
      </div>
    </div>
  );
};

export default ContextInspector;