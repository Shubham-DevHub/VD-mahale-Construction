import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ProgressBar = ({ label, percentage, color = 'var(--accent-orange)' }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="mb-6 w-full" ref={ref}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-bold text-nav-heading uppercase tracking-wider">{label}</span>
        <span className="text-sm font-black text-accent">{percentage}%</span>
      </div>
      <div className="h-2.5 bg-black/20 rounded-full overflow-hidden border border-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ 
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}44`
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
