import React, { useRef, useState, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import * as d3 from 'd3-force';
import { useGraphData } from '../../hooks/useGraphData';
import { getLayerColor, NODE_TYPES } from '../../utils/graphHelpers';
import GraphLegend from './GraphLegend';

const CodeVisualizer = ({ graphData }) => {
  const fgRef = useRef();
  const containerRef = useRef();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [expandedClasses, setExpandedClasses] = useState(new Set());
  const [expandedMethods, setExpandedMethods] = useState(new Set());

  const data = useGraphData(graphData, expandedClasses, expandedMethods);

  const updateLayout = () => {
    if (!containerRef.current) return;
    const isFull = !!document.fullscreenElement;
    const newWidth = isFull ? window.innerWidth : containerRef.current.offsetWidth;
    const newHeight = isFull ? window.innerHeight : 600;
    
    setDimensions({ width: newWidth, height: newHeight });
    
    if (fgRef.current) {
      fgRef.current.d3Force('center', d3.forceCenter(newWidth / 2, newHeight / 2));
      fgRef.current.d3ReheatSimulation();
      
      setTimeout(() => fgRef.current.zoomToFit(400, 50), 300);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      setTimeout(updateLayout, 150); 
    };
    window.addEventListener('resize', updateLayout);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    updateLayout();
    return () => {
      window.removeEventListener('resize', updateLayout);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (fgRef.current && data.nodes.length > 0) {
      const fg = fgRef.current;

      fg.d3Force('charge', d3.forceManyBody().strength(-200));

      fg.d3Force('collide', d3.forceCollide().radius(node => (node.val || 10) + 15));

      fg.d3Force('link', d3.forceLink().distance(link => {
        if (link.relation === 'Contains' || link.relation === 'HasParameter') return 30;
        if (link.relation === 'Inherits' || link.relation === 'Implements') return 80;
        if (link.relation === 'DependsOn' || link.relation === 'Instantiates') return 150; 
        return 50;
      }));

      fg.d3ReheatSimulation();
    }
  }, [data]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full bg-[#020617] rounded-xl overflow-hidden border border-slate-800 relative ${
        isFullscreen ? 'fixed inset-0 z-[9999] h-screen w-screen' : 'h-[600px]'
      }`}
    >
      <GraphLegend layers={data.uniqueLayers} />

      <div className="absolute top-4 right-4 z-[10000]">
        <button 
          onClick={() => isFullscreen ? document.exitFullscreen?.() : containerRef.current.requestFullscreen?.()} 
          className="p-2 bg-slate-900/90 border border-slate-700 rounded-lg text-teal-400 hover:border-teal-500 shadow-xl transition-all"
        >
          {isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
        </button>
      </div>

      <ForceGraph2D
        ref={fgRef}
        key={isFullscreen ? 'full' : 'normal'}
        graphData={data}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="#020617"
        nodeLabel={n => `
          <div class="p-3 font-mono text-[11px] bg-slate-950 border border-slate-800 rounded-lg shadow-2xl">
            <div class="flex justify-between gap-4 mb-1">
              <b style="color:${n.color}">[${n.layer}]</b>
              <span class="text-slate-500 text-[9px] uppercase">${n.type}</span>
            </div>
            <div class="text-white mb-2 border-b border-slate-800 pb-1 font-bold">${n.name}</div>
            ${n.metadata?.Complexity ? `
              <div class="flex flex-col gap-1">
                <div class="flex justify-between items-center">
                  <span class="text-slate-400 text-[10px]">Complexity:</span>
                  <b class="${n.metadata.HealthStatus === 'Warning' ? 'text-red-500' : 'text-emerald-400'}">${n.metadata.Complexity}</b>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-400 text-[10px]">Lines:</span>
                  <b class="text-blue-400">${n.metadata.LinesOfCode}</b>
                </div>
              </div>
            ` : ''}
          </div>
        `}
        onNodeClick={(node) => {
          if (node.type === NODE_TYPES.CLASS || node.type === NODE_TYPES.EXTERNAL) {
            setExpandedClasses(prev => {
              const s = new Set(prev);
              s.has(node.id) ? s.delete(node.id) : s.add(node.id);
              return s;
            });
          } else if (node.type === NODE_TYPES.METHOD) {
            setExpandedMethods(prev => {
              const s = new Set(prev);
              s.has(node.id) ? s.delete(node.id) : s.add(node.id);
              return s;
            });
          }
          fgRef.current.centerAt(node.x, node.y, 600);
          fgRef.current.zoom(4, 600);
        }}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const r = node.val;
          const isWarning = node.metadata?.HealthStatus === 'Warning';

          if (isWarning) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, r * 1.6, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(node.x, node.y, r * 1.3, 0, 2 * Math.PI, false);
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 2 / globalScale;
            ctx.stroke();
          }

          ctx.beginPath(); ctx.arc(node.x, node.y, r, 0, 2 * Math.PI, false);
          ctx.fillStyle = node.color;
          
          if (globalScale > 1.2) {
            ctx.shadowBlur = (isWarning ? 20 : 10) / globalScale;
            ctx.shadowColor = node.color;
          }
          
          ctx.fill();
          ctx.shadowBlur = 0;
          
          if (globalScale > 3) {
            const fontSize = 11 / globalScale;
            ctx.font = `${node.type === NODE_TYPES.CLASS ? 'bold' : ''} ${fontSize}px JetBrains Mono`;
            ctx.textAlign = 'center';
            ctx.fillStyle = isWarning ? '#f87171' : '#94a3b8';
            ctx.fillText(node.name, node.x, node.y + r + fontSize + 2);
          }
        }}
        linkDirectionalArrowLength={l => 
          ['DependsOn', 'Inherits', 'Implements', 'Instantiates'].includes(l.relation) ? 4 : 0
        }
        linkDirectionalArrowRelPos={1}
        linkCurvature={l => 
          ['DependsOn', 'Instantiates'].includes(l.relation) ? 0.2 : 
          ['Inherits', 'Implements'].includes(l.relation) ? 0.1 : 0
        }
        linkDashArray={l => {
          if (l.relation === 'DependsOn' || l.relation === 'Instantiates') return [2, 2];
          if (l.relation === 'Implements') return [4, 2];
          return null;
        }}
        linkColor={l => {
          if (l.relation === 'DependsOn') return '#475569';
          if (l.relation === 'Instantiates') return '#7c3aed';
          if (l.relation === 'Inherits') return '#ef4444';
          if (l.relation === 'Implements') return '#10b981';
          return '#1e293b';
        }}
        linkDirectionalParticles={l => l.relation === 'Contains' ? 2 : 0}
        linkDirectionalParticleWidth={1.5}
      />
    </div>
  );
};

export default CodeVisualizer;