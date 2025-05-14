// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App      from './App';           // ↖⇐ Apunta a tu App.jsx
import './styles/styles.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />                              { /* ← Sólo App */ }
  </React.StrictMode>
);
