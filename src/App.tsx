import React from 'react';
import { Helmet } from 'react-helmet-async';
import { AppRoutes } from './router/AppRoutes';

const App = () => {
  return (
    <>
      <Helmet>
        <title>Invest Alerts</title>
        <meta name="description" content="Sistema de alertas de precios de criptomonedas" />
      </Helmet>
      <AppRoutes />
    </>
  );
};

export default App;
