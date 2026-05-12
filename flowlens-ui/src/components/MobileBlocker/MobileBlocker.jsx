import React, { useState, useEffect } from 'react';
import { 
  DesktopOutlined, 
  WarningOutlined,
  GithubOutlined,
  LinkedinOutlined,
  InstagramOutlined
} from '@ant-design/icons';

const MobileBlocker = ({ children }) => {
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const physicalWidth = window.screen.width;
      const physicalHeight = window.screen.height;
      const minDimension = Math.min(physicalWidth, physicalHeight);
      
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isMobileHint = navigator.userAgentData?.mobile;

      if (isMobileHint || (hasTouch && minDimension < 768)) {
        setIsMobileDevice(true);
      } else {
        setIsMobileDevice(false);
      }
    };
    checkDevice();

    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (!isMobileDevice) {
    return children;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020617] overflow-hidden">
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#14b8a6]/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        
        <div className="relative flex items-center justify-center w-24 h-24 mb-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-[0_0_40px_rgba(20,184,166,0.15)]">
          <DesktopOutlined className="text-5xl text-[#14b8a6]" />
          
          <div className="absolute -top-3 -right-3 flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/50">
            <WarningOutlined className="text-rose-400 text-sm" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">
          Masaüstü Deneyimi Gerekli
        </h1>
        
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#14b8a6]/50 to-transparent mb-6"></div>

        <p className="text-slate-400 text-[15px] leading-relaxed max-w-[420px] font-medium">
          FlowLens, karmaşık kod hiyerarşileri ve derinlemesine yapısal analiz grafikleri (<span className="text-slate-300">Cytoscape Network</span>) içerir. 
          <br /><br />
          Optimum performans ve doğru görselleştirme için lütfen platforma bir bilgisayar tarayıcısından erişin.
        </p>

        <div className="mt-12 flex flex-col items-center gap-5 border-t border-slate-800/60 pt-8 w-full max-w-[300px]">
          <div className="text-slate-500 text-xs tracking-widest uppercase font-semibold">
            Proje Geliştiricisi 
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com/dpeyupkaya" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
              title="GitHub"
            >
              <GithubOutlined className="text-2xl" />
            </a>
            
            <a 
              href="https://www.linkedin.com/in/dp-eyup-kaya/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-[#0a66c2] transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
              title="LinkedIn"
            >
              <LinkedinOutlined className="text-2xl" />
            </a>
            
            <a 
              href="https://instagram.com/kaya_eyuup" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-[#E1306C] transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
              title="Instagram"
            >
              <InstagramOutlined className="text-2xl" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MobileBlocker;