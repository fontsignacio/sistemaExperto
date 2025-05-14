import React from 'react';
import ReactDOM from 'react-dom/client';
import Wizard from './components/Wizard';

import './styles/styles.css';   // ← tu hoja global copiada
import './index.css';           // reset de Vite

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Wizard />
  </React.StrictMode>
);
