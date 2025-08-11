// 🆕 STEP 5
import { useEffect, useRef, useState } from 'react';

export type FiredAlert = {
  id: string;
  symbol: 'BTC' | 'ETH' | 'SOL';
  threshold: number;
  type: 'ABOVE' | 'BELOW';
  price: number;
  firedAt: string; // ISO
};

type Options = {
  url?: string;
  simulateInDev?: boolean;    // default: true
  maxEvents?: number;         // default: 50
  reconnectMs?: number;       // default: 2000
};

function makeFake(symbols: Array<FiredAlert['symbol']>): FiredAlert {
  const sy = symbols[Math.floor(Math.random() * symbols.length)];
  const base = sy === 'BTC' ? 30000 : sy === 'ETH' ? 2000 : 150;
  const price = +(base + (Math.random() - 0.5) * base * 0.02).toFixed(2);
  const above = Math.random() > 0.5;
  const threshold = +(price + (above ? -1 : +1) * Math.random() * (base * 0.01)).toFixed(2);
  return {
    id: crypto.randomUUID?.() ?? String(Date.now()),
    symbol: sy,
    threshold,
    type: above ? 'ABOVE' : 'BELOW',
    price,
    firedAt: new Date().toISOString(),
  };
}

export function useAlertStream(opts: Options = {}) {
  const {
    url = '/alerts/stream',
    simulateInDev = true,
    maxEvents = 50,
    reconnectMs = 2000,
  } = opts;

  const [events, setEvents] = useState<FiredAlert[]>([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const esRef = useRef<EventSource | null>(null);
  const simTimerRef = useRef<number | null>(null);
  const reconnectRef = useRef<number | null>(null);
  const firstMessageTimerRef = useRef<number | null>(null);

  useEffect(() => {
    // Limpia todo helper
    const clearAll = () => {
      if (esRef.current) { esRef.current.close(); esRef.current = null; }
      if (simTimerRef.current) { clearInterval(simTimerRef.current); simTimerRef.current = null; }
      if (reconnectRef.current) { clearTimeout(reconnectRef.current); reconnectRef.current = null; }
      if (firstMessageTimerRef.current) { clearTimeout(firstMessageTimerRef.current); firstMessageTimerRef.current = null; }
    };

    const startSim = () => {
      if (!simulateInDev) return;
      if (!import.meta.env.DEV) return; // simulador solo en dev
      if (simTimerRef.current) return;
      setConnected(true);
      simTimerRef.current = window.setInterval(() => {
        const fake = makeFake(['BTC', 'ETH', 'SOL']);
        setEvents(prev => [fake, ...prev].slice(0, maxEvents));
      }, 2500);
    };

    const startSSE = () => {
      try {
        const es = new EventSource(url);
        esRef.current = es;
        setConnected(false);
        setError(null);

        // Si en 1.5s no llega nada, y estamos en DEV, arrancamos simulación
        firstMessageTimerRef.current = window.setTimeout(() => {
          if (!connected && simulateInDev && import.meta.env.DEV) startSim();
        }, 1500);

        es.onopen = () => {
          setConnected(true);
          // si se conectó el real, apagamos simulador
          if (simTimerRef.current) { clearInterval(simTimerRef.current); simTimerRef.current = null; }
        };

        es.onmessage = (e) => {
          try {
            const payload = JSON.parse(e.data) as FiredAlert;
            setEvents(prev => [payload, ...prev].slice(0, maxEvents));
          } catch { /* ignore parse errors */ }
        };

        es.onerror = () => {
          setConnected(false);
          setError('SSE connection error');
          es.close();
          // si falla, intentamos reconectar y (en dev) simulamos
          if (simulateInDev && import.meta.env.DEV) startSim();
          reconnectRef.current = window.setTimeout(() => startSSE(), reconnectMs);
        };
      } catch (err: any) {
        setError(err?.message ?? 'SSE init error');
        if (simulateInDev && import.meta.env.DEV) startSim();
        reconnectRef.current = window.setTimeout(() => startSSE(), reconnectMs);
      }
    };

    startSSE();
    return () => { clearAll(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, simulateInDev, maxEvents, reconnectMs]);

  return { events, connected, error };
}
