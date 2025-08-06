// src/test/i18nForTests.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'es',
  fallbackLng: 'es',
  interpolation: { escapeValue: false },
  resources: {
    es: {
      translation: {
        price: {
          loading: 'Cargando precio de {{symbol}}...',
          error: 'Error al cargar el precio',
          noData: 'No hay datos disponibles.',
          title: 'Precio actual de {{symbol}}',
          updated: 'Actualizado: {{timestamp}}'
        }
      }
    },
    en: {
      translation: {
        price: {
          loading: 'Loading price of {{symbol}}...',
          error: 'Failed to load price',
          noData: 'No data available.',
          title: 'Current price of {{symbol}}',
          updated: 'Last updated: {{timestamp}}'
        }
      }
    }
  }
});

export default i18n;
