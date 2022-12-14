import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ProductsProvider } from './context/products_context';
import { FilterProvider } from './context/filter_context';
import { CartProvider } from './context/cart_context';
import { UserProvider } from './context/user_context';

import { Auth0Provider } from '@auth0/auth0-react';

const DOMAIN = process.env.REACT_APP_DOMAIN;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

ReactDOM.render(
  <StrictMode>
    <Auth0Provider
      domain={DOMAIN}
      clientId={CLIENT_ID}
      redirectUri={window.location.origin}
      cacheLocation='localstorage'
    >
      <UserProvider>
        <ProductsProvider>
          <FilterProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </FilterProvider>
        </ProductsProvider>
      </UserProvider>
    </Auth0Provider>
  </StrictMode>,

  document.getElementById('root')
);
