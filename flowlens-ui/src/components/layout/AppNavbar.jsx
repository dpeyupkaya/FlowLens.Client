import React, { useState, useEffect } from 'react';
import { Layout, Button, Typography, Avatar, Tooltip } from 'antd';
import { 
  MenuUnfoldOutlined, 
  MenuFoldOutlined, 
  UserOutlined, 
  ThunderboltOutlined,
  HourglassOutlined
} from '@ant-design/icons';
import { userService } from '../../services/userService';

const { Header } = Layout;
const { Text } = Typography;

const AppNavbar = ({ collapsed, onToggle, user, onLogout }) => {
  const [activeUser, setActiveUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeUntilReset, setTimeUntilReset] = useState('');

  const MAX_LIMIT = 5;
  const dailyCount = activeUser?.dailyAnalysisCount ?? activeUser?.DailyAnalysisCount ?? 0;
  const remainingQuota = Math.max(0, MAX_LIMIT - dailyCount);
  const isQuotaExceeded = remainingQuota <= 0;

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

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const nextMidnightUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
      
      const diffMs = nextMidnightUTC - now;
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeUntilReset(`${hours}s ${minutes}d`);
    };

    calculateTimeLeft(); 
    const timer = setInterval(calculateTimeLeft, 60000); 

    return () => clearInterval(timer);
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
            FlowLens 
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        
        {!loading && (
          <Tooltip title={isQuotaExceeded ? "Limitiniz doldu. Geri sayım bitince yenilenecek." : "Günlük analiz hakkınız"}>
            <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all
              ${isQuotaExceeded 
                ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                : 'bg-teal-500/10 border-teal-500/30 text-teal-400'
              }`}
            >
              {isQuotaExceeded ? (
                <>
                  <HourglassOutlined className="animate-pulse" />
                  <span className="font-mono text-[11px] font-bold tracking-wider">YENİLENME: {timeUntilReset}</span>
                </>
              ) : (
                <>
                  <ThunderboltOutlined />
                  <span className="font-mono text-[11px] font-bold tracking-wider">{remainingQuota} / {MAX_LIMIT} HAK</span>
                </>
              )}
            </div>
          </Tooltip>
        )}

        <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-800/50 p-1.5 pr-3 rounded-xl transition-all border border-transparent hover:border-slate-700">
          <div className="text-right hidden sm:block">
            {loading ? (
              <div className="w-20 h-3 bg-slate-700/50 animate-pulse rounded mb-1.5 ml-auto"></div>
            ) : (
              <>
                <Text className="text-slate-200 font-bold block leading-none mb-1 text-[13px]">
                  {displayName}
                </Text>
                <Text className="text-slate-500 font-mono text-[9px] uppercase tracking-widest md:hidden block">
                  {remainingQuota} Hak Kaldı
                </Text>
              </>
            )}
          </div>
          <Avatar 
            src={displayAvatar} 
            icon={!displayAvatar && <UserOutlined />} 
            className={`border border-teal-500/30 bg-slate-800/80 flex items-center justify-center text-teal-400 ${loading ? 'opacity-50 animate-pulse' : ''}`}
            size={36}
          />
        </div>
      </div>
    </Header>
  );
};

export default AppNavbar;