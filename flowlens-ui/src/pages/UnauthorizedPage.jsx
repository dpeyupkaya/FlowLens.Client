import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-50 z-0"></div>

      <div className="relative z-10 max-w-xl w-full flex flex-col items-center text-center">
        
        <h1 className="text-[140px] md:text-[180px] leading-none font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-slate-100 via-slate-500 to-[#020617] mb-4 tracking-tighter select-none">
          401
        </h1>

        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 mb-6 backdrop-blur-md">
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.6)]"></div>
          <span className="font-mono text-rose-400 text-[11px] tracking-[0.25em] uppercase font-bold">
            YETKİSİZ_ERİŞİM_TALEBİ
          </span>
        </div>

        <p className="text-slate-400 font-sans text-sm md:text-base leading-relaxed mb-10 px-6 max-w-md">
          Bu modüle erişim sağlamak için geçerli bir kimlik doğrulama anahtarına ihtiyacınız var. Lütfen aktif bir oturum başlatın.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button 
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-8 py-3.5 bg-slate-100 text-slate-900 hover:bg-white hover:scale-[1.02] font-mono text-[11px] font-bold tracking-[0.2em] rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(241,245,249,0.15)] hover:shadow-[0_0_30px_rgba(241,245,249,0.25)]"
          >
            GİRİŞ_YAP
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-8 py-3.5 bg-slate-900/50 border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500 hover:bg-slate-800/50 font-mono text-[11px] font-bold tracking-[0.2em] rounded-xl transition-all duration-300 backdrop-blur-md"
          >
            ANA_SAYFA
          </button>
        </div>

      </div>
    </div>
  );
};

export default UnauthorizedPage;