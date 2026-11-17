import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export function ExternalLink({ href, children, className = '' }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}<span aria-hidden="true" className="ml-2">↗</span>
      <span className="sr-only"> (yeni sekmede açılır)</span>
    </a>
  );
}

export function InfoPage({ title, intro, children }) {
  return (
    <main id="main-content" className="mx-auto w-full max-w-3xl flex-1 px-6 py-14 sm:py-20">
      <title>{title} | FlowLens</title>
      <meta name="description" content={intro} />
      <Link to="/" className="text-sm text-teal-300 underline-offset-4 hover:underline">← Ana sayfaya dön</Link>
      <h1 className="mt-8 text-4xl font-black tracking-tight text-slate-50 sm:text-5xl">{title}</h1>
      <p className="mt-6 text-lg leading-relaxed text-slate-300">{intro}</p>
      <div className="mt-10 space-y-9 text-base leading-8 text-slate-400 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-slate-100 [&_p+p]:mt-4">
        {children}
      </div>
    </main>
  );
}

export default function PublicLayout() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <div className="relative isolate flex min-h-svh flex-col overflow-x-clip bg-[#020617] font-sans text-slate-200 selection:bg-teal-400/25 [&_a]:focus-visible:rounded-sm [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-4 [&_a]:focus-visible:outline-teal-300">
      <a href="#main-content" className="sr-only z-50 bg-slate-950 p-4 text-teal-300 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">İçeriğe geç</a>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[75svh] bg-[radial-gradient(ellipse_at_50%_20%,rgba(20,184,166,0.10),transparent_65%)]" />
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-6 sm:px-10 sm:py-8">
        <Link to="/" aria-label="FlowLens ana sayfa" className="inline-flex items-center gap-3">
          <img src="/favicon.svg" alt="" width="40" height="40" className="size-10" />
          <span className="text-xl font-bold tracking-tight text-slate-50">Flow<span className="text-teal-400">Lens</span></span>
        </Link>
        <span className="flex items-center gap-2 text-xs font-medium text-slate-400 sm:text-sm">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-teal-400" />Bir süreliğine ara
        </span>
      </header>
      <Outlet />
      <footer className="mx-auto w-full max-w-7xl px-6 pb-7 pt-6 sm:px-10">
        <div className="flex flex-col items-center justify-between gap-5 border-t border-slate-800/80 pt-6 text-sm text-slate-400 sm:flex-row">
          <p>Eyüp Kaya’nın kişisel projesi.</p>
          <nav aria-label="Bilgi sayfaları" className="flex flex-wrap justify-center gap-x-6 gap-y-4">
            {[['/about', 'Hakkımızda'], ['/privacy', 'Gizlilik politikası'], ['/terms', 'Kullanım koşulları']].map(([to, label]) => (
              <NavLink key={to} to={to} className={({ isActive }) => `${isActive ? 'text-teal-300' : 'hover:text-teal-300'} transition-colors`}>{label}</NavLink>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
