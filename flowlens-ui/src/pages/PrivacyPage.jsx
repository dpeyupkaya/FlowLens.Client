import { ExternalLink, InfoPage } from '../layouts/PublicLayout';
import { projectLinks } from '../publicConfig';

export default function PrivacyPage() {
  return (
    <InfoPage title="Gizlilik politikası" intro="Bu sayfa, FlowLens’in geçici bekleme sürümünün nasıl çalıştığını açıklar.">
      <section>
        <h2>Bekleme süresince</h2>
        <p>Bu sürümde hesap girişi, GitHub yetkilendirmesi ve kod analizi kapalıdır. Açık sayfalar uygulamanın API’sine istek göndermez; analiz için depo ya da kaynak kod almaz. Analytics ve yeni oturum çerezi oluşturma kodları çalıştırılmaz.</p>
      </section>
      <section>
        <h2>Tarayıcı ve barındırma</h2>
        <p>Sayfanın dosyalarını sunabilmek için barındırma sağlayıcısına bağlantı kurulur. Sağlayıcı, kendi yapılandırmasına ve politikalarına bağlı olarak IP adresi, istenen adres ve tarayıcı bilgileri gibi erişim kayıtlarını işleyebilir.</p>
        <p>Önceki sürümden kalan tarayıcı verileri bulunabilir. Bekleme sürümü eski FlowLens servis çalışanını ve ona ait Workbox önbelleğini kaldırmayı dener; tarayıcı ayarları bunu engelleyebilir. Önceki çerezleri ve diğer site verilerini tarayıcınızın ayarlarından temizleyebilirsiniz.</p>
      </section>
      <section>
        <h2>Repo analizleri ve hesap bilgileri</h2>
        <p>Repo analizleri veritabanında tutulmaz. Analiz sonuçları kullanıcıya iletilir; kaynak kod dosyaları analiz sırasında geçici çalışma dizininde işlenir ve işlem sonunda bu dizini temizleme adımı çalışır.</p>
        <p>Hesap bilgileri bundan ayrıdır: kullanıcı profili, tercihler, günlük analiz sayacı ve şifrelenmiş GitHub erişim bilgileri veritabanında yer alabilir. Hizmete ara verilmesi bu kayıtların veya yedeklerinin silindiği anlamına gelmez.</p>
        <p>GitHub hesabınızda daha önce verdiğiniz FlowLens erişim iznini GitHub’ın uygulama ayarlarından gözden geçirebilir ve kaldırabilirsiniz.</p>
      </section>
      <section>
        <h2>Harici bağlantılar ve iletişim</h2>
        <p>GitHub veya kişisel portfolyo bağlantısını açtığınızda ilgili sitenin politikaları geçerli olur. Gizlilikle ilgili sorularınız için <ExternalLink href={projectLinks.portfolio} className="text-teal-300 underline underline-offset-4">Eyüp Kaya’nın portfolyosundaki iletişim kanallarını</ExternalLink> kullanabilirsiniz.</p>
      </section>
    </InfoPage>
  );
}
