import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaProjectDiagram, FaUsers, FaClock, FaHardHat } from 'react-icons/fa';

const stats = [
  { icon: FaProjectDiagram, value: 500, suffix: '+', label: 'Projects Completed' },
  { icon: FaUsers, value: 350, suffix: '+', label: 'Happy Clients' },
  { icon: FaClock, value: 18, suffix: '+', label: 'Years Experience' },
  { icon: FaHardHat, value: 200, suffix: '+', label: 'Team Members' },
];

const AnimatedCounter = ({ target, suffix, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span>
      {count}{suffix}
    </span>
  );
};

const Stats = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/hero.png"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-400/20 rounded-2xl flex items-center justify-center border border-yellow-400/30">
                <stat.icon className="text-yellow-400" size={28} />
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
