// src/mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  rest.post('/alerts', async (req, res, ctx) => {
    const data = await req.json();
    console.log('🧪 Mock POST /alerts recibido:', data);
    return res(ctx.status(201), ctx.json({ message: 'ok' }));
  }),
];
