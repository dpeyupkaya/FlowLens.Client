import React from 'react';
import { ConfigProvider, theme } from 'antd';
import LoginFormCard from '../components/auth/LoginFormCard';
import Hyperspeed from '../components/backgrounds/Hyperspeed'; 

const hyperSpeedOptions = {
  distortion: 'turbulentDistortion',
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 3,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingTowardSpeed: [150, 250],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x020617, 
    shoulderLinesColor: 0x131318,
    brokenLinesColor: 0x131318,
    leftCarsColor: 0x14b8a6, 
    rightCarsColor: 0x0f766e,
    stickLightsColor: 0x14b8a6,
  }
};

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
      
      <div className="relative w-full min-h-screen overflow-hidden bg-[#020617]">
        
        <div className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
           <div className="w-full h-full">
              <Hyperspeed effectOptions={hyperSpeedOptions} />
           </div>
        </div>

        <div className="fixed inset-0 z-10 bg-black/45 pointer-events-none"></div>

        <div className="relative z-20 flex items-center justify-center w-full min-h-screen px-4">
          <LoginFormCard />
        </div>

      </div>
    </ConfigProvider>
  );
};

export default LoginPage;