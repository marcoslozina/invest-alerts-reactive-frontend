// 🆕 STEP 5 (opcional)
import { useAlertStream } from '../hooks/useAlertStream';

const LiveAlerts = () => {
  const { events, connected, error } = useAlertStream();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Alertas en tiempo real</h1>
      <div className="mb-3 text-sm">
        Estado: {connected ? '🟢 Conectado' : '🟡 Conectando…'} {error && <span className="text-red-600">({error})</span>}
      </div>
      {!events.length ? (
        <p className="text-sm text-gray-500">Aún no hay eventos…</p>
      ) : (
        <ul className="space-y-2">
          {events.map(a => (
            <li key={a.id} className="border rounded p-3">
              <div className="text-sm">
                <b>{a.symbol}</b> — {a.type} — umbral {a.threshold} — <span className="font-mono">{a.price}</span>
              </div>
              <div className="text-xs text-gray-500">{new Date(a.firedAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LiveAlerts;
