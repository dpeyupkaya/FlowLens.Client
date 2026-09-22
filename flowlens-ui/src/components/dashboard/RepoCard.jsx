import React from 'react';
import { Card, Tag, Typography, Space } from 'antd';
import { 
  StarOutlined, 
  BranchesOutlined,
  CodeOutlined,
  RocketOutlined,
  WarningOutlined
} from '@ant-design/icons';

const { Text, Title } = Typography;

const RepoCard = ({ repo, onAnalyze, isAnalyzing }) => {
  const isCSharp = repo.language?.toLowerCase() === 'c#';
  const isPython = repo.language?.toLowerCase() === 'python';
  const isGo = repo.language?.toLowerCase() === 'go';
  const isUnknown = !repo.language;
  const isSupported = isCSharp || isPython || isGo || isUnknown;

  const handleCardClick = () => {
    if (!isSupported || isAnalyzing) return;
    onAnalyze(repo.html_url || repo.htmlUrl);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('tr-TR', { month: 'short', year: 'numeric' });
  };

  return (
    <Card
      hoverable={isSupported}
      onClick={handleCardClick}
      className={`rounded-xl border transition-all duration-300
        ${isSupported ? 'border-slate-700/50 hover:border-teal-500/50 cursor-pointer bg-slate-900/50 hover:bg-slate-800/80' : 'border-slate-800/30 opacity-50 cursor-not-allowed bg-slate-900/30'}
        ${isAnalyzing ? 'border-teal-500/50 bg-slate-800/80 shadow-[0_0_15px_rgba(20,184,166,0.1)]' : ''}`}
      styles={{ body: { padding: '20px' } }}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1 min-w-0 pr-4">
          <Title level={5} className="!mb-1 !text-slate-100 truncate !font-semibold" style={{ margin: 0 }}>
            {repo.name}
          </Title>
          <Text className="text-slate-400 text-sm line-clamp-2 min-h-[40px] mt-2">
            {repo.description || "Açıklama bulunmuyor."}
          </Text>
        </div>
        
        {/* Language Badge */}
        <div className="flex-shrink-0">
          <Tag className="m-0 border border-slate-700 bg-slate-800/50 text-slate-300 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            {isGo ? (
              <svg viewBox="0 0 118 43" width="14" height="10" fill="currentColor" className="text-cyan-400">
                <path d="M22.5 19.3c.1-4.7 3.3-8.8 8.6-8.8 3.5 0 6.1 1.7 7.7 4.5l-3.3 2c-1-1.7-2.6-2.5-4.5-2.5-2.9 0-4.6 2-4.6 4.8s1.7 4.8 4.7 4.8c1.8 0 3.3-.9 4.1-2.4h-4.4v-3.7h8.4v9h-3.4l-.4-2.1h-.1c-1.3 1.5-3.1 2.4-5.2 2.4-4.7.1-7.7-3.2-7.6-8m45.3-.2c0-5.1-3.6-9-8.7-9-5.2 0-8.8 3.9-8.8 9 0 5.1 3.6 9 8.8 9 5.2 0 8.7-3.9 8.7-9m-4.2 0c0 3.1-1.7 5.2-4.5 5.2-2.8 0-4.5-2.1-4.5-5.2s1.7-5.2 4.5-5.2 4.5 2.1 4.5 5.2" />
              </svg>
            ) : <CodeOutlined className="text-teal-400" />}
            <span className="font-medium text-[11px] uppercase tracking-wide">{repo.language || 'Tanımsız'}</span>
          </Tag>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-800/50">
        <Space size="large" className="text-slate-500 text-xs font-medium">
          {repo.stargazers_count !== undefined && (
            <span className="flex items-center gap-1.5"><StarOutlined className="text-amber-500/70" /> {repo.stargazers_count}</span>
          )}
          {repo.forks_count !== undefined && (
            <span className="flex items-center gap-1.5"><BranchesOutlined className="text-slate-400" /> {repo.forks_count}</span>
          )}
          {repo.updated_at && (
            <span className="text-slate-500 hidden sm:inline-block">Güncelleme: {formatDate(repo.updated_at)}</span>
          )}
        </Space>

        <div className="flex items-center">
          {!isSupported ? (
            <span className="text-red-400/80 text-[11px] uppercase tracking-wider font-semibold flex items-center gap-1">
              <WarningOutlined /> Desteklenmiyor
            </span>
          ) : isAnalyzing ? (
            <span className="text-teal-400 text-[11px] uppercase tracking-wider font-semibold animate-pulse flex items-center gap-1.5">
              <RocketOutlined /> Analiz Ediliyor...
            </span>
          ) : (
            <span className="text-teal-500 text-[11px] uppercase tracking-wider font-bold group-hover:text-teal-400 transition-colors flex items-center gap-1">
              Tarat &rarr;
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default RepoCard;