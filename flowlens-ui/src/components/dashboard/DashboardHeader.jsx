import React, { useState, useCallback } from 'react';
import { Typography, Input, Button, message, Space } from 'antd';
import { LinkOutlined, RocketOutlined } from '@ant-design/icons';
import { useTranslation } from '../../i18n/LanguageProvider';

const { Title, Text } = Typography;

const DashboardHeader = ({ totalRepos = null, loading = false, onAnalyzeCustomRepo }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const { t } = useTranslation();

  const handleAnalyzeSubmit = useCallback(() => {
    const trimmedUrl = repoUrl.trim();
    if (!trimmedUrl) {
      message.warning(t('dashboard.emptyUrl'));
      return;
    }

    const regex = /^(?:https?:\/\/(?:www\.)?github\.com\/)?([a-zA-Z0-9-]+)\/([a-zA-Z0-9_.-]+?)(?:\.git)?\/?$/i;
    const match = trimmedUrl.match(regex);

    if (match) {
      const owner = match[1];
      const repoName = match[2];
      
      if (onAnalyzeCustomRepo) {
        onAnalyzeCustomRepo(owner, repoName);
      }
      setRepoUrl(''); 
    } else {
      message.error(t('dashboard.invalidFormat'));
    }
  }, [repoUrl, onAnalyzeCustomRepo, t]);

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-800/80 font-sans">
      
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <Title level={2} className="!text-slate-100 !m-0 !font-bold tracking-tight">
            {t('dashboard.title')}
          </Title>
          {!loading && totalRepos !== null && (
            <span className="bg-teal-500/10 text-teal-400 border border-teal-500/20 px-2.5 py-0.5 rounded-full text-xs font-semibold">
              {totalRepos} {t('dashboard.repo')}
            </span>
          )}
        </div>
        <Text className="text-slate-400 mt-1 block">
          {t('dashboard.subtitle')}
        </Text>
      </div>

      <div className="w-full md:w-auto">
        <Space.Compact className="w-full md:w-[420px] shadow-sm">
          <Input
            disabled={loading}
            placeholder={t('dashboard.githubPlaceholder')}
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            onPressEnter={handleAnalyzeSubmit}
            prefix={<LinkOutlined className="text-slate-500 mr-2" />}
            className="bg-[#0b1120] border-slate-700/80 hover:border-teal-500/50 focus:border-teal-500 text-slate-200 placeholder:text-slate-500 h-11"
          />
          <Button
            type="primary"
            disabled={loading || !repoUrl.trim()}
            loading={loading}
            icon={<RocketOutlined />}
            onClick={handleAnalyzeSubmit}
            className="bg-teal-600 hover:bg-teal-500 border-teal-600 hover:border-teal-500 h-11 px-6 font-medium shadow-none rounded-r-lg"
          >
            {t('dashboard.analyzeBtn')}
          </Button>
        </Space.Compact>
      </div>

    </div>
  );
};

export default DashboardHeader;