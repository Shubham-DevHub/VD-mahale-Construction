import { motion } from 'framer-motion';
import { BsSun, BsMoon } from 'react-icons/bs';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className={`relative w-16 h-8 rounded-full p-1 transition-all duration-300 border border-white/10 ${
        darkMode ? 'bg-navy-900/50' : 'bg-gray-200/50'
      }`}
      aria-label="Toggle dark mode"
    >
      <motion.div
        animate={{ x: darkMode ? 32 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={`w-6 h-6 rounded-full flex items-center justify-center shadow-sm ${
          darkMode 
            ? 'bg-blue-500 text-white shadow-blue-500/50' 
            : 'bg-yellow-400 text-black shadow-yellow-400/50'
        }`}
      >
        {darkMode ? <BsMoon size={14} /> : <BsSun size={14} />}
      </motion.div>
      
      {/* Decorative icons behind */}
      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none opacity-20">
        <BsSun size={12} className={darkMode ? 'text-white' : 'text-black'} />
        <BsMoon size={12} className={darkMode ? 'text-white' : 'text-black'} />
      </div>
    </button>
  );
};

export default ThemeToggle;
