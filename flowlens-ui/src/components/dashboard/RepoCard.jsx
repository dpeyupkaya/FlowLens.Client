import React from 'react';
import { Card, Typography, Tag } from 'antd';
import { LockOutlined, RocketOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

const RepoCard = ({ repo, onAnalyze, isAnalyzing }) => {
  // 🛡️ DESTEK MANTIĞINI ESNETTİK: 
  // Ya C# olacak, ya da dil bilgisi hiç olmayacak (null/undefined).
  const isCSharp = repo.language?.toLowerCase() === 'c#';
  const isUnknown = !repo.language;
  const isSupported = isCSharp || isUnknown;
  
  const getLanguageColor = (lang) => {
    switch (lang?.toLowerCase()) {
      case 'c#': return 'cyan';
      case 'javascript': return 'gold';
      case 'typescript': return 'blue';
      default: return 'default';
    }
  };

  const handleCardClick = () => {
    if (!isSupported) return;
    onAnalyze(repo.html_url || repo.htmlUrl);
  };

  return (
    <div className={`group relative h-full transition-all duration-500 ${!isSupported ? 'grayscale-[0.8] opacity-60' : ''}`}>
      
      {/* Desteklenen veya denemeye değer (Unknown) projeler için parlama efekti */}
      {isSupported && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500 pointer-events-none"></div>
      )}

      <Card 
        hoverable={isSupported}
        onClick={handleCardClick}
        className={`relative z-10 h-full bg-[#0f172a]/80 backdrop-blur-md border-slate-800/50 transition-all duration-500 rounded-2xl overflow-hidden 
          ${!isSupported ? 'cursor-not-allowed border-red-900/20' : 'hover:border-teal-500/50 cursor-pointer'} 
          ${isAnalyzing ? 'cursor-wait' : ''}`}
        bodyStyle={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        
        {!isSupported && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#020617]/40 backdrop-blur-[1px]">
            <Tag color="volcano" className="m-0 font-mono text-[9px] tracking-[0.2em] border-red-500/30 bg-red-500/10 flex items-center gap-1">
              <LockOutlined className="text-[10px]" /> ENGINE_UNSUPPORTED
            </Tag>
          </div>
        )}

        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col truncate pr-4">
            <Text className={`text-lg font-bold transition-colors truncate ${isSupported ? 'text-slate-100 group-hover:text-teal-400' : 'text-slate-500'}`}>
              {repo.name}
            </Text>
            {isUnknown && (
              <span className="text-[9px] text-amber-500/60 font-mono flex items-center gap-1">
                <QuestionCircleOutlined className="text-[8px]" /> EXPERIMENTAL_ACCESS
              </span>
            )}
          </div>
          
          <Tag color={getLanguageColor(repo.language)} className="m-0 font-mono text-[10px] uppercase">
            {repo.language || 'Unknown'}
          </Tag>
        </div>
        
        <Text className="text-xs text-slate-500 line-clamp-2 mb-8 font-sans leading-relaxed">
          {repo.description || "No description provided for this repository."}
        </Text>

        <div className={`mt-auto flex justify-between items-center border-t pt-4 ${isSupported ? 'border-slate-800/50' : 'border-slate-900'}`}>
          <span className={`text-[10px] font-mono uppercase tracking-tighter italic ${isSupported ? 'text-slate-600' : 'text-slate-800'}`}>
            {isCSharp ? 'analysis_ready' : isUnknown ? 'tentative_access' : 'incompatible'}
          </span>
          
          <div className="flex items-center gap-1">
            {isSupported ? (
              <span className="text-teal-500 text-xs font-mono font-bold group-hover:translate-x-1 transition-transform tracking-widest">
                RUN_SCAN <RocketOutlined className="ml-1 text-[10px]" />
              </span>
            ) : (
              <span className="text-slate-700 text-xs font-mono tracking-widest">
                OFFLINE
              </span>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RepoCard;