import { motion } from 'framer-motion';
import { FiSettings, FiActivity, FiZap, FiBox } from 'react-icons/fi';
import { useMagneticTilt } from '../../hooks/useMagneticTilt';

const PlantCard = ({ name, type, capacity, status, image, delay = 0 }) => {
  const { tiltStyles, onMouseMove, handleMouseLeave } = useMagneticTilt(6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      onMouseMove={onMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyles}
      className="group border-white/5 hover:border-accent/40 transition-all duration-500 overflow-hidden shadow-2xl flex flex-col h-full bg-navy-900/50 border rounded-2xl"
    >
      {/* Visual Header */}
      <div className="h-60 relative overflow-hidden bg-black/20">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] grayscale-[0.5] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1121] via-transparent to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 border-white/10 bg-black/40 border rounded-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-widest text-green-500">{status}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 space-y-6 flex-grow flex flex-col">
        <div>
          <h4 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-300">{name}</h4>
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mt-1">{type}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border-white/5 flex flex-col gap-2 group/stat hover:bg-accent/5 transition-all bg-black/20 border rounded-xl">
            <FiZap className="text-accent" size={16} />
            <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Capacity Index</p>
            <p className="text-sm font-bold text-white font-mono">{capacity}</p>
          </div>
          <div className="p-4 border-white/5 flex flex-col gap-2 group/stat hover:bg-blue-400/5 transition-all bg-black/20 border rounded-xl">
            <FiBox className="text-blue-400" size={16} />
            <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Asset ID</p>
            <p className="text-sm font-bold text-white font-mono">VDM-P7</p>
          </div>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="flex -space-x-2">
            {[1,2,3].map(i => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0B1121] bg-gray-800 overflow-hidden">
                <img src={`/images/trust-${i}.png`} alt="Operator" className="w-full h-full object-cover grayscale" />
              </div>
            ))}
          </div>
          <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest">3 Operators</span>
        </div>
      </div>

      {/* Shine Sweep */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden z-20">
        <div className="absolute top-[-100%] left-[-100%] w-[300%] h-[300%] bg-gradient-to-br from-transparent via-white/5 to-transparent rotate-[45deg] group-hover:translate-x-[50%] group-hover:translate-y-[50%] transition-transform duration-[1200ms]" />
      </div>
    </motion.div>
  );
};

export default PlantCard;
