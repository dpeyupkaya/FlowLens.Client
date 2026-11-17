import { Link } from 'react-router-dom';
import { ExternalLink, InfoPage } from '../layouts/PublicLayout';
import { projectLinks } from '../publicConfig';

export default function TermsOfServicePage() {
  return (
    <InfoPage title="Kullanım koşulları" intro="FlowLens’in hizmete ara verdiği dönemde açık olan sayfalar için kullanım bilgileri.">
      <section>
        <h2>Hizmetin durumu</h2>
        <p>FlowLens, kaynak kod mimarisini görselleştirmek amacıyla geliştirilen kişisel bir projedir. Hizmet geçici olarak kapalıdır; hesap girişi, GitHub entegrasyonu ve analiz işlevleri kullanılamaz. Bekleme ekranı, hakkımızda ve politika sayfaları bilgilendirme amacıyla sunulur.</p>
      </section>
      <section>
        <h2>Erişilebilirlik ve yeniden açılış</h2>
        <p>Yeniden açılış tarihi veya kesintisiz erişim taahhüdü bulunmaz. Projenin kapsamı ve bu sayfalardaki bilgiler yeniden açılış sürecinde değişebilir.</p>
      </section>
      <section>
        <h2>Kaynak kod ve bağlantılar</h2>
        <p>Kaynak kodun kullanımında ilgili depoda bulunan lisans ve bildirimler esas alınmalıdır. Harici bağlantılar üçüncü taraf sitelere götürür; bu sitelerin içeriği ve koşulları kendi sorumluluklarındadır.</p>
      </section>
      <section>
        <h2>Gizlilik ve iletişim</h2>
        <p>Bekleme sürümünün veri işleyişini <Link to="/privacy" className="text-teal-300 underline underline-offset-4">gizlilik politikası</Link> sayfasında bulabilirsiniz. Sorularınız için <ExternalLink href={projectLinks.portfolio} className="text-teal-300 underline underline-offset-4">kişisel portfolyomdaki iletişim kanallarını</ExternalLink> kullanabilirsiniz.</p>
      </section>
    </InfoPage>
  );
}
