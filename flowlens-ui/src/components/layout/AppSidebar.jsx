import React from 'react';
import { Layout, Menu, message } from 'antd'; 
import {
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { userService } from '../../services/userService';

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
        {!collapsed && <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>FlowLens</span>}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={async ({ key }) => {
          if (key === 'logout') {
            try {
              await userService.logout();
              
              if (onLogout) onLogout();

              message.success('Başarıyla çıkış yapıldı.');
              navigate('/');
            } catch (error) {
              message.error('Çıkış yapılırken bir sorun oluştu.');
            }
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