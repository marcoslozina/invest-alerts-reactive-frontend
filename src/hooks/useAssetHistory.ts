// src/hooks/useAssetHistory.ts
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

interface HistoryEntry {
  price: number;
  timestamp: string;
}

export const useAssetHistory = (symbol: string) => {
  const [data, setData] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError(null); // Limpia error previo si hubo

        const res = await axios.get<HistoryEntry[]>(`/assets/history?symbol=${symbol}`);
        setData(res.data.slice(-10)); // últimos 10 precios
      } catch (err) {
        const axiosError = err as AxiosError;
        console.warn('⚠️ Backend no disponible, usando MOCK');

        setError(axiosError.message || 'Error desconocido al obtener el historial');

        setData([
          { price: 30000, timestamp: '2025-08-04T20:30:00Z' },
          { price: 30100, timestamp: '2025-08-04T20:35:00Z' },
          { price: 30200, timestamp: '2025-08-04T20:40:00Z' },
          { price: 30150, timestamp: '2025-08-04T20:45:00Z' },
          { price: 30080, timestamp: '2025-08-04T20:50:00Z' },
          { price: 30120, timestamp: '2025-08-04T20:55:00Z' },
          { price: 30250, timestamp: '2025-08-04T21:00:00Z' },
          { price: 30300, timestamp: '2025-08-04T21:05:00Z' },
          { price: 30400, timestamp: '2025-08-04T21:10:00Z' },
          { price: 30500, timestamp: '2025-08-04T21:15:00Z' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [symbol]);

  return { data, loading, error };
};
