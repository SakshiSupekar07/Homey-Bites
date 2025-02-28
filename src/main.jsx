import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import StoreContextProvider from './context/storecontext';
import DisplayLists from './context/storecontext';
import UserProvider from './context/UserProvider';
import CartProvider from './context/CartProvider';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <StoreContextProvider>

            <App />
            <DisplayLists />
          </StoreContextProvider>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
