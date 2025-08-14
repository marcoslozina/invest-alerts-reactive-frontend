import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 5000,
});

export type HealthResponse = {
  status: string;
  message: string;
  timestamp: string;
};

export async function checkBackend(): Promise<HealthResponse> {
  const res = await api.get('/health');
  return res.data;
}
