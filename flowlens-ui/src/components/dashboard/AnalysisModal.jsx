import React, { useEffect, useRef } from 'react';
import { Modal, Typography, Button, Progress } from 'antd';
import { LoadingOutlined, RocketOutlined, LockOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const AnalysisModal = ({ 
  visible, status, progress, logs, 
  onCancel, onConfirm, onShowResults, 
  dailyCount = 0, maxLimit = 5 
}) => {
  const isAnalyzing = status === 'analyzing';
  const isFinished = progress === 100;
  const scrollRef = useRef(null);

  const remainingQuota = Math.max(0, maxLimit - dailyCount);
  const isQuotaExceeded = remainingQuota <= 0;
  const usagePercentage = (dailyCount / maxLimit) * 100;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <Modal
      open={visible}
      onCancel={isAnalyzing ? null : onCancel}
      footer={null}
      centered
      closable={!isAnalyzing}
      width={500}
      bodyStyle={{ backgroundColor: '#0f172a', padding: '32px', borderRadius: '16px' }}
    >
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .hide-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}</style>

      {!isAnalyzing ? (
        <div className="text-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border transition-colors duration-300
            ${isQuotaExceeded ? 'bg-red-500/10 border-red-500/30' : 'bg-teal-500/10 border-teal-500/20'}`}
          >
            {isQuotaExceeded 
              ? <LockOutlined className="text-4xl text-red-400" /> 
              : <RocketOutlined className="text-4xl text-teal-400" />
            }
          </div>
          <Title level={4} style={{ color: '#f8fafc', marginBottom: '8px' }}>
            {isQuotaExceeded ? 'Günlük Limit Doldu' : 'Analiz Başlatılsın mı?'}
          </Title>

          <div className="mt-6 mb-8 px-5 py-4 bg-[#020617] border border-slate-800 rounded-xl text-left">
            <div className="flex justify-between items-center mb-2">
              <Text className="text-slate-400 font-mono text-[11px] uppercase tracking-wider">Günlük Analiz Kotası</Text>
              <Text className={`font-mono text-sm font-bold ${isQuotaExceeded ? 'text-red-400' : 'text-teal-400'}`}>
                {remainingQuota} / {maxLimit}
              </Text>
            </div>
            
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${isQuotaExceeded ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]'}`}
                style={{ width: `${usagePercentage > 100 ? 100 : usagePercentage}%` }}
              />
            </div>
            
            {isQuotaExceeded ? (
              <Text className="text-red-400 text-[11px] block text-center mt-3 bg-red-500/10 py-1.5 rounded">
                Yarın tekrar deneyin veya kodlarınızı yerelde inceleyin.
              </Text>
            ) : (
              <Text className="text-slate-500 text-[10px] block text-center mt-2">
                Her analiz, sunucuda yüksek bellek tüketimi gerçekleştirir.
              </Text>
            )}
          </div>

          <div className="flex gap-4 mt-4">
            <Button onClick={onCancel} className="flex-1 h-11 bg-slate-800 border-none text-slate-400 hover:text-white hover:bg-slate-700">
              VAZGEÇ
            </Button>
            <Button 
              onClick={onConfirm} 
              type="primary" 
              disabled={isQuotaExceeded}
              className={`flex-1 h-11 border-none font-bold tracking-wider transition-all
                ${isQuotaExceeded ? 'bg-slate-800 text-slate-600' : 'bg-teal-500 hover:bg-teal-400 hover:scale-[1.02]'}
              `}
            >
              {isQuotaExceeded ? 'KİLİTLİ' : 'BAŞLAT'}
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <Text className="text-teal-400 font-mono text-[10px] uppercase tracking-[0.2em]">
              {!isFinished ? <><LoadingOutlined className="mr-2" /> Canlı Analiz Akışı</> : "İşlem Tamamlandı"}
            </Text>
            <Text className="text-teal-500 font-mono text-xs font-bold">{progress}%</Text>
          </div>

          <div 
            ref={scrollRef}
            className="bg-black/40 border border-slate-800 rounded-xl p-4 h-64 overflow-y-auto font-mono text-[11px] shadow-inner hide-scrollbar"
          >
            {logs.map((log, index) => (
              <div key={index} className="mb-2 flex gap-2">
                <span className="text-slate-600">[{new Date().toLocaleTimeString('tr-TR')}]</span>
                <span className={log.includes('[SUCCESS]') || log.includes('[BAŞARI]') ? 'text-teal-400' : 'text-emerald-500/80'}>{log}</span>
              </div>
            ))}
          </div>

          {isFinished && (
            <div className="mt-6">
              <Button 
                type="primary" 
                block 
                size="large"
                onClick={onShowResults}
                className="h-12 bg-emerald-500 border-none hover:bg-emerald-400 font-bold tracking-widest hover:scale-[1.02] transition-transform"
              >
                SONUÇLARI GÖRÜNTÜLE
              </Button>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default AnalysisModal;