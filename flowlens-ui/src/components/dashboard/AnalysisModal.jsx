import React, { useEffect, useRef } from 'react';
import { Modal, Typography, Button } from 'antd';
import { LoadingOutlined, RocketOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const AnalysisModal = ({ visible, status, progress, logs, onCancel, onConfirm, onShowResults }) => {
  const isAnalyzing = status === 'analyzing';
  const isFinished = progress === 100;
  const scrollRef = useRef(null);

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
          <div className="w-20 h-20 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-teal-500/20">
            <RocketOutlined className="text-4xl text-teal-400" />
          </div>
          <Title level={4} style={{ color: '#f8fafc', marginBottom: '8px' }}>Analiz Başlatılsın mı?</Title>
          <div className="flex gap-4 mt-8">
            <Button onClick={onCancel} className="flex-1 h-11 bg-slate-800 border-none text-slate-400 hover:text-white">VAZGEÇ</Button>
            <Button onClick={onConfirm} type="primary" className="flex-1 h-11 bg-teal-500 border-none hover:bg-teal-400 font-bold">BAŞLAT</Button>
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
                className="h-12 bg-emerald-500 border-none hover:bg-emerald-400 font-bold tracking-widest"
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