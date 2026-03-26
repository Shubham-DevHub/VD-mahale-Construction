import { motion } from 'framer-motion';
import { useMagneticTilt } from '../../hooks/useMagneticTilt';

const StatCard = ({ icon: Icon, value, suffix, label, delay = 0 }) => {
  const { tiltStyles, onMouseMove, handleMouseLeave } = useMagneticTilt(15);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      onMouseMove={onMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyles}
      className="group relative p-8 border-white/5 hover:border-accent/40 transition-all duration-500 flex flex-col items-center text-center shadow-2xl overflow-visible bg-navy-900/50 border rounded-2xl"
    >
      {/* Icon with Hover Glow */}
      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-accent mb-8 shadow-inner group-hover:scale-110 group-hover:shadow-glow-orange transition-all duration-500 border border-white/5">
        <Icon size={30} />
      </div>

      <div className="flex items-center gap-1.5 mb-2">
        <span className="stat-number text-white text-4xl group-hover:scale-110 transition-transform duration-500 font-mono tracking-tighter">{value}</span>
        <span className="stat-number text-accent text-3xl font-mono">{suffix}</span>
      </div>

      <div className="w-12 h-1 bg-accent/20 rounded-full mb-6 group-hover:w-20 group-hover:bg-accent transition-all duration-500" />
      
      <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-white/60 transition-colors">
        {label}
      </p>

      {/* Decorative Glow */}
      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-accent/10 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
};

export default StatCard;
