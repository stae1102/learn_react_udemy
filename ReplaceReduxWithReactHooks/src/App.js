import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ProductsPage from './containers/Products';
import FavoritesPage from './containers/Favorites';
import RootLayout from './pages/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <ProductsPage />,
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
