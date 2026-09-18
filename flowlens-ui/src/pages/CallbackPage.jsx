import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'; 
import { authService } from '../services/authService';

const CallbackPage = ({ setUser }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const isCalled = useRef(false);
  const [isRedirecting, setIsRedirecting] = useState(false); 

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state'); 

    if (code && state && !isCalled.current) {
      isCalled.current = true;
      
      authService.githubLogin(code, state)
        .then(data => {
          const userData = data.user || data;
          setUser(userData); 
          
          setIsRedirecting(true); 
          
          navigate('/dashboard', { replace: true });
        })
        .catch(err => {
          console.error("Giriş Hatası:", err);
          navigate('/login', { replace: true }); 
        });
    }
  }, [navigate, searchParams, setUser]); 

  if (isRedirecting) return null;

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#020617] flex flex-col items-center justify-center">
      
      {/* ARKA PLAN 1: Yavaşça nefes alan devasa ışık küreleri (Login sayfasıyla uyumlu) */}
      <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-teal-600/20 mix-blend-screen filter blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-sky-600/20 mix-blend-screen filter blur-[140px] animate-pulse" style={{ animationDuration: '12s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-teal-800/20 mix-blend-screen filter blur-[150px]"></div>

      {/* ARKA PLAN 2: Mimari Izgara (Grid) Deseni */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(20, 184, 166, 0.05) 1px, transparent 1px), 
            linear-gradient(90deg, rgba(20, 184, 166, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 90%)'
        }}
      ></div>

      {/* ARKA PLAN 3: Vinyet (Kenarları Karartma) Efekti */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] opacity-80 z-0"></div>


      {/* ORTA KART (Yükleniyor Animasyonu) */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen">
        <div className="p-12 rounded-[2.5rem] bg-[#0B1120]/80 backdrop-blur-3xl border border-slate-800/50 shadow-[0_0_80px_rgba(20,184,166,0.15)] flex flex-col items-center max-w-sm w-full animate-in fade-in zoom-in duration-500">
          
          <div className="relative w-20 h-20 mb-10">
            <div className="absolute inset-0 bg-teal-500 rounded-xl rotate-45 animate-[spin_3s_linear_infinite] opacity-20"></div>
            <div className="absolute inset-2 bg-teal-400 rounded-lg rotate-45 animate-[spin_1.5s_linear_infinite] shadow-[0_0_20px_rgba(20,184,166,0.5)]"></div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-black text-white tracking-tighter mb-6 italic">
              FlowLens
            </h2>
            <div className="flex flex-col items-center gap-4">
              <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 animate-[loading_1.5s_infinite] w-full origin-left"></div>
              </div>
              <span className="font-mono text-[10px] text-teal-400 tracking-[0.3em] font-bold uppercase">
                Oturum Açılıyor...
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: scaleX(0); transform-origin: left; }
          45% { transform: scaleX(1); transform-origin: left; }
          50% { transform: scaleX(1); transform-origin: right; }
          100% { transform: scaleX(0); transform-origin: right; }
        }
      `}</style>
    </div>
  );
};

export default CallbackPage;