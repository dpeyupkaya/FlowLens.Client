import React from 'react';
import { Layout, Menu, message, ConfigProvider } from 'antd'; 
import {
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { userService } from '../../services/userService';
import { useTranslation } from '../../i18n/LanguageProvider';

const { Sider } = Layout;

const AppSidebar = ({ collapsed, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const menuItems = [
    { key: '/dashboard', icon: <DashboardOutlined className="text-lg" />, label: t('sidebar.dashboard') },
    { key: '/settings', icon: <SettingOutlined className="text-lg" />, label: t('sidebar.settings') },
    { key: '/about', icon: <InfoCircleOutlined className="text-lg" />, label: t('sidebar.about') },
    { type: 'divider', style: { borderColor: '#1e293b', margin: '24px 16px' } },
    {
      key: 'logout',
      icon: <LogoutOutlined className="text-lg text-rose-500" />,
      label: <span className="text-rose-500 font-semibold">{t('sidebar.logout')}</span>,
      className: 'hover:bg-rose-500/10 hover:text-rose-400 transition-colors'
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemBg: 'transparent',
            itemColor: '#94a3b8',
            itemHoverBg: 'rgba(20, 184, 166, 0.1)',
            itemHoverColor: '#f8fafc',
            itemSelectedBg: 'rgba(20, 184, 166, 0.15)',
            itemSelectedColor: '#2dd4bf',
            itemMarginInline: 12,
            itemBorderRadius: 12,
            iconSize: 18,
          },
        },
      }}
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={240}
        collapsedWidth={80}
        className="z-50 bg-[#070b14] border-r border-slate-800/60 shadow-[4px_0_24px_rgba(0,0,0,0.5)]"
        style={{ position: 'sticky', top: 0, height: '100vh' }}
      >
        <div className="flex flex-col h-full justify-between overflow-hidden">
          <div>
            {/* Logo Section */}
            <div className={`flex items-center h-24 ${collapsed ? 'justify-center' : 'px-6'} transition-all duration-300 relative`}>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-teal-500/5 to-transparent z-0"></div>
              
              {!collapsed && (
                <div className="flex flex-col overflow-hidden whitespace-nowrap relative z-10">
                  <span className="text-slate-100 font-extrabold text-[22px] tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">FlowLens</span>
                  <span className="text-teal-500 text-[9px] font-mono tracking-[0.2em] font-bold mt-1.5 uppercase opacity-80">Analytics</span>
                </div>
              )}
              {collapsed && (
                <div className="text-teal-500 font-extrabold text-2xl relative z-10">
                  FL
                </div>
              )}
            </div>

            {/* Menu */}
            <div className="mt-2">
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
                      message.success(t('sidebar.logoutSuccess'));
                      navigate('/');
                    } catch (error) {
                      message.error(t('sidebar.logoutError'));
                    }
                  } else {
                    navigate(key);
                  }
                }}
                className="bg-transparent border-none px-2 font-medium tracking-wide"
              />
            </div>
          </div>

          {/* Bottom Footer Section */}
          <div className={`p-4 mb-4 ${collapsed ? 'hidden' : 'block animate-fade-in'}`}>
            <div className="rounded-2xl bg-[#0d1424] border border-slate-700/40 p-4 relative overflow-hidden group hover:border-teal-500/30 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 blur-[30px] rounded-full transform translate-x-12 -translate-y-12 group-hover:bg-teal-500/20 transition-all duration-700"></div>
              <h4 className="text-slate-200 text-sm font-bold mb-1.5 relative z-10">{t('sidebar.proTitle')}</h4>
              <p className="text-slate-500 text-xs mb-4 leading-relaxed relative z-10">{t('sidebar.proDesc')}</p>
              <button className="relative z-10 w-full py-2.5 bg-slate-800/80 hover:bg-gradient-to-r hover:from-teal-600 hover:to-emerald-500 text-slate-300 hover:text-white transition-all duration-300 rounded-xl text-[11px] font-black tracking-widest uppercase border border-slate-700 hover:border-transparent shadow-lg hover:shadow-teal-500/25">
                {t('sidebar.proButton')}
              </button>
            </div>
          </div>
          
        </div>
      </Sider>
    </ConfigProvider>
  );
};

export default AppSidebar;