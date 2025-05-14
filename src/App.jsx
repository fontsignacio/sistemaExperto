// src/App.jsx
import React, { useState } from 'react';
import IntroPage from './components/IntroPage';  // tu pre‐página
import Wizard    from './components/Wizard';     // tu test
import './App.css';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  // Por defecto muestro IntroPage; al hacer click paso a Wizard
  return showIntro
    ? <IntroPage onStart={() => setShowIntro(false)} />
    : <Wizard />;
}
