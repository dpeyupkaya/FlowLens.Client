import React, { useMemo } from 'react';
import { useLocation, useNavigate, useBlocker } from 'react-router-dom';
import { Button, Row, Col, Modal } from 'antd';
import { LeftOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import CodeVisualizer from '../components/CodeVisualizer/CodeVisualizer';
import RepoStatsViewer from '../components/CodeVisualizer/RepoStatsViewer'; 
import AnalysisSidebar from '../components/AnalysisResult/AnalysisSidebar';
import AnalysisLogs from '../components/AnalysisResult/AnalysisLogs';

const AnalysisResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { analysisResult } = location.state || {};

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      currentLocation.pathname !== nextLocation.pathname
  );

  const isExitModalVisible = blocker.state === 'blocked';

  const handleConfirmExit = () => {
    if (blocker.state === 'blocked') {
      blocker.proceed(); 
    }
  };

  const handleCancelExit = () => {
    if (blocker.state === 'blocked') {
      blocker.reset(); 
    }
  };

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  const roslynStats = useMemo(() => {
    if (!analysisResult) return null;
    const graphData = analysisResult?.graph || analysisResult?.Graph;
    return {
      name: analysisResult.repoName || analysisResult.projectName || "Bilinmeyen Repository",
      files: analysisResult.totalFilesScanned || 0,
      lines: analysisResult.totalLinesOfCode || 0,
      nodeCount: (graphData?.nodes || graphData?.Nodes || []).length,
      edgeCount: (graphData?.edges || graphData?.Edges || []).length
    };
  }, [analysisResult]);

  if (!analysisResult) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full bg-[#020617] text-slate-400">
        <span className="animate-pulse font-mono tracking-widest text-[11px]">ANALİZ_VERİSİ_BEKLENİYOR...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-6 min-h-screen w-full bg-[#020617] text-slate-300">
      
      <Modal
        title={
          <div className="flex items-center gap-2 text-slate-100 font-mono tracking-wide text-sm">
            <ExclamationCircleOutlined className="text-amber-500 text-lg" />
            <span>ANALİZİ_SONLANDIR</span>
          </div>
        }
        open={isExitModalVisible}
        onOk={handleConfirmExit}
        onCancel={handleCancelExit}
        centered
        width={420}
        closeIcon={<span className="text-slate-500 hover:text-white transition-colors" onClick={handleCancelExit}>✕</span>}
        styles={{
          content: { 
            backgroundColor: '#0f172a', 
            border: '1px solid #1e293b', 
            borderRadius: '1rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          },
          header: { 
            backgroundColor: 'transparent', 
            borderBottom: '1px solid #1e293b', 
            paddingBottom: '16px',
            marginBottom: '16px'
          },
          mask: { 
            backdropFilter: 'blur(6px)',
            backgroundColor: 'rgba(2, 6, 23, 0.7)'
          }
        }}
        okButtonProps={{
          className: "bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 hover:border-red-400 hover:text-red-300 font-mono text-[11px] tracking-[0.1em] rounded-lg shadow-none"
        }}
        cancelButtonProps={{
          className: "bg-slate-800 text-slate-300 border border-slate-700 hover:text-white hover:border-slate-500 font-mono text-[11px] tracking-[0.1em] rounded-lg shadow-none"
        }}
        okText="EVET, ÇIKIŞ YAP"
        cancelText="İPTAL"
      >
        <p className="text-slate-400 font-sans text-sm leading-relaxed mb-2">
          Mevcut analiz grafiğinden ayrılmak üzeresiniz. Dışa aktarılmamış diyagram görünümleri kaybolacaktır.
        </p>
        <p className="text-slate-500 font-sans text-xs">
          Gerçekten çıkış yapmak istiyor musunuz?
        </p>
      </Modal>

      <div className="w-full max-w-[1920px] px-4 lg:px-8">
        
        <div className="mb-6 flex justify-between items-center">
          <Button 
            icon={<LeftOutlined className="text-[10px]" />} 
            onClick={handleGoBack} 
            className="bg-slate-900 border-slate-800 text-slate-400 hover:text-teal-400 hover:border-teal-500/50 transition-all duration-300 shadow-lg font-mono text-[11px] tracking-[0.15em] flex items-center h-[38px] px-4 rounded-xl"
          >
            Geri Dön
          </Button>
        </div>

        <RepoStatsViewer stats={analysisResult.repoStats || analysisResult.RepoStats} />

        <div className="bg-[#0f172a]/50 border border-slate-800 rounded-2xl p-4 lg:p-6 backdrop-blur-xl shadow-2xl">
          <Row gutter={[24, 24]}>
            
            <Col xs={24} lg={6} xl={4}>
              <AnalysisSidebar stats={roslynStats} />
            </Col>

            <Col xs={24} lg={18} xl={20} className="flex flex-col">
              <div className="rounded-xl border border-slate-800 bg-[#020617] shadow-2xl relative z-10 flex-grow min-h-[800px]">
                <CodeVisualizer graphData={analysisResult.graph || analysisResult.Graph || analysisResult} />
              </div>

              <AnalysisLogs issues={analysisResult.issues} />
            </Col>

          </Row>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultPage;