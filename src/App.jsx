// src/App.jsx
import React, { useState } from 'react';
import IntroPage from './components/IntroPage';  // tu pre‐página
import Wizard    from './components/Wizard';     // tu test
import GradientBg from './components/GradientBg';
import './App.css';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  // Por defecto muestro IntroPage; al hacer click paso a Wizard
  return (
    <>
      <GradientBg />        {/* fondo detrás de todo */}
      {showIntro
        ? <IntroPage onStart={() => setShowIntro(false)} />
        : <Wizard />}
    </>
  );
}
