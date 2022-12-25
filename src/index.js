import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import './index.scss';
import App from './App';
import store from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SnackbarProvider
    autoHideDuration={2000}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
  >
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </SnackbarProvider>
);
