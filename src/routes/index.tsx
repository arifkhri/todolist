import React from 'react';
import { BrowserRouter, Routes as BaseRoutes, Route } from 'react-router-dom';

import Layout from '../components/Layout';
import Loading from '../components/Loading';

const Activity = React.lazy(() => import("./Activity"));
const ActivityDetail = React.lazy(() => import("./ActivityDetail"));

function Routes() {
  return (
    <BrowserRouter>
      <BaseRoutes>
        <Route element={<Layout />}>
          <Route path="/" element={
            <React.Suspense fallback={<Loading />}>
              <Activity />
            </React.Suspense>
          } />
          <Route path="/detail/:activityId" element={
            <React.Suspense fallback={<Loading />}>
              <ActivityDetail />
            </React.Suspense>
          } />
        </Route>
      </BaseRoutes>
    </BrowserRouter>

  )
}

export default Routes
