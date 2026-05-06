import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Row, Col } from 'antd';
import {
  LeftOutlined,
  GithubOutlined,
  FolderOpenOutlined,
  CodeOutlined,
  NodeIndexOutlined,
  BranchesOutlined
} from '@ant-design/icons';
import CodeVisualizer from '../components/CodeVisualizer/CodeVisualizer';
import RepoStatsViewer from '../components/CodeVisualizer/RepoStatsViewer'; 

const AnalysisResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { analysisResult } = location.state || {};

  // Roslyn'den gelen kod içi metrikler (İsim karışıklığı olmasın diye roslynStats yaptık)
  const roslynStats = useMemo(() => {
    if (!analysisResult) return null;
    const graphData = analysisResult?.graph || analysisResult?.Graph;
    const nodes = graphData?.nodes || graphData?.Nodes || [];
    const edges = graphData?.edges || graphData?.Edges || [];

    return {
      name: analysisResult.repoName || analysisResult.projectName || "Bilinmeyen Repository",
      files: analysisResult.totalFilesScanned || 0,
      lines: analysisResult.totalLinesOfCode || 0,
      nodeCount: nodes.length,
      edgeCount: edges.length
    };
  }, [analysisResult]);

  if (!analysisResult) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full bg-[#020617] text-slate-400">
        <span className="animate-pulse">Analiz verisi bekleniyor...</span>
      </div>
    );
  }

  const githubStats = analysisResult.repoStats || analysisResult.RepoStats;

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

        <RepoStatsViewer stats={githubStats} />

        <div className="bg-[#0f172a]/50 border border-slate-800 rounded-2xl p-4 lg:p-6 backdrop-blur-xl shadow-2xl">
          <Row gutter={[24, 24]}>

            <Col xs={24} lg={6} xl={4}>
              <div className="flex flex-col gap-4 h-full">

                <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 shadow-inner flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center mb-4 border border-indigo-500/20">
                    <GithubOutlined className="text-2xl text-indigo-400" />
                  </div>
                  <h2 className="text-white text-lg font-bold truncate w-full mb-1" title={roslynStats.name}>
                    {roslynStats.name}
                  </h2>
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                    Analiz Edilen Proje
                  </span>
                </div>

                <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800 shadow-sm flex flex-col gap-4 flex-grow">
                  <div className="flex items-center justify-between border-b border-slate-800/50 pb-3">
                    <div className="flex items-center gap-3 text-slate-400">
                      <FolderOpenOutlined className="text-teal-500 text-lg" />
                      <span className="text-[11px] font-mono uppercase tracking-wider">Dosyalar</span>
                    </div>
                    <span className="text-white font-bold text-lg">{roslynStats.files}</span>
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-800/50 pb-3">
                    <div className="flex items-center gap-3 text-slate-400">
                      <CodeOutlined className="text-blue-500 text-lg" />
                      <span className="text-[11px] font-mono uppercase tracking-wider">Satırlar</span>
                    </div>
                    <span className="text-white font-bold text-lg">{roslynStats.lines}</span>
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-800/50 pb-3">
                    <div className="flex items-center gap-3 text-slate-400">
                      <NodeIndexOutlined className="text-purple-500 text-lg" />
                      <span className="text-[11px] font-mono uppercase tracking-wider">Sınıflar (Node)</span>
                    </div>
                    <span className="text-white font-bold text-lg">{roslynStats.nodeCount}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-slate-400">
                      <BranchesOutlined className="text-emerald-500 text-lg" />
                      <span className="text-[11px] font-mono uppercase tracking-wider">Bağlar (Edge)</span>
                    </div>
                    <span className="text-white font-bold text-lg">{roslynStats.edgeCount}</span>
                  </div>
                </div>
              </div>
            </Col>

            <Col xs={24} lg={18} xl={20} className="flex flex-col">
              <div className="rounded-xl border border-slate-800 bg-[#020617] shadow-2xl relative z-10 flex-grow min-h-[800px]">
                <CodeVisualizer graphData={analysisResult.graph || analysisResult.Graph || analysisResult} />
              </div>

              <div className="mt-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[10px] mb-2 font-mono uppercase tracking-widest border-b border-slate-800/50 pb-2 flex justify-between">
                  <span>Sistem Logları</span>
                  <span>{(analysisResult.issues || []).length} Kayıt</span>
                </div>
                <div className="max-h-24 overflow-auto text-[11px] font-mono text-emerald-500/80 custom-scrollbar pr-2">
                  {(analysisResult.issues || []).map((issue, i) => (
                    <div key={i} className="mb-1.5 border-b border-slate-800/30 pb-1.5 last:border-0 hover:bg-slate-800/20 px-2 rounded transition-colors flex gap-2">
                      <span className="text-slate-600 shrink-0">[{new Date().toLocaleTimeString()}]</span>
                      <span className="text-teal-600 font-bold shrink-0">INF:</span>
                      <span className="text-slate-400 break-words">{issue}</span>
                    </div>
                  ))}
                  {(!analysisResult.issues || analysisResult.issues.length === 0) && (
                    <div className="text-slate-500 italic">Kayıtlı log bulunamadı...</div>
                  )}
                </div>
              </div>
            </Col>

          </Row>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultPage;