import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPhone, FiArrowUp } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import './FloatingActions.css';

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
    <div className="floating-actions-container">
      <AnimatePresence>
        {/* Phone Button - Mobile Only */}
        <motion.a
          key="phone-btn"
          href="tel:+911414106040"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="md:hidden floating-btn btn-phone border border-white/10 bg-black/60 backdrop-blur-md shadow-2xl"
        >
           <FiPhone size={24} />
        </motion.a>

        {/* WhatsApp Button */}
        <motion.a
          key="whatsapp-btn"
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="floating-btn btn-whatsapp"
        >
          <div className="whatsapp-pulse" />
          <FaWhatsapp size={28} className="relative z-10" />
        </motion.a>

        {/* Back To Top Button */}
        {showToTop && (
          <motion.button
            key="totop-btn"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="hidden md:flex floating-btn btn-totop border border-white/10 bg-black/40 backdrop-blur-sm shadow-xl"
          >
            <FiArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingActions;

