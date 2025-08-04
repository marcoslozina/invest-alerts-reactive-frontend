import React from 'react';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold text-red-500 mb-4">¡Ups! Algo salió mal.</h1>
      <p className="text-lg text-gray-600">Ocurrió un error inesperado. Por favor, intentá nuevamente más tarde.</p>
    </div>
  );
};

export default ErrorPage;
