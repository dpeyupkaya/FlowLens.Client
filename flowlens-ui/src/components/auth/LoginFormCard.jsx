import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GithubOutlined, LockOutlined } from '@ant-design/icons';
import InteractiveFace from '../Fun/InteractiveFace'; // Yeni dosya yolu

const LoginFormCard = () => {
  const navigate = useNavigate();
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;

  const handleGitHubLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user:email,repo`;
  };

  return (
    <div className="relative w-full max-w-md mx-4 p-[1.5px] rounded-[2.5rem] overflow-hidden group">
      
      <div className="absolute inset-[-1000%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#14b8a6_0%,transparent_20%,transparent_80%,#14b8a6_100%)] opacity-30 group-hover:opacity-60 transition-opacity duration-700"></div>

      <div className="relative h-full w-full bg-[#0B1120]/95 backdrop-blur-3xl rounded-[2.5rem] p-10 sm:p-12 flex flex-col items-center text-center shadow-2xl">
        
        <div className="mb-10">
          <h2 className="text-3xl font-sans font-extrabold text-slate-100 tracking-tight mb-2">
            FlowLens
          </h2>
          <p className="text-slate-400 font-sans text-sm leading-relaxed">
            Yazılım mimarinizi ışık hızında keşfedin.
          </p>
        </div>

        <div className="w-full mb-10">
          <div className="flex items-center gap-6">
            <button 
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              onClick={handleGitHubLogin}
              className="flex-grow flex items-center justify-center gap-3 bg-slate-50 text-slate-900 font-sans font-bold text-base py-4 rounded-2xl hover:bg-white transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-xl"
            >
              <GithubOutlined className="text-xl" />
              GitHub ile Giriş Yap
            </button>
            
            <div className="shrink-0 w-10 flex justify-center">
              <InteractiveFace isButtonHovered={isButtonHovered} />
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