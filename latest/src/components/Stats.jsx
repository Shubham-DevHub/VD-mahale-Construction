import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBriefcase, FiAward, FiClock, FiUsers } from 'react-icons/fi';

const stats = [
  { icon: FiBriefcase, value: 500, suffix: '+', label: 'Projects Completed' },
  { icon: FiAward, value: 25, suffix: '+', label: 'Prestigious Awards' },
  { icon: FiClock, value: 18, suffix: '+', label: 'Years Experience' },
  { icon: FiUsers, value: 350, suffix: '+', label: 'Happy Clients' },
];

const AnimatedCounter = ({ target, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    
    let startTime;
    const duration = 2000;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Power 4 Out easing
      const easedProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easedProgress * target));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [inView, target]);

  return <span className="stat-number">{count}</span>;
};

const Stats = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="relative z-40 -mt-16 sm:-mt-20 container mx-auto px-6" ref={ref}>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
        className="bg-elevated p-8 sm:p-12 shadow-xl border border-light rounded-3xl"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 relative">
          {stats.map((stat, index) => (
            <div key={stat.label} className="relative group text-center lg:text-left">
              {/* Vertical Divider */}
              {index !== 0 && (
                <div className="hidden lg:block absolute left-[-2rem] top-1/2 -translate-y-1/2 w-[1px] h-16 bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
              )}
              
              <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-4 lg:gap-6 w-full">
                    {/* Icon with glow */}
                    <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-accent group-hover:scale-110 group-hover:shadow-glow-orange transition-all duration-500 shrink-0">
                      <stat.icon size={24} />
                    </div>
                    
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                      <div className="flex items-center gap-1">
                        <AnimatedCounter target={stat.value} inView={inView} />
                        <span className="stat-number text-accent">{stat.suffix}</span>
                      </div>
                      <div className="w-10 h-0.5 bg-accent/30 rounded-full my-2 transition-all duration-500 group-hover:w-16 group-hover:bg-accent" />
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">
                        {stat.label}
                      </p>
                    </div>
                  </div>
              </div>

              {/* Ghost background icon */}
              <stat.icon 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] rotate-[-10deg] group-hover:rotate-0 transition-transform duration-1000 pointer-events-none" 
                size={80} 
              />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Stats;
