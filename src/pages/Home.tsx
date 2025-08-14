import { useEffect, useState } from 'react';
import { checkBackend, type HealthResponse } from '../services/api';

const Home = () => {
  const [backendStatus, setBackendStatus] = useState<HealthResponse | null>(null);

  useEffect(() => {
    checkBackend().then(setBackendStatus).catch(console.error);
  }, []);

  return (
    <div>
      <h1>Página Home</h1>
      {backendStatus ? (
        <pre>{JSON.stringify(backendStatus, null, 2)}</pre>
      ) : (
        <p>Chequeando backend…</p>
      )}
    </div>
  );
};

export default Home;
