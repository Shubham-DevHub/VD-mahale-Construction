import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiTag, FiArrowUpRight } from 'react-icons/fi';
import { useMagneticTilt } from '../../hooks/useMagneticTilt';

const NewsCard = ({ date, category, title, excerpt, image, delay = 0 }) => {
  const { tiltStyles, onMouseMove, handleMouseLeave } = useMagneticTilt(5);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      onMouseMove={onMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyles}
      className="group border-white/5 hover:border-accent/40 transition-all duration-500 overflow-hidden flex flex-col h-full shadow-2xl bg-navy-900/50 border rounded-2xl"
    >
      {/* Header Image */}
      <div className="h-48 relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[0.4] group-hover:grayscale-0"
        />
        <div className="absolute top-4 left-4 px-3 py-1 border-white/10 text-[10px] font-black uppercase tracking-widest text-accent z-10 bg-black/40 border rounded-lg">
          {category}
        </div>
      </div>

      {/* Body */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
          <div className="flex items-center gap-1.5"><FiCalendar size={12} /> {date}</div>
          <div className="flex items-center gap-1.5"><FiClock size={12} /> 5 Min Read</div>
        </div>
        
        <h4 className="text-xl font-bold mb-4 group-hover:text-accent transition-colors duration-300 leading-tight flex-grow line-clamp-2 tracking-tight">
          {title}
        </h4>
        
        <p className="text-sm text-secondary/80 leading-relaxed mb-8 line-clamp-3 font-medium">
          {excerpt}
        </p>

        <a href="#" className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-[0.2em] hover:text-accent transition-colors group/link mt-auto">
          <span>Read Full Story</span>
          <FiArrowUpRight className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
        </a>
      </div>

      {/* Shine Sweep */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden z-20">
        <div className="absolute top-[-100%] left-[-100%] w-[300%] h-[300%] bg-gradient-to-br from-transparent via-white/5 to-transparent rotate-[45deg] group-hover:translate-x-[50%] group-hover:translate-y-[50%] transition-transform duration-1000" />
      </div>
    </motion.div>
  );
};

export default NewsCard;
