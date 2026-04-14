import React, { useState } from 'react';
import {
  VideoCameraOutlined,
  StopOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  StepForwardOutlined,
  StepBackwardOutlined,
  FastBackwardOutlined,
  DeleteOutlined,
  DownloadOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import { useFlowStore } from '../../store/useFlowStore';
import { toPng } from 'html-to-image';

const DebugPanel = () => {
  const isRecording = useFlowStore(state => state.isRecording);
  const setIsRecording = useFlowStore(state => state.setIsRecording);
  const tracePath = useFlowStore(state => state.tracePath);
  const activeStep = useFlowStore(state => state.activeStep);
  const isPlaying = useFlowStore(state => state.isPlaying);
  const setIsPlaying = useFlowStore(state => state.setIsPlaying);
  const clearDebug = useFlowStore(state => state.clearDebug);
  const nextStep = useFlowStore(state => state.nextStep);
  const prevStep = useFlowStore(state => state.prevStep);

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadImage = () => {
    setIsDownloading(true);
    const flowElement = document.querySelector('.react-flow');
    
    if (!flowElement) {
      setIsDownloading(false);
      return;
    }

    toPng(flowElement, { 
      backgroundColor: '#020617', 
      pixelRatio: 2 
    })
    .then((dataUrl) => {
      const a = document.createElement('a');
      a.setAttribute('download', `FlowLens_Architecture_Step_${activeStep + 1}.png`);
      a.setAttribute('href', dataUrl);
      a.click();
    })
    .catch((err) => {
      console.error('Harita indirilirken bir hata oluştu:', err);
    })
    .finally(() => {
      setIsDownloading(false);
    });
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-slate-900/90 border border-slate-700 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl">
      <button
        onClick={() => setIsRecording(!isRecording)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-[11px] uppercase tracking-wider transition-all
          ${isRecording ? 'bg-red-500/20 text-red-500 border border-red-500/50 animate-pulse' : 'bg-slate-800 text-slate-300 border border-slate-600 hover:border-teal-500 hover:text-teal-400'}
        `}
      >
        {isRecording ? <><StopOutlined /> BAŞLANGIÇ SEÇ</> : <><VideoCameraOutlined /> DEBUG MODU</>}
      </button>

      {tracePath.length > 0 && (
        <div className="flex items-center gap-3 border-l border-slate-700 pl-4 ml-2">
          <button
            onClick={() => { setIsPlaying(false); useFlowStore.setState({ activeStep: 0 }); }}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-teal-400 transition-colors"
          >
            <FastBackwardOutlined />
          </button>
          <button
            onClick={prevStep}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-teal-400 transition-colors"
          >
            <StepBackwardOutlined />
          </button>

          <button
            onClick={() => {
              if (activeStep >= tracePath.length - 1) useFlowStore.setState({ activeStep: 0 });
              setIsPlaying(!isPlaying);
            }}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-teal-500 text-slate-900 text-xl shadow-[0_0_15px_rgba(20,184,166,0.4)] hover:scale-110 transition-transform"
          >
            {isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
          </button>

          <button
            onClick={nextStep}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-teal-400 transition-colors"
          >
            <StepForwardOutlined />
          </button>

          <div className="ml-2 px-3 py-1 bg-slate-950 border border-slate-800 rounded font-mono text-[10px] text-teal-400 flex flex-col items-center">
             <span>ADIM</span>
             <b>{Math.min(activeStep + 1, tracePath.length)} / {tracePath.length}</b>
          </div>

         
          <button
            onClick={handleDownloadImage}
            disabled={isDownloading}
            title="Haritayı Resim Olarak İndir"
            className="ml-2 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-teal-400 hover:bg-slate-700 transition-colors disabled:opacity-50"
          >
            {isDownloading ? <LoadingOutlined className="text-teal-400 animate-spin" /> : <DownloadOutlined />}
          </button>

          <button
            onClick={clearDebug}
            className="ml-2 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-red-400 hover:bg-red-500/20 hover:text-red-500 transition-colors"
          >
            <DeleteOutlined />
          </button>
        </div>
      )}
    </div>
  );
};

export default DebugPanel;