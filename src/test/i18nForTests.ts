import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'es',
  fallbackLng: 'es',
  debug: false,
  resources: {
    es: {
      translation: {
        price: {
          loading: 'Cargando...',
        },
      },
    },
  },
});

export default i18n;
