import React from 'react';

import { Outlet } from 'react-router-dom';
import Navigation from '../components/Nav/Navigation';

const RootLayout = () => {
  return (
    <React.Fragment>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </React.Fragment>
  );
};

export default RootLayout;
