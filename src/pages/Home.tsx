// src/pages/Home.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PriceViewer } from '../components/PriceViewer';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">{t('home.dashboard')}</h1>
      <PriceViewer symbol="BTC" />
    </main>
  );
};

export default Home;
