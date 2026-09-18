/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import en from './en';
import tr from './tr';

const dictionaries = { en, tr };
const LanguageContext = createContext(null);

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
    t: (key) => {
      const dict = dictionaries[language];
      if (!dict) return key;
      return dict[key] ?? key;
    },
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
    language,
    i18n: { 
      language, 
      changeLanguage: setLanguage 
    },
    labels
  };
};

export default LanguageProvider;