import React from 'react';

export default function ResultPanel({
  estadoEmocional,
  nivelFatiga,
  riesgoBurnout,
  onRestart, // <- agregado
}) {
  return (
    <div id="resultado" style={{ display: 'block', position: 'relative' }}>
      <button
        onClick={onRestart}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          padding: '8px 12px',
          backgroundColor: '#f0f0f0',
          border: '1px solid #ccc',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Volver al inicio
      </button>

      <h2>Resultados</h2>

      <p id="estadoSalida" className={`estado-${estadoEmocional.toLowerCase()}`}>
        Estado emocional general: {estadoEmocional}
      </p>

      <p id="fatigaSalida" className={`fatiga-${nivelFatiga.toLowerCase()}`}>
        Nivel de fatiga mental: {nivelFatiga}
      </p>

      <p
        id="burnoutSalida"
        className={`burnout-${riesgoBurnout.toLowerCase()}`}
      >
        Riesgo de burnout: {riesgoBurnout}
      </p>
    </div>
  );
}
