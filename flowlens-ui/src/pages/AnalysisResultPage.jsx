import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Button, Row, Col, Statistic, List, Tag, Breadcrumb } from 'antd';
import { DashboardOutlined, CodeOutlined, LeftOutlined } from '@ant-design/icons';
import { Gauge } from '@ant-design/plots';
import CodeVisualizer from '../components/CodeVisualizer/CodeVisualizer';

const { Title, Text } = Typography;

const AnalysisResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { analysisResult } = location.state || {};

  if (!analysisResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-slate-400">
        <Text>Veri bulunamadı.</Text>
        <Button onClick={() => navigate('/dashboard')} className="mt-4">Dashboard'a Dön</Button>
      </div>
    );
  }

  const healthScore = analysisResult.totalFilesScanned > 0 ? 0.85 : 0;

  const gaugeConfig = {
    percent: healthScore,
    range: { color: 'l(0) 0:#14b8a6 1:#10b981' },
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
    <div className="flex flex-col items-center py-8 min-h-[80vh] w-full bg-[#020617] text-slate-300">
      <div className="w-full max-w-6xl px-6">
        <div className="mb-6 flex justify-between items-center">
          <Breadcrumb 
            className="text-slate-500 font-mono text-xs"
            items={[
                { title: <span className="cursor-pointer hover:text-teal-400" onClick={() => navigate('/dashboard')}>DASHBOARD</span> },
                { title: <span className="text-teal-400">ANALYSIS_RESULTS</span> }
            ]}
          />
          <Button 
            icon={<LeftOutlined />} 
            onClick={() => navigate('/dashboard')}
            className="bg-slate-900 border-slate-800 text-slate-400 hover:!text-teal-400 hover:!border-teal-500"
          >
            GERİ DÖN
          </Button>
        </div>

        <div className="bg-[#0f172a]/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-teal-400 font-mono text-xs mb-8">
            <DashboardOutlined /> 
            <span>CORE_ENGINE_v1.0 // PROJECT_VISUALIZATION</span>
          </div>

          <Row gutter={[32, 32]}>
            <Col xs={24} lg={10}>
              <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                <Gauge {...gaugeConfig} className="w-full h-48" />
                <Tag color="#10b981" className="mt-4 m-0 bg-emerald-500/10 border-emerald-500/20 text-emerald-400 font-mono text-[10px]">SYSTEM_OPTIMIZED</Tag>
              </div>
              
              <div className="grid grid-cols-1 gap-4 mt-4">
                <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800">
                    <Statistic 
                        title={<span className="text-slate-500 text-[10px] font-mono">TARANAN_DOSYA</span>} 
                        value={analysisResult.totalFilesScanned} 
                        valueStyle={{ color: '#2dd4bf', fontWeight: 'bold', fontFamily: 'monospace' }}
                        prefix={<CodeOutlined className="text-xs" />}
                    />
                </div>
                <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800">
                    <Statistic 
                        title={<span className="text-slate-500 text-[10px] font-mono">TOPLAM_SATIR</span>} 
                        value={analysisResult.totalLinesOfCode} 
                        valueStyle={{ color: '#94a3b8', fontWeight: 'bold', fontFamily: 'monospace' }}
                    />
                </div>
              </div>
            </Col>

            <Col xs={24} lg={14}>
              <div className="text-slate-500 text-[10px] font-mono mb-2 tracking-widest uppercase">3D_CODE_SPACE_RENDER</div>
              <CodeVisualizer graphData={analysisResult.graph || analysisResult.Graph} />
              
              <div className="mt-6">
                <div className="text-slate-600 text-[9px] font-mono mb-2 tracking-[0.2em]">ANALYSIS_LOGS</div>
                <div className="bg-black/40 p-4 rounded-xl border border-slate-800 max-h-48 overflow-auto">
                  <List
                    dataSource={analysisResult.issues || []}
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
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultPage;