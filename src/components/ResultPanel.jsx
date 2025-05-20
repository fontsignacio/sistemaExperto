import React from 'react';

/* util: de “NIVEL3” → “3”  (para las clases estado-x que ya tienes) */
const nivelIndex = str =>
  Number(str?.match(/\d+/)?.[0] || 0);   // 0 si no coincide

export default function ResultPanel({
  emotional,          // 'NIVEL1' … 'NIVEL6'
  fatigue,            // 'Leve' | 'Moderado' | 'Alto' | 'Severo'
  burnout,            // idem
  recommendations     // { emotional, fatigue, burnout }
}) {

  /* clases de color que ya existen en styles.css */
  const clsEmo  = `estado-${nivelIndex(emotional)}`;
  const clsFat  = fatigue  ? `fatiga-${fatigue.toLowerCase()}`   : '';
const clsBurn = burnout  ? `burnout-${burnout.toLowerCase()}` : '';


  return (
    <div id="resultado">
      <h2>Resultados</h2>

      {/* ───────── Estado emocional ───────── */}
      <p id="estadoSalida"    className={clsEmo}>
        Estado emocional general:&nbsp;{emotional}
      </p>
      {recommendations?.emotional && (
        <p className={`recomendacion ${clsEmo}`}>
          {recommendations.emotional}
        </p>
      )}

      {/* ───────── Fatiga ───────── */}
      <p id="fatigaSalida"    className={clsFat}>
        Nivel de fatiga mental:&nbsp;{fatigue}
      </p>
      {recommendations?.fatigue && (
        <p className={`recomendacion ${clsFat}`}>
          {recommendations.fatigue}
        </p>
      )}

      {/* ───────── Burnout ───────── */}
      <p id="burnoutSalida"   className={clsBurn}>
        Riesgo de burnout:&nbsp;{burnout}
      </p>
      {recommendations?.burnout && (
        <p className={`recomendacion ${clsBurn}`}>
          {recommendations.burnout}
        </p>
      )}
    </div>
  );
}
