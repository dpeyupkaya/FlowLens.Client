import React, { useState, useRef } from 'react';
import { 
  GithubOutlined, 
  ApiOutlined, 
  DatabaseOutlined, 
  ApartmentOutlined 
} from '@ant-design/icons';

const HeroFlowGraph = () => {
  const containerRef = useRef(null);
  const [draggingNode, setDraggingNode] = useState(null);
  
  const [positions, setPositions] = useState({
    github: { x: 150, y: 200 },
    engine: { x: 500, y: 80 },
    metrics: { x: 500, y: 320 },
    map: { x: 850, y: 200 }
  });

  const handlePointerDown = (id, e) => {
    e.target.setPointerCapture(e.pointerId);
    setDraggingNode(id);
  };

  const handlePointerMove = (e) => {
    if (!draggingNode || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 1000;
    const y = ((e.clientY - rect.top) / rect.height) * 400;

    setPositions(prev => ({
      ...prev,
      [draggingNode]: { x, y }
    }));
  };

  const handlePointerUp = () => {
    setDraggingNode(null);
  };

  const getPath = (startId, endId) => {
    const s = positions[startId];
    const e = positions[endId];
    const startX = s.x + 110;
    const endX = e.x - 110;
    
    return `M ${startX} ${s.y} C ${startX + 80} ${s.y}, ${endX - 80} ${e.y}, ${endX} ${e.y}`;
  };

  const nodes = [
    { id: 'github', icon: <GithubOutlined />, title: 'GitHub Repo', subtitle: 'Source Code' },
    { id: 'engine', icon: <ApiOutlined />, title: 'Analysis Engine', subtitle: 'AST Processing' },
    { id: 'metrics', icon: <DatabaseOutlined />, title: 'Code Metrics', subtitle: 'Data Extraction' },
    { id: 'map', icon: <ApartmentOutlined />, title: 'Interactive Map', subtitle: 'Visualization' }
  ];

  return (
    <div 
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="relative w-full max-w-5xl mx-auto aspect-[5/2] min-h-[400px] bg-[#020617] overflow-hidden rounded-2xl cursor-default border border-slate-800 shadow-xl"
    >
      <style>{`
        @keyframes flow-dash {
          from { stroke-dashoffset: 100; }
          to { stroke-dashoffset: 0; }
        }
        .animate-flow-dash {
          animation: flow-dash 2s linear infinite;
        }
        .grid-bg-subtle {
          background-image: radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.08) 1px, transparent 0);
          background-size: 24px 24px;
        }
      `}</style>

      {/* Sadeleştirilmiş Arka Plan */}
      <div className="absolute inset-0 grid-bg-subtle pointer-events-none"></div>

      {/* SVG Canvas for Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 400" preserveAspectRatio="none">
        <g fill="none">
          {/* Arka Plan Sabit Yollar (Track) */}
          {[
            ['github', 'engine'],
            ['github', 'metrics'],
            ['engine', 'map'],
            ['metrics', 'map']
          ].map(([start, end], idx) => (
            <path 
              key={`bg-${idx}`} 
              d={getPath(start, end)} 
              stroke="#1e293b" 
              strokeWidth="2" 
              strokeLinecap="round" 
            />
          ))}

          {/* Hareketli Veri Akışı (Sadece Teal renginde, filtreler temizlendi) */}
          {[
            ['github', 'engine'],
            ['github', 'metrics'],
            ['engine', 'map'],
            ['metrics', 'map']
          ].map(([start, end], idx) => (
            <path 
              key={`fg-${idx}`} 
              d={getPath(start, end)} 
              stroke="#14b8a6" 
              strokeWidth="2"
              strokeDasharray="8 12"
              className="animate-flow-dash opacity-70"
              strokeLinecap="round"
            />
          ))}
        </g>
      </svg>

      {/* Interactive Draggable Nodes */}
      {nodes.map(node => {
        const isDragging = draggingNode === node.id;
        
        return (
          <div
            key={node.id}
            onPointerDown={(e) => handlePointerDown(node.id, e)}
            className={`absolute flex items-center gap-4 px-4 py-3 rounded-xl bg-[#0f172a] cursor-move select-none transition-all duration-200
              ${isDragging 
                ? 'scale-105 border border-teal-500 shadow-[0_0_15px_-3px_rgba(20,184,166,0.2)] z-50' 
                : 'border border-slate-800 hover:border-slate-600 hover:bg-slate-800/50 shadow-lg z-40'
              }`}
            style={{
              top: `${(positions[node.id].y / 400) * 100}%`,
              left: `${(positions[node.id].x / 1000) * 100}%`,
              transform: 'translate(-50%, -50%)',
              touchAction: 'none'
            }}
          >
            {/* Sadeleştirilmiş İkon Kutusu */}
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 text-teal-400">
              <span className="text-lg">
                {node.icon}
              </span>
            </div>
            
            {/* Metinler */}
            <div className="flex flex-col pr-2">
              <span className="text-slate-200 font-semibold text-sm tracking-wide">{node.title}</span>
              <span className="text-slate-500 text-[11px] uppercase font-mono tracking-wider">{node.subtitle}</span>
            </div>
            
            {/* Tutma (Drag) Noktaları */}
            <div className="flex flex-col gap-[3px] ml-1 opacity-30">
              <div className="w-1 h-1 rounded-full bg-slate-400"></div>
              <div className="w-1 h-1 rounded-full bg-slate-400"></div>
              <div className="w-1 h-1 rounded-full bg-slate-400"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HeroFlowGraph;