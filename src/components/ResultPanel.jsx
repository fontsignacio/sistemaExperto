import React from 'react';

export default function ResultPanel({
  estadoEmocional,
  nivelFatiga,
  riesgoBurnout,
  
}) {
  return (
    <div id="resultado" style={{ display: 'block', position: 'relative' }}>

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
