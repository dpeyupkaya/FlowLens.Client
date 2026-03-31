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
  Tag
} from 'antd';
import { 
  GithubOutlined, 
  LockOutlined, 
  CodeOutlined, 
  SearchOutlined,
  ArrowRightOutlined,
  SafetyOutlined
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#14b8a6', // Teal 500
          borderRadius: 10,
          colorBgContainer: '#0f172a',
          colorBgLayout: '#020617',
          fontFamily: 'Inter, sans-serif',
        },
      }}
    >
      <Layout className="min-h-screen">
        
        {/* --- NAVBAR --- */}
        <Header style={{ 
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
          borderBottom: '1px solid #1e293b'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              background: '#14b8a6',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CodeOutlined style={{ color: '#020617', fontSize: '18px' }} />
            </div>
            <Title level={4} style={{ margin: 0, color: '#fff', letterSpacing: '-0.5px' }}>FlowLens</Title>
          </div>

          <Space size="large">
            <Button type="text" style={{ color: '#94a3b8' }}>Nasıl Çalışır?</Button>
            <Button 
              type="primary" 
              onClick={() => navigate('/login')}
              style={{ fontWeight: 600 }}
            >
              Giriş Yap
            </Button>
          </Space>
        </Header>

        {/* --- HERO SECTION --- */}
        <Content style={{ padding: '0 50px' }}>
          <div style={{ textAlign: 'center', padding: '120px 0 80px' }}>
            <Space direction="vertical" align="center" size="large">
             
              
              <Title style={{ fontSize: '56px', margin: '10px 0', fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
                Kodunu Analiz Et, <br />
                <span style={{ color: '#14b8a6' }}>Gizliliğini Koru.</span>
              </Title>

              <Paragraph style={{ color: '#94a3b8', fontSize: '18px', maxWidth: '650px', margin: '0 auto 40px' }}>
                GitHub depolarınızdaki C# kodlarını derinlemesine tararız. Analiz bittiği an kodunuz sistemimizden silinir; veri tabanımızda hiçbir kod kalıntısı tutmuyoruz.
              </Paragraph>

              <Space size="middle">
                <Button 
                  type="primary" 
                  size="large" 
                  icon={<GithubOutlined />} 
                  style={{ height: '54px', padding: '0 36px', fontSize: '16px' }}
                  onClick={() => navigate('/login')}
                >
                  GitHub ile Başla <ArrowRightOutlined />
                </Button>
                <Button size="large" ghost style={{ height: '54px', padding: '0 36px' }}>
                  Açık Kaynak
                </Button>
              </Space>
            </Space>
          </div>

          {/* --- FEATURES SECTION --- */}
          <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '100px' }}>
            <Row gutter={[32, 32]}>
              <Col xs={24} md={8}>
                <Card 
                  bordered={false} 
                  style={{ background: '#0f172a', border: '1px solid #1e293b', height: '100%' }}
                >
                  <SearchOutlined style={{ fontSize: '32px', color: '#14b8a6', marginBottom: '20px' }} />
                  <Title level={4} style={{ color: '#fff' }}>Derinlemesine Tarama</Title>
                  <Text style={{ color: '#64748b' }}>
                    C# projelerinizdeki kod yapılarını, referansları ve potansiyel hataları statik analiz yöntemleriyle tespit ederiz.
                  </Text>
                </Card>
              </Col>
              
              <Col xs={24} md={8}>
                <Card 
                  bordered={false} 
                  style={{ background: '#0f172a', border: '1px solid #1e293b', height: '100%' }}
                >
                  <LockOutlined style={{ fontSize: '32px', color: '#14b8a6', marginBottom: '20px' }} />
                  <Title level={4} style={{ color: '#fff' }}>Sıfır Veri Kalıntısı</Title>
                  <Text style={{ color: '#64748b' }}>
                    Analiz edilen kod parçacıkları veya dosyalar hiçbir şekilde kaydedilmez. Veri tabanımızda sadece analiz raporu başlıkları tutulur.
                  </Text>
                </Card>
              </Col>

              <Col xs={24} md={8}>
                <Card 
                  bordered={false} 
                  style={{ background: '#0f172a', border: '1px solid #1e293b', height: '100%' }}
                >
                  <SafetyOutlined style={{ fontSize: '32px', color: '#14b8a6', marginBottom: '20px' }} />
                  <Title level={4} style={{ color: '#fff' }}>Güvenlik Odaklı</Title>
                  <Text style={{ color: '#64748b' }}>
                    Kodunuzdaki zafiyetleri ve hassas verileri bulup size raporlarız, ancak bu verileri asla kendi sunucularımızda saklamayız.
                  </Text>
                </Card>
              </Col>
            </Row>
          </div>
        </Content>

        {/* --- FOOTER --- */}
        <Footer style={{ 
          textAlign: 'center', 
          background: '#020617', 
          borderTop: '1px solid #1e293b', 
          color: '#475569',
          padding: '40px 0'
        }}>
          <Space direction="vertical">
            <Text style={{ color: '#475569' }}>FlowLens — Gizlilik Odaklı Kod Analiz Aracı</Text>
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