import ELK from 'elkjs/lib/elk.bundled.js';

export const LAYER_COLORS = [
  '#14b8a6', '#f43f5e', '#fbbf24', '#8b5cf6', '#3b82f6', 
  '#ec4899', '#10b981', '#f97316', '#06b6d4'
];

export const NODE_TYPES = {
  CLASS: 'Class',
  METHOD: 'Method',
  PARAMETER: 'Parameter',
  EXTERNAL: 'ExternalType',
  PYTHON_MODULE: 'Python Module',
  FUNCTION: 'Function',
  EXTERNAL_MODULE: 'External Module',
  BASE_CLASS: 'Base Class',
  DATABASE_ENTITY: 'Database Entity',
  API_ENDPOINT: 'API Endpoint',
  STRUCT: 'Struct',
  INTERFACE: 'Interface',
  FILE: 'File',
  MODULE: 'Module',
  EXTERNAL_PACKAGE: 'External Package',
  UI_COMPONENT: 'UI Component',
  CONTROLLER: 'Controller',
  REACT_HOOK: 'React Hook',
  UI_VIEW: 'UI View',
  STYLESHEET: 'Stylesheet'
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

  if (!edges || edges.length === 0) {
    const cols = Math.ceil(Math.sqrt(nodes.length));
    const layoutedNodes = nodes.map((node, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      return {
        ...node,
        targetPosition: 'top',
        sourcePosition: 'bottom',
        position: { x: col * 300, y: row * 150 }
      };
    });
    return { nodes: layoutedNodes, edges: [] };
  }

  const graph = {
    id: 'root',
    layoutOptions: {
      'elk.algorithm': 'layered',
      'elk.direction': direction,
      'elk.spacing.nodeNode': '50', 
      'elk.layered.spacing.nodeNodeBetweenLayers': '90', 
      
      'elk.separateConnectedComponents': 'true', 
      'elk.spacing.componentComponent': '100',    
      'elk.aspectRatio': '1.5',
      'elk.padding': '[top=50,left=50,bottom=50,right=50]'
    },
    children: nodes.map(n => {
      const width = (n.type === NODE_TYPES.METHOD || n.type === NODE_TYPES.FUNCTION) ? 180 : 250;
      const height = (n.type === NODE_TYPES.METHOD || n.type === NODE_TYPES.FUNCTION) ? 80 : 120;
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