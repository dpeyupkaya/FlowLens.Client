import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Button, Row, Col, Statistic, Tag, Progress } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import CodeVisualizer from '../components/CodeVisualizer/CodeVisualizer';

const { Text } = Typography;

const AnalysisResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { analysisResult } = location.state || {};

  const healthMetrics = useMemo(() => {
    const graphData = analysisResult?.graph || analysisResult?.Graph;
    const nodes = graphData?.nodes || graphData?.Nodes || [];
    
    const methods = nodes.filter(n => (n.type || n.Type) === 'Method' || (n.type || n.Type) === 'MethodNode');
    if (methods.length === 0) return { score: 1, status: 'SYSTEM_CLEAN' };

    const healthyMethods = methods.filter(m => {
      const meta = m.metadata || m.Metadata || {};
      const status = meta.HealthStatus || meta.healthStatus;
      return status === 'Healthy';
    });

    const calculatedScore = healthyMethods.length / methods.length;

    return {
      score: calculatedScore || 0,
      status: calculatedScore > 0.8 ? 'SYSTEM_OPTIMIZED' : calculatedScore > 0.5 ? 'STABLE' : 'CRITICAL_DEBT'
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
    <div className="flex flex-col items-center py-8 min-h-screen w-full bg-[#020617] text-slate-300">
      <div className="w-full max-w-7xl px-6">
        <div className="mb-6 flex justify-between items-center">
            <Text className="text-slate-500 font-mono text-[10px] tracking-widest">FLOWLENS // ANALİZ_RAPORU</Text>
            <Button icon={<LeftOutlined />} onClick={() => navigate('/dashboard')} className="bg-slate-900 border-slate-800 text-slate-400 hover:text-white transition-colors shadow-lg">
              GERİ DÖN
            </Button>
        </div>

        <div className="bg-[#0f172a]/50 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-xl shadow-2xl">
          <Row gutter={[32, 32]}>
            <Col xs={24} lg={8} xl={7}>
              <div className="bg-slate-900/60 p-8 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[350px] shadow-inner">
                <div className="relative flex flex-col items-center">
                    <Progress
                        type="dashboard"
                        percent={Math.round(healthMetrics.score * 100)}
                        strokeColor={{ '0%': '#f43f5e', '100%': '#14b8a6' }}
                        railColor="#1e293b"
                        size={200} 
                        strokeWidth={8}
                        format={(percent) => (
                            <div className="flex flex-col">
                                <span className="text-white text-4xl font-bold">{percent}%</span>
                                <span className="text-slate-500 text-[10px] tracking-tighter uppercase">Sağlık Skoru</span>
                            </div>
                        )}
                    />
                </div>
                <Tag color={healthMetrics.score > 0.6 ? "cyan" : "red"} className="mt-8 font-mono px-6 py-1.5 uppercase tracking-widest border-none bg-slate-800 shadow-lg">
                  {healthMetrics.status}
                </Tag>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800 shadow-sm">
                  <Statistic 
                    title={<span className="text-slate-500 text-[10px] tracking-wider font-mono uppercase">Dosyalar</span>} 
                    value={analysisResult.totalFilesScanned || 0} 
                    styles={{ content: { color: '#2dd4bf', fontSize: '24px', fontWeight: 'bold' } }} 
                  />
                </div>
                <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800 shadow-sm">
                  <Statistic 
                    title={<span className="text-slate-500 text-[10px] tracking-wider font-mono uppercase">Satırlar</span>} 
                    value={analysisResult.totalLinesOfCode || 0} 
                    styles={{ content: { color: '#94a3b8', fontSize: '24px', fontWeight: 'bold' } }} 
                  />
                </div>
              </div>
            </Col>

            <Col xs={24} lg={16} xl={17} className="flex flex-col">
              <div className="rounded-xl border border-slate-800 bg-[#020617] shadow-2xl relative z-10 flex-grow min-h-[700px]">
                <CodeVisualizer graphData={analysisResult.graph || analysisResult.Graph || analysisResult} />
              </div>
              
              <div className="mt-6 bg-slate-900/40 p-5 rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[10px] mb-3 font-mono uppercase tracking-widest border-b border-slate-800/50 pb-2">Sistem Logları</div>
                <div className="max-h-32 overflow-auto text-[11px] font-mono text-emerald-500/80 custom-scrollbar pr-2">
                  {(analysisResult.issues || []).map((issue, i) => (
                    <div key={i} className="mb-1.5 border-b border-slate-800/30 pb-1.5 last:border-0 hover:bg-slate-800/20 px-2 rounded transition-colors">
                      <span className="text-slate-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
                      <span className="text-teal-600 font-bold">INF:</span> {issue}
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