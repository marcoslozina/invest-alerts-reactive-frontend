import { useState } from 'react';
import { PriceHistoryChart } from '../components/PriceHistoryChart';

const Home = () => {
  const [symbol, setSymbol] = useState('BTC');

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Historial de precios</h1>

      <select
        className="mb-4 border p-2"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      >
        <option value="BTC">BTC</option>
        <option value="ETH">ETH</option>
        <option value="SOL">SOL</option>
      </select>

      <PriceHistoryChart symbol={symbol} />
    </div>
  );
};

export default Home;
