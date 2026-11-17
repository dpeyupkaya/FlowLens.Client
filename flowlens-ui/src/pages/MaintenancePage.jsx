import { ExternalLink } from '../layouts/PublicLayout';
import { projectLinks } from '../publicConfig';

export default function MaintenancePage() {
  return (
    <main
      id="main-content"
      className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 py-12 text-center sm:py-16"
    >
      <title>Bir süreliğine ara | FlowLens</title>
      <meta
        name="description"
        content="FlowLens, çok daha derin bir deneyime dönüşmek üzere sessiz bir geliştirme sürecinde. Yeniden açıldığında nelerin değişeceğini zaman gösterecek. — Eyüp Kaya"
      />

      <div aria-hidden="true" className="mb-8 flex items-center gap-2 text-teal-400/60">
        <span className="size-2 rounded-sm border border-current" />
        <span className="h-px w-12 bg-gradient-to-r from-teal-400/60 to-slate-700" />
        <span className="relative flex size-8 items-center justify-center rounded-full border border-teal-400/30 bg-teal-400/5">
          <span className="absolute inline-flex size-3 animate-ping rounded-full bg-teal-400/40" />
          <span className="relative inline-flex size-2 rounded-full bg-teal-300" />
        </span>
        <span className="h-px w-12 bg-gradient-to-r from-slate-700 to-teal-400/60" />
        <span className="size-2 rounded-sm border border-current" />
      </div>

      <p className="mb-5 font-mono text-xs tracking-[0.2em] text-teal-300 sm:text-sm">
        FLOWLENS’TEN KÜÇÜK BİR NOT
      </p>

      <h1 className="text-[clamp(2.5rem,7.5vw,6rem)] leading-[1.05] font-black tracking-[-0.05em] text-slate-50">
        Bir süreliğine 
        <br />
        <span className="text-teal-400">ara.</span>
      </h1>

      <div className="mt-8 max-w-xl space-y-4 text-base leading-7 text-slate-400 sm:mt-10 sm:text-lg sm:leading-8">
        <p>
          Yalnızca bir fikir olarak doğan FlowLens, 250’den fazla geliştiricinin
          uğrayıp kodun labirentlerinde yolunu aramasıyla unutulmaz bir hikayeye
          dönüştü. Alışılan bu hareketliliği şimdilik hüzünlü bir sessizliğe
          bırakırken, arka planda bambaşka bir deneyimin temelleri atılıyor.
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
          Vaktini ayırıp deneyen, bir hatayı fark eden ya da sadece merakla bu
          kapıdan geçen herkese gönülden teşekkürler. Bu sessiz bekleyişin ardından
          FlowLens’in hangi yeni yolları ve bilinmeyen haritaları açacağını ise
          zaman gösterecek.
        </p>
        <p className="mt-4 font-serif text-2xl italic text-slate-50">Eyüp Kaya</p>
        <p className="mt-6 max-w-lg text-sm leading-6 text-slate-400">
          Repo analizleri veritabanında tutulmaz. Geliştirme süreci boyunca da hiçbir
          repo kaydedilmiyor veya analiz edilmiyor.
        </p>
      </div>

      <div className="mt-9 flex w-full flex-col items-stretch justify-center gap-3 min-[400px]:w-auto min-[400px]:flex-row">
        <ExternalLink
          href={projectLinks.repository}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-teal-400/30 bg-teal-400/10 px-6 text-sm font-semibold text-teal-200 transition-colors hover:bg-teal-400/20"
        >
          GitHub’da incele
        </ExternalLink>
        <ExternalLink
          href={projectLinks.portfolio}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-700 px-6 text-sm font-medium text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
        >
          Portfolyoyu incele
        </ExternalLink>
      </div>
    </main>
  );
}