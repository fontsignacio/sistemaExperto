/* eslint-disable-next-line no-unused-vars */  // si lo necesitas
import { motion } from 'framer-motion';

export default function ProgressBar({ current, total }) {
  return (
    <div className="progress-bar">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className={`segment ${i <= current ? 'active' : ''}`}
          animate={{ scale: i === current ? 1.15 : 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          {i + 1}
        </motion.div>
      ))}
    </div>
  );
}
