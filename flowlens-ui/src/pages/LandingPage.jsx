import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  GithubOutlined, 
  ArrowRightOutlined, 
  ApiOutlined, 
  CodeSandboxOutlined, 
  EyeOutlined,
  LinkedinOutlined
} from '@ant-design/icons';
import LanguageSelector from '../components/layout/LanguageSelector';
import TrueFocus from '../components/ui/TrueFocus';
import RotatingText from '../components/ui/RotatingText';
import { useTranslation } from '../i18n/LanguageProvider';

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } }
};

const LandingPage = () => {
  const navigate = useNavigate();
  const { t, language } = useTranslation();

  const features = [
    {
      icon: <CodeSandboxOutlined className="text-4xl text-teal-400 group-hover:text-emerald-400 transition-colors duration-500" />,
      titleKey: 'landing.features.local.title',
      descKey: 'landing.features.local.desc'
    },
    {
      icon: <ApiOutlined className="text-4xl text-teal-400 group-hover:text-emerald-400 transition-colors duration-500" />,
      titleKey: 'landing.features.roslyn.title',
      descKey: 'landing.features.roslyn.desc'
    },
    {
      icon: <EyeOutlined className="text-4xl text-teal-400 group-hover:text-emerald-400 transition-colors duration-500" />,
      titleKey: 'landing.features.maps.title',
      descKey: 'landing.features.maps.desc'
    }
  ];

  return (
    <div className="bg-[#020617] text-slate-200 font-sans min-h-screen overflow-x-hidden selection:bg-teal-500/30">
      
      <nav className="fixed top-0 w-full z-50 bg-[#020617]/70 backdrop-blur-md border-b border-slate-800/60 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
           
            <span className="text-slate-100 font-bold text-xl tracking-tight hidden sm:block">FlowLens</span>
          </div>
          <div className="flex items-center gap-6">
            <LanguageSelector />
            <button
              onClick={() => navigate('/login')}
              className="relative group hidden sm:inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-teal-500 rounded-lg overflow-hidden transition-all hover:scale-105"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="relative">{t('landing.nav.getStarted')}</span>
              <div className="absolute inset-0 rounded-lg ring-2 ring-teal-400/50 blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            </button>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-[120px] opacity-50"></div>
        </div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 flex flex-col items-center text-center max-w-4xl w-full"
        >
          <motion.div variants={fadeUp} className="mb-8">
            <TrueFocus 
              key={language}
              sentence={t('landing.hero.trueFocus')}
              manualMode={false}
              blurAmount={5}
              borderColor="#14b8a6"
              glowColor="rgba(20, 184, 166, 0.5)"
              animationDuration={0.8}
              pauseBetweenAnimations={0.2}
            />
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-slate-300 mb-4">
            <RotatingText
              texts={['C# Architecture', 'Roslyn Engine', 'Privacy First', 'Zero Cloud', 'Open Source']}
              mainClassName="px-3 md:px-4 bg-teal-500/15 text-teal-400 overflow-hidden py-1 md:py-1.5 justify-center rounded-lg border border-teal-500/30"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2500}
              splitBy="characters"
              auto
              loop
            />
          </motion.div>

          <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-12">
            {t('landing.hero.subtitle')}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
            <button
              onClick={() => navigate('/login')}
              className="group relative px-8 py-4 w-full sm:w-auto bg-teal-500 text-slate-950 font-bold text-lg rounded-xl overflow-hidden transition-transform hover:scale-[1.02] active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative flex items-center justify-center gap-2">
                {t('landing.hero.ctaPrimary')} <ArrowRightOutlined className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 rounded-xl ring-4 ring-teal-400/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>

            <a
              href="https://github.com/dpeyupkaya/FlowLens"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 w-full sm:w-auto flex items-center justify-center gap-2 text-slate-300 font-semibold text-lg rounded-xl border border-slate-700 bg-slate-800/30 hover:bg-slate-800/80 hover:text-white hover:border-slate-500 transition-all backdrop-blur-sm"
            >
              <GithubOutlined className="text-xl" /> {t('landing.hero.ctaSecondary')}
            </a>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative min-h-screen flex flex-col justify-center px-6 py-24 bg-[#020617]">
    
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '3rem 3rem',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)'
          }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight mb-4">
              {t('landing.features.title')}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
              {t('landing.features.subtitle')}
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {features.map((feature, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp}
                className="group relative p-[1px] rounded-2xl overflow-hidden bg-slate-800/50 hover:bg-gradient-to-b hover:from-teal-500/50 hover:to-emerald-500/20 transition-all duration-500"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl bg-teal-500/20 transition-opacity duration-500"></div>
                
                <div className="relative h-full bg-[#0b1120] p-8 rounded-[15px] flex flex-col gap-4 transform group-hover:-translate-y-1 transition-transform duration-300">
                  <div className="p-3 bg-slate-900/50 rounded-xl w-fit border border-white/5 group-hover:border-teal-500/30 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mt-2">{t(feature.titleKey)}</h3>
                  <p className="text-slate-400 leading-relaxed">
                    {t(feature.descKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <section className="relative flex flex-col justify-between pt-32 pb-12 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-teal-500/10 rounded-[100%] blur-[100px]"></div>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="relative z-10 flex-grow flex flex-col items-center justify-center text-center max-w-4xl mx-auto gap-10 mb-24"
        >
          <motion.h2 variants={scaleUp} className="text-4xl md:text-6xl font-black text-white tracking-tight">
            {t('landing.cta.title')}
          </motion.h2>
          
          <motion.div variants={fadeUp}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="group relative px-10 py-5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold text-xl rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(20,184,166,0.3)]"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="relative flex items-center gap-3">
                {t('landing.cta.button')} <ArrowRightOutlined className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </motion.div>
        </motion.div>

        <footer className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-800/50 text-slate-500 text-sm font-medium">
          <p>© {new Date().getFullYear()} {t('landing.footer.copyright')}</p>
          <div className="flex gap-6 mt-6 md:mt-0">
            <Link to="/about" className="hover:text-teal-400 transition-colors">
              {t('landing.footer.about')}
            </Link>
            <a href="https://github.com/dpeyupkaya" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors flex items-center gap-2">
              <GithubOutlined className="text-lg" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/dp-eyup-kaya/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors flex items-center gap-2">
              <LinkedinOutlined className="text-lg" /> LinkedIn
            </a>
          </div>
        </footer>
      </section>

    </div>
  );
};

export default LandingPage;