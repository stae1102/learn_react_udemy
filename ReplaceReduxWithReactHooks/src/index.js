import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers } from 'redux';

import './index.css';
import App from './App';
import productReducer from './store/reducers/products';
import ProductsProvider from './context/products-context';

const rootReducer = combineReducers({
  shop: productReducer,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ProductsProvider>
    <App />
  </ProductsProvider>
);
