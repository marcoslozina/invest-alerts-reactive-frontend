import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TestPostMock from './pages/TestPostMock';
import { Layout } from './layouts/AppLayout';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="test-post" element={<TestPostMock />} />
      </Route>
    </Routes>
  );
};

export default App;
