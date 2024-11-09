import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { PetProvider } from './context/PetContext';
import GlobalStyles from './styles/GlobalStyles';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PetProvider>
        <GlobalStyles />
        <App />
      </PetProvider>
    </BrowserRouter>
  </React.StrictMode>
);