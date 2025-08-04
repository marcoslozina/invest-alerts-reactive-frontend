import React from 'react';
import PriceViewer from '../components/PriceViewer';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{t('home.title')}</h1>
      <PriceViewer />
    </div>
  );
}
