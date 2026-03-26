import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './InitialLoader.css';

const InitialLoader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progressTimer;
    let isWindowLoaded = false;

    // 1. Initial fake progress to keep user engaged
    progressTimer = setInterval(() => {
      setProgress(prev => {
        // Slow down as we reach 90% if window hasn't loaded yet
        if (prev >= 90 && !isWindowLoaded) return 90;
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    // 2. Real window load event
    const handleLoad = () => {
      isWindowLoaded = true;
      // Complete the progress faster now that we're loaded
      if (progress < 90) {
        // The Interval above will continue but we could speed it up
      }
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearInterval(progressTimer);
      window.removeEventListener('load', handleLoad);
    };
  }, [progress]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          className="initial-loader-overlay"
          exit={{ 
            opacity: 0,
            scale: 1.1,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          <div className="loader-content">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="loader-logo"
            >
              <span>VD</span>
            </motion.div>
            
            <div className="loader-brand-text">
              <h2 className="loader-title">MAHALE INFRA</h2>
              <p className="loader-subtitle">Engineering the Future</p>
            </div>

            <div className="loader-progress-container">
              <motion.div 
                className="loader-progress-bar"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
              <span className="loader-percentage">{progress}%</span>
            </div>
          </div>
          
          <div className="loader-bg-mesh"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InitialLoader;
