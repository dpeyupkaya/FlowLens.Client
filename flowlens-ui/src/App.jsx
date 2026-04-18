import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import LandingPage from './pages/LandingPage';
import CallbackPage from './pages/CallbackPage';
import LoginPage from './pages/LoginPage';
import MainLayout from './layouts/MainLayout';
import DashboardPage from './pages/DashboardPage';
import AnalysisResultPage from './pages/AnalysisResultPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Local storage okuma hatası:", error);
      return null;
    }
  });

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
          
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" replace />} />

          <Route element={user ? <MainLayout user={user} setUser={setUser} /> : <Navigate to="/login" replace />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/analysis/results" element={<AnalysisResultPage />} />
            <Route path="/settings" element={<SettingsPage /> } />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;