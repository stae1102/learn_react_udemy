import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import configureProductsStore from './hooks-store/products-store';

configureProductsStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
