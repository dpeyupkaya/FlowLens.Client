import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Row, Col } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import CodeVisualizer from '../components/CodeVisualizer/CodeVisualizer';
import RepoStatsViewer from '../components/CodeVisualizer/RepoStatsViewer'; 
import AnalysisSidebar from '../components/AnalysisResult/AnalysisSidebar';
import AnalysisLogs from '../components/AnalysisResult/AnalysisLogs';

const AnalysisResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { analysisResult } = location.state || {};

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
        <span className="animate-pulse">Analiz verisi bekleniyor...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-6 min-h-screen w-full bg-[#020617] text-slate-300">
      <div className="w-full max-w-[1920px] px-4 lg:px-8">
        
        <div className="mb-6 flex justify-between items-center">
          <Button 
            icon={<LeftOutlined />} 
            onClick={() => navigate('/dashboard')} 
            className="bg-slate-900 border-slate-800 text-slate-400 hover:text-white transition-colors shadow-lg"
          >
            GERİ DÖN
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