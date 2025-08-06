import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TestPostMock from './pages/TestPostMock';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test-post" element={<TestPostMock />} />
    </Routes>
  );
};

export default App;
