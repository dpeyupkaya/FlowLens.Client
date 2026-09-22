import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeftOutlined,
  CodeOutlined,
  MailOutlined,
  GithubOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useTranslation } from '../i18n/LanguageProvider';
import LanguageSelector from '../components/layout/LanguageSelector';
import { Helmet } from 'react-helmet-async';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
};

const AboutPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="bg-[#020617] text-slate-200 font-sans min-h-screen overflow-x-hidden selection:bg-teal-500/30">
      <Helmet>
        <title>{t('about.title')} | FlowLens</title>
        <meta name="description" content={t('about.subtitle')} />
        <meta name="keywords" content="FlowLens, C#, Python, Go, Code Architecture, Code Visualization, Developer Tool, Eyüp Kaya" />
        <meta property="og:title" content={`${t('about.title')} | FlowLens`} />
        <meta property="og:description" content={t('about.subtitle')} />
        <meta property="og:type" content="website" />
        <meta name="author" content="Eyüp Kaya" />
      </Helmet>
      
      <nav className="fixed top-0 w-full z-50 bg-[#020617]/70 backdrop-blur-md border-b border-slate-800/60">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors text-sm font-medium"
          >
            <ArrowLeftOutlined /> {t('about.backToHome')}
          </button>
          <LanguageSelector />
        </div>
      </nav>

      <section className="pt-32 pb-16 px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeUp} className="mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium">
              {t('common.about')}
            </div>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
            {t('about.title')}
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t('about.subtitle')}
          </motion.p>
        </motion.div>
      </section>

      <section className="px-6 pb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={stagger}
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <motion.div
            variants={fadeUp}
            className="md:col-span-2 group relative p-[1px] rounded-2xl overflow-hidden bg-slate-800/50 hover:bg-gradient-to-b hover:from-teal-500/30 hover:to-emerald-500/10 transition-all duration-500"
          >
            <div className="relative h-full bg-[#0b1120] p-8 rounded-[15px] flex flex-col gap-4">
              <div className="p-3 bg-slate-900/50 rounded-xl w-fit border border-white/5 group-hover:border-teal-500/30 transition-colors duration-300">
                <UserOutlined className="text-2xl text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-100">{t('about.devTitle')}</h3>
              <div className="text-slate-400 leading-relaxed space-y-4">
                <p>{t('about.devText1')}</p>
                <p>{t('about.devText2')}</p>
                <p>{t('about.devText3')}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="group relative p-[1px] rounded-2xl overflow-hidden bg-slate-800/50 hover:bg-gradient-to-b hover:from-teal-500/30 hover:to-emerald-500/10 transition-all duration-500"
          >
            <div className="relative h-full bg-[#0b1120] p-8 rounded-[15px] flex flex-col gap-4">
              <div className="p-3 bg-slate-900/50 rounded-xl w-fit border border-white/5 group-hover:border-teal-500/30 transition-colors duration-300">
                <CodeOutlined className="text-2xl text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-100">{t('about.techTitle')}</h3>
              <p className="text-slate-400 leading-relaxed">{t('about.techText')}</p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="group relative p-[1px] rounded-2xl overflow-hidden bg-slate-800/50 hover:bg-gradient-to-b hover:from-teal-500/30 hover:to-emerald-500/10 transition-all duration-500"
          >
            <div className="relative h-full bg-[#0b1120] p-8 rounded-[15px] flex flex-col gap-4">
              <div className="p-3 bg-slate-900/50 rounded-xl w-fit border border-white/5 group-hover:border-teal-500/30 transition-colors duration-300">
                <MailOutlined className="text-2xl text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-100">{t('about.contactTitle')}</h3>
              <p className="text-slate-400 leading-relaxed">{t('about.contactText')}</p>
              <div className="flex gap-4 mt-2">
                <a href="https://github.com/dpeyupkaya" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-400 transition-colors text-2xl">
                  <GithubOutlined />
                </a>
                <a href="https://www.linkedin.com/in/dp-eyup-kaya/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-400 transition-colors text-2xl">
                  <LinkedinOutlined />
                </a>
                <a href="https://www.instagram.com/kaya_eyuup" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-400 transition-colors text-2xl">
                  <InstagramOutlined />
                </a>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/50 py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} {t('landing.footer.copyright')}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="https://github.com/dpeyupkaya" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors flex items-center gap-2">
              <GithubOutlined /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/dp-eyup-kaya/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors flex items-center gap-2">
              <LinkedinOutlined /> LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
