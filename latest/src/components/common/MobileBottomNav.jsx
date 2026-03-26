import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiServer, FiLayers, FiMail, FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { useState, useEffect } from 'react';

const MobileBottomNav = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { id: 'home', icon: FiHome, label: 'Home', href: '#' },
    { id: 'services', icon: FiServer, label: 'Services', href: '#services' },
    { id: 'projects', icon: FiLayers, label: 'Works', href: '#projects' },
    { id: 'contact', icon: FiMail, label: 'Contact', href: '#contact' },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-[400px] md:hidden"
        >
          <div className="border-white/20 px-6 py-3 flex items-center justify-between shadow-2xl rounded-[2rem] bg-black/80 backdrop-blur-xl border">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setActiveTab(item.id)}
                className="relative flex flex-col items-center gap-1 p-2 group"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`relative z-10 transition-colors duration-300 ${
                    activeTab === item.id ? 'text-accent' : 'text-white/40'
                  }`}
                >
                  <item.icon size={20} />
                </motion.div>
                <span className={`text-[9px] font-black uppercase tracking-widest transition-colors duration-300 ${
                  activeTab === item.id ? 'text-accent' : 'text-white/20'
                }`}>
                  {item.label}
                </span>
                
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -inset-1 bg-white/5 rounded-xl z-0"
                    transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                  />
                )}
              </a>
            ))}
            
            <div className="w-[1px] h-8 bg-white/10 mx-2" />
            
            <motion.button
              whileTap={{ scale: 0.9, rotate: 15 }}
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full border-white/10 flex items-center justify-center text-accent shadow-glow-orange/20 bg-black/40 border"
            >
              {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileBottomNav;
