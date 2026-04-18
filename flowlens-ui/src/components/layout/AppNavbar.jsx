import React, { useState, useEffect } from 'react';
import { Layout, Button, Typography, Avatar, Dropdown } from 'antd';
import { 
  MenuUnfoldOutlined, 
  MenuFoldOutlined, 
  UserOutlined, 
  LogoutOutlined, 
  SettingOutlined 
} from '@ant-design/icons';
import { userService } from '../../services/userService'; // Servisimizi ekledik

const { Header } = Layout;
const { Text } = Typography;

const AppNavbar = ({ collapsed, onToggle, user, onLogout }) => {
  const [activeUser, setActiveUser] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchIdentity = async () => {
    try {
      setLoading(true);
      const data = await userService.getUserMe();
      setActiveUser(data);
    } catch (err) {
      console.error("Kimlik doğrulanamadı:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchIdentity();
}, []);

  
 

  const displayName = activeUser?.username || activeUser?.name || activeUser?.login || 'Misafir Geliştirici';
  const displayAvatar = activeUser?.avatarUrl || activeUser?.avatar_url;

  return (
    <Header 
      className="bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 flex items-center justify-between px-6 shadow-sm" 
      style={{ padding: 0, height: '64px' }}
    >
    
      <div className="flex items-center gap-4">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggle}
          className="text-slate-400 hover:text-teal-400 hover:bg-slate-800/50 transition-colors"
        />
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></div>
          <span className="text-slate-500 font-mono text-[10px] tracking-widest uppercase">
            FlowLens // Workspace
          </span>
        </div>
      </div>
      
        <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-800/50 p-1.5 pr-3 rounded-xl transition-all border border-transparent hover:border-slate-700">
          <div className="text-right hidden sm:block">
            {loading ? (
              <div className="w-20 h-3 bg-slate-700/50 animate-pulse rounded mb-1.5 ml-auto"></div>
            ) : (
              <Text className="text-slate-200 font-bold block leading-none mb-1 text-[13px]">
                {displayName}
              </Text>
            )}
          
          </div>
          <Avatar 
            src={displayAvatar} 
            icon={!displayAvatar && <UserOutlined />} 
            className={`border border-teal-500/30 bg-slate-800/80 flex items-center justify-center text-teal-400 ${loading ? 'opacity-50 animate-pulse' : ''}`}
            size={36}
          />
        </div>
    </Header>
  );
};

export default AppNavbar;