/* eslint-disable no-unused-vars */ // quita esta línea si no la necesitas
import { motion } from 'framer-motion';

/**
 * Componente que representa un paso (pregunta) del cuestionario.
 * - Se anima al entrar y salir con Framer Motion.
 * - Las opciones de respuesta se muestran como chips clicables.
 */
export default function Step({ data, value, onChange }) {
  return (
    <motion.section
      className="step active"
      key={data.name}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.4 }}
    >
      <legend>{data.text}</legend>

      {/* opciones como chips */}
      <div className="options">
        {data.options.map((opt) => (
          <div key={opt.value}>
            <input
              id={`${data.name}-${opt.value}`}
              type="radio"
              name={data.name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(data.name, opt.value)}
              required
            />
            <label htmlFor={`${data.name}-${opt.value}`}>{opt.label}</label>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
