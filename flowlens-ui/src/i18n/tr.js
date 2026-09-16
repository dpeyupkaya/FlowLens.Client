import en from './en';

export const landingTr = {
  'landing.nav.brand': 'FlowLens',
  'landing.nav.badge': 'Açık Kaynak v1.0',
  'landing.nav.features': 'Özellikler',
  'landing.nav.howItWorks': 'Nasıl Çalışır',
  'landing.nav.tech': 'Teknolojiler',
  'landing.nav.github': 'GitHub',
  'landing.nav.cta': 'Analiz Et',

  // Hero
  'landing.hero.badge': '⚡ Roslyn AST Gücüyle • %100 Yerel & Gizlilik Odaklı',
  'landing.hero.title1': 'C# Kod Mimarinizi',
  'landing.hero.title2': 'Görsel Bir Haritaya Dönüştürün',
  'landing.hero.description': "FlowLens, karmaşık C# projelerinizi Roslyn motoruyla analiz ederek anlaşılır, interaktif 2D mimari haritalara dönüştürür. Ne nerede, neye bağlı anında görün. Kodunuz asla makinenizden dışarı çıkmaz.",
  'landing.hero.ctaPrimary': 'Hemen Analiz Başlat',
  'landing.hero.ctaSecondary': "GitHub'da İncele",
  'landing.hero.interactiveHint': 'Düğümleri sürükleyerek mimari akışı deneyimleyin',
  'landing.hero.terminalTitle': 'FlowLens Runtime Studio — 2D Canlı Mimari Tuvali',

  // Hero Stats
  'landing.stats.privacy.value': '%100 Yerel',
  'landing.stats.privacy.label': 'Sıfır Veri Saklama',
  'landing.stats.engine.value': 'Roslyn AST',
  'landing.stats.engine.label': 'C# & .NET 9 Derin Analiz',
  'landing.stats.graph.value': '2D İnteraktif',
  'landing.stats.graph.label': 'Canlı Bağımlılık Haritası',
  'landing.stats.license.value': 'MIT Lisanslı',
  'landing.stats.license.label': 'Açık Kaynak & Şeffaf',

  // Tech Stack Ribbon
  'landing.tech.title': 'Modern .NET Ekosistemi İçin Tasarlandı',
  'landing.tech.csharp': 'C# 12 & .NET 9',
  'landing.tech.roslyn': 'Microsoft Roslyn Platform',
  'landing.tech.react': 'React 19 & Ant Design',
  'landing.tech.privacy': 'Bellek İçi (RAM) Analiz',

  // Features
  'landing.features.eyebrow': 'ÖNE ÇIKAN ÖZELLİKLER',
  'landing.features.title': 'Karmaşık Kod Yapılarını Sade ve Anlaşılır Kılın',
  'landing.features.subtitle': 'FlowLens, C# geliştiricileri ve mimarlar için kod inceleme, teknik borç tespiti ve ekip oryantasyonunu zahmetsiz hale getirir.',

  'landing.features.item1.title': 'Gizlilik Odaklı & Sıfır Veri Saklama',
  'landing.features.item1.desc': 'Kaynak kodlarınız sunucuda veya veritabanında asla kalıcı olarak depolanmaz. Kod yalnızca RAM üzerinde işlenir ve grafik üretildiği anda bellekten silinir.',

  'landing.features.item2.title': 'Roslyn Semantik Analiz Motoru',
  'landing.features.item2.desc': "Basit metin eşleştirme yerine Microsoft Roslyn derleyici altyapısını kullanarak sınıf, arayüz, kalıtım ve metot çağrılarını %100 doğrulukla ayrıştırır.",

  'landing.features.item3.title': '2D İnteraktif Mimari Tuvali',
  'landing.features.item3.desc': 'Bağımlılıkları sürükle-bırak düğümlerle inceleyin, seviye filtreleri uygulayın, yakınlaştırın ve Clean Architecture katmanlarınızı berrak şekilde görün.',

  'landing.features.item4.title': 'Döngüsel Bağımlılık & Mimari Riskler',
  'landing.features.item4.desc': 'Katman kurallarını ihlal eden ters bağımlılıkları, döngüsel çağrıları (circular dependencies) ve spagetti bağlantıları saniyeler içinde açığa çıkarın.',

  'landing.features.item5.title': 'Yüksek Çözünürlüklü Dışa Aktarma',
  'landing.features.item5.desc': "Hazırladığınız mimari diyagramları PNG, SVG ve JSON formatlarında dışa aktararak dokümantasyonlarınıza, pull request'lerinize veya sunumlarınıza ekleyin.",

  'landing.features.item6.title': 'Doğrudan GitHub Entegrasyonu',
  'landing.features.item6.desc': 'Açık veya özel GitHub depolarınızı tek tıkla analiz edin. Yeni versiyonlar ve pull requestler öncesinde mimari etkileri güvenle simüle edin.',

  // How It Works
  'landing.howItWorks.eyebrow': 'İŞ AKIŞI',
  'landing.howItWorks.title': '3 Sade Adımda Mimarinizi Görselleştirin',
  'landing.howItWorks.subtitle': 'Karmaşık kurulumlar, konfigürasyon dosyaları veya saatler süren işlemler yok.',

  'landing.howItWorks.step1.step': 'ADIM 01',
  'landing.howItWorks.step1.title': 'Deponuzu Bağlayın',
  'landing.howItWorks.step1.desc': 'GitHub hesabınızla tek tıkla güvenli oturum açın ve analiz etmek istediğiniz C# projesini listenizden seçin.',

  'landing.howItWorks.step2.step': 'ADIM 02',
  'landing.howItWorks.step2.title': 'Roslyn Derin Analizi',
  'landing.howItWorks.step2.desc': 'Roslyn analiz motorumuz kodunuzun sözdizimsel ağacını bellek üzerinde tarayarak bağımlılık matrisini saniyeler içinde oluşturur.',

  'landing.howItWorks.step3.step': 'ADIM 03',
  'landing.howItWorks.step3.title': 'İnteraktif Olarak Keşfedin',
  'landing.howItWorks.step3.desc': 'Üretilen 2D diyagram üzerinde gezinin, sınıfları izole edin, metot çağrılarını filtreleyin ve mimari içgörüler kazanın.',

  // Comparison
  'landing.comparison.eyebrow': 'NEDEN FLOWLENS?',
  'landing.comparison.title': 'Geleneksel Kod Okuma vs FlowLens Görselleştirme',
  'landing.comparison.subtitle': 'Büyük kod tabanlarında kaybolmak yerine mimariyi tek bakışta kavrayın.',
  'landing.comparison.legacyTitle': 'Geleneksel Yöntem',
  'landing.comparison.legacy1': 'Yüzlerce dosya ve klasör arasında kaybolma',
  'landing.comparison.legacy2': 'Eski kalmış, manuel çizilmiş statik diyagramlar',
  'landing.comparison.legacy3': 'Haftalar süren yeni geliştirici oryantasyon süreci',
  'landing.comparison.legacy4': 'Görünmeyen döngüsel bağımlılıklar ve spagetti kod',
  'landing.comparison.flowlensTitle': 'FlowLens Deneyimi',
  'landing.comparison.flowlens1': 'Tüm codebase için tek ekranda canlı 2D harita',
  'landing.comparison.flowlens2': 'Doğrudan Roslyn AST ile %100 güncel mimari',
  'landing.comparison.flowlens3': 'Dakikalar içinde yeni ekip üyelerinin projeyi kavraması',
  'landing.comparison.flowlens4': 'Tek tıkla döngüsel bağımlılık ve katman ihlali tespiti',

  // CTA
  'landing.cta.eyebrow': 'AÇIK KAYNAK • YEREL GİZLİLİK • ÜCRETSİZ',
  'landing.cta.title': 'Kod Mimarinizi Bugün Keşfetmeye Başlayın',
  'landing.cta.subtitle': 'Karmaşık C# projelerini saniyeler içinde anlaşılır kılın. Kurulum yok, kredi kartı gerekmez, veri sızıntısı riski sıfırdır.',
  'landing.cta.buttonPrimary': 'Analize Başla — Ücretsiz',
  'landing.cta.buttonSecondary': "GitHub'da Yıldızla",
  'landing.cta.note': 'MIT Lisanslı • Sıfır Kod Depolama • Topluluk Odaklı Açık Kaynak Proje',

  // Footer
  'landing.footer.desc': 'C# projeleri için gizlilik odaklı, Roslyn tabanlı statik kod analizi ve 2D interaktif mimari görselleştirme platformu.',
  'landing.footer.productTitle': 'Ürün',
  'landing.footer.linksTerms': 'Kullanım Şartları & Gizlilik',
  'landing.footer.linksDashboard': 'Kontrol Paneli',
  'landing.footer.communityTitle': 'Topluluk & Destek',
  'landing.footer.githubIssues': 'Hata Bildir / Katkıda Bulun',
  'landing.footer.githubDiscussions': 'GitHub Tartışmaları',
  'landing.footer.copyright': 'FlowLens. Tüm hakları saklıdır. MIT Lisansı ile açık kaynak olarak sunulmaktadır.'
};

const tr = {
  language: 'Dil',
  turkish: 'Türkçe',
  english: 'English',
  strings: {
    ...Object.fromEntries(Object.keys(en.strings).map((key) => [key, key])),
    ...landingTr
  }
};

export default tr;
