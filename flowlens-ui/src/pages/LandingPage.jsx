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
import { GithubOutlined, CodeOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#14b8a6',
          borderRadius: 10,
          colorBgContainer: '#0f172a',
          colorBgLayout: '#020617',
          fontFamily: 'Inter, sans-serif',
        },
      }}
    >
      <Layout className="min-h-screen">
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 50px',
            background: 'rgba(2, 6, 23, 0.9)',
            backdropFilter: 'blur(8px)',
            borderBottom: '1px solid #1e293b',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                background: '#14b8a6',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CodeOutlined style={{ color: '#020617', fontSize: '18px' }} />
            </div>
            <Title level={4} style={{ margin: 0, color: '#fff', letterSpacing: '-0.5px' }}>
              FlowLens
            </Title>
          </div>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ textAlign: 'center', padding: '120px 0 80px' }}>
            <Space direction="vertical" align="center" size="large">
              <Title
                style={{
                  fontSize: '56px',
                  margin: '10px 0',
                  fontWeight: 800,
                  color: '#fff',
                  lineHeight: 1.2,
                }}
              >
                Kodunu Analiz Et, <br />
                <span style={{ color: '#14b8a6' }}>Gizliliğini Koru.</span>
              </Title>

              <Paragraph
                style={{
                  color: '#94a3b8',
                  fontSize: '18px',
                  maxWidth: '650px',
                  margin: '0 auto 40px',
                }}
              >
                Şu anda C# ile başlıyoruz, ancak çok yakında diğer programlama dilleri için de
                destek sunacağız. Kodunuzu tarıyor, güvenlik zafiyetlerini tespit ediyor ve işimiz
                bitince hiçbir iz bırakmıyoruz.
              </Paragraph>

              <Space size="middle">
                <Button
                  type="primary"
                  size="large"
                  icon={<GithubOutlined />}
                  style={{ height: '54px', padding: '0 36px', fontSize: '16px' }}
                  onClick={() => navigate('/login')}
                >
                  GitHub ile Başla
                </Button>
                <Button
                  size="large"
                  ghost
                  style={{ height: '54px', padding: '0 36px' }}
                  href="https://github.com/dpeyupkaya/FlowLens"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Açık Kaynak
                </Button>
              </Space>
            </Space>
          </div>

          <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '100px' }}>
            <Row gutter={[32, 32]}>
              <Col xs={24} md={8}>
                <Card
                  bordered={false}
                  style={{
                    background: '#0f172a',
                    border: '1px solid #1e293b',
                    height: '100%',
                  }}
                >
                  <Title level={4} style={{ color: '#fff' }}>
                    Derinlemesine Tarama
                  </Title>
                  <Text style={{ color: '#64748b' }}>
                    C# projelerinizdeki kod yapılarını, referansları ve potansiyel hataları statik
                    analiz yöntemleriyle tespit ederiz.
                  </Text>
                </Card>
              </Col>

              <Col xs={24} md={8}>
                <Card
                  bordered={false}
                  style={{
                    background: '#0f172a',
                    border: '1px solid #1e293b',
                    height: '100%',
                  }}
                >
                  <Title level={4} style={{ color: '#fff' }}>
                    Sıfır Veri Kalıntısı
                  </Title>
                  <Text style={{ color: '#64748b' }}>
                    Analiz edilen kod parçacıkları veya dosyalar hiçbir şekilde kaydedilmez. Veri
                    tabanımızda sadece analiz raporu başlıkları tutulur.
                  </Text>
                </Card>
              </Col>

              <Col xs={24} md={8}>
                <Card
                  bordered={false}
                  style={{
                    background: '#0f172a',
                    border: '1px solid #1e293b',
                    height: '100%',
                  }}
                >
                  <Title level={4} style={{ color: '#fff' }}>
                    Güvenlik Odaklı
                  </Title>
                  <Text style={{ color: '#64748b' }}>
                    Kodunuzdaki zafiyetleri ve hassas verileri bulup size raporlarız, ancak bu
                    verileri asla kendi sunucularımızda saklamayız.
                  </Text>
                </Card>
              </Col>
            </Row>
          </div>
        </Content>

        <Footer
          style={{
            textAlign: 'center',
            background: '#020617',
            borderTop: '1px solid #1e293b',
            color: '#475569',
            padding: '40px 0',
          }}
        >
          <Space direction="vertical">
            <Text style={{ color: '#475569' }}>
              FlowLens — Gizlilik Odaklı Kod Analiz Aracı
            </Text>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              ©{new Date().getFullYear()} Kodunuz size özeldir, bizde sadece raporu kalır.
            </Text>
          </Space>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default LandingPage;