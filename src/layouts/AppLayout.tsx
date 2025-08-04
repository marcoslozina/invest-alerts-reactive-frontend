import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';

export const Layout = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 shadow-md relative">
        <LanguageSwitcher />
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-wide">⚡ Invest Alerts</h1>
          <span className="text-sm opacity-90">{t('realtimeCrypto')}</span>
        </div>
      </header>

      <main className="flex-grow max-w-6xl mx-auto w-full p-4">
        <Outlet />
      </main>

      <footer className="bg-gray-200 dark:bg-gray-800 text-center text-sm text-gray-600 dark:text-gray-400 py-4">
        © {new Date().getFullYear()} Invest Alerts · Desarrollado por Marcos Lozina
      </footer>
    </div>
  );
};
