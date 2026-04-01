import React, { useRef, useMemo } from 'react';
import  ForceGraph3D  from 'react-force-graph-3d';
import * as THREE from 'three';

const CodeVisualizer = ({ graphData }) => {
  const fgRef = useRef();

  const data = useMemo(() => {
    const rawNodes = graphData?.nodes || graphData?.Nodes || [];
    const rawEdges = graphData?.edges || graphData?.Edges || [];

    return {
      nodes: rawNodes.map(n => ({
        id: n.id || n.Id,
        name: n.name || n.Name,
        type: n.type || n.Type,
        val: n.size || n.Size || 10
      })),
      links: rawEdges.map(e => ({
        source: e.source || e.Source,
        target: e.target || e.Target,
        label: e.relationType || e.RelationType
      }))
    };
  }, [graphData]);

  const getNodeColor = (node) => {
    if (node.type === 'Class') return '#14b8a6'; // Teal
    if (node.type === 'Method') return '#f43f5e'; // Rose
    return '#94a3b8';
  };

  return (
    <div className="w-full h-[400px] bg-[#020617] rounded-xl overflow-hidden border border-slate-800 shadow-inner relative">
      <ForceGraph3D
        ref={fgRef}
        graphData={data}
        nodeLabel={(node) => `<span style="color: #14b8a6; font-family: monospace;">[${node.type}]</span> ${node.name}`}
        nodeColor={getNodeColor}
        nodeRelSize={6}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkCurvature={0.25}
        linkColor={() => '#1e293b'}
        backgroundColor="#020617"
        showNavInfo={false}
        onEngineStop={() => fgRef.current.zoomToFit(400)}
        nodeThreeObjectExtend={true}
      />
      <div className="absolute bottom-2 left-2 text-[8px] font-mono text-slate-600 uppercase">
        Nodes: {data.nodes.length} // Links: {data.links.length}
      </div>
    </div>
  );
};

export default CodeVisualizer;