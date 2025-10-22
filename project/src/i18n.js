import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        ko: { translation: { 'nav.destinations': '여행지' } },
        en: { translation: { 'nav.destinations': 'Destinations' } },
        ja: { translation: { 'nav.destinations': '旅行先' } },
    },
    lng: localStorage.getItem('lang') || 'ko',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
});

export default i18n;