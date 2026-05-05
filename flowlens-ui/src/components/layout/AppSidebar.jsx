import React from 'react';
import { Layout, Menu } from 'antd';
import { 
  DashboardOutlined, 
  SettingOutlined, 
  LogoutOutlined,
  CodeOutlined 
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const AppSidebar = ({ collapsed, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: '/dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
    { key: '/settings', icon: <SettingOutlined />, label: 'Ayarlar' },
    { 
      key: 'logout', 
      icon: <LogoutOutlined />, 
      label: 'Çıkış Yap', 
      danger: true
    },
  ];

  return (
    <Sider 
      trigger={null} 
      collapsible 
      collapsed={collapsed}
      style={{ 
        background: '#0f172a', 
        borderRight: '1px solid #1e293b',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0
      }}
    >
      <div style={{ 
        height: '64px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: collapsed ? 'center' : 'flex-start',
        padding: '0 24px',
        gap: '12px'
      }}>
        <CodeOutlined style={{ color: '#14b8a6', fontSize: '24px' }} />
        {!collapsed && <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>FlowLens</span>}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => {
          if (key === 'logout') {
            localStorage.clear();
            sessionStorage.clear();

            document.cookie.split(";").forEach((c) => {
              document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });

            console.clear();

            if (onLogout) onLogout();
            
            navigate('/');
          } else {
            navigate(key);
          }
        }}
        style={{ background: 'transparent', border: 'none' }}
      />
    </Sider>
  );
};

export default AppSidebar;