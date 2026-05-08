import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import Hyperspeed from '../components/backgrounds/Hyperspeed'; 
import { authService } from '../services/authService';

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

const CallbackPage = ({ setUser }) => {
  const navigate = useNavigate();
  const isCalled = useRef(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code && !isCalled.current) {
      isCalled.current = true;
      
      authService.githubLogin(code)
        .then(data => {
          const userData = data.user || data;
          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
          navigate('/dashboard');
        })
        .catch(err => {
          console.error("GitHub Login Hatası:", err);
          navigate('/login'); 
        });
    }
  }, [navigate, setUser]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#020617]">
      
      <div className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <div className="w-full h-full">
          <Hyperspeed effectOptions={hyperSpeedOptions} />
        </div>
      </div>

      <div className="fixed inset-0 z-10 bg-black/50 backdrop-blur-[2px] pointer-events-none"></div>

      <div className="relative z-20 flex items-center justify-center w-full min-h-screen px-4">
        <div style={{
          background: 'rgba(15, 23, 42, 0.7)',
          padding: '40px 60px',
          borderRadius: '24px',
          border: '1px solid rgba(20, 184, 166, 0.2)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          textAlign: 'center'
        }}>
          <Spin 
            size="large" 
            tip={<span style={{ color: '#14b8a6', marginTop: '20px', display: 'block', fontWeight: '500' }}>GitHub ile bağlantı kuruluyor...</span>} 
          />
        </div>
      </div>

    </div>
  );
};

export default CallbackPage;