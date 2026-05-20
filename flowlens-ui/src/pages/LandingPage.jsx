import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Layout,  Button,  Typography, Space, Row,Col,ConfigProvider, theme, Tag,
} from 'antd';
import {
  GithubOutlined,
  ArrowRightOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import HeroFlowGraph from '../components/CodeVisualizer/HeroFlowGraph'; // Yeni dosyayı import ediyoruz

const { Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

const glassCard = {
  background: 'linear-gradient(180deg, rgba(15,23,42,0.86), rgba(2,6,23,0.72))',
  border: '1px solid rgba(148,163,184,0.16)',
  boxShadow: '0 24px 80px rgba(0,0,0,0.36)',
  backdropFilter: 'blur(18px)',
};

const stats = [
  ['Multilanguage', 'Yol haritasında'],
  ['Roslyn Engine', 'Derin analiz motoru'],
  ['Open Source', 'Şeffaf geliştirme'],
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#14b8a6',
          borderRadius: 14,
          colorBgContainer: '#0f172a',
          colorBgLayout: '#020617',
          fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
          fontSize: 16,
          colorText: '#e2e8f0',
          colorTextSecondary: '#94a3b8',
        },
      }}
    >
      <Layout
        style={{
          minHeight: '100vh', background:
            'radial-gradient(circle at 20% 0%, rgba(20,184,166,0.18), transparent 32%), radial-gradient(circle at 80% 10%, rgba(99,102,241,0.16), transparent 34%), #020617',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(148,163,184,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.045) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'linear-gradient(to bottom, black, transparent 82%)',
            pointerEvents: 'none',
          }}
        />

        <Content style={{ position: 'relative', zIndex: 1 }}>
          <section style={{ maxWidth: 1240, margin: '0 auto', padding: '32px 24px 80px' }}>

            {/* Header / Navbar */}
            <nav style={{ height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Space size={12}>
                <div
                 
                >
                
                </div>
                <Text style={{ color: '#f8fafc', fontWeight: 800, fontSize: 20 }}>FlowLens</Text>
              </Space>

              <Space size={12}>
                <Button
                  ghost
                  href="https://github.com/dpeyupkaya/FlowLens"
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={<GithubOutlined />}
                  style={{ borderColor: 'rgba(148,163,184,0.28)', color: '#cbd5e1' }}
                >
                  GitHub
                </Button>
                <Button type="primary" onClick={() => navigate('/login')}>
                  Başla
                </Button>
              </Space>
            </nav>

            <Row gutter={[40, 40]} align="middle" style={{ paddingTop: 64 }}>
              <Col xs={24} lg={11}>
                <Space direction="vertical" size={24} style={{ width: '100%' }}>
                 

                  <Title
                    level={1}
                    style={{
                      margin: 0,
                      color: '#f8fafc',
                      fontSize: 'clamp(44px, 6vw, 72px)',
                      lineHeight: 0.98,
                      letterSpacing: '-2.6px',
                      fontWeight: 900,
                    }}
                  >
                    Proje akışını görsel olarak keşfet.
                  </Title>

                  <Paragraph style={{ color: '#cbd5e1', fontSize: 19, lineHeight: 1.65, maxWidth: 660, margin: 0 }}>
                    FlowLens, codebase'ini analiz edip interaktif, okunabilir bir haritaya dönüştürür. Ne nerede, neye bağlı anında gör. Kodumuz tamamen açık kaynaklıdır.
                  </Paragraph>

                  <Space size={14} wrap>
                    <Button
                      type="primary"
                      size="large"
                      icon={<GithubOutlined />}
                      onClick={() => navigate('/login')}
                      style={{
                        height: 58,
                        padding: '0 28px',
                        fontWeight: 800,
                        borderRadius: 16,
                        boxShadow: '0 16px 46px rgba(20,184,166,0.35)',
                      }}
                    >
                      Analiz et
                    </Button>
                    <Button
                      size="large"
                      ghost
                      href="https://github.com/dpeyupkaya/FlowLens"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        height: 58,
                        padding: '0 28px',
                        fontWeight: 800,
                        borderRadius: 16,
                        borderColor: 'rgba(226,232,240,0.24)',
                        color: '#e2e8f0',
                      }}
                    >
                      GitHub incele <ArrowRightOutlined />
                    </Button>
                  </Space>

                  {/* Alt Özellik Kutuları */}
                  <Row gutter={[12, 12]} style={{ paddingTop: 16, maxWidth: 680 }}>
                    {stats.map(([value, label]) => (
                      <Col xs={12} sm={8} key={value}>
                        <div style={{ ...glassCard, borderRadius: 16, padding: '16px 14px' }}>
                          <Text style={{ display: 'block', color: '#14b8a6', fontWeight: 900, fontSize: 15 }}>
                            {value}
                          </Text>
                          <Text style={{ color: '#94a3b8', fontSize: 12 }}>{label}</Text>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Space>
              </Col>

              {/* Sağ Taraf: İşte Buraya Yeni Akış Çizimimizi Gömüyoruz */}
              <Col xs={24} lg={13}>
                <div
                  style={{
                    ...glassCard,
                    borderRadius: 28,
                    padding: 12,
                    position: 'relative',
                    transform: 'perspective(1100px) rotateY(-5deg) rotateX(2deg)',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: -1,
                      borderRadius: 28,
                      background: 'linear-gradient(135deg, rgba(20,184,166,0.34), transparent 35%, rgba(99,102,241,0.24))',
                      zIndex: -1,
                    }}
                  />
                  <div
                    style={{
                      borderRadius: 20,
                      overflow: 'hidden',
                      background: '#020617',
                      border: '1px solid rgba(148,163,184,0.14)',
                    }}
                  >
                    {/* Tarayıcı Süslemesi Üst Bar */}
                    <div
                      style={{
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '0 16px',
                        borderBottom: '1px solid rgba(148,163,184,0.12)',
                        background: 'rgba(15,23,42,0.76)',
                      }}
                    >
                      <span style={{ width: 10, height: 10, borderRadius: 99, background: '#ef4444' }} />
                      <span style={{ width: 10, height: 10, borderRadius: 99, background: '#f59e0b' }} />
                      <span style={{ width: 10, height: 10, borderRadius: 99, background: '#22c55e' }} />
                      <Text style={{ color: '#64748b', fontSize: 12, marginLeft: 8, fontFamily: 'monospace' }}>
                        FlowLens Runtime Map Engine
                      </Text>
                    </div>

                    {/* YENİ GENERATE ETTİĞİMİZ ÇOKLU FLOW GRAFİĞİ BURADA ÇALIŞIYOR */}
                    <HeroFlowGraph />

                  </div>
                </div>
              </Col>
            </Row>
          </section>
        </Content>

        {/* Footer */}
        <Footer
          style={{
            textAlign: 'center',
            background: 'rgba(2,6,23,0.7)',
            borderTop: '1px solid rgba(148,163,184,0.1)',
            padding: '24px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Text style={{ color: '#64748b', fontSize: 13 }}>
            FlowLens — Gizlilik odaklı code architecture visualization ©{new Date().getFullYear()}
          </Text>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default LandingPage;