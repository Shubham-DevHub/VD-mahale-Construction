import { motion } from 'framer-motion';
import { FiLinkedin, FiTwitter, FiMail, FiArrowUpRight } from 'react-icons/fi';
import { useMagneticTilt } from '../../hooks/useMagneticTilt';

const TeamCard = ({ name, role, image, bio, delay = 0 }) => {
  const { tiltStyles, onMouseMove, handleMouseLeave } = useMagneticTilt(10);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyles}
      className="group p-4 pb-8 flex flex-col h-full hover:border-accent/40 hover:shadow-glow-orange/10 transition-all duration-500 overflow-visible bg-navy-900/40 border border-white/5 rounded-[2rem]"
    >
      {/* Image Area with Inner Frame */}
      <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-8">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 grayscale-[0.3] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1121]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Social Pill Overlay */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 border-white/10 rounded-2xl translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-md bg-black/40 border">
          <a href="#" className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-accent hover:text-white transition-all"><FiLinkedin size={18} /></a>
          <a href="#" className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-black hover:text-white transition-all"><FiTwitter size={18} /></a>
          <a href="#" className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-accent hover:text-white transition-all"><FiMail size={18} /></a>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 text-center">
        <h4 className="text-xl font-bold mb-1 text-heading group-hover:text-accent transition-colors duration-300 tracking-tight">{name}</h4>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent/80 mb-6 font-mono">{role}</p>
        <p className="text-sm text-secondary/80 leading-relaxed line-clamp-2 px-2 italic font-medium">
          "{bio}"
        </p>
      </div>

      {/* Border Glow Decorative Corner */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-accent/20 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      {/* Shine Sweep Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden z-20 rounded-3xl">
        <div className="absolute top-[-100%] left-[-100%] w-[300%] h-[300%] bg-gradient-to-br from-transparent via-white/10 to-transparent rotate-[45deg] group-hover:translate-x-[50%] group-hover:translate-y-[50%] transition-transform duration-[1200ms]" />
      </div>
    </motion.div>
  );
};

export default TeamCard;
