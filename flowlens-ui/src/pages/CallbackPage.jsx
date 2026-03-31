import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import axios from 'axios';

const CallbackPage = ({ setUser }) => {
  const navigate = useNavigate();
  const isCalled = useRef(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code && !isCalled.current) {
      isCalled.current = true;
      
      // Backend'e kodu gönder
      axios.post(`${import.meta.env.VITE_API_URL}/api/auth/github-login`, JSON.stringify(code), {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data));
        setUser(res.data);
        navigate('/dashboard'); // Başarılıysa içeri al
      })
      .catch(err => {
        console.error(err);
        navigate('/login'); // Hata varsa kapıya geri at
      });
    }
  }, []);

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617' }}>
      <Spin size="large" tip="GitHub ile bağlantı kuruluyor..." />
    </div>
  );
};

export default CallbackPage;