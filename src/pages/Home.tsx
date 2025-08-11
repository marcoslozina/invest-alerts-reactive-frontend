import { useState } from 'react';
import { PriceHistoryChart } from '../components/PriceHistoryChart';

const Home = () => {
  const [symbol, setSymbol] = useState('BTC');

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Historial de precios</h1>

      <div className="card">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="text-sm font-medium">Símbolo</label>
          <select
            className="input sm:max-w-xs"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          >
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="SOL">SOL</option>
          </select>
        </div>

        <div className="mt-5">
          <PriceHistoryChart symbol={symbol} />
        </div>
      </div>
    </div>
  );
};

export default Home;
