import React from 'react';
import { getLayerColor } from '../../utils/graphHelpers';

const GraphLegend = ({ layers }) => {
  if (!layers || layers.length === 0) return null;
  
  return (
    <div className="absolute top-4 left-4 z-50 flex flex-col gap-1 pointer-events-none bg-slate-900/80 p-2 rounded border border-slate-700/50 backdrop-blur-sm">
      {layers.map(layer => (
        <div key={layer} className="flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full" 
            style={{ 
              backgroundColor: getLayerColor(layer), 
              boxShadow: `0 0 5px ${getLayerColor(layer)}` 
            }}
          ></div>
          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-tighter">
            {layer}
          </span>
        </div>
      ))}
    </div>
  );
};

export default GraphLegend;