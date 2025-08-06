import { useTranslation } from 'react-i18next';
import React from 'react';
export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLang = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLang}
      className="text-xs underline absolute top-4 right-4 hover:text-yellow-300"
    >
      {i18n.language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    </button>
  );
}
