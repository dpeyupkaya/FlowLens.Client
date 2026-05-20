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
    github: { x: 200, y: 200 },
    engine: { x: 500, y: 100 },
    metrics: { x: 500, y: 300 },
    map: { x: 800, y: 200 }
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

  const handlePointerUp = (e) => setDraggingNode(null);

  const getPath = (startId, endId) => {
    const s = positions[startId];
    const e = positions[endId];
    const startX = s.x + 90;
    const endX = e.x - 90;
    
    return `M ${startX} ${s.y} C ${startX + 60} ${s.y}, ${endX - 60} ${e.y}, ${endX} ${e.y}`;
  };

  return (
    <div 
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="relative w-full max-w-[900px] mx-auto aspect-[5/2] min-h-[300px] bg-[#020617] overflow-hidden rounded-2xl cursor-default"
    >
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #334155 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 400">
        <defs>
          <marker id="arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
          </marker>
        </defs>
        <g fill="none" stroke="#64748b" strokeWidth="1.5" vectorEffect="non-scaling-stroke">
          <path d={getPath('github', 'engine')} markerEnd="url(#arrowhead)" />
          <path d={getPath('github', 'metrics')} markerEnd="url(#arrowhead)" />
          <path d={getPath('engine', 'map')} markerEnd="url(#arrowhead)" />
          <path d={getPath('metrics', 'map')} markerEnd="url(#arrowhead)" />
        </g>
      </svg>

      {[
        { id: 'github', icon: <GithubOutlined />, title: 'GitHub Repo' },
        { id: 'engine', icon: <ApiOutlined />, title: 'Analysis Engine' },
        { id: 'metrics', icon: <DatabaseOutlined />, title: 'Code Metrics' },
        { id: 'map', icon: <ApartmentOutlined />, title: 'Interactive Map' }
      ].map(node => (
        <div
          key={node.id}
          onPointerDown={(e) => handlePointerDown(node.id, e)}
          className="absolute flex items-center gap-3 px-5 py-3 rounded-lg border border-slate-700 bg-[#0f172a] shadow-xl cursor-move select-none"
          style={{
            top: `${(positions[node.id].y / 400) * 100}%`,
            left: `${(positions[node.id].x / 1000) * 100}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 20
          }}
        >
          <div className="text-teal-400 text-lg flex items-center">{node.icon}</div>
          <span className="text-slate-200 font-medium text-sm whitespace-nowrap">{node.title}</span>
        </div>
      ))}
    </div>
  );
};

export default HeroFlowGraph;