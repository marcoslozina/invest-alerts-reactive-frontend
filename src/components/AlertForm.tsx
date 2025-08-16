import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { createAlert } from '../store/slides/alertsSlice';
import type { AlertPayload } from '../services/AlertService';

const AlertForm = () => {
  const dispatch = useAppDispatch();

  const [symbol, setSymbol] = useState<AlertPayload['symbol']>('BTC');
  const [threshold, setThreshold] = useState<number>(120000);
  const [type, setType] = useState<AlertPayload['type']>('ABOVE');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createAlert({ symbol, threshold, type }));
    // opcional: limpiar el form
    // setThreshold(0);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="flex gap-2">
        <label className="w-24">Símbolo</label>
        <select
          className="border rounded px-2 py-1"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value as AlertPayload['symbol'])}
        >
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="SOL">SOL</option>
        </select>
      </div>

      <div className="flex gap-2">
        <label className="w-24">Umbral</label>
        <input
          className="border rounded px-2 py-1"
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(+e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <label className="w-24">Tipo</label>
        <select
          className="border rounded px-2 py-1"
          value={type}
          onChange={(e) => setType(e.target.value as AlertPayload['type'])}
        >
          <option value="ABOVE">ABOVE</option>
          <option value="BELOW">BELOW</option>
        </select>
      </div>

      <button className="border rounded px-3 py-1" type="submit">
        Crear alerta
      </button>
    </form>
  );
};

export default AlertForm;
