import React, { useEffect, useRef } from 'react';
import { Modal, Typography, Button, Progress } from 'antd';
import { LoadingOutlined, RocketOutlined, LockOutlined, RightOutlined } from '@ant-design/icons';

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
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
              ${isQuotaExceeded ? 'bg-red-500/10 text-red-400' : 'bg-teal-500/10 text-teal-400'}`}
            >
              {isQuotaExceeded ? <LockOutlined className="text-xl" /> : <RocketOutlined className="text-xl" />}
            </div>
            <div>
              <Title level={4} className="!text-slate-100 !mb-1 !mt-0 !font-semibold">
                {isQuotaExceeded ? 'Limit Doldu' : 'Analizi Başlat'}
              </Title>
              <Text className="text-slate-400 text-sm block">
                {isQuotaExceeded ? 'Günlük analiz limitine ulaştınız.' : 'Bu deponun mimari analizini başlatmak üzeresiniz.'}
              </Text>
            </div>
          </div>

          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/80 mb-8">
            <div className="flex justify-between items-end mb-2">
              <Text className="text-slate-400 text-xs font-medium">Günlük Kota</Text>
              <Text className={`font-mono text-sm font-semibold ${isQuotaExceeded ? 'text-red-400' : 'text-slate-200'}`}>
                {remainingQuota} / {maxLimit}
              </Text>
            </div>
            <Progress 
              percent={usagePercentage} 
              showInfo={false} 
              strokeColor={isQuotaExceeded ? '#ef4444' : '#14b8a6'} 
              trailColor="#1e293b" 
              size="small" 
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button onClick={onCancel} className="h-10 px-6 bg-transparent border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 rounded-lg">
              İptal
            </Button>
            <Button 
              onClick={onConfirm} 
              type="primary" 
              disabled={isQuotaExceeded}
              className={`h-10 px-6 border-none rounded-lg font-medium transition-colors
                ${isQuotaExceeded ? 'bg-slate-800 text-slate-500' : 'bg-teal-600 hover:bg-teal-500 text-white'}
              `}
            >
              Analizi Başlat
            </Button>
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