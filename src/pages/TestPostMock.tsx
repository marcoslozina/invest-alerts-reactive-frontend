import React from 'react';

const TestPostMock = () => {
  const handleClick = async () => {
    try {
      const res = await fetch('/alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symbol: 'BTC', threshold: 50000, type: 'ABOVE' }),
      });

      const data = await res.json(); // solo si el body tiene contenido
      console.log('📨 Respuesta del servidor:', data);
    } catch (err) {
      console.error('❌ Error al hacer POST /alerts:', err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test POST /alerts</h1>
      <button
        onClick={handleClick}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Enviar alerta simulada
      </button>
    </div>
  );
};

export default TestPostMock;
