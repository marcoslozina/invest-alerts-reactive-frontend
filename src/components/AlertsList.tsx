import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAlerts, deleteAlert } from '../store/slides/alertsSlice';

const AlertsList = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((s) => s.alerts);

  const load = useCallback(() => {
    dispatch(fetchAlerts());
  }, [dispatch]);

  useEffect(() => {
    load(); // carga inicial
  }, [load]);

  if (loading) return <div>Cargando alertas...</div>;
  if (error) {
    return (
      <div className="space-y-2">
        <div>Error: {error}</div>
        <button className="underline" onClick={load}>Reintentar</button>
      </div>
    );
  }
  if (!items.length) {
    return (
      <div className="space-y-2">
        <div>No hay alertas aún.</div>
        <button className="underline" onClick={load}>Refrescar</button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <h2 className="font-bold text-lg">Alertas</h2>
        <button className="underline text-sm" onClick={load}>Refrescar</button>
      </div>
      <ul className="space-y-2">
        {items.map((a) => (
          <li key={a.id} className="rounded-xl p-3 border flex items-center gap-3">
            <div className="font-semibold w-20">{a.symbol}</div>
            <div className="text-sm opacity-80">
              {a.type === 'ABOVE' ? '≥' : '≤'} {a.threshold}
            </div>
            <button
              className="ml-auto underline text-sm"
              onClick={() => dispatch(deleteAlert(a.id))}
            >
              eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertsList;
