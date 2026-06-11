import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GithubOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';
import InteractiveFace from '../Fun/InteractiveFace'; 
import { authService } from '../../services/authService'; 

const LoginFormCard = () => {
  const navigate = useNavigate();
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubLogin = async () => { 
    if (isLoading) return;
    setIsLoading(true);
    try {
      const data = await authService.getGitHubLoginUrl();
      if (data && data.url) {
        window.location.href = data.url;
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Güvenli giriş bağlantısı alınamadı:", error);
      setIsLoading(false);
    }
  };

  return (
    // p-[3px] yaparak kartın dış border ışığını kalınlaştırdık
    <div className="relative w-full max-w-md mx-4 p-[3px] rounded-[2.5rem] overflow-hidden group transition-all duration-500">
      
      {/* KART DIŞ BORDER IŞIĞI: Opacity artırıldı ve gradient alanı genişletildi (daha kalın görünmesi için) */}
      <div className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#14b8a6_0%,#0ea5e9_25%,transparent_50%,#0ea5e9_75%,#14b8a6_100%)] opacity-40 group-hover:opacity-100 transition-opacity duration-700"></div>

      <div className="relative h-full w-full bg-[#0B1120]/98 backdrop-blur-3xl rounded-[2.5rem] p-10 sm:p-12 flex flex-col items-center text-center shadow-2xl">
        
        <div className="mb-10">
          <h2 className="text-3xl font-sans font-extrabold text-slate-100 tracking-tight mb-2">
            FlowLens
          </h2>
          <p className="text-slate-400 font-sans text-sm leading-relaxed">
            Yazılım mimarinizi görsel olarak keşfedin.
          </p>
        </div>

        <div className="w-full mb-10">
          <div className="flex items-center gap-6">
            
            {/* BUTON: isLoading durumunda border-loading efekti için p-[2px] ve overflow-hidden eklendi */}
            <button 
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              onClick={handleGitHubLogin}
              disabled={isLoading}
              className={`relative flex-grow flex items-center justify-center gap-3 font-sans font-bold text-base py-4 rounded-2xl transition-all duration-500 overflow-hidden shadow-xl group/btn
                ${isLoading 
                  ? "bg-slate-900 text-teal-400 scale-[0.98] p-[2px]" // Yüklenirken arka plan kararır, yazı teal olur
                  : "bg-slate-50 text-slate-900 hover:bg-white hover:scale-[1.02] active:scale-[0.98]" 
                }
              `}
            >
              {/* BUTON İÇİ BORDER IŞIĞI (Sadece loading anında görünür) */}
              {isLoading && (
                <div className="absolute inset-[-100%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_70%,#14b8a6_100%)]"></div>
              )}

              {/* Butonun asıl içeriği (Işığın üstünde kalması için z-10) */}
              <div className={`relative z-10 flex items-center gap-3 w-full h-full justify-center rounded-2xl ${isLoading ? 'bg-slate-900 w-full h-full' : ''}`}>
                {isLoading ? (
                  <>
                    <LoadingOutlined className="text-xl animate-spin" />
                    <span>Yönlendiriliyor...</span>
                  </>
                ) : (
                  <>
                    <GithubOutlined className="text-xl" />
                    <span>GitHub ile Giriş Yap</span>
                  </>
                )}
              </div>
            </button>
            
            <div className="shrink-0 w-10 flex justify-center">
              <InteractiveFace isButtonHovered={isButtonHovered || isLoading} isLoading={isLoading} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 py-3.5 px-6 bg-slate-900/60 rounded-2xl border border-slate-800/40 mb-10">
          <LockOutlined className="text-teal-600/50 text-xs" />
          <span className="text-slate-400 font-sans text-[11px] font-medium tracking-wide">
            Gizlilik ve veri güvenliği odaklı analiz
          </span>
        </div>

        <div>
          <p className="text-slate-600 font-sans text-[11px]">
            Devam ederek{' '}
            <button 
              onClick={() => navigate('/terms')}
              className="text-slate-400 underline hover:text-teal-400 transition-colors cursor-pointer"
            >
              Kullanım Şartlarını
            </button>
            {' '}onaylamış olursunuz.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginFormCard;