import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, theme, Spin } from 'antd';
import MobileBlocker from './components/MobileBlocker/MobileBlocker'; 

const LandingPage = lazy(() => import('./pages/LandingPage'));
const CallbackPage = lazy(() => import('./pages/CallbackPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const MainLayout = lazy(() => import('./layouts/MainLayout'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const AnalysisResultPage = lazy(() => import('./pages/AnalysisResultPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'));

const FullScreenLoader = () => (
  <div className="flex justify-center items-center h-screen bg-[#141414]">
    <Spin size="large" />
  </div>
);

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
    <MobileBlocker>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: { colorPrimary: '#14b8a6' },
        }}
      >
        <Router>
          <Suspense fallback={<FullScreenLoader />}>
            <Routes>
              <Route path="/api/auth/callback" element={<CallbackPage setUser={setUser} />} />
              <Route path="/terms" element={<TermsOfServicePage />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" replace />} />

              <Route element={user ? <MainLayout user={user} setUser={setUser} /> : <Navigate to="/login" replace />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/analysis/results" element={<AnalysisResultPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </ConfigProvider>
    </MobileBlocker>
  );
}

export default App;