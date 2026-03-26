import { motion } from 'framer-motion';
import { FiMapPin, FiBriefcase, FiDollarSign, FiCalendar, FiArrowUpRight } from 'react-icons/fi';
import { useMagneticTilt } from '../../hooks/useMagneticTilt';

const JobCard = ({ title, department, location, type, salary, delay = 0 }) => {
  const { tiltStyles, onMouseMove, handleMouseLeave } = useMagneticTilt(3);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      onMouseMove={onMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyles}
      className="group p-8 border-white/5 hover:border-accent/40 transition-all duration-500 flex flex-col items-start gap-6 shadow-2xl relative overflow-visible bg-navy-900/50 border rounded-2xl"
    >
      <div className="flex w-full justify-between items-start">
        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-accent shadow-inner group-hover:bg-accent group-hover:text-white transition-all duration-300">
          <FiBriefcase size={26} />
        </div>
        <div className="px-4 py-1.5 border-white/10 text-[9px] font-black uppercase tracking-widest text-[#60A5FA] bg-black/20 border rounded-full">
          {type}
        </div>
      </div>

      <div>
        <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300 tracking-tight">{title}</h4>
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-accent/60 font-mono">{department}</p>
      </div>

      <div className="grid grid-cols-2 gap-y-4 gap-x-10 w-full mb-4">
        <div className="flex items-center gap-3 text-white/50 text-xs font-semibold">
          <FiMapPin className="text-accent" /> <span>{location}</span>
        </div>
        <div className="flex items-center gap-3 text-white/50 text-xs font-semibold">
          <FiDollarSign className="text-accent" /> <span>{salary}</span>
        </div>
        <div className="flex items-center gap-3 text-white/50 text-xs font-semibold">
          <FiCalendar className="text-accent" /> <span>Posted 2d ago</span>
        </div>
      </div>

      <a href="#" className="w-full py-4 border-white/10 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 group/btn hover:bg-accent transition-all duration-300 bg-white/5 border rounded-xl">
        <span>Apply Now</span>
        <FiArrowUpRight className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
      </a>

      {/* Glow corner */}
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#60A5FA]/10 blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

export default JobCard;
