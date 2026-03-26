import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';
import { FiCheckCircle } from 'react-icons/fi';
import { useMagneticTilt } from '../../../hooks/useMagneticTilt';

const TestimonialCard = ({ content, author, role, image, delay = 0 }) => {
  const { tiltStyles, onMouseMove, handleMouseLeave } = useMagneticTilt(3);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      onMouseMove={onMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyles}
      className="group relative p-10 md:p-14 border-white/5 hover:border-accent/40 shadow-3xl transition-all duration-700 min-h-[400px] flex flex-col justify-center overflow-visible bg-navy-900/50 rounded-[2.5rem]"
    >
      {/* Quote Icon */}
      <div className="absolute top-8 left-10 text-accent/10 transition-all duration-700 group-hover:text-accent/20 group-hover:scale-110">
        <FaQuoteLeft size={60} />
      </div>

      <div className="relative z-10 text-center flex flex-col items-center">
        <FaQuoteLeft className="text-accent mb-10 opacity-60" size={32} />
        
        <p className="text-lg md:text-2xl font-medium text-heading italic leading-relaxed mb-12 px-2 md:px-6">
          "{content}"
        </p>

        <div className="flex flex-col items-center gap-6">
          {/* Avatar with Animated Border */}
          <div className="relative">
            <div className="w-20 h-20 rounded-full p-1.5 border-accent/20 group-hover:border-accent transition-all duration-500 shadow-glow-orange/5 bg-black/20">
              <img 
                src={image} 
                alt={author} 
                className="w-full h-full rounded-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white border-2 border-[#0B1121] shadow-lg">
              <FiCheckCircle size={12} />
            </div>
          </div>

          <div className="text-center">
            <h5 className="text-xl font-bold text-white mb-1 group-hover:text-accent transition-colors tracking-tight">{author}</h5>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent/80 font-mono">{role}</p>
          </div>
        </div>
      </div>

      {/* Shine Sweep */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden z-20 rounded-[2.5rem]">
        <div className="absolute top-[-100%] left-[-100%] w-[300%] h-[300%] bg-gradient-to-br from-transparent via-white/5 to-transparent rotate-[45deg] group-hover:translate-x-[50%] group-hover:translate-y-[50%] transition-transform duration-[1500ms]" />
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
