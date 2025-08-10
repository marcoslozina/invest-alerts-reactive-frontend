// src/mocks/handlers.ts
import { rest } from 'msw';

type AlertDTO = {
  id: string;
  symbol: 'BTC' | 'ETH' | 'SOL';
  threshold: number;
  type: 'ABOVE' | 'BELOW';
  createdAt: string;
};

type HistoryEntry = { price: number; timestamp: string };

// 🧠 "DB" en memoria (dura mientras corre el dev server / SW activo)
const alertsDb: AlertDTO[] = [];

// --------- STEP 3: history ----------
function buildHistory(symbol: string): HistoryEntry[] {
  const basePrices: Record<string, number> = { BTC: 30000, ETH: 2000, SOL: 150 };
  const base = basePrices[symbol] ?? 100;
  const now = Date.now();
  return Array.from({ length: 10 }).map((_, i) => ({
    price: +(base + i * 10 + Math.random() * 15).toFixed(2),
    timestamp: new Date(now - (9 - i) * 60_000).toISOString(),
  }));
}

// --------- STEP 4: alerts (mock con “persistencia”) ----------
export const handlers = [
  // Crear alerta (ahora guarda y devuelve el objeto creado)
  rest.post('/alerts', async (req, res, ctx) => {
    const body = await req.json() as Omit<AlertDTO, 'id' | 'createdAt'>;

    const newAlert: AlertDTO = {
      id: globalThis.crypto?.randomUUID?.() ?? String(Date.now()),
      createdAt: new Date().toISOString(),
      ...body,
    };

    alertsDb.push(newAlert);
    console.log('🧪 Mock POST /alerts → guardada:', newAlert);

    return res(ctx.status(201), ctx.json(newAlert));
  }),

  // Listar alertas
  rest.get('/alerts', (_req, res, ctx) => {
    const data = [...alertsDb].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return res(ctx.status(200), ctx.json(data));
  }),

  // STEP 3: historial de precios
  rest.get('/assets/history', (req, res, ctx) => {
    const symbol = req.url.searchParams.get('symbol') || 'BTC';
    console.log(`🧪 Mock GET /assets/history?symbol=${symbol}`);
    const data = buildHistory(symbol);
    return res(ctx.status(200), ctx.json(data));
  }),
];
