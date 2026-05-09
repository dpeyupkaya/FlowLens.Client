import React from 'react';
import { Dropdown, Button } from 'antd';
import { 
  DownloadOutlined, 
  DownOutlined, 
  LoadingOutlined, 
  FullscreenOutlined, 
  FullscreenExitOutlined 
} from '@ant-design/icons';
import { useGraphDownload } from '../../hooks/useGraphDownload';

const ExportMenu = ({ isFullscreen, toggleFullscreen }) => {
  const { downloadGraph, isDownloading } = useGraphDownload();

  const menuItems = [
    { key: 'png', label: <span className="font-mono text-[11px] tracking-wide text-slate-300">PNG <span className="text-slate-500">(Yüksek Çözünürlük)</span></span> },
    { key: 'jpeg', label: <span className="font-mono text-[11px] tracking-wide text-slate-300">JPEG <span className="text-slate-500">(Optimize Boyut)</span></span> },
    { key: 'svg', label: <span className="font-mono text-[11px] tracking-wide text-slate-300">SVG <span className="text-slate-500">(Vektörel Format)</span></span> },
  ];

  return (
    <div className="absolute top-4 right-4 z-[100] flex gap-2">
      <Dropdown
        menu={{ items: menuItems, onClick: (e) => downloadGraph(e.key) }}
        disabled={isDownloading}
        placement="bottomRight"
        trigger={['click']}
        getPopupContainer={(triggerNode) => triggerNode.parentNode} 
      >
        <Button
          className={`bg-slate-900/90 border-slate-700 text-teal-400 hover:text-teal-300 hover:border-teal-500 transition-all duration-300 shadow-xl h-[42px] px-4 rounded-xl flex items-center backdrop-blur-md
            ${isDownloading ? 'cursor-wait border-teal-500/50 bg-teal-900/20' : ''}`}
        >
          {isDownloading ? <LoadingOutlined className="animate-spin" /> : <DownloadOutlined />}
          <span className="ml-2 font-mono font-bold text-[11px] tracking-[0.15em]">
            {isDownloading ? 'İŞLENİYOR...' : 'DIŞA_AKTAR'}
          </span>
          <DownOutlined className={`text-[9px] ml-2 transition-transform duration-300 opacity-70`} />
        </Button>
      </Dropdown>

      <button
        onClick={toggleFullscreen}
        className="w-[42px] h-[42px] flex items-center justify-center bg-slate-900/90 border border-slate-700 rounded-xl text-teal-400 hover:text-teal-300 hover:border-teal-500 shadow-xl transition-all duration-300 backdrop-blur-md group"
        title={isFullscreen ? "Tam Ekrandan Çık" : "Tam Ekran Modu"}
      >
        {isFullscreen ? (
          <FullscreenExitOutlined className="text-lg group-hover:scale-110 transition-transform" />
        ) : (
          <FullscreenOutlined className="text-lg group-hover:scale-110 transition-transform" />
        )}
      </button>
    </div>
  );
};

export default ExportMenu;