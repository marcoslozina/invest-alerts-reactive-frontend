import { rest } from 'msw';

type AlertDTO = {
  id: string;
  symbol: 'BTC' | 'ETH' | 'SOL';
  threshold: number;
  type: 'ABOVE' | 'BELOW';
  createdAt: string;
};

type HistoryEntry = { price: number; timestamp: string };

// 🆕 STEP 4: “DB” en memoria
const alertsDb: AlertDTO[] = [];

// (STEP 3) Generador de historial
function buildHistory(symbol: string): HistoryEntry[] {
  const basePrices: Record<string, number> = { BTC: 30000, ETH: 2000, SOL: 150 };
  const base = basePrices[symbol] ?? 100;
  const now = Date.now();
  return Array.from({ length: 10 }).map((_, i) => ({
    price: +(base + i * 10 + Math.random() * 15).toFixed(2),
    timestamp: new Date(now - (9 - i) * 60_000).toISOString(),
  }));
}

export const handlers = [
  // 🆕 STEP 4: Crear alerta (persistencia en memoria)
  rest.post('/alerts', async (req, res, ctx) => {
    const body = (await req.json()) as Omit<AlertDTO, 'id' | 'createdAt'>;
    const newAlert: AlertDTO = {
      id: globalThis.crypto?.randomUUID?.() ?? String(Date.now()),
      createdAt: new Date().toISOString(),
      symbol: body.symbol,
      threshold: Number(body.threshold),
      type: body.type,
    };
    alertsDb.push(newAlert);
    return res(ctx.status(201), ctx.json(newAlert));
  }),

  // 🆕 STEP 4: Listar alertas
  rest.get('/alerts', (_req, res, ctx) => {
    const data = [...alertsDb].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return res(ctx.status(200), ctx.json(data)); // array
  }),

  // 🆕 STEP 6: Actualizar alerta (threshold/type)
  rest.put('/alerts/:id', async (req, res, ctx) => {
    const { id } = req.params as { id: string };
    const body = (await req.json()) as Partial<AlertDTO>;
    const idx = alertsDb.findIndex(a => a.id === id);
    if (idx === -1) return res(ctx.status(404), ctx.json({ message: 'Not found' }));

    const patch: Partial<AlertDTO> = {};
    if (typeof body.threshold === 'number' && Number.isFinite(body.threshold) && body.threshold > 0) {
      patch.threshold = body.threshold;
    }
    if (body.type === 'ABOVE' || body.type === 'BELOW') {
      patch.type = body.type;
    }
    alertsDb[idx] = { ...alertsDb[idx], ...patch };
    return res(ctx.status(200), ctx.json(alertsDb[idx]));
  }),

  // 🆕 STEP 6: Eliminar alerta
  rest.delete('/alerts/:id', (req, res, ctx) => {
    const { id } = req.params as { id: string };
    const idx = alertsDb.findIndex(a => a.id === id);
    if (idx === -1) return res(ctx.status(404), ctx.json({ message: 'Not found' }));
    alertsDb.splice(idx, 1);
    return res(ctx.status(204));
  }),

  // (STEP 3) Historial de precios
  rest.get('/assets/history', (req, res, ctx) => {
    const symbol = req.url.searchParams.get('symbol') || 'BTC';
    const data = buildHistory(symbol);
    return res(ctx.status(200), ctx.json(data));
  }),
];
