import React from 'react';
import { getLayerColor } from '../../utils/graphHelpers';

const GraphLegend = ({ layers }) => {
  if (!layers || layers.length === 0) return null;
  
  return (
    <div className="flex flex-col gap-2 pointer-events-none bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 backdrop-blur-md shadow-2xl">
      <div className="text-slate-500 text-[10px] uppercase tracking-widest font-bold border-b border-slate-800/50 pb-1.5 mb-1">
        Katmanlar
      </div>
      
      <div className="flex flex-col gap-2">
        {layers.map(layer => {
          const color = getLayerColor(layer);
          return (
            <div key={layer} className="flex items-center gap-2.5">
              <div 
                className="w-2.5 h-2.5 rounded-full" 
                style={{ 
                  backgroundColor: color, 
                  boxShadow: `0 0 8px ${color}80`
                }}
              ></div>
              <span className="text-[10px] font-mono text-slate-300 uppercase tracking-wide">
                {layer}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GraphLegend;