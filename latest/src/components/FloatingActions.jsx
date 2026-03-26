import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPhone, FiArrowUp } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingActions = () => {
  const [showToTop, setShowToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-24 md:bottom-10 right-6 md:right-10 z-[55] flex flex-col gap-4 items-end">
      <AnimatePresence>
        {/* Phone Button - Mobile Only */}
        <motion.a
          key="phone-btn"
          href="tel:+911414106040"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 0.9 }}
          className="md:hidden w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-accent shadow-2xl relative bg-dark"
        >
           <FiPhone size={24} />
        </motion.a>

        {/* WhatsApp Button with Pulse Radar */}
        <motion.a
          key="whatsapp-btn"
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white shadow-2xl shadow-green-500/30 relative z-10"
        >
          {/* Pulse Radar Rings */}
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25" />
          <span className="absolute -inset-2 rounded-full border-2 border-green-500/20 animate-pulse" />
          
          <FaWhatsapp size={28} className="relative z-10" />
        </motion.a>

        {/* Back To Top Button - Desktop focus (hidden on mobile mostly due to bottom nav) */}
        {showToTop && (
          <motion.button
            key="totop-btn"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, backgroundColor: 'var(--accent)' }}
            whileTap={{ scale: 0.9 }}
            className="hidden md:flex w-14 h-14 rounded-full border border-white/20 items-center justify-center text-white hover:text-white transition-colors shadow-2xl bg-dark"
          >
            <FiArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingActions;
