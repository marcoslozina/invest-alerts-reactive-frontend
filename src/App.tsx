import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import React, { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <>
      <Helmet>
        <title>Invest Alerts</title>
        <meta name="description" content="Monitor de alertas cripto en tiempo real" />
      </Helmet>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
