import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './lannguages/en/translation.json';
import translationCS from './lannguages/cz/translation.json';
import translationSK from './lannguages/sk/translation.json';

const resources = {
  en: { translation: translationEN },
  cz: { translation: translationCS },
  sk: { translation: translationSK }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
