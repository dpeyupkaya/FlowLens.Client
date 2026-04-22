import { create } from 'zustand';

export const useFlowStore = create((set, get) => ({

  settings: null,
  setSettings: (newSettings) => set({ settings: newSettings }),


  rawNodes: [],
  rawEdges: [],
  setRawData: (nodes, edges) => set({ rawNodes: nodes, rawEdges: edges }),

  expandedClasses: new Set(),
  expandedMethods: new Set(),
  
  toggleExpandedClass: (nodeId) => set((state) => {
    const newSet = new Set(state.expandedClasses);
    newSet.has(nodeId) ? newSet.delete(nodeId) : newSet.add(nodeId);
    return { expandedClasses: newSet };
  }),
  
  toggleExpandedMethod: (nodeId) => set((state) => {
    const newSet = new Set(state.expandedMethods);
    newSet.has(nodeId) ? newSet.delete(nodeId) : newSet.add(nodeId);
    return { expandedMethods: newSet };
  }),

  isRecording: false,
  tracePath: [],      
  activeStep: -1,    
  isPlaying: false,   

  setIsRecording: (isRec) => set({ 
    isRecording: isRec, 
    tracePath: [], 
    activeStep: -1, 
    isPlaying: false 
  }),
  
  startTrace: (path) => set({ 
    tracePath: path, 
    activeStep: 0, 
    isPlaying: true, 
    isRecording: false 
  }),
  
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setActiveStep: (step) => set({ activeStep: step }),
  
  nextStep: () => set((state) => ({
    activeStep: Math.min(state.tracePath.length - 1, state.activeStep + 1),
    isPlaying: false 
  })),
  
  prevStep: () => set((state) => ({
    activeStep: Math.max(0, state.activeStep - 1),
    isPlaying: false
  })),
  
  clearDebug: () => set({ 
    tracePath: [], 
    activeStep: -1, 
    isPlaying: false, 
    isRecording: false 
  }),
}));