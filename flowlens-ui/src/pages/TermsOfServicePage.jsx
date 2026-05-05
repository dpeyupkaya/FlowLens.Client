import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Layout, 
  Typography, 
  Button, 
  ConfigProvider, 
  theme,
  Divider,
  Space
} from 'antd';
import { 
  ArrowLeftOutlined,
  CodeOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

const TermsOfServicePage = () => {
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
          padding: '0 50px',
          background: 'rgba(2, 6, 23, 0.9)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #1e293b'
        }}>
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/')}
            style={{ color: '#94a3b8', marginRight: '20px' }}
          >
            Ana Sayfaya Dön
          </Button>
        
        </Header>

        <Content style={{ padding: '60px 20px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ 
            maxWidth: '800px', 
            width: '100%', 
            background: '#0f172a', 
            padding: '50px', 
            borderRadius: '16px',
            border: '1px solid #1e293b',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
          }}>
            
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <SafetyCertificateOutlined style={{ fontSize: '48px', color: '#14b8a6', marginBottom: '16px' }} />
              <Title level={2} style={{ color: '#fff', margin: 0 }}>Kullanım Şartları ve Gizlilik</Title>
              <Text style={{ color: '#64748b' }}>Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}</Text>
            </div>

            <Typography className="terms-typography">
              
              <Title level={4} style={{ color: '#e2e8f0' }}>1. Hizmetin Amacı ve Doğası</Title>
              <Paragraph style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.7' }}>
                FlowLens, yazılım geliştiricilerin GitHub depolarındaki kaynak kod mimarisini görselleştirmelerine yardımcı olan <strong style={{ color: '#14b8a6'}}>açık kaynaklı</strong> bir analiz motorudur. Hizmetimiz, topluluk destekli olup "olduğu gibi" (as is) prensibiyle, herhangi bir garanti verilmeksizin sunulmaktadır.
              </Paragraph>

              <Divider style={{ borderColor: '#1e293b' }} />

              <Title level={4} style={{ color: '#e2e8f0' }}>2. Sıfır Veri Kalıntısı ve Gizlilik</Title>
              <Paragraph style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.7' }}>
                FlowLens için en yüksek öncelik kodunuzun güvenliğidir. Sistemimiz aşağıdaki katı kurallarla çalışır:
                <ul style={{ marginTop: '10px' }}>
                  <li><strong>Kod Depolanmaz:</strong> Analiz edilen hiçbir C# veya diğer dil dosyası, kaynak kod metni veya veri parçacığı sunucularımızda veya veri tabanımızda kalıcı olarak saklanmaz.</li>
                  <li><strong>Anlık İşlem:</strong> Kodunuz bellek (RAM) üzerinde analiz edilir ve mimari harita (grafik düğümleri) oluşturulduğu anda orijinal kod silinir.</li>
                  <li><strong>Sadece Metadatalar:</strong> Sistem sadece sınıf isimleri, metot adları ve aralarındaki bağlantıların haritasını (metadata) kullanıcı arayüzüne iletmek üzere geçici olarak işler.</li>
                </ul>
              </Paragraph>

              <Divider style={{ borderColor: '#1e293b' }} />

              <Title level={4} style={{ color: '#e2e8f0' }}>3. GitHub Entegrasyonu ve Erişim</Title>
              <Paragraph style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.7' }}>
                Analiz yapabilmemiz için GitHub hesabınızla giriş yapmanız ve depolarınıza erişim izni vermeniz gerekmektedir. Bu izin (Access Token), yalnızca talep ettiğiniz projeyi indirmek ve analiz etmek için kullanılır. İzinlerinizi dilediğiniz zaman GitHub hesap ayarlarınızdan (Applications) iptal edebilirsiniz.
              </Paragraph>

              <Divider style={{ borderColor: '#1e293b' }} />

              <Title level={4} style={{ color: '#e2e8f0' }}>4. Sorumluluk Reddi (Açık Kaynak Lisansı)</Title>
              <Paragraph style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.7' }}>
                FlowLens MIT (veya ilgili açık kaynak) lisansı altında sunulmaktadır. Bu platformun kullanımı sonucunda doğabilecek veri kayıpları, analiz hataları veya dolaylı zararlardan FlowLens geliştiricileri veya katkıda bulunanlar sorumlu tutulamaz. Kodunuzun yedeğini almak tamamen sizin sorumluluğunuzdadır.
              </Paragraph>

              <Divider style={{ borderColor: '#1e293b' }} />

              <Title level={4} style={{ color: '#e2e8f0' }}>5. Kötüye Kullanım</Title>
              <Paragraph style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.7' }}>
                FlowLens analiz motorunu, platformun altyapısına zarar verecek şekilde (örneğin DDoS saldırıları, otomatik botlarla aşırı yüklenme yaratma) kullanmak yasaktır. Hizmet kalitesini korumak adına, aşırı istek gönderen hesapların veya IP adreslerinin erişimi sınırlandırılabilir.
              </Paragraph>

              <Divider style={{ borderColor: '#1e293b' }} />

              <Title level={4} style={{ color: '#e2e8f0' }}>6. Değişiklikler ve İletişim</Title>
              <Paragraph style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.7' }}>
                Bu kullanım şartları, projenin gelişimine (yeni dillerin eklenmesi, mimari değişiklikler) paralel olarak güncellenebilir. Projeye katkıda bulunmak, hata bildirmek veya şartlarla ilgili soru sormak için lütfen GitHub depomuz üzerinden <strong>Issue</strong> oluşturun.
              </Paragraph>

            </Typography>


          </div>
        </Content>

        <Footer style={{ 
          textAlign: 'center', 
          background: '#020617', 
          borderTop: '1px solid #1e293b', 
          color: '#475569',
          padding: '30px 0'
        }}>
          <Space direction="vertical" size="small">
            <Text style={{ color: '#475569' }}>FlowLens — Açık Kaynaklı Kod Analiz Motoru</Text>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              Kodunuz güvende. Mimariniz sahnede.
            </Text>
          </Space>
        </Footer>

      </Layout>
    </ConfigProvider>
  );
};

export default TermsOfServicePage;