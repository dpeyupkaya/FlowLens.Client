import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import axios from 'axios';
import Hyperspeed from '../components/backgrounds/Hyperspeed'; 

const CallbackPage = ({ setUser }) => {
  const navigate = useNavigate();
  const isCalled = useRef(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code && !isCalled.current) {
      isCalled.current = true;
      
      axios.post(`${import.meta.env.VITE_API_URL}/api/auth/github-login`, JSON.stringify(code), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      .then(res => {
        const userData = res.data.user || res.data;
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        navigate('/dashboard');
      })
      .catch(err => {
        console.error(err);
        navigate('/login');
      });
    }
  }, [navigate, setUser]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#020617]">
      
      <div className="absolute inset-0 z-0">
        <Hyperspeed />
      </div>

      <div className="absolute inset-0 z-10 bg-black/50 backdrop-blur-[2px]"></div>

      <div className="relative z-20 h-full flex flex-col items-center justify-center">
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