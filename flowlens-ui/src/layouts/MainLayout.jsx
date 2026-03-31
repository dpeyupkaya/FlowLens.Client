import React, { useState } from 'react';
import { Layout, Button, theme, Avatar, Space, Typography } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import AppSidebar from '../components/layout/AppSidebar';

const { Header, Content } = Layout;
const { Text } = Typography;

const MainLayout = ({ user, setUser }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
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
        <Header style={{ 
          padding: '0 24px', 
          background: '#020617', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          borderBottom: '1px solid #1e293b',
          position: 'sticky',
          top: 0,
          zIndex: 1
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', color: '#fff' }}
          />
          
          <Space size="middle">
            <div style={{ textAlign: 'right' }}>
              <Text strong style={{ color: '#fff', display: 'block', lineHeight: '1' }}>{user?.username}</Text>
              <Text type="secondary" style={{ fontSize: '12px' }}>Geliştirici</Text>
            </div>
            <Avatar 
              src={user?.avatarUrl} 
              icon={<UserOutlined />} 
              style={{ border: '1px solid #14b8a6' }}
            />
          </Space>
        </Header>

        <Content style={{ 
          padding: '24px', 
          minHeight: 280, 
          background: '#020617',
          overflowY: 'auto'
        }}>
          {/* Dashboard içeriği buraya gelecek */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;