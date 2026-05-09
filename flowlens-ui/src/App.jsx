import React, { useState, Suspense, lazy, useMemo } from 'react';
import { 
  createBrowserRouter, 
  RouterProvider, 
  Route, 
  Navigate, 
  createRoutesFromElements 
} from 'react-router-dom';
import { ConfigProvider, theme, Spin } from 'antd';
import MobileBlocker from './components/MobileBlocker/MobileBlocker'; 
import AuthGuard from './components/Guard/AuthGuard';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const CallbackPage = lazy(() => import('./pages/CallbackPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const MainLayout = lazy(() => import('./layouts/MainLayout'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const AnalysisResultPage = lazy(() => import('./pages/AnalysisResultPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'));
const UnauthorizedPage = lazy(() => import('./pages/UnauthorizedPage'));
const RateLimitPage = lazy(() => import('./pages/RateLimitPage'));

const FullScreenLoader = () => (
  <div className="flex justify-center items-center h-screen bg-[#141414]">
    <Spin size="large" />
  </div>
);

function App() {
  const [user, setUser] = useState(null);

  const router = useMemo(() => createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/api/auth/callback" element={<CallbackPage setUser={setUser} />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/" element={<LandingPage />} />
        
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" replace />} />

        <Route 
          element={
            <AuthGuard setUser={setUser}>
              <MainLayout user={user} setUser={setUser} />
            </AuthGuard>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/analysis/results" element={<AnalysisResultPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        
        <Route path="/rate-limit" element={<RateLimitPage />} />
        <Route path="/401" element={<UnauthorizedPage />} />
      </Route>
    )
  ), [user]);

  return (
    <MobileBlocker>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: { 
            colorPrimary: '#14b8a6',
            fontFamily: 'Inter, sans-serif'
          },
        }}
      >
        <Suspense fallback={<FullScreenLoader />}>
          <RouterProvider router={router} />
        </Suspense>
      </ConfigProvider>
    </MobileBlocker>
  );
}

export default App;