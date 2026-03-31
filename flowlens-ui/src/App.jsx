import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import LandingPage from './pages/LandingPage';
import CallbackPage from './pages/CallbackPage';
import LoginPage from './pages/LoginPage';
import MainLayout from './layouts/MainLayout';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: { colorPrimary: '#14b8a6' },
      }}
    >
      <Router>
        <Routes>
          <Route path="/api/auth/callback" element={<CallbackPage setUser={setUser} />} />
          {/* Public Rotalar */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />

          {/* Protected Rotalar (Layout ile sarmalanmış) */}
          <Route element={user ? <MainLayout user={user} setUser={setUser} /> : <Navigate to="/login" />}>
            <Route path="/dashboard" element={<div>Burası Analiz Ekranı Olacak Agacım</div>} />
            <Route path="/history" element={<div>Burası Geçmiş Analizler</div>} />
            <Route path="/settings" element={<div>Ayarlar</div>} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;