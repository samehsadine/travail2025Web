import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from '@auth0/auth0-react'
import { App } from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Auth0Provider
    domain='dev-k5fwo71crdlfrwug.us.auth0.com'
    clientId='bBO8zEoKSHbgz53REAWBHehIPBjh5G3n'
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    cacheLocation="localstorage">
    <App />
  </Auth0Provider>

);
