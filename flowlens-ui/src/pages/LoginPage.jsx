import React from 'react';
import { ConfigProvider, theme } from 'antd';
import LoginFormCard from '../components/auth/LoginFormCard';
import Hyperspeed from '../components/backgrounds/Hyperspeed'; 

const LoginPage = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#14b8a6', // FlowLens Teal
          borderRadius: 12,
        },
      }}
    >
      
      <div className="relative w-full h-screen overflow-hidden bg-[#020617]">
        
        <div className="absolute inset-0 z-0">
          <Hyperspeed />
        </div>

  
        <div className="absolute inset-0 z-10 bg-black/40 pointer-events-none"></div>

        <div className="relative z-20 flex items-center justify-center w-full h-full">
          <LoginFormCard />
        </div>

      </div>
    </ConfigProvider>
  );
};

export default LoginPage;