import React from 'react';
import { ConfigProvider, theme } from 'antd';
import LoginFormCard from '../components/auth/LoginFormCard';

const LoginPage = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#14b8a6', 
          borderRadius: 12,
        },
      }}
    >
      <div className="relative w-full min-h-screen overflow-hidden bg-[#020617] flex items-center justify-center">
        
        <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-teal-600/20 mix-blend-screen filter blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        
        <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-sky-600/20 mix-blend-screen filter blur-[140px] animate-pulse" style={{ animationDuration: '12s' }}></div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-teal-800/20 mix-blend-screen filter blur-[150px]"></div>

        <div 
          className="absolute inset-0 pointer-events-none opacity-40"
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

        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] opacity-80"></div>

        <div className="relative z-20 w-full flex items-center justify-center px-4">
          <LoginFormCard />
        </div>

      </div>
    </ConfigProvider>
  );
};

export default LoginPage;