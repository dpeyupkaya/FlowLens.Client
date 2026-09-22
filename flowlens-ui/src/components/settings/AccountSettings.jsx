import React from 'react';
import { Card, Avatar, Tag, Typography, Skeleton } from 'antd';
import { GithubOutlined, MailOutlined, LinkOutlined, CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useTranslation } from '../../i18n/LanguageProvider';

const { Text } = Typography;

const AccountSettings = ({ userData, loading }) => {
  const { t } = useTranslation();

  if (loading) return <Skeleton active paragraph={{ rows: 4 }} />;

  const formatLastLogin = (dateString) => {
    if (!dateString) return t('common.loading') || 'Sisteme ilk girişiniz!';
    return new Intl.DateTimeFormat('tr-TR', {
      dateStyle: 'long',
      timeStyle: 'short'
    }).format(new Date(dateString));
  };

  return (
    <div className="max-w-2xl pl-0 md:pl-4 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">{t('settings.accountInfo')}</h2>
        <p className="text-gray-400 text-sm">Profil bilgileriniz GitHub üzerinden senkronize edilmektedir.</p>
      </div>

      <Card className="bg-[#0f172a]/80 border border-slate-700/60 mb-6 rounded-2xl shadow-lg hover:border-teal-500/30 transition-colors">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Avatar 
            size={90} 
            src={userData?.avatarUrl} 
            className="bg-slate-800 border-2 border-teal-500/50 shadow-[0_0_15px_rgba(20,184,166,0.15)]"
          />
          <div className="flex-1 w-full">
            <div className="flex justify-between items-start w-full">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{userData?.username || t('settings.username')}</h3>
                <Text className="text-teal-400 font-medium block mb-3">@{userData?.userName?.toLowerCase() || 'github_user'}</Text>
              </div>
              <Tag color="cyan" className="border-teal-500/30 bg-teal-500/10 text-teal-400 rounded-full px-3 py-1">
                <GithubOutlined className="mr-1" /> Bağlı
              </Tag>
            </div>
            
            <div className="space-y-2 mt-2 text-slate-300">
              <div className="flex items-center gap-2">
                <MailOutlined className="text-slate-500" />
                <span>{userData?.email || 'E-posta belirtilmemiş'}</span>
              </div>
              <div className="flex items-center gap-2">
                <LinkOutlined className="text-slate-500" />
                <a href={`https://github.com/${userData?.userName}`} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-teal-400 transition-colors">
                  github.com/{userData?.userName || 'profile'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="bg-teal-500/5 border border-teal-500/20 p-4 rounded-xl flex items-center gap-4 mb-6">
        <div className="bg-teal-500/10 p-2.5 rounded-lg text-teal-400 text-xl">
           <CalendarOutlined />
        </div>
        <div>
          <Text className="text-slate-400 text-xs tracking-widest font-mono uppercase block mb-0.5">SON AKTİVİTE</Text>
          <Text className="text-slate-200 font-medium">
             {formatLastLogin(userData?.lastLoginAt)}
          </Text>
        </div>
        <div className="ml-auto bg-slate-800/50 p-2.5 rounded-lg text-slate-400">
           <ClockCircleOutlined />
        </div>
      </div>

      <div className="mt-6 p-4 bg-slate-800/40 border border-slate-700/50 rounded-xl text-sm text-slate-300 flex gap-3">
        <span className="text-teal-400">ℹ️</span> 
        <span>Profil verileriniz doğrudan GitHub hesabınızdan alınır. Güncelleme için GitHub ayarlarınızı kullanın.</span>
      </div>
    </div>
  );
};

export default AccountSettings;