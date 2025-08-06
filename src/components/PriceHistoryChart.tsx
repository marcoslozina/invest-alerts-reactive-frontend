import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useAssetHistory } from '../hooks/useAssetHistory';
import { useTranslation } from 'react-i18next';

interface Props {
  symbol: string;
}

const PriceHistoryChart: React.FC<Props> = ({ symbol }) => {
  const { data, loading } = useAssetHistory(symbol);
  const { t } = useTranslation();

  if (loading) return <p>{t('price.loading', { symbol })}</p>;
  if (data.length === 0) return <p>{t('price.noData')}</p>;

  return (
    <div className="w-full h-64 border rounded p-4 shadow">
      <h2 className="text-lg font-semibold mb-2">{t('realtimeCrypto')}</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" tickFormatter={(t) => new Date(t).toLocaleTimeString()} />
          <YAxis />
          <Tooltip labelFormatter={(label) => new Date(label).toLocaleString()} />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceHistoryChart;
