import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../layouts/AppLayout';

const Home = React.lazy(() => import('../pages/Home'));
const NotFound = React.lazy(() => import('../pages/NotFound'));
const TestPostMock = React.lazy(() => import('../pages/TestPostMock')); // ✅ FALTABA ESTA LÍNEA

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/test-post" element={<TestPostMock />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);
