import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import ProgressBar from './ProgressBar';
import Step        from './Step';
import ResultPanel from './ResultPanel';

import questions from '../data/questions.json';
import useExpertSystem from '../hooks/useExpertSystem';
import { validateStep } from '../utils/validators';

export default function Wizard() {
  const total = questions.length;

  /* estado UI */
  const [step, setStep]     = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult]   = useState(null);

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

 // **Nuevo handler**: reinicia el wizard
 const restart = () => {
   setStep(0);
   setAnswers({});
   setResult(null);
   fb.clearAll?.();    // si tu hook expone un método para limpiar hechos
 };

  const currentQuestion = questions[step];
  const answered        = Boolean(answers[currentQuestion.name]);
  
  /* render */
  return (
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
            <button type="submit" disabled={!answered}>
              Evaluar
            </button>
          )}
        </nav>
      </form>

     
     {result && (
       <ResultPanel
         {...result}
         onRestart={restart}    // le pasamos la función de reinicio
       />
     )}
    </div>
  );
}
