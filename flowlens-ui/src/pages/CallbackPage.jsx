import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'; // 🚀 useSearchParams EKLENDİ
import Hyperspeed from '../components/backgrounds/Hyperspeed'; 
import { authService } from '../services/authService';

const CallbackPage = ({ setUser }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // 🚀 REACT ROUTER ÜZERİNDEN URL OKUMA EKLENDİ
  
  const isCalled = useRef(false);
  const [isRedirecting, setIsRedirecting] = useState(false); 

  useEffect(() => {
    // 🚀 window.location.search YERİNE BÖYLE OKUYORUZ
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
  }, [navigate, searchParams, setUser]); // 🚀 DEPENDENCY ARRAY GÜNCELLENDİ

  if (isRedirecting) return null;

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#020617]">
      <div className="fixed inset-0 z-0 opacity-90">
        <Hyperspeed />
      </div>
      <div className="fixed inset-0 z-10 bg-black/20 backdrop-blur-[2px]"></div>

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen">
        <div className="p-12 rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.4)] flex flex-col items-center max-w-sm w-full animate-in fade-in zoom-in duration-500">
          
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