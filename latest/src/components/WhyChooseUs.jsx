import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiTrendingUp, FiShield, FiCpu, FiAward } from 'react-icons/fi';

const features = [
  {
    icon: FiTrendingUp,
    title: 'Advanced Engineering',
    desc: 'Using the latest BIM and project management tools to ensure precision in every square inch we build.',
    color: 'orange',
    percentage: 98
  },
  {
    icon: FiShield,
    title: 'Uncompromised Safety',
    desc: 'Zero-accident policy with rigorous on-site protocols and consistent safety training for our entire workforce.',
    color: 'blue',
    percentage: 100
  },
  {
    icon: FiCpu,
    title: 'Modern Machinery',
    desc: 'Owners of a fleet of high-performance construction equipment including asphalt plants and crushing units.',
    color: 'green',
    percentage: 95
  },
  {
    icon: FiAward,
    title: 'Quality Assurance',
    desc: 'ISO certified processes that guarantee durability and structural integrity above industry standard benchmarks.',
    color: 'purple',
    percentage: 99
  }
];

const WhyChooseUs = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="whyus" className="relative py-32 bg-secondary overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="overline-label mb-4"
          >
            Our Edge
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Why Industry Leaders <br/>
            <span className="text-gradient-accent">Trust VD Mahale</span>
          </motion.h2>
          <p className="text-secondary max-w-2xl mx-auto">
            We combine high-end technology with local expertise to deliver projects 
            that redefine urban connectivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + (i * 0.1), duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group border-white/5 p-8 hover:border-accent/40 hover:-translate-y-2 transition-all duration-500 shadow-xl"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-accent/10 text-accent mb-8 group-hover:scale-110 group-hover:shadow-glow-orange transition-all duration-500`}>
                <feature.icon size={26} />
              </div>
              <h4 className="text-xl font-bold mb-4 group-hover:text-accent transition-colors duration-300 tracking-tight">{feature.title}</h4>
              <p className="text-sm text-secondary/80 leading-relaxed mb-8 flex-grow">
                {feature.desc}
              </p>
              
              <div className="mt-auto pt-6 border-t border-white/5">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Efficiency Index</span>
                  <span className="text-[11px] font-black text-accent font-mono">{feature.percentage}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden p-[1px]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${feature.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 + (i * 0.1), ease: "circOut" }}
                    className="h-full bg-gradient-to-r from-accent to-orange-400 rounded-full relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Image Feature */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-24 relative rounded-[2rem] overflow-hidden p-4 shadow-2xl"
        >
          <div className="relative h-[400px] rounded-[1.5rem] overflow-hidden">
            <img 
              src="/images/service-1.png" 
              alt="Advanced Construction"
              className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1121]/80 via-[#0B1121]/40 to-transparent" />
            
            <div className="absolute inset-0 flex flex-col justify-center p-12 max-w-2xl">
              <h3 className="text-3xl font-bold text-white mb-4">Precision-Driven <span className="text-accent underline-effect">Methodology</span></h3>
              <p className="text-white/70 mb-8 leading-relaxed">
                By integrating real-time telemetry and advanced earth-moving equipment, 
                we ensure that every lane kilometer constructed meets international 
                smoothness and durability indexes.
              </p>
              <div className="flex gap-10">
                <div className="flex flex-col">
                  <span className="text-accent font-black text-2xl font-mono">100%</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/50">On-Time Completion</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-accent font-black text-2xl font-mono">Zero</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/50">Safety Incidents</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
