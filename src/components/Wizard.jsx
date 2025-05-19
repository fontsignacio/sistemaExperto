import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProgressBar from './ProgressBar';
import Step from './Step';
import ResultPanel from './ResultPanel';

import questions from '../data/questions.json';
import useExpertSystem from '../hooks/useExpertSystem';
import { validateStep } from '../utils/validators';

export default function Wizard() {
  const total = questions.length;

  /* estado UI */
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  /* sistema experto */
  const { fb, engine } = useExpertSystem();
  
  /* handlers */
  const onChange = (name, value) => {
    fb.setFact(name, value);
    setAnswers(a => ({ ...a, [name]: value }));
  };
  const next = () => setStep(s => Math.min(s + 1, total - 1));
  const back = () => setStep(s => Math.max(s - 1, 0));
  const evaluate = e => {
    e.preventDefault();
    if (!validateStep(document.querySelector('.step'))) return;
    setResult(engine.run());
  };

  const restart = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
    fb.clearAll?.();
  };
  useEffect(() => {
  if (result) {
    document
      .getElementById('result-panel')
      ?.scrollIntoView({ behavior: 'smooth' });
  }
}, [result]);

  const currentQuestion = questions[step];
  const answered = Boolean(answers[currentQuestion.name]);

  /* render */
  return (
  <>
    {/* Botón flotante fuera del contenedor */}
    <button
      onClick={() => (window.location.href = '/')}
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 1000,
        padding: '8px 12px',
        backgroundColor: result ? '#dbeafe' : '#f0f0f0',
        border: '1px solid',
        borderColor: result ? '#60a5fa' : '#ccc',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
    >
      Volver al inicio
    </button>

    {/* Contenido principal dentro de la tarjeta */}
    <div className="container">
      <h1>Evaluación del Estado Psicoemocional</h1>

      <ProgressBar current={step} total={total} />

      <form onSubmit={evaluate}>
        <AnimatePresence mode="wait">
          {questions.map((q, idx) =>
            idx === step && (
              <Step
                key={q.name}
                data={q}
                value={answers[q.name]}
                onChange={onChange}
              />
            )
          )}
        </AnimatePresence>

        <nav className="nav-btns">
          <button type="button" onClick={back} disabled={step === 0}>
            Atrás
          </button>

          {step < total - 1 ? (
            <button type="button" onClick={next} disabled={!answered}>
              Siguiente
            </button>
          ) : (
            result ? (
    /* Ya hay resultado → botón para reiniciar todo el test */
    <button type="button" onClick={restart}>
      Reintentar test
    </button>
  ) : (
    /* Aún sin resultado → botón para evaluar */
    <button type="submit" disabled={!answered}>
      Evaluar
    </button>
  )
          )}
        </nav>
      </form>

      {result && <ResultPanel id="result-panel" {...result} />}
    </div>
  </>
);

}
