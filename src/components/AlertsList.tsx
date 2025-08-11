import { useEffect, useState } from 'react';
import { getAlerts, AlertDTO } from '../services/AlertService';

// 🆕 STEP 4
export function AlertsList({ refreshKey }: { refreshKey: number }) {
  const [items, setItems] = useState<AlertDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const data = await getAlerts();
        if (alive) setItems(data);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [refreshKey]);

  if (loading) return <p>Cargando alertas…</p>;
  if (!Array.isArray(items) || !items.length) return <p className="text-sm text-gray-500">No hay alertas registradas.</p>;

  return (
    <ul className="mt-4 space-y-2">
      {items.map(a => (
        <li key={a.id} className="border rounded p-3">
          <div className="text-sm">
            <b>{a.symbol}</b> — {a.type} — {a.threshold}
          </div>
          <div className="text-xs text-gray-500">{new Date(a.createdAt).toLocaleString()}</div>
        </li>
      ))}
    </ul>
  );
}
