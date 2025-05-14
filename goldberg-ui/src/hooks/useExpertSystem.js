import { useRef } from 'react';
import { FactBase }       from '../core/factBase';
import { KnowledgeBase }  from '../core/knowledgeBase';
import { InferenceEngine } from '../core/inferenceEngine';

/**
 * Hook que expone una única instancia de FactBase e InferenceEngine
 * durante todo el ciclo de vida de la app.
 */
export default function useExpertSystem() {
  const ref = useRef(null);

  if (!ref.current) {
    const fb  = new FactBase();
    const kb  = new KnowledgeBase();
    const ie  = new InferenceEngine(kb, fb);

    ref.current = { fb, engine: ie };
  }
  return ref.current;           // { fb, engine }
}
