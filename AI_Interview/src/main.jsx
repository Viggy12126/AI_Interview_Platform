import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store.js';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
    <App />
    <ToastContainer />
    </ReduxProvider>
  </React.StrictMode>
)
