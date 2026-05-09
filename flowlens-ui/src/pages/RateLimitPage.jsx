import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReloadOutlined } from '@ant-design/icons';

const RateLimitPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-50 z-0"></div>

      <div className="relative z-10 max-w-xl w-full flex flex-col items-center text-center">
        
        <h1 className="text-[140px] md:text-[180px] leading-none font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-slate-100 via-slate-500 to-[#020617] mb-4 tracking-tighter select-none">
          429
        </h1>

        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 mb-6 backdrop-blur-md">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.6)]"></div>
          <span className="font-mono text-amber-400 text-[11px] tracking-[0.25em] uppercase font-bold">
            AŞIRI_YÜKLENME_TESPİT_EDİLDİ
          </span>
        </div>

        <p className="text-slate-400 font-sans text-sm md:text-base leading-relaxed mb-12 px-6 max-w-md">
          Sunucuya tahsis edilen anlık işlem kotanızı doldurdunuz. Sistem kararlılığını korumak için istekleriniz geçici olarak durduruldu. Lütfen biraz bekleyip tekrar deneyin.
        </p>

        <div className="flex items-center justify-center gap-6 md:gap-10">
          
          <button 
            onClick={() => navigate(-1)} // Bir önceki sayfaya geri atar
            className="group relative font-mono text-[11px] md:text-xs font-bold tracking-[0.2em] text-amber-400 hover:text-amber-300 transition-colors duration-300 flex items-center gap-2"
          >
            <ReloadOutlined className="text-[10px] group-hover:rotate-180 transition-transform duration-500" />
            <span>[ YENİDEN_DENE ]</span>
            <div className="absolute -bottom-3 left-0 w-full h-[1px] bg-amber-500/0 group-hover:bg-amber-400/60 transition-all duration-300"></div>
          </button>
          
          <span className="text-slate-800 font-mono select-none">||</span>

          <Link 
            to="/dashboard"
            className="group relative font-mono text-[11px] md:text-xs font-bold tracking-[0.2em] text-slate-500 hover:text-slate-300 transition-colors duration-300"
          >
            <span>[ KONTROL_PANELİ ]</span>
            <div className="absolute -bottom-3 left-0 w-full h-[1px] bg-slate-500/0 group-hover:bg-slate-400/60 transition-all duration-300"></div>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default RateLimitPage;