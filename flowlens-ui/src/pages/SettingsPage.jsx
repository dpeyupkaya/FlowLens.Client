import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { UserOutlined, SettingOutlined, EyeOutlined, DatabaseOutlined } from '@ant-design/icons';

import { userService } from '../services/userService';
import AccountSettings from '../components/settings/AccountSettings';
import AnalysisPreferences from '../components/settings/AnalysisPreferences';
import GraphAppearanceSettings from '../components/settings/GraphAppearanceSettings';
import DataManagementSettings from '../components/settings/DataManagementSettings';

const SettingsPage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService.getUserMe()
      .then(data => {
        setProfileData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const items = [
    {
      key: 'account',
      label: <span className="flex items-center gap-2 px-2 py-1"><UserOutlined /> Hesabım</span>,
      children: <AccountSettings userData={profileData} loading={loading} />,
    },
    {
      key: 'analysis',
      label: <span className="flex items-center gap-2 px-2 py-1"><SettingOutlined /> Analiz Tercihleri</span>,
      children: <AnalysisPreferences />,
    },
    {
      key: 'appearance',
      label: <span className="flex items-center gap-2 px-2 py-1"><EyeOutlined /> Grafik & Görünüm</span>,
      children: <GraphAppearanceSettings />,
    },
    {
      key: 'data',
      label: <span className="flex items-center gap-2 px-2 py-1"><DatabaseOutlined /> Veri Yönetimi</span>,
      children: <DataManagementSettings />,
    },
  ];

  return (
    <div className="p-8 w-full max-w-6xl mx-auto animate-fade-in">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Ayarlar</h1>
        <p className="text-gray-400">FlowLens analiz motoru ve çalışma alanı tercihlerinizi yönetin.</p>
      </div>

      <div className="bg-[#0f172a]/80 p-6 rounded-xl border border-slate-800 shadow-2xl">
        <Tabs
          defaultActiveKey="account"
          tabPosition="left"
          items={items}
          className="custom-dark-tabs"
        />
      </div>
    </div>
  );
};

export default SettingsPage;