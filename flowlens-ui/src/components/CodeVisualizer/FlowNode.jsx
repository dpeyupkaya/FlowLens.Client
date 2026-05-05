import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { getLayerColor } from '../../utils/graphHelpers';
import { useFlowStore } from '../../store/useFlowStore';

const FlowNode = ({ id, data }) => {
  const isCompact = data.detailLevel === 'Compact';
  
  // SİHİRLİ DOKUNUŞ: Bu node'un ID'si store'daki "Genişletilmiş Sınıflar" listesinde var mı?
  const isExpanded = useFlowStore(state => state.expandedClasses.has(id));

  const isWarning = data.metadata?.HealthStatus === 'Warning';
  const layerName = data.metadata?.Layer || 'Unknown';
  const nodeColor = getLayerColor(layerName);
  
  const { isRecording, isInTrace, isTraceActive, isDimmed, stepNumber } = data;

  // Backend'den gelen Metot ve Property listeleri
  const methods = data.metadata?.Methods || [];
  const properties = data.metadata?.Properties || [];

  return (
    <>
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-slate-500 opacity-0" />
      
      <div
        className={`font-mono text-[11px] bg-slate-950 rounded-xl transition-all duration-300
          ${isCompact ? 'px-3 py-2 min-w-[120px] max-w-[180px]' : 'px-4 py-3 min-w-[180px] max-w-[280px]'}
          ${isDimmed ? 'opacity-20 grayscale' : 'opacity-100'}
          ${isRecording ? 'cursor-crosshair hover:border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'cursor-pointer hover:border-slate-500'}
          ${isTraceActive ? 'border-2 border-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.6)] scale-105 z-50' :
            (isWarning && !isDimmed ? 'border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'border border-slate-700 shadow-xl')
          }
        `}
      >
        {isInTrace && (
          <div className={`absolute -top-3 -right-3 w-6 h-6 rounded-full flex items-center justify-center font-bold text-white text-[10px] shadow-lg
            ${isTraceActive ? 'bg-emerald-500 scale-125 transition-transform' : 'bg-slate-700'}
          `}>
            {stepNumber}
          </div>
        )}

        <div className={`flex justify-between items-center gap-4 ${isCompact ? 'mb-1' : 'mb-2'}`}>
          <b style={{ color: nodeColor }}>[{layerName}]</b>
          {!isCompact && <span className="text-slate-500 text-[9px] uppercase tracking-wider">{data.type}</span>}
        </div>

        <div className={`text-white font-bold break-all ${isCompact ? 'text-xs' : 'text-sm'}`}>
          {data.name}
        </div>

        {/* --- GENİŞLETİLMİŞ GÖRÜNÜM (EXPANDED) --- */}
        {!isCompact && isExpanded && (methods.length > 0 || properties.length > 0) && (
          <div className="mt-3 pt-2 border-t border-slate-800/80 flex flex-col gap-2">
            
            {/* Özellikler (Properties) */}
            {properties.length > 0 && (
              <div>
                <span className="text-slate-500 text-[9px] uppercase tracking-wider mb-1 block">Properties</span>
                <ul className="flex flex-col gap-1">
                  {properties.map((prop, idx) => (
                    <li key={idx} className="text-slate-300 text-[10px] truncate">
                      <span className="text-blue-400 mr-1">○</span> 
                      <span className="text-teal-200">{prop.type || prop.Type}</span> {prop.name || prop.Name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Metotlar (Methods) */}
            {methods.length > 0 && (
              <div className={properties.length > 0 ? "mt-1" : ""}>
                <span className="text-slate-500 text-[9px] uppercase tracking-wider mb-1 block">Methods</span>
                <ul className="flex flex-col gap-1">
                  {methods.map((method, idx) => (
                    <li key={idx} className="text-slate-300 text-[10px]">
                      <div className="truncate">
                        <span className="text-purple-400 mr-1">ƒ</span> 
                        <span className="text-teal-200">{method.returnType || method.ReturnType}</span> {method.name || method.Name}
                      </div>
                      {/* Parametreler varsa alt satırda hafif silik göster */}
                      {(method.parameters || method.Parameters)?.length > 0 && (
                        <div className="text-slate-500 text-[9px] pl-3 truncate">
                          ({(method.parameters || method.Parameters).join(', ')})
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* --- KARMAŞIKLIK (COMPLEXITY) --- */}
        {!isCompact && data.metadata?.Complexity && (
          <div className={`flex flex-col gap-1.5 ${isExpanded ? 'mt-3 pt-2 border-t border-slate-800/80' : 'mt-2 pt-2 border-t border-slate-800/50'}`}>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-[10px]">Complexity:</span>
              <b className={isWarning ? 'text-red-500' : 'text-emerald-400'}>
                {data.metadata.Complexity}
              </b>
            </div>
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-slate-500 opacity-0" />
    </>
  );
};

export default FlowNode;