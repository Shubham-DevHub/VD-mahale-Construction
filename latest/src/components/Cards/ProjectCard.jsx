import { motion } from 'framer-motion';
import { FiMapPin, FiUser, FiMaximize, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { useMagneticTilt } from '../../hooks/useMagneticTilt';

const ProjectCard = ({ title, category, status, value, location, client, size, duration, image, index }) => {
  const { tiltStyles, onMouseMove, handleMouseLeave } = useMagneticTilt(4);

  const getStatusColor = (s) => {
    switch(s.toLowerCase()) {
      case 'completed': return 'success';
      case 'ongoing': return 'orange';
      case 'upcoming': return 'blue';
      default: return 'gray';
    }
  };

  const statusColor = getStatusColor(status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyles}
      className="group h-full flex flex-col hover:border-accent/50 hover:shadow-glow-orange/10 transition-all duration-700 overflow-hidden relative border border-white/5 bg-navy-900/50 rounded-2xl"
    >
      {/* Image Area */}
      <div className="h-64 relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Status Badge */}
        <div className={`absolute top-4 right-4 px-4 py-1.5 border-white/20 flex items-center gap-2 backdrop-blur-md bg-black/40 border rounded-lg`}>
          <div className={`w-2 h-2 rounded-full bg-${statusColor}-500 animate-pulse`} />
          <span className={`text-[10px] font-bold uppercase tracking-wider text-${statusColor}-500`}>{status}</span>
        </div>

        {/* Value Badge */}
        <div className="absolute bottom-4 left-4 px-4 py-2 border-white/10 backdrop-blur-xl bg-black/60 border rounded-xl">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-0.5">Project Value</p>
          <p className="text-lg font-bold text-white font-mono tracking-tighter">
            <span className="text-accent">₹</span> {value} <span className="text-xs font-medium text-white/60">Cr +</span>
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 flex-grow flex flex-col">
        <p className="text-accent text-[11px] font-bold uppercase tracking-[0.2em] mb-3">{category}</p>
        <h3 className="text-xl font-bold mb-6 group-hover:text-accent transition-colors duration-300 line-clamp-2">
          {title}
        </h3>
        
        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex items-center gap-2.5 text-secondary">
            <FiMapPin className="text-accent shrink-0" size={14} />
            <span className="text-xs font-medium truncate">{location}</span>
          </div>
          <div className="flex items-center gap-2.5 text-secondary">
            <FiUser className="text-accent shrink-0" size={14} />
            <span className="text-xs font-medium truncate">{client}</span>
          </div>
          <div className="flex items-center gap-2.5 text-secondary">
            <FiMaximize className="text-accent shrink-0" size={14} />
            <span className="text-xs font-medium truncate">{size}</span>
          </div>
          <div className="flex items-center gap-2.5 text-secondary">
            <FiCalendar className="text-accent shrink-0" size={14} />
            <span className="text-xs font-medium truncate">{duration}</span>
          </div>
        </div>

        <a 
          href="#" 
          aria-label={`View full case study for ${title}`}
          className="mt-auto inline-flex items-center gap-2 text-primary dark:text-white font-bold text-xs uppercase tracking-widest group/link"
        >
          <span>View Case Study</span>
          <FiArrowRight className="group-hover/link:translate-x-1.5 transition-transform" />
        </a>
      </div>

      {/* Shine Sweep Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden z-20">
        <div className="absolute top-[-100%] left-[-100%] w-[300%] h-[300%] bg-gradient-to-br from-transparent via-white/10 to-transparent rotate-[45deg] group-hover:translate-x-[50%] group-hover:translate-y-[50%] transition-transform duration-[1500ms]" />
      </div>

      {/* Border Glow Decorative */}
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-accent/10 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
    </motion.div>
  );
};

export default ProjectCard;
