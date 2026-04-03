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