// src/hooks/useAssetPrice.ts
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

interface PriceResponse {
  symbol: string;
  price: number;
  timestamp: string;
}

export const useAssetPrice = (symbol: string) => {
  const [data, setData] = useState<PriceResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get<PriceResponse>(`/assets/price?symbol=${symbol}`);
        setData(res.data);
      } catch (err) {
        const axiosError = err as AxiosError;
        console.warn('⚠️ Backend no disponible, usando MOCK');

        setError(axiosError.message || 'Error desconocido al obtener el precio');

        // fallback mock
        setData({
          symbol,
          price: 30123.45,
          timestamp: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 5000);
    return () => clearInterval(interval);
  }, [symbol]);

  return { data, loading, error };
};
