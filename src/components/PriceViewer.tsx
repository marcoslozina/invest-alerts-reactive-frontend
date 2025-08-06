// src/components/PriceViewer.tsx
import React from 'react';
import { useAssetPrice } from '../hooks/useAssetPrice';
import { useTranslation } from 'react-i18next';

interface Props {
  symbol: string;
}

const PriceViewer: React.FC<Props> = ({ symbol }) => {
  const { data, loading, error } = useAssetPrice(symbol);
  const { t } = useTranslation(); // ✅ hook de i18n

  if (loading) return <p>{t('price.loading', { symbol })}</p>;
  if (error) return <p>{t('price.error')}</p>;
  if (!data) return <p>{t('price.noData')}</p>;

  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-bold">
        {t('price.title', { symbol: data.symbol })}
      </h2>
      <p className="text-green-600 text-3xl">
        ${data.price.toFixed(2)}
      </p>
      <p className="text-sm text-gray-500">
        {t('price.updated', {
          timestamp: new Date(data.timestamp).toLocaleString()
        })}
      </p>
    </div>
  );
};

export default PriceViewer;
