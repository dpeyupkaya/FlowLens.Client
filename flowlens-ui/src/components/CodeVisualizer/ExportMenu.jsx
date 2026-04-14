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
    { key: 'png', label: <span className="font-mono text-xs text-slate-300">PNG (Yüksek Kalite)</span> },
    { key: 'jpeg', label: <span className="font-mono text-xs text-slate-300">JPEG (Düşük Boyut)</span> },
    { key: 'svg', label: <span className="font-mono text-xs text-slate-300">SVG (Vektörel)</span> },
  ];

  return (
    <div className="absolute top-4 right-4 z-50 flex gap-2">
      <Dropdown
        menu={{ items: menuItems, onClick: (e) => downloadGraph(e.key) }}
        disabled={isDownloading}
        placement="bottomRight"
        trigger={['click']}
      >
        <Button
          className="bg-slate-900/90 border-slate-700 text-teal-400 hover:text-teal-300 hover:border-teal-500 transition-colors shadow-xl h-[42px] px-4 rounded-lg flex items-center"
        >
          {isDownloading ? <LoadingOutlined /> : <DownloadOutlined />}
          <span className="ml-2 font-bold text-[11px] tracking-wider">DIŞA AKTAR</span>
          <DownOutlined className="text-[10px] ml-1" />
        </Button>
      </Dropdown>

      <button
        onClick={toggleFullscreen}
        className="w-[42px] h-[42px] flex items-center justify-center bg-slate-900/90 border border-slate-700 rounded-lg text-teal-400 hover:border-teal-500 shadow-xl transition-all"
        title="Tam Ekran"
      >
        {isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
      </button>
    </div>
  );
};

export default ExportMenu;