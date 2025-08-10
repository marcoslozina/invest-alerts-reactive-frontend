// src/services/alertsService.ts
import axios from 'axios';

export type AlertPayload = {
  symbol: string;           // "BTC" | "ETH" | ...
  threshold: number;        // valor numérico
  type: 'ABOVE' | 'BELOW';  // condición
};

export async function createAlert(payload: AlertPayload) {
  const res = await axios.post('/alerts', payload);
  return res.data; // { message: 'ok' } en el mock
}
