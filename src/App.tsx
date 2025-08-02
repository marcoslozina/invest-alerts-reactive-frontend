import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
const Home = React.lazy(() => import('./pages/Home'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const App = () => {
  return (
    <>
      <Helmet>
        <title>Invest Alerts</title>
        <meta name="description" content="Sistema de alertas de precios de criptomonedas" />
      </Helmet>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
