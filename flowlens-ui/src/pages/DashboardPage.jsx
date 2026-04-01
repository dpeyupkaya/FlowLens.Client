import React, { useState, useEffect } from 'react';
import { Typography, Card, Tag, Spin, message, Modal, List, Button, Row, Col, Statistic } from 'antd'; 
import { CodeOutlined, FolderOpenOutlined, ConsoleSqlOutlined, CheckCircleOutlined, DashboardOutlined } from '@ant-design/icons';
import { Gauge } from '@ant-design/plots'; // Grafiği import ettik
import { githubService } from '../services/githubService'; 
import { analysisService } from '../services/analysisService'; 
import CodeVisualizer from '../components/CodeVisualizer/CodeVisualizer';

const { Title, Text } = Typography;

const DashboardPage = () => {
  const [repos, setRepos] = useState([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCSharpRepos();
  }, []);

  const fetchCSharpRepos = async () => {
    setIsLoadingRepos(true);
    try {
      const data = await githubService.getCSharpRepos();
      setRepos(data.repos || data || []); 
    } catch (error) {
      message.error("Repolar yüklenirken bir hata oluştu.");
    } finally {
      setIsLoadingRepos(false);
    }
  };

  const handleAnalyze = async (url) => {
    if (!url) return;
    setIsAnalyzing(true);
    const hideLoading = message.loading({ content: `[SYSTEM] Analiz motoru bağlanıyor...`, key: 'analyze', duration: 0 });
    
    try {
      const report = await analysisService.startAnalysis(url);
      setAnalysisResult(report);
      setIsModalOpen(true);
      hideLoading();
      message.success({ content: 'Analiz tamamlandı!', key: 'analyze', duration: 2 });
    } catch (error) {
      hideLoading();
      message.error({ content: "Analiz başarısız oldu.", key: 'analyze' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const healthScore = analysisResult?.totalFilesScanned > 0 ? 0.85 : 0;

  const gaugeConfig = {
    percent: healthScore,
    range: {
      color: 'l(0) 0:#14b8a6 1:#10b981', 
    },
    startAngle: Math.PI,
    endAngle: 2 * Math.PI,
    indicator: null,
    statistic: {
      title: {
        offsetY: -36,
        style: { fontSize: '12px', color: '#64748b' },
        formatter: () => 'SAĞLIK SKORU',
      },
      content: {
        style: { fontSize: '24px', color: '#f8fafc', fontWeight: 'bold' },
        formatter: () => `${(healthScore * 100).toFixed(0)}%`,
      },
    },
  };

  return (
    <div className="flex flex-col items-center py-12 min-h-[80vh] w-full bg-[#020617] text-slate-300">
      <div className="w-full max-w-6xl px-6">
        {/* Üst Başlık */}
        <div className="flex items-center gap-4 mb-10 border-b border-slate-800/80 pb-5">
          <div className="p-3 bg-teal-500/10 rounded-xl border border-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.1)]">
            <FolderOpenOutlined className="text-3xl text-teal-400" />
          </div>
          <div>
            <Title level={3} style={{ color: '#f8fafc', margin: 0, letterSpacing: '0.5px' }}>Proje Merkezi</Title>
            <Text className="text-slate-500 font-mono text-xs uppercase tracking-widest">Active Repositories</Text>
          </div>
        </div>

        {isLoadingRepos ? (
          <div className="flex justify-center py-20"><Spin size="large" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.map((repo) => (
              <div key={repo.id} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500 pointer-events-none"></div>
                <Card 
                  hoverable
                  onClick={() => !isAnalyzing && handleAnalyze(repo.htmlUrl || repo.html_url)}
                  className={`relative z-10 h-full bg-[#0f172a]/80 backdrop-blur-md border-slate-800/50 hover:border-teal-500/50 transition-all duration-500 rounded-2xl overflow-hidden ${isAnalyzing ? 'cursor-wait opacity-50' : 'cursor-pointer'}`}
                  bodyStyle={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <Text className="text-lg font-bold text-slate-100 group-hover:text-teal-400 transition-colors truncate pr-4">{repo.name}</Text>
                    <Tag color="cyan" className="m-0 bg-teal-500/10 border-teal-500/20 text-teal-400 font-mono text-[10px]">C#</Tag>
                  </div>
                  <Text className="text-xs text-slate-500 line-clamp-2 mb-8 font-sans leading-relaxed">{repo.description || "No description provided."}</Text>
                  <div className="mt-auto flex justify-between items-center border-t border-slate-800/50 pt-4">
                    <span className="text-[10px] font-mono text-slate-600 uppercase tracking-tighter italic">analysis_ready</span>
                    <span className="text-teal-500 text-xs font-mono font-bold group-hover:translate-x-1 transition-transform tracking-widest">RUN_SCAN _</span>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>

    <Modal
       
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setIsModalOpen(false)} className="bg-teal-500 hover:!bg-teal-400 border-none px-10 font-mono text-xs rounded-md shadow-lg shadow-teal-500/20">
            TERMINATE_SESSION
          </Button>
        ]}
        centered
        width={800} 
        styles={{ 
            content: { backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '16px' }, 
            header: { backgroundColor: '#020617', borderBottom: '1px solid #1e293b', paddingBottom: '16px' } 
        }}
      >
        <div className="py-2">
          {(analysisResult?.graph || analysisResult?.Graph) ? (
            <div className="mt-4 mb-6">
              <div className="flex justify-between items-center mb-2 px-1">
                <div className="text-slate-500 text-[10px] font-mono tracking-widest uppercase">
                  3D_CODE_SPACE_RENDER // [ONLINE]
                </div>
               
              </div>
              <CodeVisualizer graphData={analysisResult.graph || analysisResult.Graph} />
            </div>
          ) : (
             <div className="h-[200px] flex items-center justify-center border border-dashed border-slate-800 rounded-xl my-6">
                <Text className="text-slate-600 font-mono text-xs animate-pulse">WAITING_FOR_DATA_STREAM...</Text>
             </div>
          )}

          <div className="mt-4">
            <div className="text-slate-600 text-[9px] font-mono mb-2 ml-1 tracking-[0.2em]">SYSTEM_OUTPUT_LOG</div>
            <div className="bg-black/60 p-4 rounded-xl border border-slate-800 max-h-40 overflow-auto scrollbar-thin scrollbar-thumb-slate-800">
              <List
                dataSource={analysisResult?.issues || []}
                renderItem={item => (
                  <List.Item className="border-none py-1 px-0">
                    <Text className="text-emerald-500 text-[11px] font-mono leading-relaxed">
                      <span className="text-slate-700 mr-2">[{new Date().toLocaleTimeString()}]</span>
                      <span className="text-teal-600">INF:</span> {item}
                    </Text>
                  </List.Item>
                )}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DashboardPage;