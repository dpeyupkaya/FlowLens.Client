/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import en from './en';
import tr from './tr';

const dictionaries = { en, tr };
const LanguageContext = createContext(null);

const reverseEnglishStrings = Object.fromEntries(
  Object.entries(en.strings).map(([turkish, english]) => [english, turkish])
);

const translate = (value, language) => {
  if (typeof value !== 'string') return value;
  const leading = value.match(/^\s*/)?.[0] ?? '';
  const trailing = value.match(/\s*$/)?.[0] ?? '';
  const core = value.trim();
  const dict = dictionaries[language]?.strings ?? {};
  const translated = dict[core] ?? (language === 'tr' ? reverseEnglishStrings[core] : undefined);
  return `${leading}${translated ?? core}${trailing}`;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => localStorage.getItem('flowlens-language') || 'tr');

  useEffect(() => {
    localStorage.setItem('flowlens-language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = 'ltr';
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t: (text) => translate(text, language),
    labels: dictionaries[language]
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};

export const useTranslation = () => {
  const { language, setLanguage, t, labels } = useLanguage();
  return { 
    t, 
    i18n: { 
      language, 
      changeLanguage: setLanguage 
    },
    labels
  };
};

export const LocalizedContent = ({ children }) => {
  const { language } = useLanguage();

  useEffect(() => {
    const root = document.getElementById('root');
    if (!root) return undefined;
    let applying = false;
    const apply = () => {
      if (applying) return;
      applying = true;
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach((node) => {
        if (!node.parentElement?.closest('[data-language-control]')) {
          const translated = translate(node.nodeValue, language);
          if (translated !== node.nodeValue) node.nodeValue = translated;
        }
      });
      root.querySelectorAll('[title], [placeholder], [aria-label]').forEach((element) => {
        ['title', 'placeholder', 'aria-label'].forEach((attribute) => {
          const current = element.getAttribute(attribute);
          if (current) {
            const translated = translate(current, language);
            if (translated !== current) element.setAttribute(attribute, translated);
          }
        });
      });
      applying = false;
    };
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(root, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [language]);

  return children;
};
