import React, { useState } from 'react';
import { Card, Button, Typography, Space, Modal, Divider } from 'antd';
import { 
  GithubOutlined, 
  LockOutlined, 
  CodeOutlined, 
  SafetyOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const LoginFormCard = () => {
  const [isTermsVisible, setIsTermsVisible] = useState(false);
  const CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;

  const handleGitHubLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user:email,repo`;
  };

  return (
    <>
      <Card 
        bordered={false} 
        className="w-full max-w-md mx-4" 
        style={{ 
          background: 'rgba(15, 23, 42, 0.8)', 
          backdropFilter: 'blur(16px)', 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
          border: '1px solid rgba(20, 184, 166, 0.2)',
          textAlign: 'center',
          padding: '32px 24px',
          borderRadius: '24px' 
        }}
      >
        <Space direction="vertical" size="large" style={{ marginBottom: '48px', width: '100%' }}>
          <div style={{ 
            width: '64px', 
            height: '64px', 
            background: '#14b8a6', 
            borderRadius: '16px', 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 0 30px rgba(20, 184, 166, 0.5)',
            margin: '0 auto'
          }}>
            <CodeOutlined style={{ color: '#020617', fontSize: '32px' }} />
          </div>
          
          <div>
            <Title level={2} style={{ margin: 0, color: '#fff', fontWeight: '800', letterSpacing: '-0.5px' }}>
              FlowLens
            </Title>
            <Paragraph style={{ color: '#94a3b8', fontSize: '16px', marginTop: '8px' }}>
              Yazılım mimarinizi ışık hızında keşfedin.
            </Paragraph>
          </div>
        </Space>

        <div style={{ marginBottom: '40px' }}>
          <Button 
            type="primary" 
            size="large" 
            block 
            icon={<GithubOutlined style={{ fontSize: '20px' }} />} 
            onClick={handleGitHubLogin}
            style={{ 
              height: '56px', 
              background: '#fff', 
              color: '#020617', 
              border: 'none',
              fontWeight: 'bold',
              fontSize: '17px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              boxShadow: '0 4px 20px rgba(255, 255, 255, 0.15)'
            }}
            className="hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
          >
            GitHub ile Giriş Yap
          </Button>
          <Text style={{ color: '#475569', fontSize: '13px', display: 'block', marginTop: '16px' }}>
            Şifre gerektirmez, güvenli ve hızlı.
          </Text>
        </div>

        <div style={{ 
          padding: '20px', 
          background: 'rgba(2, 6, 23, 0.4)', 
          borderRadius: '16px', 
          border: '1px solid rgba(30, 41, 59, 0.5)' 
        }}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
              <div style={{ padding: '8px', background: 'rgba(20, 184, 166, 0.1)', borderRadius: '8px' }}>
                <LockOutlined style={{ color: '#14b8a6', fontSize: '16px' }} />
              </div>
              <div>
                <Text style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: '600', display: 'block' }}>Gizlilik Odaklı</Text>
                <Text style={{ color: '#64748b', fontSize: '12px' }}>Kaynak kodlarınız asla sunucularımıza kaydedilmez.</Text>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
              <div style={{ padding: '8px', background: 'rgba(20, 184, 166, 0.1)', borderRadius: '8px' }}>
                <SafetyOutlined style={{ color: '#14b8a6', fontSize: '16px' }} />
              </div>
              <div>
                <Text style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: '600', display: 'block' }}>Güvenli Analiz</Text>
                <Text style={{ color: '#64748b', fontSize: '12px' }}>Tüm geçici veriler analiz tamamlandığında imha edilir.</Text>
              </div>
            </div>
          </Space>
        </div>

        <Text style={{ display: 'block', marginTop: '32px', color: '#475569', fontSize: '11px' }}>
          Devam ederek <span 
            onClick={() => setIsTermsVisible(true)}
            style={{ color: '#94a3b8', textDecoration: 'underline', cursor: 'pointer' }}
            className="hover:text-teal-400 transition-colors"
          >
            Kullanım Şartlarını
          </span> kabul etmiş olursun.
        </Text>
      </Card>

      {/* --- KULLANIM ŞARTLARI MODAL --- */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <SafetyCertificateOutlined style={{ color: '#14b8a6', fontSize: '24px' }} />
            <span style={{ color: '#fff', fontSize: '18px' }}>Kullanım Şartları ve Gizlilik</span>
          </div>
        }
        open={isTermsVisible}
        onCancel={() => setIsTermsVisible(false)}
        footer={[
          <Button key="submit" type="primary" onClick={() => setIsTermsVisible(false)} style={{ background: '#14b8a6', border: 'none' }}>
            Anladım, Kapat
          </Button>
        ]}
        width={700}
        centered
        styles={{
          body: { maxHeight: '60vh', overflowY: 'auto', paddingRight: '10px', color: '#94a3b8' },
          content: { backgroundColor: '#0f172a', border: '1px solid #1e293b' },
          header: { backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b', paddingBottom: '16px' }
        }}
      >
        <div style={{ marginTop: '20px' }}>
          <Title level={5} style={{ color: '#e2e8f0' }}>1. Hizmetin Amacı ve Doğası</Title>
          <Paragraph style={{ color: '#94a3b8' }}>
            FlowLens, yazılım geliştiricilerin GitHub depolarındaki kaynak kod mimarisini görselleştirmelerine yardımcı olan <strong style={{ color: '#14b8a6'}}>açık kaynaklı</strong> bir analiz motorudur. Hizmetimiz "olduğu gibi" prensibiyle sunulmaktadır.
          </Paragraph>

          <Divider style={{ borderColor: '#1e293b' }} />

          <Title level={5} style={{ color: '#e2e8f0' }}>2. Sıfır Veri Kalıntısı ve Gizlilik</Title>
          <Paragraph style={{ color: '#94a3b8' }}>
            Sistemimiz aşağıdaki katı kurallarla çalışır:
            <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
              <li><strong>Kod Depolanmaz:</strong> Analiz edilen hiçbir dosya sunucularımızda kalıcı olarak saklanmaz.</li>
              <li><strong>Anlık İşlem:</strong> Mimari harita oluşturulduğu anda orijinal kod silinir.</li>
              <li><strong>Sadece Metadatalar:</strong> Sadece sınıf isimleri, metot adları ve aralarındaki bağlantıların haritası arayüze iletilir.</li>
            </ul>
          </Paragraph>

          <Divider style={{ borderColor: '#1e293b' }} />

          <Title level={5} style={{ color: '#e2e8f0' }}>3. GitHub Entegrasyonu ve Erişim</Title>
          <Paragraph style={{ color: '#94a3b8' }}>
            GitHub girişiniz yalnızca talep ettiğiniz projeyi indirmek ve analiz etmek için kullanılır. İzinlerinizi dilediğiniz zaman GitHub hesap ayarlarınızdan iptal edebilirsiniz.
          </Paragraph>

          <Divider style={{ borderColor: '#1e293b' }} />

          <Title level={5} style={{ color: '#e2e8f0' }}>4. Sorumluluk Reddi</Title>
          <Paragraph style={{ color: '#94a3b8' }}>
            Bu platformun kullanımı sonucunda doğabilecek veri kayıpları veya analiz hatalarından FlowLens geliştiricileri sorumlu tutulamaz.
          </Paragraph>
        </div>
      </Modal>
    </>
  );
};

export default LoginFormCard;