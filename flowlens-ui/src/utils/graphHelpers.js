import ELK from 'elkjs/lib/elk.bundled.js';

export const LAYER_COLORS = [
  '#14b8a6', '#f43f5e', '#fbbf24', '#8b5cf6', '#3b82f6', 
  '#ec4899', '#10b981', '#f97316', '#06b6d4'
];

export const NODE_TYPES = {
  CLASS: 'Class',
  METHOD: 'Method',
  PARAMETER: 'Parameter',
  EXTERNAL: 'ExternalType'
};

export const getLayerColor = (layerName) => {
  if (!layerName) return '#64748b';
  let hash = 0;
  for (let i = 0; i < layerName.length; i++) {
    hash = layerName.charCodeAt(i) + ((hash << 5) - hash);
  }
  return LAYER_COLORS[Math.abs(hash) % LAYER_COLORS.length];
};

const elk = new ELK();

/**
 
 * @param {Array} nodes
 * @param {Array} edges 
 * @param {string} direction 'DOWN', 'UP', 'RIGHT', 'LEFT'
 */
export const getLayoutedElements = async (nodes, edges, direction = 'DOWN') => {
  if (!nodes || nodes.length === 0) return { nodes: [], edges: [] };

  const graph = {
    id: 'root',
    layoutOptions: {
      'elk.algorithm': 'layered',
      'elk.direction': direction,
      'elk.spacing.nodeNode': '40', 
      'elk.layered.spacing.nodeNodeBetweenLayers': '80', 
      
      'elk.separateConnectedComponents': 'true', 
      'elk.spacing.componentComponent': '60',    
      'elk.aspectRatio': '1.5',                  
    },
    children: nodes.map(n => {
      const width = n.type === NODE_TYPES.METHOD ? 180 : 250;
      const height = n.type === NODE_TYPES.METHOD ? 80 : 120;
      return { id: n.id, width, height };
    }),
    edges: edges.map(e => ({
      id: e.id || `${e.source}-${e.target}`,
      sources: [e.source],
      targets: [e.target]
    }))
  };

  try {
    const layoutedGraph = await elk.layout(graph);
    
    const layoutedNodes = nodes.map(node => {
      const pos = layoutedGraph.children.find(c => c.id === node.id);
      return {
        ...node,
        targetPosition: 'top',
        sourcePosition: 'bottom',
        position: { x: pos.x, y: pos.y }
      };
    });
    
    return { nodes: layoutedNodes, edges };
  } catch (error) {
    console.error("ELK Layout Hatası:", error);
    return { nodes, edges }; 
  }
};