import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { getLayerColor } from '../../utils/graphHelpers';

const FlowNode = ({ data }) => {
  const isWarning = data.metadata?.HealthStatus === 'Warning';
  const layerName = data.metadata?.Layer || 'Unknown';
  const nodeColor = getLayerColor(layerName);
  const { isRecording, isInTrace, isTraceActive, isDimmed, stepNumber } = data;

  return (
    <>
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-slate-500 opacity-0" />
      <div
        className={`px-4 py-3 min-w-[180px] max-w-[250px] font-mono text-[11px] bg-slate-950 rounded-xl transition-all duration-500
          ${isDimmed ? 'opacity-20 grayscale' : 'opacity-100'}
          ${isRecording ? 'cursor-crosshair hover:border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]' : ''}
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
        <div className="flex justify-between items-center gap-4 mb-2">
          <b style={{ color: nodeColor }}>[{layerName}]</b>
          <span className="text-slate-500 text-[9px] uppercase tracking-wider">{data.type}</span>
        </div>
        <div className="text-white mb-2 border-b border-slate-800/50 pb-2 font-bold text-sm break-all">
          {data.name}
        </div>
        {data.metadata?.Complexity && (
          <div className="flex flex-col gap-1.5 mt-2">
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