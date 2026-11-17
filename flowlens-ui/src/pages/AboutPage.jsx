import { ExternalLink, InfoPage } from '../layouts/PublicLayout';
import { projectLinks } from '../publicConfig';

export default function AboutPage() {
  return (
    <InfoPage title="FlowLens hakkında" intro="Kodun yapısını, ilişkilerini ve içinden geçen yolları görünür kılmak için başladığım kişisel bir proje.">
      <section>
        <h2>Selam, ben Eyüp Kaya.</h2>
        <p>Kod yazmayı, modern teknolojileri keşfetmeyi ve fikirleri dijital dünyada hayata geçirmeyi seviyorum. FlowLens de hem kendimi geliştirmek hem de ortaya keyifli bir iş çıkarmak için hazırladığım bir proje.</p>
      </section>
      <section>
        <h2>Koddan haritaya</h2>
        <p>FlowLens, GitHub depolarındaki kaynak kodun mimarisini grafikler üzerinden keşfetmek için tasarlandı. C#, Python ve Go kodundaki sınıfları, metotları ve aralarındaki ilişkileri daha kolay takip edebilme fikri projenin merkezinde yer alıyor.</p>
      </section>
      <section>
        <h2>Şimdilik bir ara</h2>
        <p>Hizmete geçici olarak ara veriyorum. Bu süreçte giriş, GitHub bağlantısı ve kod analizi kullanılamıyor. Projenin hikâyesi ve bilgi sayfaları burada kalıyor.</p>
      </section>
      <section>
        <h2>Yollarımız kesişsin</h2>
        <p>Projeyi incelemek veya diğer çalışmalarımı görmek istersen:</p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-teal-300">
          <ExternalLink href={projectLinks.repository}>GitHub deposu</ExternalLink>
          <ExternalLink href={projectLinks.portfolio}>Kişisel portfolyom</ExternalLink>
        </div>
      </section>
    </InfoPage>
  );
}
