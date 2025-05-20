import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Home, RefreshCcw } from 'lucide-react';

import ProgressBar   from './ProgressBar';
import Step          from './Step';
import ResultPanel   from './ResultPanel';

import questions         from '../data/questions.json';
import useExpertSystem   from '../hooks/useExpertSystem';
import { validateStep }  from '../utils/validators';

/* ──────────────────────────────────────────────────────────
   Recomendaciones por nivel
   ──────────────────────────────────────────────────────────*/
const RECS = {
  NIVEL1 : '¡Excelente! Mantén tus hábitos de autocuidado y comparte tu energía positiva con tu equipo.',
  NIVEL2 : 'Buen estado general. Procura pequeñas pausas mentales y mantén actividades que refuercen tu confianza.',
  NIVEL3 : 'Observa tus picos de motivación y refuérzalos con objetivos cortos; incorpora rutinas de descanso activo.',
  NIVEL4 : 'Introduce micro-descansos, delega tareas cuando sea posible y practica técnicas de respiración consciente.',
  NIVEL5 : 'Considera hablar con tu responsable o RR. HH.; busca apoyo profesional y prioriza actividades relajantes.',
  NIVEL6 : 'Se recomienda acompañamiento psicológico inmediato y una revisión de carga laboral. No estás solo: pide ayuda.'
};

/* ──────────────────────────────────────────────────────────
   Recomendaciones por nivel
   ──────────────────────────────────────────────────────────*/

/* Estado emocional (ya lo tenías) */
const RECS_EMO = {
  NIVEL1 : '¡Excelente! Mantén tus hábitos de autocuidado y comparte tu energía positiva con tu equipo.',
  NIVEL2 : 'Buen estado general. Procura micro-pausas y actividades que refuercen tu confianza.',
  NIVEL3 : 'Refuerza tus picos de motivación con objetivos cortos e incorpora rutinas de descanso activo.',
  NIVEL4 : 'Introduce descansos frecuentes, delega tareas cuando sea posible y practica respiración consciente.',
  NIVEL5 : 'Busca apoyo profesional; prioriza actividades relajantes y conversa con tu responsable o RR. HH.',
  NIVEL6 : 'Se recomienda acompañamiento psicológico inmediato y una revisión de carga laboral. No estás solo.'
};

/* Fatiga mental */
const RECS_FAT = {
  Leve      : 'Mantén una buena higiene del sueño y breves pausas visuales durante la jornada.',
  Moderado  : 'Alterna tareas exigentes con otras livianas y practica estiramientos cada 60-90 minutos.',
  Alto      : 'Revisa tu carga de trabajo; incorpora siestas cortas o técnicas de relajación guiada.',
  Severo    : 'Considera un descanso prolongado y consulta a un profesional de salud ocupacional.'
};

/* Burnout */
const RECS_BURN = {
  Leve      : 'Sigue cuidando tus límites y reserva tiempo para actividades gratificantes fuera del trabajo.',
  Moderado  : 'Evalúa redistribuir tareas, comparte tu situación con tu equipo y programa descansos activos.',
  Bajo      : 'Mantén rutinas saludables y refuerza tu red de apoyo social.',
  Alto      : 'Busca ayuda especializada; es prioritario reducir la exposición al estrés laboral sostenido.'
};


export default function Wizard() {
  const total = questions.length;

  /* ─ estado UI ─ */
  const [step,     setStep]     = useState(0);
  const [answers,  setAnswers]  = useState({});
  const [result,   setResult]   = useState(null);

  /* ─ sistema experto ─ */
  const { fb, engine } = useExpertSystem();

  /* ─ handlers ─ */
  const onChange = (name, value) => {
    fb.setFact(name, value);
    setAnswers(a => ({ ...a, [name]: value }));
  };

  const next = () => setStep(s => Math.min(s + 1, total - 1));
  const back = () => setStep(s => Math.max(s - 1, 0));

  const evaluate = e => {
    e.preventDefault();
    if (!validateStep(document.querySelector('.step'))) return;

    const rawEngine = engine.run();

/* adapta NOMBRES que realmente devuelve tu motor */
const raw = {
  emotional : rawEngine.estadoEmocional, // o rawEngine.emotional si ya lo cambiaste
  fatigue   : rawEngine.nivelFatiga,
  burnout   : rawEngine.riesgoBurnout
};


   const recommendations = {
  emotional : RECS_EMO[raw.emotional]           || '',
  fatigue   : RECS_FAT [raw.fatigue]           || '',
  burnout   : RECS_BURN[raw.burnout]           || ''
};

setResult({ ...raw, recommendations });}



  const restart = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
    fb.clearAll?.();
  };

  /* scroll al resultado */
  useEffect(() => {
    if (result) {
      document.getElementById('result-panel')
              ?.scrollIntoView({ behavior:'smooth' });
    }
  }, [result]);

  const currentQuestion = questions[step];
  const answered        = Boolean(answers[currentQuestion.name]);

  /* ─ render ─ */
  return (
    <>
      {/* botón inicio */}
      <button
        onClick={() => (window.location.href = '/')}
        style={{
          position:'fixed', top:20, left:20, zIndex:1000,
          padding:'8px 12px',
          backgroundColor: result ? '#dbeafe':'#f0f0f0',
          border:'1px solid',
          borderColor: result ? '#60a5fa':'#ccc',
          borderRadius:5, cursor:'pointer',
          display:'flex', alignItems:'center', gap:4
        }}
      >
        <Home size={16}/> Volver al inicio
      </button>

      {/* tarjeta */}
      <div className="container">
        <h1>Evaluación del Estado Psicoemocional</h1>

        <ProgressBar current={step} total={total} />

        <form onSubmit={evaluate}>
          <AnimatePresence mode="wait">
            {questions.map((q,idx)=> idx===step &&
              <Step key={q.name}
                    data={q}
                    value={answers[q.name]}
                    onChange={onChange}/> )}
          </AnimatePresence>

          <nav className="nav-btns">
            <button type="button" onClick={back}
                    disabled={step===0} className="btn-nav">
              <ArrowLeft size={16}/> Atrás
            </button>

            {step < total-1 ? (
              <button type="button" onClick={next}
                      disabled={!answered} className="btn-nav">
                Siguiente <ArrowRight size={16}/>
              </button>
            ) : result ? (
              <button type="button" onClick={restart}
                      className="btn-nav">
                <RefreshCcw size={16}/> Reintentar test
              </button>
            ) : (
              <button type="submit" disabled={!answered}
                      className="btn-nav">
                Evaluar
              </button>
            )}
          </nav>
        </form>

        {result && <ResultPanel id="result-panel" {...result} />}
      </div>
    </>
  );
}
