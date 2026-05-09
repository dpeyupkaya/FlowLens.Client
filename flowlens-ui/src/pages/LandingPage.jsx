import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layout,
  Button,
  Typography,
  Space,
  Row,
  Col,
  Card,
  ConfigProvider,
  theme,
} from 'antd';
import { GithubOutlined, LockOutlined, ThunderboltOutlined, CodeOutlined } from '@ant-design/icons';

const { Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#14b8a6',
          borderRadius: 12,
          colorBgContainer: '#0f172a',
          colorBgLayout: '#020617',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          fontSize: 16,
          colorText: '#e2e8f0',
          colorTextSecondary: '#94a3b8',
          paddingLG: 32,
        },
      }}
    >
      <Layout
        style={{
          minHeight: '100vh',
          background: 'radial-gradient(ellipse at top, #0f172a 0%, #020617 60%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -200,
            left: -100,
            width: 500,
            height: 500,
            background: 'rgba(20,184,166,0.12)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -150,
            right: -100,
            width: 400,
            height: 400,
            background: 'rgba(99,102,241,0.1)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }}
        />

        <Content style={{ padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', padding: '140px 0 80px' }}>
            <Space direction="vertical" align="center" size="large">
              <Title
                level={1}
                style={{
                  fontSize: '64px',
                  margin: 0,
                  fontWeight: 800,
                  color: '#f8fafc',
                  lineHeight: 1.1,
                  letterSpacing: '-1.5px',
                }}
              >
                Kodunu Analiz Et, <br />
                <span style={{ color: '#14b8a6', textShadow: '0 0 30px rgba(20,184,166,0.3)' }}>
                  Gizliliğini Koru.
                </span>
              </Title>

              <Paragraph
                style={{
                  color: '#cbd5e1',
                  fontSize: '20px',
                  maxWidth: '680px',
                  margin: '0 auto 48px',
                  lineHeight: 1.6,
                }}
              >
                C# ile başlıyor, yakında diğer dillerle devam ediyoruz. Kodunuzu anında tarıyor,
                güvenlik açıklarını tespit ediyor ve analiz bittiğinde hiçbir iz bırakmıyoruz.
              </Paragraph>

              <Space size="large">
                <Button
                  type="primary"
                  size="large"
                  icon={<GithubOutlined style={{ fontSize: 20 }} />}
                  style={{
                    height: 58,
                    padding: '0 40px',
                    fontSize: 17,
                    fontWeight: 600,
                    borderRadius: 14,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    boxShadow: '0 8px 30px rgba(20,184,166,0.35)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onClick={() => navigate('/login')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(20,184,166,0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(20,184,166,0.35)';
                  }}
                >
                  GitHub ile Başla
                </Button>
                <Button
                  size="large"
                  ghost
                  style={{
                    height: 58,
                    padding: '0 40px',
                    fontSize: 17,
                    fontWeight: 600,
                    borderRadius: 14,
                    borderColor: 'rgba(255,255,255,0.25)',
                    color: '#e2e8f0',
                    transition: 'transform 0.2s ease, border-color 0.2s ease',
                  }}
                  href="https://github.com/dpeyupkaya/FlowLens"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.borderColor = '#14b8a6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                  }}
                >
                  Açık Kaynak
                </Button>
              </Space>
            </Space>
          </div>

          <Row
            gutter={[32, 32]}
            justify="center"
            style={{ maxWidth: 960, margin: '0 auto', paddingBottom: 100 }}
          >
            <Col xs={24} sm={8}>
              <Card
                bordered={false}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 20,
                  textAlign: 'center',
                  padding: '32px 20px 20px',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <LockOutlined style={{ fontSize: 32, color: '#14b8a6', marginBottom: 16 }} />
                <Title level={4} style={{ color: '#f1f5f9', marginBottom: 8 }}>
                  Tam Gizlilik
                </Title>
                <Text style={{ color: '#94a3b8', fontSize: 14 }}>
                  Kaynak kodlarınız asla sunucularımıza kaydedilmez; analiz bittiğinde tüm veriler
                  silinir.
                </Text>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card
                bordered={false}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 20,
                  textAlign: 'center',
                  padding: '32px 20px 20px',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <ThunderboltOutlined style={{ fontSize: 32, color: '#14b8a6', marginBottom: 16 }} />
                <Title level={4} style={{ color: '#f1f5f9', marginBottom: 8 }}>
                  Anlık Analiz
                </Title>
                <Text style={{ color: '#94a3b8', fontSize: 14 }}>
                  Kod mimarinizi saniyeler içinde görselleştirir, güvenlik risklerini anında
                  vurgular.
                </Text>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card
                bordered={false}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 20,
                  textAlign: 'center',
                  padding: '32px 20px 20px',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <CodeOutlined style={{ fontSize: 32, color: '#14b8a6', marginBottom: 16 }} />
                <Title level={4} style={{ color: '#f1f5f9', marginBottom: 8 }}>
                  Açık Kaynak
                </Title>
                <Text style={{ color: '#94a3b8', fontSize: 14 }}>
                  Tamamen şeffaf geliştirme süreci. Katkıda bulunun veya kendi örneğinizi
                  çalıştırın.
                </Text>
              </Card>
            </Col>
          </Row>
        </Content>

        <Footer
          style={{
            textAlign: 'center',
            background: 'transparent',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '32px 0',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Space direction="vertical" size={4}>
            <Text style={{ color: '#64748b', fontSize: 14 }}>
              FlowLens — Gizlilik Odaklı Kod Analiz Aracı ©{new Date().getFullYear()}
            </Text>
            <Text style={{ color: '#475569', fontSize: 12 }}>
              Kodunuz size ait kalır. Her zaman.
            </Text>
          </Space>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default LandingPage;