import React, { useState, useCallback } from 'react';
import { Typography, Statistic, Skeleton, Input, Button, message } from 'antd';
import { FolderOpenOutlined, CodeOutlined, LinkOutlined, RocketOutlined } from '@ant-design/icons';

const { Title } = Typography;

const DashboardHeader = ({ totalRepos = null, loading = false, onAnalyzeCustomRepo }) => {
  const [repoUrl, setRepoUrl] = useState('');

  const handleAnalyzeSubmit = useCallback(() => {
    const trimmedUrl = repoUrl.trim();
    if (!trimmedUrl) {
      message.warning("Lütfen bir GitHub repo linki veya adı girin.");
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
      message.error("Geçersiz format. Örnek: 'facebook/react' veya GitHub URL'si girin.");
    }
  }, [repoUrl, onAnalyzeCustomRepo]);

  return (
    <div className="flex flex-col xl:flex-row items-center justify-between gap-6 mb-10 pb-8 border-b border-white/5 transition-all duration-300">
      
      <div className="flex items-center gap-5 w-full xl:w-auto">
        <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-800/40 border border-white/10 backdrop-blur-md shadow-lg">
          <FolderOpenOutlined className="text-2xl text-teal-400" />
        </div>
        <div className="flex flex-col">
          <Title level={2} style={{ color: '#f8fafc', margin: 0, fontWeight: '700', letterSpacing: '-0.02em' }}>
            Aktif Depolar
          </Title>
          <span className="text-slate-400 text-sm font-medium mt-0.5">
            Bağlı olan projelerinizi yönetin
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-5 w-full xl:w-auto">
        
        <div className="flex w-full md:w-auto gap-3 items-center">
          <div className="relative group w-full md:w-[320px]">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500/30 to-cyan-500/30 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
            
            <Input
              disabled={loading}
              placeholder="Github URL"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              onPressEnter={handleAnalyzeSubmit}
              prefix={<LinkOutlined className="text-slate-500 mr-1" />}
              className="relative w-full bg-slate-900/80 border-slate-700/60 hover:border-teal-500/50 focus:border-teal-400 text-slate-200 placeholder:text-slate-500 rounded-xl px-4 py-2.5 backdrop-blur-sm transition-all shadow-inner"
              size="large"
            />
          </div>

          <Button
            type="primary"
            size="large"
            disabled={loading || !repoUrl.trim()}
            loading={loading}
            icon={<RocketOutlined />}
            onClick={handleAnalyzeSubmit}
            className={`
              h-[46px] px-6 rounded-xl border-0 font-medium tracking-wide transition-all duration-300
              ${repoUrl.trim() 
                ? 'bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-500 hover:to-emerald-400 shadow-[0_4px_15px_rgba(20,184,166,0.25)] hover:shadow-[0_6px_20px_rgba(20,184,166,0.4)] active:scale-95 text-white' 
                : 'bg-slate-800 text-slate-500'}
            `}
          >
            Analiz Et
          </Button>
        </div>

        <div className="flex items-center justify-center bg-slate-800/30 border border-white/5 rounded-2xl p-4 min-w-[200px] h-[72px] backdrop-blur-md">
          {loading || totalRepos === null ? (
            <Skeleton active paragraph={{ rows: 0 }} title={{ width: 120 }} className="m-0" />
          ) : (
            <Statistic
              title={
                <div className="flex items-center gap-2 text-slate-400 font-medium text-xs tracking-wider uppercase mb-1">
                  <CodeOutlined className="text-teal-500" />
                  <span>Bağlı Projeler</span>
                </div>
              }
              value={totalRepos}
              valueStyle={{ color: '#f8fafc', fontWeight: '700', fontSize: '28px', lineHeight: '1' }}
              suffix={<span className="text-slate-500 text-sm font-medium ml-1">Repo</span>}
              className="m-0"
            />
          )}
        </div>

      </div>
    </div>
  );
};

export default DashboardHeader;