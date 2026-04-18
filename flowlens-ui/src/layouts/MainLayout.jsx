import React, { useState } from 'react';
import { Layout } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import AppSidebar from '../components/layout/AppSidebar';
import AppNavbar from '../components/layout/AppNavbar'; 

const { Content } = Layout;

const MainLayout = ({ user, setUser }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.clear();
    if (setUser) setUser(null);
    navigate('/');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppSidebar collapsed={collapsed} onLogout={handleLogout} />
      
      <Layout style={{ 
        marginLeft: collapsed ? 80 : 200, 
        transition: 'all 0.2s',
        background: '#020617' 
      }}>
        
       
        <AppNavbar 
          collapsed={collapsed} 
          onToggle={() => setCollapsed(!collapsed)} 
          user={user} 
          onLogout={handleLogout} 
        />

        <Content className="p-4 lg:p-6 bg-[#020617] overflow-y-auto" style={{ minHeight: 280 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;