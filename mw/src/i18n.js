import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome to Naidu Solutions & Services",
      "tagline": "2026-Ready Industrial Crane & Automation Platform",
      "get_quote": "Get Quote",
      "services": "Services",
      "dashboard": "Client Dashboard"
    }
  },
  hi: {
    translation: {
      "welcome": "Naidu Solutions & Services में आपका स्वागत है",
      "tagline": "2026-रेडी इंडस्ट्रियल क्रेन और ऑटोमेशन प्लेटफॉर्म",
      "get_quote": "कोट प्राप्त करें",
      "services": "सेवाएं",
      "dashboard": "क्लाइंट डैशबोर्ड"
    }
  },
  mr: {
    translation: {
      "welcome": "Naidu Solutions & Services मध्ये आपले स्वागत आहे",
      "tagline": "2026-सज्ज औद्योगिक क्रेन आणि ऑटोमेशन प्लॅटफॉर्म",
      "get_quote": "कोट मिळवा",
      "services": "सेवा",
      "dashboard": "क्लायंट डॅशबोर्ड"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;