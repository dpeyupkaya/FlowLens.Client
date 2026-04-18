import React from 'react';
import { Card, Avatar, Tag, Typography, Skeleton } from 'antd';
import { GithubOutlined, MailOutlined, LinkOutlined, CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

const AccountSettings = ({ userData, loading }) => {
  if (loading) return <Skeleton active paragraph={{ rows: 4 }} />;

  const formatLastLogin = (dateString) => {
    if (!dateString) return 'Sisteme ilk girişiniz!';
    return new Intl.DateTimeFormat('tr-TR', {
      dateStyle: 'long',
      timeStyle: 'short'
    }).format(new Date(dateString));
  };

  return (
    <div className="max-w-2xl pl-4 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Hesabım</h2>
        <p className="text-gray-400 text-sm">Profil bilgileriniz GitHub üzerinden senkronize edilmektedir.</p>
      </div>

      <Card className="bg-slate-800/40 border-slate-700 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Avatar 
            size={100} 
            src={userData?.avatarUrl} 
            className="bg-slate-700 border-2 border-[#14b8a6]"
          />
          <div className="flex-1 w-full">
            <div className="flex justify-between items-start w-full">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{userData?.username }</h3>
                <Text className="text-[#14b8a6] font-medium block mb-3">@{userData?.userName?.toLowerCase()}</Text>
              </div>
              <Tag color="cyan" className="border-[#14b8a6]/30 bg-[#14b8a6]/10 text-[#14b8a6]">
                <GithubOutlined className="mr-1" /> Bağlı
              </Tag>
            </div>
            
            <div className="space-y-2 mt-2 text-gray-300">
              <div className="flex items-center gap-2">
                <MailOutlined className="text-gray-500" />
                <span>{userData?.email || 'E-posta belirtilmemiş'}</span>
              </div>
              <div className="flex items-center gap-2">
                <LinkOutlined className="text-gray-500" />
                <a href={`https://github.com/${userData?.username}`} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#14b8a6]">
                  github.com/{userData?.userName}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <div style={{ 
        background: 'rgba(20, 184, 166, 0.05)', 
        border: '1px solid rgba(20, 184, 166, 0.2)',
        padding: '16px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <CalendarOutlined style={{ color: '#14b8a6', fontSize: '20px' }} />
        <div>
          <Text style={{ color: '#64748b', fontSize: '12px', display: 'block' }}>SON AKTİVİTE</Text>
          <Text style={{ color: '#e2e8f0', fontWeight: '500' }}>
             {formatLastLogin(userData?.lastLoginAt)}
          </Text>
        </div>
        <div style={{ marginLeft: 'auto' }}>
           <ClockCircleOutlined style={{ color: '#475569' }} />
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-900/20 border border-blue-900/50 rounded-lg text-sm text-blue-200">
        ℹ️ Profil verileriniz doğrudan GitHub hesabınızdan alınır. Güncelleme için GitHub ayarlarınızı kullanın.
      </div>
    </div>
  );
};

export default AccountSettings;