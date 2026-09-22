import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  ReactFlow, Controls, Background, MiniMap, Panel, MarkerType,
  useNodesState, useEdgesState, useReactFlow, ReactFlowProvider
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useGraphData } from '../../hooks/useGraphData';
import { NODE_TYPES, getLayerColor, getLayoutedElements } from '../../utils/graphHelpers';
import { useExecutionDebugger } from '../../hooks/useExecutionDebugger';
import { useFlowStore } from '../../store/useFlowStore';
import GraphLegend from './GraphLegend';
import FlowNode from './FlowNode';
import DebugPanel from './DebugPanel';
import ContextInspector from './ContextInspector';
import ExportMenu from './ExportMenu'; 

const nodeTypes = { customNode: FlowNode };

const VisualizerContent = ({ graphData }) => {
  const containerRef = useRef();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const initialFitDone = useRef(false);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { fitView, setCenter } = useReactFlow();

  const setRawData = useFlowStore(state => state.setRawData);
  const rawNodes = useFlowStore(state => state.rawNodes);
  const rawEdges = useFlowStore(state => state.rawEdges);
  const toggleExpandedClass = useFlowStore(state => state.toggleExpandedClass);
  const toggleExpandedMethod = useFlowStore(state => state.toggleExpandedMethod);
  const isRecording = useFlowStore(state => state.isRecording);
  const tracePath = useFlowStore(state => state.tracePath);
  const activeStep = useFlowStore(state => state.activeStep);
  
  const settings = useFlowStore(state => state.settings);
  
  const rawGraphics = settings?.graphics || settings?.Graphics || {};
  const graphicsSettings = {
    highPerformanceMode: rawGraphics.highPerformanceMode ?? rawGraphics.HighPerformanceMode ?? false,
    showMinimap: rawGraphics.showMinimap ?? rawGraphics.ShowMinimap ?? true,
    nodeDetailLevel: rawGraphics.nodeDetailLevel || rawGraphics.NodeDetailLevel || 'Detailed'
  };

  useEffect(() => {
    initialFitDone.current = false;
    const rNodes = graphData?.graph?.nodes || graphData?.nodes || graphData?.Nodes || [];
    const rEdges = graphData?.graph?.edges || graphData?.edges || graphData?.Edges || [];
    setRawData(rNodes, rEdges);
  }, [graphData, setRawData]);

  const data = useGraphData();

  const {
    handleNodeSelectForDebug, getDebugStateForNode,
    startMp4Recording, stopMp4Recording, isCapturingMp4
  } = useExecutionDebugger(data.edges);

  useEffect(() => {
    const actualNodes = data?.nodes || [];
    const actualEdges = data?.edges || [];

    if (actualNodes.length === 0) return;

    const processLayout = async () => {
      const { nodes: layoutedNodesData } = await getLayoutedElements(actualNodes, actualEdges);
      const isTraceMode = tracePath.length > 0;

      const layoutedNodes = layoutedNodesData.map((n) => ({
        id: n.id,
        type: 'customNode',
        position: n.position,
        data: { ...n, ...getDebugStateForNode(n.id), detailLevel: graphicsSettings.nodeDetailLevel }
      }));

      const layoutedEdges = actualEdges.map(e => {
        const sIdx = tracePath.indexOf(e.source);
        const tIdx = tracePath.indexOf(e.target);
        const isTraceEdge = sIdx !== -1 && tIdx !== -1 && tIdx > sIdx;
        const isTraceActive = isTraceEdge && tIdx <= activeStep;

        const rel = e.originalRelation || e.relationType || e.relation;
        let strokeColor = '#1e293b';
        let dash = 'none';
        let label = undefined;
        let strokeWidthBase = 1;

        if (rel === 'DependsOn') { strokeColor = '#475569'; dash = '4 4'; }
        if (rel === 'Instantiates') { strokeColor = '#3b82f6'; dash = '4 4'; label = 'instantiates'; }
        if (rel === 'Inherits' || rel === 'InheritsFrom') { strokeColor = '#ef4444'; }
        if (rel === 'Implements') { strokeColor = '#10b981'; dash = '8 4'; }
        if (rel === 'Imports') { strokeColor = '#a855f7'; dash = '5 5'; label = 'imports'; }
        if (rel === 'Calls') { strokeColor = '#f97316'; label = 'calls'; }
        if (rel === 'HasRelation') { strokeColor = '#d946ef'; dash = '6 3'; label = 'relation'; strokeWidthBase = 2; }
        if (rel === 'DeclaredIn') { strokeColor = '#94a3b8'; dash = '2 2'; label = 'declared in'; }
        
        if (rel === 'IncludesScript') { strokeColor = '#fbbf24'; label = 'includes script'; }
        if (rel === 'IncludesStyle' || rel === 'ImportsStyle') { strokeColor = '#22d3ee'; dash = '4 4'; label = 'style'; strokeWidthBase = 1; }
        if (rel === 'SubmitsTo') { strokeColor = '#10b981'; label = 'submits to'; strokeWidthBase = 3; }

        const shouldAnimate = graphicsSettings.highPerformanceMode 
          ? false 
          : (isTraceActive || rel === 'Contains' || rel === 'HasParameter' || rel === 'SubmitsTo');
          
        const transitionStyle = graphicsSettings.highPerformanceMode ? 'none' : 'all 0.5s ease';

        return {
          id: `${e.source}-${e.target}`,
          source: e.source,
          target: e.target,
          label: label,
          labelStyle: { fill: strokeColor, fontWeight: 700, fontSize: 10, fontFamily: 'monospace' },
          labelBgStyle: { fill: '#0f172a', fillOpacity: 0.8 },
          animated: shouldAnimate,
          style: {
            strokeDasharray: dash,
            stroke: isTraceActive ? '#10b981' : strokeColor,
            strokeWidth: isTraceActive ? 4 : strokeWidthBase,
            opacity: (isTraceMode && !isTraceEdge) ? 0.1 : 1,
            transition: transitionStyle
          },
          markerEnd: { type: MarkerType.ArrowClosed, color: isTraceActive ? '#10b981' : strokeColor }
        };
      });

      setNodes(layoutedNodes);
      setEdges(layoutedEdges);

      if (!initialFitDone.current && layoutedNodes.length > 0) {
        setTimeout(() => {
          fitView({ padding: 0.1, duration: 800 });
          initialFitDone.current = true;
        }, 150);
      }
    };

    processLayout();
  }, [data, tracePath, activeStep, isRecording, getDebugStateForNode, setNodes, setEdges, fitView, graphicsSettings.highPerformanceMode, graphicsSettings.nodeDetailLevel]);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) containerRef.current?.requestFullscreen?.();
    else document.exitFullscreen?.();
  };

  const onNodeClick = useCallback((event, node) => {
    if (isRecording) {
      handleNodeSelectForDebug(node.id);
      return;
    }

    setSelectedNodeId(node.id);

    const type = node.data.type;
    const expandableTypes = [NODE_TYPES.CLASS, NODE_TYPES.EXTERNAL, NODE_TYPES.PYTHON_MODULE, NODE_TYPES.BASE_CLASS, NODE_TYPES.DATABASE_ENTITY, NODE_TYPES.API_ENDPOINT];
    
    if (expandableTypes.includes(type)) {
      toggleExpandedClass(node.id);
    } else if (type === NODE_TYPES.METHOD || type === NODE_TYPES.FUNCTION) {
      toggleExpandedMethod(node.id);
    }

    setCenter(node.position.x + 125, node.position.y + 60, { zoom: 1.2, duration: 800 });
  }, [isRecording, handleNodeSelectForDebug, toggleExpandedClass, toggleExpandedMethod, setCenter]);

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  return (
    <div ref={containerRef} className={`w-full bg-[#020617] rounded-xl overflow-hidden border border-slate-800 relative transition-all ${isFullscreen ? 'fixed inset-0 z-[9999] h-screen w-screen' : 'h-[700px]'}`}>
      
      <ExportMenu isFullscreen={isFullscreen} toggleFullscreen={toggleFullscreen} />
      <ContextInspector activeNodeId={tracePath[activeStep] || selectedNodeId} rawNodes={rawNodes} />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        style={{ width: '100%', height: '100%' }}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        minZoom={0.05}
        maxZoom={3}
        className="bg-[#020617]"
      >
        <Background color="#1e293b" gap={20} size={1.5} />
        <Controls className="bg-slate-900 border-slate-700 fill-white" />
        
        {graphicsSettings.showMinimap && (
          <MiniMap nodeColor={(node) => getLayerColor(node.data?.metadata?.Layer)} maskColor="rgba(2, 6, 23, 0.8)" className="bg-slate-950 border border-slate-800 rounded-lg" />
        )}
        
        <Panel position="top-left">{data?.uniqueLayers && <GraphLegend layers={data.uniqueLayers} />}</Panel>
      </ReactFlow>

      <DebugPanel
        startMp4Recording={startMp4Recording}
        stopMp4Recording={stopMp4Recording}
        isCapturingMp4={isCapturingMp4}
      />
    </div>
  );
};

const CodeVisualizer = (props) => (
  <ReactFlowProvider>
    <VisualizerContent {...props} />
  </ReactFlowProvider>
);

export default CodeVisualizer;