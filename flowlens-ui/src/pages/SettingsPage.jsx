import React, { useEffect, useState } from 'react';
import { Tabs, message, Typography } from 'antd';
import { UserOutlined, SettingOutlined, EyeOutlined, DatabaseOutlined, ToolOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

import { userService } from '../services/userService';
import { useFlowStore } from '../store/useFlowStore'; 
import { useTranslation } from '../i18n/LanguageProvider';

import AccountSettings from '../components/settings/AccountSettings';
import AnalysisPreferences from '../components/settings/AnalysisPreferences';
import GraphAppearanceSettings from '../components/settings/GraphAppearanceSettings';
import DataManagementSettings from '../components/settings/DataManagementSettings';

const { Title, Text } = Typography;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const SettingsPage = () => {
  const [profileData, setProfileData] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); 
  const { t } = useTranslation();

  const setGlobalSettings = useFlowStore(state => state.setSettings);
  const setBlacklistedFolders = useFlowStore(state => state.setBlacklistedFolders);
  const setMaxAnalysisDepth = useFlowStore(state => state.setMaxAnalysisDepth);

  useEffect(() => {
    userService.getUserMe()
      .then(data => {
        setProfileData(data);
        
        const fetchedSettings = data.settings || {
          analysis: { excludedFolders: [], maxAnalysisDepth: 3, showExternalLibs: false },
          graphics: { nodeDetailLevel: 'Detailed', highPerformanceMode: false, showMinimap: true },
          data: { repoVisibility: 'All' }
        };
        
        setSettings(fetchedSettings);
        setGlobalSettings(fetchedSettings); 
        
        if (fetchedSettings.analysis) {
            setBlacklistedFolders(fetchedSettings.analysis.excludedFolders || ["obj", "bin", ".git", "node_modules", "dist", "build", ".next", "out", "coverage"]);
            setMaxAnalysisDepth(fetchedSettings.analysis.maxAnalysisDepth || 3);
        }
        
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        message.error(t('settings.userError'));
        setLoading(false);
      });
  }, [setGlobalSettings, setBlacklistedFolders, setMaxAnalysisDepth, t]);

  const handleSaveSettings = async (updatedSectionData, sectionName) => {
    setSaving(true);
    try {
      const newSettings = {
        ...settings,
        [sectionName]: { ...settings[sectionName], ...updatedSectionData }
      };

      await userService.updateUserSettings(newSettings);
      
      setSettings(newSettings); 
      setGlobalSettings(newSettings); 
      
      if (sectionName === 'analysis') {
          setBlacklistedFolders(updatedSectionData.excludedFolders || ["obj", "bin", ".git", "node_modules", "dist", "build", ".next", "out", "coverage"]);
          setMaxAnalysisDepth(updatedSectionData.maxAnalysisDepth || 3);
      }
      
      message.success(t('settings.settingsUpdated'));
    } catch (error) {
      console.error(error);
      message.error(t('settings.settingsError'));
    } finally {
      setSaving(false);
    }
  };

  const items = [
    {
      key: 'account',
      label: <span className="flex items-center gap-3 px-2 py-1.5 font-medium"><UserOutlined className="text-teal-500 text-lg" /> {t('settings.myAccount')}</span>,
      children: <AccountSettings userData={profileData} loading={loading} />,
    },
    {
      key: 'analysis',
      label: <span className="flex items-center gap-3 px-2 py-1.5 font-medium"><SettingOutlined className="text-teal-500 text-lg" /> {t('settings.analysisPreferences')}</span>,
      children: <AnalysisPreferences 
                  settings={settings?.analysis} 
                  onSave={(data) => handleSaveSettings(data, 'analysis')} 
                  saving={saving} 
                />,
    },
    {
      key: 'appearance',
      label: <span className="flex items-center gap-3 px-2 py-1.5 font-medium"><EyeOutlined className="text-teal-500 text-lg" /> {t('settings.graphAppearance')}</span>,
      children: <GraphAppearanceSettings 
                  settings={settings?.graphics} 
                  onSave={(data) => handleSaveSettings(data, 'graphics')} 
                  saving={saving} 
                />,
    },
    {
      key: 'data',
      label: <span className="flex items-center gap-3 px-2 py-1.5 font-medium"><DatabaseOutlined className="text-teal-500 text-lg" /> {t('settings.dataManagement')}</span>,
      children: <DataManagementSettings 
                  settings={settings?.data} 
                  onSave={(data) => handleSaveSettings(data, 'data')} 
                  saving={saving} 
                />,
    },
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="p-4 md:p-8 w-full max-w-6xl mx-auto"
    >
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/5">
         <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-800/40 border border-white/10 backdrop-blur-md shadow-lg">
           <ToolOutlined className="text-2xl text-teal-400" />
         </div>
         <div className="flex flex-col">
            <Title level={2} style={{ color: '#f8fafc', margin: 0, fontWeight: '700', letterSpacing: '-0.02em' }}>
              {t('sidebar.settings')}
            </Title>
            <span className="text-slate-400 text-sm font-medium mt-0.5">
              {t('settings.pageDesc')}
            </span>
         </div>
      </div>

      <div className="bg-[#0b1120]/80 p-4 md:p-8 rounded-2xl border border-slate-800/60 shadow-2xl backdrop-blur-sm">
        <Tabs
          defaultActiveKey="account"
          tabPosition="left"
          items={items}
          className="custom-dark-tabs"
          size="large"
          tabBarStyle={{ paddingRight: '20px' }}
        />
      </div>
    </motion.div>
  );
};

export default SettingsPage;