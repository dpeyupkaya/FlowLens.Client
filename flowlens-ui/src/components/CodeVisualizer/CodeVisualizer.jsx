import React, { useRef, useMemo, useState, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';

const CodeVisualizer = ({ graphData }) => {
  const fgRef = useRef();
  const containerRef = useRef();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 500 });
  
  const [expandedClasses, setExpandedClasses] = useState(new Set());
  const [expandedMethods, setExpandedMethods] = useState(new Set());

  const COLORS = {
    Class: '#14b8a6',     
    Method: '#f43f5e',    
    Parameter: '#fbbf24', 
    Link: '#1e293b',
    Particle: '#2dd4bf'
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: isFullscreen ? window.innerHeight : 500
        });
      }
    };
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      setTimeout(handleResize, 100); 
    };
    window.addEventListener('resize', handleResize);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [isFullscreen]);

  const toggleFullscreen = () => {
    if (!isFullscreen) containerRef.current.requestFullscreen();
    else document.exitFullscreen();
  };

  // VERİ İŞLEME MANTIĞI (Burada Parametreleri Filtreliyoruz)
  const data = useMemo(() => {
    const rawNodes = graphData?.nodes || graphData?.Nodes || [];
    const rawEdges = graphData?.edges || graphData?.Edges || [];

    const visibleMethodIds = new Set();
    const visibleParamIds = new Set();

    rawEdges.forEach(e => {
      const sourceId = e.source?.id || e.source?.Id || e.source || e.Source;
      const targetId = e.target?.id || e.target?.Id || e.target || e.Target;
      const relation = e.relation || e.Relation || e.relationType || e.RelationType;

      // Sınıf açıksa metodunu göster
      if (relation === 'Contains' && expandedClasses.has(sourceId)) {
        visibleMethodIds.add(targetId);
      }
      if (relation === 'HasParameter' && expandedMethods.has(sourceId) && visibleMethodIds.has(sourceId)) {
        visibleParamIds.add(targetId);
      }
    });

    const filteredNodes = rawNodes
      .filter(n => {
        const type = n.type || n.Type;
        const id = n.id || n.Id;
        if (type === 'Class') return true;
        if (type === 'Method') return visibleMethodIds.has(id);
        if (type === 'Parameter') return visibleParamIds.has(id);
        return false;
      })
      .map(n => {
        const type = n.type || n.Type;
        const id = n.id || n.Id;
        return {
          ...n,
          id,
          name: n.name || n.Name || n.label || n.Label,
          type,
          val: type === 'Class' ? 5 : type === 'Method' ? 3 : 1.5,
          isExpanded: type === 'Class' ? expandedClasses.has(id) : expandedMethods.has(id)
        };
      });

    const filteredNodeIds = new Set(filteredNodes.map(n => n.id));
    const filteredLinks = rawEdges
      .filter(e => {
        const sId = e.source?.id || e.source?.Id || e.source || e.Source;
        const tId = e.target?.id || e.target?.Id || e.target || e.Target;
        return filteredNodeIds.has(sId) && filteredNodeIds.has(tId);
      })
      .map(e => ({
        source: e.source?.id || e.source?.Id || e.source || e.Source,
        target: e.target?.id || e.target?.Id || e.target || e.Target,
        relation: e.relation || e.Relation || e.relationType || e.RelationType
      }));

    return { nodes: filteredNodes, links: filteredLinks };
  }, [graphData, expandedClasses, expandedMethods]);

  const handleNodeClick = (node) => {
    if (node.type === 'Class') {
      setExpandedClasses(prev => {
        const newSet = new Set(prev);
        newSet.has(node.id) ? newSet.delete(node.id) : newSet.add(node.id);
        return newSet;
      });
    } else if (node.type === 'Method') {
      setExpandedMethods(prev => {
        const newSet = new Set(prev);
        newSet.has(node.id) ? newSet.delete(node.id) : newSet.add(node.id);
        return newSet;
      });
    }
    
    if (fgRef.current) {
      fgRef.current.centerAt(node.x, node.y, 600);
      fgRef.current.zoom(node.type === 'Class' ? 2 : 4, 600);
    }
  };

  return (
    <div ref={containerRef} className={`w-full bg-[#020617] rounded-xl overflow-hidden border border-slate-800 relative ${isFullscreen ? 'h-screen' : 'h-[600px]'}`}>
      
      <div className="absolute top-4 left-4 z-50 flex flex-col gap-2 pointer-events-none bg-slate-900/60 p-3 rounded-lg border border-slate-700/50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#14b8a6] shadow-[0_0_8px_#14b8a6]"></div>
          <span className="text-[10px] font-mono text-slate-400 uppercase">Class</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#f43f5e] shadow-[0_0_8px_#f43f5e]"></div>
          <span className="text-[10px] font-mono text-slate-400 uppercase">Method</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#fbbf24] shadow-[0_0_8px_#fbbf24]"></div>
          <span className="text-[10px] font-mono text-slate-400 uppercase">Parameter</span>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-50">
        <button onClick={toggleFullscreen} className="p-2 bg-slate-900/80 border border-slate-700 rounded-lg text-teal-400 hover:border-teal-500 transition-all">
          {isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
        </button>
      </div>

      <ForceGraph2D
        ref={fgRef}
        graphData={data}
        width={dimensions.width}
        height={dimensions.height}
        onNodeClick={handleNodeClick}
        nodeLabel={(node) => `
          <div style="background: #0f172a; color: #f8fafc; padding: 8px; border-radius: 8px; border: 1px solid #334155; font-family: 'JetBrains Mono', monospace; font-size: 11px;">
            <strong style="color: ${COLORS[node.type]}">[${node.type}]</strong> ${node.name}
            ${node.Metadata?.DataType ? `<br/><span style="color: #94a3b8">Type: ${node.Metadata.DataType}</span>` : ''}
          </div>
        `}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const r = node.val;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, 2 * Math.PI, false);
          ctx.fillStyle = COLORS[node.type] || '#fff';
          
          if (globalScale > 1.2) {
            ctx.shadowBlur = 15 / globalScale;
            ctx.shadowColor = ctx.fillStyle;
          }
          ctx.fill();
          ctx.shadowBlur = 0;

          if (node.isExpanded) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, r + 1.5, 0, 2 * Math.PI, false);
            ctx.strokeStyle = COLORS.Particle;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }

          if (globalScale > 2.5) {
            const fontSize = 10 / globalScale;
            ctx.font = `${fontSize}px JetBrains Mono`;
            ctx.textAlign = 'center';
            ctx.fillStyle = '#94a3b8';
            ctx.fillText(node.name, node.x, node.y + r + fontSize + 2);
          }
        }}
        linkDirectionalParticles={node => node.relation === 'Contains' ? 2 : 0}
        linkDirectionalParticleSpeed={0.005}
        linkDirectionalParticleWidth={1.5}
        linkDirectionalParticleColor={() => COLORS.Particle}
        linkColor={() => '#1e293b'}
      />
    </div>
  );
};

export default CodeVisualizer;