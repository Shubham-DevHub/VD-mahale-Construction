import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useMagneticTilt } from '../../hooks/useMagneticTilt';

const ServiceCard = ({ icon: Icon, title, description, image, index }) => {
  const { tiltStyles, onMouseMove, handleMouseLeave } = useMagneticTilt(5);

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
      <div className="h-52 relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          loading="lazy"
          className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Floating Icon */}
        <div className="absolute -bottom-7 left-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/30 z-10 group-hover:-translate-y-2 transition-transform duration-500 border-2 border-white/10">
          <Icon size={24} />
        </div>
      </div>

      {/* Content Area */}
      <div className="pt-12 px-8 pb-8 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
        
        <div className="w-10 h-0.5 bg-accent/30 rounded-full mb-4 group-hover:w-16 group-hover:bg-accent transition-all duration-500" />
        
        <p className="text-secondary text-sm leading-relaxed mb-8 flex-grow">
          {description}
        </p>

        <a 
          href={`#${title.toLowerCase().replace(/\s+/g, '-')}`} 
          aria-label={`Learn more about ${title}`}
          className="inline-flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-widest group/link"
        >
          <span>Explore Service</span>
          <FiArrowRight className="group-hover/link:translate-x-1.5 transition-transform" />
        </a>
      </div>

      {/* Shine Sweep Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden z-20">
        <div className="absolute top-[-100%] left-[-100%] w-[300%] h-[300%] bg-gradient-to-br from-transparent via-white/10 to-transparent rotate-[45deg] group-hover:translate-x-[50%] group-hover:translate-y-[50%] transition-transform duration-[1500ms]" />
      </div>

      {/* Border Glow Decorative */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
    </motion.div>
  );
};

export default ServiceCard;
