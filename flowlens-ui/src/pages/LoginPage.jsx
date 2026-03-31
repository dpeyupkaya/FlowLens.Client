import React from 'react';
import { 
  Layout, 
  Card, 
  Button, 
  Typography, 
  Space, 
  ConfigProvider, 
  theme 
} from 'antd';
import { 
  GithubOutlined, 
  LockOutlined, 
  CodeOutlined, 
  SafetyOutlined 
} from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const LoginPage = () => {
  const CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;

  const handleGitHubLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user:email`;
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#14b8a6', // FlowLens Teal
          borderRadius: 12,
          colorBgContainer: '#0f172a',
          colorBgLayout: '#020617',
        },
      }}
    >
      <Layout style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Content className="w-full max-w-md">
          <Card 
            bordered={false} 
            style={{ 
              background: '#0f172a', 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              border: '1px solid #1e293b',
              textAlign: 'center',
              padding: '20px'
            }}
          >
            {/* Logo & Icon */}
            <Space direction="vertical" size="middle" style={{ marginBottom: '40px' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                background: '#14b8a6', 
                borderRadius: '10px', 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(20, 184, 166, 0.3)'
              }}>
                <CodeOutlined style={{ color: '#020617', fontSize: '24px' }} />
              </div>
              <Title level={2} style={{ margin: 0, color: '#fff' }}>Hoş Geldin</Title>
              <Paragraph style={{ color: '#94a3b8', fontSize: '14px' }}>
                C# projelerini güvenle analiz etmek için GitHub hesabınla devam et.
              </Paragraph>
            </Space>

            {/* GitHub Login Button */}
            <Button 
              type="primary" 
              size="large" 
              block 
              icon={<GithubOutlined />} 
              onClick={handleGitHubLogin}
              style={{ 
                height: '52px', 
                background: '#fff', 
                color: '#020617', 
                border: 'none',
                fontWeight: 'bold',
                fontSize: '16px'
              }}
            >
              GitHub ile Giriş Yap
            </Button>

            {/* Privacy Badges */}
            <div style={{ marginTop: '40px', padding: '20px', background: 'rgba(2, 6, 23, 0.5)', borderRadius: '12px' }}>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                  <LockOutlined style={{ color: '#14b8a6' }} />
                  <Text style={{ color: '#64748b', fontSize: '12px' }}>Kodunuz veritabanımızda saklanmaz.</Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                  <SafetyOutlined style={{ color: '#14b8a6' }} />
                  <Text style={{ color: '#64748b', fontSize: '12px' }}>Analiz sonrası tüm geçici veriler silinir.</Text>
                </div>
              </Space>
            </div>

            <Text style={{ display: 'block', marginTop: '30px', color: '#475569', fontSize: '11px' }}>
              Devam ederek kullanım şartlarımızı kabul etmiş olursun.
            </Text>
          </Card>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default LoginPage;