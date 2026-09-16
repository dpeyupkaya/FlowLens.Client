import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  ConfigProvider,
  theme,
} from 'antd';
import {
  GithubOutlined,
  ArrowRightOutlined,
  LinkedinOutlined,
  LockOutlined,
  ApartmentOutlined,
  DeploymentUnitOutlined,
  RadarChartOutlined,
  FolderOpenOutlined,
  ThunderboltOutlined,
  ApiOutlined,
  BranchesOutlined,
  ExportOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';
import HeroFlowGraph from '../components/CodeVisualizer/HeroFlowGraph';
import { useTranslation } from '../i18n/LanguageProvider';
import LanguageSelector from '../components/layout/LanguageSelector';
import SEO from '../components/SEO';

// ZARİF KADEMELİ BELİRME (STAGGERED REVEAL) BİLEŞENİ
const ScrollReveal = ({ children, delay = 0, className = "", noY = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${className} ${
        isVisible 
          ? 'opacity-100 ' + (noY ? 'scale-100' : 'translate-y-0')
          : 'opacity-0 ' + (noY ? 'scale-95' : 'translate-y-12')
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featureList = [
    {
      icon: <LockOutlined className="text-teal-400 text-2xl" />,
      titleKey: 'landing.features.item1.title',
      descKey: 'landing.features.item1.desc',
    },
    {
      icon: <RadarChartOutlined className="text-cyan-400 text-2xl" />,
      titleKey: 'landing.features.item2.title',
      descKey: 'landing.features.item2.desc',
    },
    {
      icon: <ApartmentOutlined className="text-emerald-400 text-2xl" />,
      titleKey: 'landing.features.item3.title',
      descKey: 'landing.features.item3.desc',
    },
    {
      icon: <BranchesOutlined className="text-amber-400 text-2xl" />,
      titleKey: 'landing.features.item4.title',
      descKey: 'landing.features.item4.desc',
    },
    {
      icon: <ExportOutlined className="text-indigo-400 text-2xl" />,
      titleKey: 'landing.features.item5.title',
      descKey: 'landing.features.item5.desc',
    },
    {
      icon: <ApiOutlined className="text-pink-400 text-2xl" />,
      titleKey: 'landing.features.item6.title',
      descKey: 'landing.features.item6.desc',
    },
  ];

  const stepsList = [
    {
      step: 'landing.howItWorks.step1.step',
      title: 'landing.howItWorks.step1.title',
      desc: 'landing.howItWorks.step1.desc',
      icon: <FolderOpenOutlined className="text-teal-400 text-2xl" />,
      number: '01',
    },
    {
      step: 'landing.howItWorks.step2.step',
      title: 'landing.howItWorks.step2.title',
      desc: 'landing.howItWorks.step2.desc',
      icon: <ThunderboltOutlined className="text-cyan-400 text-2xl" />,
      number: '02',
    },
    {
      step: 'landing.howItWorks.step3.step',
      title: 'landing.howItWorks.step3.title',
      desc: 'landing.howItWorks.step3.desc',
      icon: <DeploymentUnitOutlined className="text-emerald-400 text-2xl" />,
      number: '03',
    },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#14b8a6',
          borderRadius: 14,
          colorBgContainer: '#0f172a',
          colorBgLayout: '#020617',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          colorText: '#e2e8f0',
          colorTextSecondary: '#94a3b8',
        },
      }}
    >
      <SEO />
      <style>{`
        .hero-glow-radial { background: radial-gradient(circle at 50% 30%, rgba(20, 184, 166, 0.18), transparent 70%); }
        .grid-pattern-bg {
          background-image: linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px);
          background-size: 48px 48px;
        }
      `}</style>

      <div data-language-control className="min-h-screen bg-[#020617] text-slate-100 flex flex-col selection:bg-teal-500/30 selection:text-teal-200">
        <div className="fixed inset-0 grid-pattern-bg pointer-events-none z-0" />
        <div className="fixed inset-0 hero-glow-radial pointer-events-none z-0" />

        {/* NAVBAR */}
        <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#020617]/85 backdrop-blur-xl transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
            <a href="#" className="flex items-center gap-3 group text-decoration-none cursor-pointer">
              <span className="text-xl font-extrabold tracking-tight text-white font-mono">
                {t('landing.nav.brand')}
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors">
                {t('landing.nav.features')}
              </a>
              <a href="#how-it-works" className="text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors">
                {t('landing.nav.howItWorks')}
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <LanguageSelector compact />
              <Button ghost href="https://github.com/dpeyupkaya/FlowLens" target="_blank" rel="noopener noreferrer" icon={<GithubOutlined />}
                className="!border-slate-700 hover:!border-slate-500 !text-slate-200 hover:!text-white !h-10 !px-4 !rounded-xl !font-medium !backdrop-blur-sm"
              >
                {t('landing.nav.github')}
              </Button>
              <Button type="primary" onClick={() => navigate('/login')} icon={<ArrowRightOutlined />}
                className="!h-10 !px-5 !rounded-xl !font-semibold !bg-gradient-to-r !from-teal-500 !to-cyan-500 hover:!from-teal-400 hover:!to-cyan-400 !border-none !shadow-md !shadow-teal-500/25 hover:!shadow-teal-500/40 hover:!scale-105 !transition-all"
              >
                {t('landing.nav.cta')}
              </Button>
            </div>
          </div>
        </header>

        <main className="relative z-10 flex-1">
          {/* HERO SECTION */}
          <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
            <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[360px] bg-teal-500/15 rounded-full blur-[140px]" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <ScrollReveal delay={0}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 mb-8 backdrop-blur-md">
                  <span className="text-xs font-semibold text-teal-300 tracking-wide">{t('landing.hero.badge')}</span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.12] mb-6">
                  {t('landing.hero.title1')}{' '}
                  <span className="block mt-2 bg-gradient-to-r from-teal-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                    {t('landing.hero.title2')}
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <p className="max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed mb-10 font-normal">
                  {t('landing.hero.description')}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
                  <Button type="primary" size="large" icon={<ArrowRightOutlined />} onClick={() => navigate('/login')}
                    className="!h-13 !px-8 !text-base !font-bold !rounded-2xl !bg-gradient-to-r !from-teal-500 !via-teal-400 !to-cyan-500 hover:!from-teal-400 hover:!to-cyan-400 !border-none !shadow-xl !shadow-teal-500/30 hover:!shadow-teal-500/50 hover:!scale-105 !transition-all !duration-200"
                  >
                    {t('landing.hero.ctaPrimary')}
                  </Button>
                  <Button size="large" ghost href="https://github.com/dpeyupkaya/FlowLens" target="_blank" rel="noopener noreferrer" icon={<GithubOutlined />}
                    className="!h-13 !px-7 !text-base !font-semibold !rounded-2xl !border-slate-700 hover:!border-slate-500 !text-slate-200 hover:!text-white !bg-slate-900/60 hover:!bg-slate-800/80 !backdrop-blur-md hover:!scale-105 !transition-all !duration-200"
                  >
                    {t('landing.hero.ctaSecondary')}
                  </Button>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-16">
                  {[
                    { val: 'landing.stats.privacy.value', lbl: 'landing.stats.privacy.label', color: 'text-teal-400' },
                    { val: 'landing.stats.engine.value', lbl: 'landing.stats.engine.label', color: 'text-cyan-400' },
                    { val: 'landing.stats.graph.value', lbl: 'landing.stats.graph.label', color: 'text-emerald-400' },
                    { val: 'landing.stats.license.value', lbl: 'landing.stats.license.label', color: 'text-indigo-400' }
                  ].map((stat, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm text-left">
                      <div className={`text-xl sm:text-2xl font-black font-mono mb-0.5 ${stat.color}`}>{t(stat.val)}</div>
                      <div className="text-xs text-slate-400 font-medium">{t(stat.lbl)}</div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={500} noY>
                <div className="relative mx-auto w-full max-w-5xl">
                  <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-teal-500/40 via-cyan-500/20 to-slate-800/40 shadow-2xl shadow-teal-950/60">
                    <div className="overflow-hidden rounded-2xl bg-[#020617] border border-slate-800/80">
                      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-slate-800/80 bg-slate-950/90">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                          <span className="ml-2 font-mono text-xs text-slate-400 font-medium">{t('landing.hero.terminalTitle')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-teal-500/10 text-teal-300 border border-teal-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse inline-block" />
                            {t('landing.hero.interactiveHint')}
                          </span>
                        </div>
                      </div>
                      <div className="p-3 sm:p-6 bg-[#020617] select-none">
                        <HeroFlowGraph />
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* FEATURES SECTION */}
          <section id="features" className="py-24 relative overflow-hidden bg-slate-950/60 border-t border-slate-800/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal delay={0}>
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="inline-block text-xs font-bold uppercase tracking-widest text-teal-400 mb-3 font-mono">
                    {t('landing.features.eyebrow')}
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5 leading-tight">
                    {t('landing.features.title')}
                  </h2>
                  <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                    {t('landing.features.subtitle')}
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {featureList.map((item, index) => (
                  <ScrollReveal key={index} delay={(index % 3) * 150}>
                    <div className="relative group rounded-2xl p-6 sm:p-8 bg-slate-900/50 border border-slate-800/80 hover:border-teal-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-1 backdrop-blur-sm h-full">
                      <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-teal-500/50 transition-all duration-300">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-300 transition-colors">
                        {t(item.titleKey)}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {t(item.descKey)}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* HOW IT WORKS SECTION */}
          <section id="how-it-works" className="py-24 bg-[#020617] border-t border-slate-800/80 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal delay={0}>
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="inline-block text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 font-mono">
                    {t('landing.howItWorks.eyebrow')}
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5 leading-tight">
                    {t('landing.howItWorks.title')}
                  </h2>
                  <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                    {t('landing.howItWorks.subtitle')}
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {stepsList.map((step, idx) => (
                  <ScrollReveal key={idx} delay={idx * 200}>
                    <div className="relative rounded-2xl p-8 bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-sm h-full">
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center">
                          {step.icon}
                        </div>
                        <span className="text-3xl font-black text-slate-700 font-mono">
                          {step.number}
                        </span>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono block mb-2">
                        {t(step.step)}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-3">
                        {t(step.title)}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {t(step.desc)}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* COMPARISON */}
          <section className="py-24 relative overflow-hidden bg-slate-950/60 border-t border-slate-800/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal delay={0}>
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3 font-mono">
                    {t('landing.comparison.eyebrow')}
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5 leading-tight">
                    {t('landing.comparison.title')}
                  </h2>
                  <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                    {t('landing.comparison.subtitle')}
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <ScrollReveal delay={100} className="h-full">
                  <div className="rounded-2xl p-8 bg-slate-950/60 border border-red-500/20 backdrop-blur-sm h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <CloseCircleOutlined className="text-red-400 text-xl" />
                      <h3 className="text-xl font-bold text-slate-200">
                        {t('landing.comparison.legacyTitle')}
                      </h3>
                    </div>
                    <ul className="space-y-4 text-sm text-slate-400">
                      {[1, 2, 3, 4].map((num) => (
                        <li key={num} className="flex items-start gap-3">
                          <span className="text-red-400 font-bold mt-0.5">✕</span>
                          <span>{t(`landing.comparison.legacy${num}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={300} className="h-full">
                  <div className="rounded-2xl p-8 bg-gradient-to-b from-teal-950/30 to-slate-900/60 border border-teal-500/30 shadow-xl shadow-teal-950/40 backdrop-blur-sm h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <CheckCircleOutlined className="text-teal-400 text-xl" />
                      <h3 className="text-xl font-bold text-white">
                        {t('landing.comparison.flowlensTitle')}
                      </h3>
                    </div>
                    <ul className="space-y-4 text-sm text-slate-200">
                      {[1, 2, 3, 4].map((num) => (
                        <li key={num} className="flex items-start gap-3">
                          <span className="text-teal-400 font-bold mt-0.5">✓</span>
                          <span>{t(`landing.comparison.flowlens${num}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 relative bg-[#020617] border-t border-slate-800/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal delay={0} noY>
                <div className="relative overflow-hidden rounded-3xl p-8 sm:p-14 lg:p-16 border border-teal-500/30 bg-gradient-to-b from-slate-900/90 to-[#020617] shadow-2xl text-center">
                  <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-500/20 rounded-full blur-[110px]" />
                  <span className="inline-block text-xs font-bold uppercase tracking-widest text-teal-300 mb-4 font-mono">
                    {t('landing.cta.eyebrow')}
                  </span>
                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 max-w-3xl mx-auto leading-tight">
                    {t('landing.cta.title')}
                  </h2>
                  <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                    {t('landing.cta.subtitle')}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                    <Button type="primary" size="large" icon={<ArrowRightOutlined />} onClick={() => navigate('/login')}
                      className="!h-14 !px-9 !text-base !font-bold !rounded-2xl !bg-gradient-to-r !from-teal-500 !to-cyan-500 hover:!from-teal-400 hover:!to-cyan-400 !border-none !shadow-xl !shadow-teal-500/40 hover:!scale-105 !transition-all"
                    >
                      {t('landing.cta.buttonPrimary')}
                    </Button>
                    <Button size="large" ghost href="https://github.com/dpeyupkaya/FlowLens" target="_blank" rel="noopener noreferrer" icon={<GithubOutlined />}
                      className="!h-14 !px-8 !text-base !font-semibold !rounded-2xl !border-slate-700 hover:!border-slate-500 !text-slate-200 hover:!text-white !bg-slate-900/80 hover:!bg-slate-800 !backdrop-blur-md hover:!scale-105 !transition-all"
                    >
                      {t('landing.cta.buttonSecondary')}
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500 font-medium tracking-wide">
                    {t('landing.cta.note')}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </main>

        <footer className="border-t border-slate-800/80 bg-[#020617] py-14 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-slate-800/60">
              <div className="max-w-md text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-500 to-cyan-400 p-[1px]">
                    <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                      <ApartmentOutlined className="text-teal-400 text-sm" />
                    </div>
                  </div>
                  <span className="text-lg font-extrabold text-white tracking-tight font-mono">
                    {t('landing.nav.brand')}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t('landing.footer.desc')}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
                <a href="#features" className="hover:text-teal-400 transition-colors">{t('landing.nav.features')}</a>
                <a href="#how-it-works" className="hover:text-teal-400 transition-colors">{t('landing.nav.howItWorks')}</a>
                <a href="/terms" onClick={(e) => { e.preventDefault(); navigate('/terms'); }} className="hover:text-teal-400 transition-colors">
                  {t('landing.footer.linksTerms')}
                </a>
                <a href="https://github.com/dpeyupkaya/FlowLens/issues" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">
                  {t('landing.footer.githubIssues')}
                </a>
              </div>
              <div className="flex items-center gap-4 text-lg">
                <a href="https://github.com/dpeyupkaya/FlowLens" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  <GithubOutlined />
                </a>
                <a href="https://www.linkedin.com/in/dp-eyup-kaya/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#0a66c2] transition-colors">
                  <LinkedinOutlined />
                </a>
              </div>
            </div>
            <div className="pt-8 text-center text-xs text-slate-500">
              © {new Date().getFullYear()} {t('landing.footer.copyright')}
            </div>
          </div>
        </footer>

        {/* Scroll To Top Button */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-[100] flex h-12 w-12 items-center justify-center rounded-full bg-teal-500 text-white shadow-lg shadow-teal-500/30 transition-all duration-300 hover:bg-teal-400 hover:scale-110 hover:shadow-teal-500/50 active:scale-95 ${
            showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
          }`}
          aria-label="Scroll to top"
        >
          <ArrowUpOutlined className="text-xl" />
        </button>
      </div>
    </ConfigProvider>
  );
};

export default LandingPage;
