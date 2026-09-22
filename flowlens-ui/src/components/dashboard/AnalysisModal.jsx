import React, { useEffect, useRef, useState } from 'react';
import { Modal, Typography, Button } from 'antd';
import { LoadingOutlined, RocketOutlined, LockOutlined, RightOutlined, CheckCircleFilled } from '@ant-design/icons';
import { githubService } from '../../services/githubService';

const { Text, Title } = Typography;

const langColors = { 
  'TypeScript': '#3178c6', 
  'JavaScript': '#f1e05a', 
  'C#': '#178600', 
  'Python': '#3572A5', 
  'Go': '#00ADD8', 
  'CSS': '#563d7c', 
  'HTML': '#e34c26',
  'Vue': '#41b883',
  'Shell': '#89e051'
};
const getLangColor = (l) => langColors[l] || '#8b949e';

const AnalysisModal = ({ 
  visible, status, progress, logs, 
  repo,
  onCancel, onConfirm, onShowResults, 
  dailyCount = 0, maxLimit = 5 
}) => {
  const isAnalyzing = status === 'analyzing';
  const isFinished = progress === 100;
  const scrollRef = useRef(null);

  const [languagesData, setLanguagesData] = useState(null);
  const [selectedLangs, setSelectedLangs] = useState([]);
  const [loadingLangs, setLoadingLangs] = useState(false);

  const remainingQuota = Math.max(0, maxLimit - dailyCount);
  const isQuotaExceeded = remainingQuota <= 0;
  const usagePercentage = (dailyCount / maxLimit) * 100;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    if (visible && repo && status === 'idle') {
      setLoadingLangs(true);
      let targetUrl = '';
      if (typeof repo === 'string') { targetUrl = repo; }
      else if (repo.html_url) { targetUrl = repo.html_url; }
      else if (repo.fullName) { targetUrl = `https://github.com/${repo.fullName}`; }
      else if (repo.owner && repo.name) { targetUrl = `https://github.com/${repo.owner.login}/${repo.name}`; }

      githubService.getRepoLanguages(targetUrl).then(data => {
        setLanguagesData(data);
        const supported = ['CSharp', 'JavaScript', 'TypeScript', 'Python', 'Go', 'C#', 'HTML', 'CSS'];
        const preselected = Object.keys(data).filter(l => supported.includes(l) || supported.includes(l.replace('#', 'Sharp')));
        setSelectedLangs(preselected);
      }).catch(err => {
        console.error("Failed to fetch languages", err);
      }).finally(() => {
        setLoadingLangs(false);
      });
    } else if (!visible) {
      setLanguagesData(null);
      setSelectedLangs([]);
    }
  }, [visible, repo, status]);

  const toggleLang = (lang) => {
    if (selectedLangs.includes(lang)) {
      setSelectedLangs(selectedLangs.filter(l => l !== lang));
    } else {
      setSelectedLangs([...selectedLangs, lang]);
    }
  };

  const handleConfirm = () => {
    const formattedLangs = selectedLangs.map(l => l.replace('C#', 'CSharp'));
    onConfirm(formattedLangs);
  };

  const totalBytes = languagesData ? Object.values(languagesData).reduce((a,b)=>a+b, 0) : 0;

  return (
    <Modal
      open={visible}
      onCancel={isAnalyzing ? null : onCancel}
      footer={null}
      centered
      closable={!isAnalyzing}
      width={480}
      styles={{ 
        body: { padding: '28px 24px', backgroundColor: '#0f172a', borderRadius: '16px' }, 
        content: { padding: 0, backgroundColor: 'transparent', borderRadius: '16px', border: '1px solid #1e293b' }
      }}
    >
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none !important; }
        .hide-scrollbar { -ms-overflow-style: none !important; scrollbar-width: none !important; }
        .ant-modal-close { color: #64748b; top: 16px; right: 16px; }
        .ant-modal-close:hover { color: #f8fafc; background: transparent; }
      `}</style>

      {!isAnalyzing ? (
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className={`mt-1 flex-shrink-0
              ${isQuotaExceeded ? 'text-red-400' : 'text-teal-400'}`}
            >
              {isQuotaExceeded ? <LockOutlined className="text-2xl opacity-80" /> : <RocketOutlined className="text-2xl opacity-80" />}
            </div>
            <div>
              <Title level={4} className="!text-slate-100 !mb-1 !mt-0 !font-medium tracking-tight">
                {isQuotaExceeded ? 'Limit Doldu' : 'Analizi Başlat'}
              </Title>
              <Text className="text-slate-400 text-sm leading-relaxed block">
                {isQuotaExceeded 
                  ? 'Günlük analiz limitinize ulaştınız. Yarın tekrar deneyebilirsiniz.' 
                  : 'Bu deponun mimari haritasını çıkarmak için analiz motorunu başlatın.'}
              </Text>
            </div>
          </div>

          {/* Body */}
          {loadingLangs ? (
            <div className="flex justify-center items-center h-24 my-2">
              <LoadingOutlined className="text-teal-500/50 text-3xl" />
            </div>
          ) : languagesData && Object.keys(languagesData).length > 0 ? (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <Text className="text-slate-500 text-[11px] uppercase tracking-wider font-semibold">Tespit Edilen Diller</Text>
              </div>
              
              {/* Ultra thin progress bar */}
              <div className="w-full h-1 rounded-full overflow-hidden flex mb-5 bg-slate-800/50 shadow-inner">
                {Object.entries(languagesData).map(([lang, bytes]) => (
                  <div 
                    key={lang} 
                    style={{ width: `${(bytes/totalBytes)*100}%`, backgroundColor: getLangColor(lang) }} 
                    title={`${lang} (${((bytes/totalBytes)*100).toFixed(1)}%)`} 
                    className="h-full transition-all duration-500"
                  />
                ))}
              </div>
              
              {/* Minimal Pill Checkboxes */}
              <div className="flex flex-wrap gap-2.5">
                {Object.keys(languagesData).map(lang => {
                  const isSupported = ['CSharp', 'JavaScript', 'TypeScript', 'Python', 'Go', 'C#', 'HTML', 'CSS'].includes(lang);
                  const isSelected = selectedLangs.includes(lang);
                  return (
                    <button 
                      key={lang}
                      onClick={() => isSupported && toggleLang(lang)}
                      disabled={!isSupported}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 transition-all duration-300 border focus:outline-none
                        ${isSelected 
                          ? 'bg-slate-800 border-teal-400 text-white shadow-[0_0_10px_rgba(45,212,191,0.2)]' 
                          : 'bg-transparent border-slate-700/30 text-slate-500 hover:border-slate-500 hover:text-slate-300'
                        }
                        ${!isSupported ? 'opacity-30 cursor-not-allowed grayscale' : 'cursor-pointer'}`}
                    >
                      {isSelected ? (
                        <CheckCircleFilled className="text-teal-400 text-[10px]" />
                      ) : (
                        <span className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: getLangColor(lang) }}></span>
                      )}
                      {lang}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {/* Footer Inline Quota & Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800/60 mt-auto">
            <div className="flex flex-col gap-1.5 w-1/3">
              <span className="text-slate-500 text-[9px] uppercase tracking-wider font-semibold">
                Günlük Kota
              </span>
              <div className="w-full bg-slate-800/60 rounded-full h-1 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${isQuotaExceeded ? 'bg-red-500/80' : 'bg-teal-500/80'}`} 
                  style={{ width: `${usagePercentage}%` }}
                ></div>
              </div>
              <span className={`text-[10px] font-mono ${isQuotaExceeded ? 'text-red-400/80' : 'text-slate-400'}`}>
                {remainingQuota} hak kaldı
              </span>
            </div>

            <div className="flex justify-end gap-3">
              <Button 
                onClick={onCancel} 
                className="h-9 px-5 bg-transparent border-none text-slate-400 hover:text-slate-200 shadow-none"
              >
                İptal
              </Button>
              <Button 
                onClick={handleConfirm} 
                type="primary" 
                disabled={isQuotaExceeded || (languagesData && selectedLangs.length === 0 && !loadingLangs)}
                className={`h-9 px-6 border-none rounded-lg font-medium transition-all duration-300
                  ${isQuotaExceeded || (languagesData && selectedLangs.length === 0 && !loadingLangs) 
                    ? 'bg-slate-800/50 text-slate-500 shadow-none' 
                    : 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white shadow-[0_0_15px_rgba(20,184,166,0.2)]'}
                `}
              >
                Analizi Başlat
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-5">
            {!isFinished ? (
              <LoadingOutlined className="text-teal-400 text-xl" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400"><RightOutlined className="text-xs" /></div>
            )}
            <Title level={5} className="!text-slate-100 !m-0 !font-semibold">
              {!isFinished ? 'Analiz Ediliyor...' : 'Analiz Tamamlandı'}
            </Title>
            <Text className="text-teal-500 font-mono text-sm font-bold ml-auto">{progress}%</Text>
          </div>

          <div 
            ref={scrollRef}
            className="bg-[#020617] border border-slate-800/80 rounded-xl p-4 h-64 overflow-y-auto font-mono text-xs shadow-inner hide-scrollbar mb-6"
          >
            {logs.map((log, index) => (
              <div key={index} className="mb-2.5 flex items-start gap-3 opacity-90 hover:opacity-100">
                <span className="text-slate-500 flex-shrink-0">[{new Date().toLocaleTimeString('tr-TR')}]</span>
                <span className={log.includes('[SUCCESS]') || log.includes('[BAŞARI]') ? 'text-teal-400' : log.includes('[HATA]') ? 'text-red-400' : 'text-slate-300'}>{log}</span>
              </div>
            ))}
          </div>

          {isFinished && (
            <Button 
              type="primary" 
              block 
              onClick={onShowResults}
              className="h-11 bg-teal-600 hover:bg-teal-500 border-none rounded-lg font-medium text-sm transition-colors shadow-none"
            >
              Sonuçları Görüntüle
            </Button>
          )}
        </div>
      )}
    </Modal>
  );
};

export default AnalysisModal;