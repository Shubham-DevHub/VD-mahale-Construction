import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShield, FiX } from 'react-icons/fi';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-28 md:bottom-10 left-6 md:left-10 z-[55] w-[calc(100%-3rem)] md:w-[400px]"
        >
          <div className="border-white/20 p-6 md:p-8 shadow-3xl overflow-hidden relative bg-navy-900 border rounded-3xl">
            {/* Background Decor */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-start gap-5 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                <FiShield size={24} />
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-white text-lg">Cookies & Privacy</h4>
                  <button 
                    onClick={() => setIsVisible(false)}
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    <FiX size={18} />
                  </button>
                </div>
                <p className="text-sm text-white/50 leading-relaxed mb-6">
                  We use premium analytics to enhance your experience. By continuing, 
                  you agree to our award-winning data standards.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={handleAccept}
                    className="flex-grow py-3 bg-accent text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-glow-orange hover:-translate-y-1 transition-all"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="flex-grow py-3 border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all text-center bg-white/5 border rounded-xl"
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
