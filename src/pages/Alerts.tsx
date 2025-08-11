import { useState } from 'react';
import { AlertForm } from '../components/AlertForm';
import { AlertsList } from '../components/AlertsList';

// 🆕 STEP 4
const Alerts = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Alertas</h1>
      <AlertForm onCreated={() => setRefreshKey(k => k + 1)} />
      <AlertsList refreshKey={refreshKey} />
    </div>
  );
};

export default Alerts;
