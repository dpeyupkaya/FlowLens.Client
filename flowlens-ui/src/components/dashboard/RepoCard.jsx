import React, { useState, useRef } from 'react';
import { Card, Typography, Tag } from 'antd';
import { LockOutlined,  QuestionCircleOutlined, CodeOutlined } from '@ant-design/icons';

const { Text } = Typography;

const RepoCard = ({ repo, onAnalyze, isAnalyzing }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const isCSharp = repo.language?.toLowerCase() === 'c#';
  const isUnknown = !repo.language;
  const isSupported = isCSharp || isUnknown;

  const getLanguageColor = (lang) => {
    switch (lang?.toLowerCase()) {
      case 'c#': return 'cyan';
      default: return 'default';
    }
  };

  const handleCardClick = () => {
    if (!isSupported || isAnalyzing) return;
    onAnalyze(repo.html_url || repo.htmlUrl);
  };

  const handleMouseMove = (e) => {
    if (!divRef.current || !isSupported) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const spotlightBackgroundStyle = {
    background: (isHovered && isSupported)
      ? `radial-gradient(350px circle at ${position.x}px ${position.y}px, rgba(20, 184, 166, 0.08), transparent 80%)`
      : '',
  };

  return (
    <div
      ref={divRef}
      className={`h-full ${!isSupported ? 'grayscale-[0.9] opacity-70' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        hoverable={isSupported}
        onClick={handleCardClick}
        className={`relative h-full transition-all duration-300 rounded-3xl overflow-hidden border border-slate-800/50 
          ${!isSupported ? 'cursor-not-allowed' : 'hover:border-teal-500/40 cursor-pointer bg-[#0B1120]'} 
          ${isAnalyzing ? 'cursor-wait' : ''}`}
        bodyStyle={{ padding: '32px', display: 'flex', flexDirection: 'column', height: '100%' }}
      >

        <div className="absolute inset-0 z-0 bg-[#0B1120]"></div>
        <div style={spotlightBackgroundStyle} className="absolute inset-0 z-10 transition-opacity duration-300"></div>

        {!isSupported && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#020617]/50 backdrop-blur-[1.5px]">
            <Tag color="volcano" className="m-0 font-mono text-[9px] tracking-[0.2em] border-red-500/20 bg-red-500/10 flex items-center gap-1.5 px-2 py-1">
              <LockOutlined className="text-[10px]" /> DESTEKLENMEYEN_ALTYAPI
            </Tag>
          </div>
        )}

        <div className="relative z-20 flex flex-col h-full flex-grow">
          <div className="flex justify-between items-start mb-6 w-full">
            <div className="flex items-center gap-3 pr-4 overflow-hidden">
             
              <Text className={`text-xl font-extrabold transition-colors truncate tracking-tight ${isSupported ? 'text-slate-100' : 'text-slate-600'}`}>
                {repo.name}
              </Text>
            </div>

            <Tag color={getLanguageColor(repo.language)} className="m-0 font-mono text-[10px] uppercase border border-cyan-900/40 bg-cyan-950/30 text-cyan-400 shadow-sm">
              {repo.language || 'Tanımsız'}
            </Tag>
          </div>

          <Text className="text-sm text-slate-400 flex-grow mb-10 font-sans leading-relaxed line-clamp-3">
            {repo.description || "Bu repo için herhangi bir açıklama tanımlanmamış."}
          </Text>

          <div className="mt-auto flex justify-between items-center border-t border-slate-800/50 pt-5 w-full">

            <div className="flex flex-col gap-1.5">
              <span className={`text-[10px] font-mono uppercase tracking-[0.15em] ${isSupported ? 'text-slate-500' : 'text-slate-700'}`}>
                {isCSharp ? 'ANALİZE_HAZIR' : isUnknown ? 'KISITLI_ERİŞİM' : 'UYUMSUZ_SÜRÜM'}
              </span>
              {isUnknown && (
                <span className="text-[9px] text-amber-500/60 font-mono flex items-center gap-1.5 tracking-wider">
                  <QuestionCircleOutlined className="text-[8px]" /> DENEYSEL_TARAMA
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              {isSupported ? (
                <span className={`text-teal-400 text-xs font-mono font-bold tracking-[0.15em] transition-all duration-300 flex items-center ${isHovered ? 'translate-x-1 text-teal-300' : ''}`}>
                  TARAMAYI_BAŞLAT 
                </span>
              ) : (
                <span className="text-slate-700 text-xs font-mono tracking-[0.15em] font-semibold">
                  DEVRE_DIŞI
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RepoCard;