// src/components/PriceHistoryChart.tsx
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useAssetHistory } from '../hooks/useAssetHistory';

export const PriceHistoryChart = ({ symbol }: { symbol: string }) => {
  const { data, loading, error } = useAssetHistory(symbol);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!Array.isArray(data)) return <p className="text-red-500">⚠️ Los datos no son válidos.</p>;


  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="timestamp" />
        <YAxis dataKey="price" />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};
