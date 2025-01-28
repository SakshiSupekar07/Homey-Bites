import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import StoreContextProvider from './context/storecontext';
import DisplayLists from './context/storecontext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreContextProvider>
        
        <App />
        <DisplayLists/>
      </StoreContextProvider>
  
    </BrowserRouter>
  </React.StrictMode>
);
