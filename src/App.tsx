import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TestPostMock from './pages/TestPostMock';
import { Layout } from './layouts/AppLayout';
import { Toaster } from 'react-hot-toast';
import Alerts from './pages/Alerts';     
const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="test-post" element={<TestPostMock />} />
          <Route path="alerts" element={<Alerts />} />  {/* 👈 nuevo */}

        </Route>
      </Routes>
    </>
  );
};

export default App;
