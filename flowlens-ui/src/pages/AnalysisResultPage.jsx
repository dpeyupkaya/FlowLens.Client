import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Button, Row, Col, Statistic, List, Tag, Breadcrumb, Progress } from 'antd'; // Progress eklendi
import { DashboardOutlined, CodeOutlined, LeftOutlined } from '@ant-design/icons';
import CodeVisualizer from '../components/CodeVisualizer/CodeVisualizer';

const { Text } = Typography;

const AnalysisResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { analysisResult } = location.state || {};

  const healthMetrics = useMemo(() => {
    const graphData = analysisResult?.graph || analysisResult?.Graph;
    const nodes = graphData?.nodes || graphData?.Nodes || [];
    
    const methods = nodes.filter(n => (n.type || n.Type) === 'Method');
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

  if (!analysisResult) return null; // Veya bir loading...

  return (
    <div className="flex flex-col items-center py-8 min-h-screen w-full bg-[#020617] text-slate-300">
      <div className="w-full max-w-6xl px-6">
        <div className="mb-6 flex justify-between items-center">
            <Text className="text-slate-500 font-mono text-[10px]">FLOWLENS // ANALİZ_RAPORU</Text>
            <Button icon={<LeftOutlined />} onClick={() => navigate('/dashboard')} className="bg-slate-900 border-slate-800 text-slate-400">GERİ DÖN</Button>
        </div>

        <div className="bg-[#0f172a]/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-xl">
          <Row gutter={[32, 32]}>
            {/* SOL TARAF: SAĞLIK GÖSTERGESİ (GARANTİLENMİŞ) */}
            <Col xs={24} lg={10}>
              <div className="bg-slate-900/60 p-8 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[350px]">
                <div className="relative flex flex-col items-center">
                    {/* Ant Design'ın kendi Progress bileşeni - Dış kütüphane gerektirmez */}
                    <Progress
                        type="dashboard"
                        percent={Math.round(healthMetrics.score * 100)}
                        strokeColor={{ '0%': '#f43f5e', '100%': '#14b8a6' }}
                        trailColor="#1e293b"
                        width={200}
                        strokeWidth={8}
                        format={(percent) => (
                            <div className="flex flex-col">
                                <span className="text-white text-4xl font-bold">{percent}%</span>
                                <span className="text-slate-500 text-[10px] tracking-tighter uppercase">Sağlık Skoru</span>
                            </div>
                        )}
                    />
                </div>
                <Tag color={healthMetrics.score > 0.6 ? "cyan" : "red"} className="mt-8 font-mono px-6 py-1 uppercase tracking-widest border-none bg-slate-800">
                  {healthMetrics.status}
                </Tag>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800">
                  <Statistic title={<span className="text-slate-500 text-[10px] font-mono">DOSYALAR</span>} value={analysisResult.totalFilesScanned} valueStyle={{ color: '#2dd4bf', fontSize: '20px', fontWeight: 'bold' }} />
                </div>
                <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800">
                  <Statistic title={<span className="text-slate-500 text-[10px] font-mono">SATIRLAR</span>} value={analysisResult.totalLinesOfCode} valueStyle={{ color: '#94a3b8', fontSize: '20px', fontWeight: 'bold' }} />
                </div>
              </div>
            </Col>

            <Col xs={24} lg={14}>
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-black/20">
                <CodeVisualizer graphData={analysisResult.graph || analysisResult.Graph} />
              </div>
              
              <div className="mt-6 bg-black/20 p-4 rounded-xl border border-slate-800">
                <div className="text-slate-600 text-[10px] mb-2 font-mono uppercase tracking-widest">Sistem Logları</div>
                <div className="max-h-32 overflow-auto text-[11px] font-mono text-emerald-500/80">
                  {(analysisResult.issues || []).map((issue, i) => (
                    <div key={i} className="mb-1 border-b border-slate-800/50 pb-1">
                      <span className="text-slate-700 mr-2">[{new Date().toLocaleTimeString()}]</span>
                      <span className="text-teal-600">INF:</span> {issue}
                    </div>
                  ))}
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