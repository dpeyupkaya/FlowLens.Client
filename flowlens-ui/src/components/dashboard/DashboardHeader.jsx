import React, { useState } from 'react';
import { Typography, Statistic, Skeleton, Input, Button, message } from 'antd';
import { FolderOpenOutlined, CodeOutlined, LinkOutlined, RocketOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const DashboardHeader = ({ totalRepos = null, loading = false, onAnalyzeCustomRepo }) => {
  const [repoUrl, setRepoUrl] = useState('');

  const handleAnalyzeSubmit = () => {
    if (!repoUrl.trim()) return;

    const regex = /^(?:https?:\/\/github\.com\/)?([^\/]+)\/([^\/]+)\/?$/i;
    const match = repoUrl.match(regex);

    if (match) {
      const owner = match[1];
      const repoName = match[2].replace('.git', '');
      
      if (onAnalyzeCustomRepo) {
        onAnalyzeCustomRepo(owner, repoName);
      }
      setRepoUrl('');
    } else {
      message.error("Lütfen geçerli bir GitHub repo linki girin.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-slate-800/60 pb-8 animate-fade-in">
      <div className="flex items-center gap-5 w-full md:w-auto justify-between md:justify-start">
        <div className="flex items-center gap-5">
          <div className="relative group p-4 rounded-2xl bg-[#0f172a] border border-slate-800/80 backdrop-blur-sm overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
            <FolderOpenOutlined className="relative z-10 text-4xl text-teal-400 drop-shadow-[0_0_8px_rgba(20,184,166,0.6)]" />
          </div>

          <div className="flex flex-col gap-0.5">
            <Title level={2} style={{ color: '#fff', margin: '2px 0 0 0', fontWeight: '800', letterSpacing: '-0.5px' }}>
              Aktif Depolar
            </Title>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
        <div className="flex w-full md:w-auto gap-3">
          <Input
            placeholder="GitHub linki (örn: facebook/react)"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            onPressEnter={handleAnalyzeSubmit}
            prefix={<LinkOutlined className="text-slate-500" />}
            className="w-full md:w-72 bg-[#0f172a] border-slate-700 hover:border-teal-500 focus:border-teal-500 text-white placeholder:text-slate-600 custom-dark-input"
            size="large"
          />
          <Button
            type="primary"
            size="large"
            icon={<RocketOutlined />}
            onClick={handleAnalyzeSubmit}
            className="bg-teal-600 hover:bg-teal-500 border-none shadow-[0_0_15px_rgba(20,184,166,0.4)]"
          >
            Analiz Et
          </Button>
        </div>

        <div className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-5 px-7 min-w-56 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
          {loading || totalRepos === null ? (
            <Skeleton active paragraph={{ rows: 1, width: '100%' }} title={{ width: '40%' }} className="custom-skeleton-dark" />
          ) : (
            <Statistic
              title={
                <div className="flex items-center gap-2 text-slate-500 font-medium text-sm mb-1">
                  <CodeOutlined className="text-teal-600" />
                  <span className="uppercase font-sans tracking-wider text-xs">Bağlı Projeler</span>
                </div>
              }
              value={totalRepos}
              valueStyle={{ color: '#fff', fontWeight: '800', fontSize: '36px', letterSpacing: '-1px' }}
              suffix={<span className="text-slate-600 text-lg font-normal ml-2">Repo</span>}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;