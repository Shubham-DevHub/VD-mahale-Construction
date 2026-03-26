import { motion } from 'framer-motion';
import { FiArrowUpRight, FiCheckCircle, FiActivity, FiUsers, FiStar } from 'react-icons/fi';

const FloatingCard = ({ icon: Icon, title, value, color, delay, position }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className={`absolute ${position} z-20 hidden md:flex items-center gap-4 px-6 py-4 border-white/10 animate-float shadow-2xl`}
    style={{ animationDelay: `${delay}s` }}
  >
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${color}-500/20 text-${color}-500 shadow-lg shadow-${color}-500/10`}>
      <Icon size={20} />
    </div>
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">{title}</p>
      <p className="text-lg font-black text-white">{value}</p>
    </div>
  </motion.div>
);

const Hero = () => {
  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const trustLogos = [
    { src: '/images/trust-1.png', alt: 'Govt. of India' },
    { src: '/images/trust-2.png', alt: 'NHAI' },
    { src: '/images/trust-3.png', alt: 'Metro Rail' },
  ];

  return (
    <section id="home" className="relative min-h-[100vh] flex items-center overflow-hidden bg-[#0B1121]">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="w-full h-full"
        >
          <img
            src="/images/hero.png"
            alt="Cinematic Construction"
            className="w-full h-full object-cover opacity-60 grayscale-[0.2]"
            loading="eager"
          />
        </motion.div>
        
        {/* Deep Mesh Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1121] via-[#0B1121]/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1121] via-transparent to-[#0B1121]/40 z-10" />
        
        {/* Animated Background Blobs */}
        <div className="blob blob-1 top-20 right-1/4 opacity-30 animate-pulse" />
        <div className="blob blob-2 bottom-40 left-1/3 opacity-20 animate-float" />
      </div>

      <div className="container mx-auto px-6 relative z-30 pt-32 md:pt-0">
        <div className="max-w-4xl mx-auto md:mx-0 text-center md:text-left">
          {/* Hero Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 border-white/10 mb-10 group cursor-default"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
            </span>
            <span className="text-white/80 text-[10px] font-bold uppercase tracking-[0.3em]">
              Shaping India's Infrastructure <span className="text-accent">Since 2005</span>
            </span>
          </motion.div>

          {/* Hero Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="display-xl text-white mb-8 md:mb-10 leading-[1.05]"
          >
            Building Tomorrow's <br />
            <span className="text-gradient-accent relative inline-block py-2">
              Infrastructure
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1.2, duration: 1.2, ease: "circOut" }}
                className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-accent to-transparent rounded-full shadow-glow-orange"
              />
            </span> Today.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-base md:text-xl text-white/50 mb-12 md:mb-14 max-w-2xl mx-auto md:mx-0 leading-relaxed"
          >
            A premier engineering powerhouse dedicated to transforming the national 
            landscape through innovative technology, sustainable methods, and 
            unmatched execution precision.
          </motion.p>

          {/* Hero Actions - Unified Glass Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6"
          >
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, 'contact')}
              className="group relative px-10 py-5 bg-accent text-white font-bold rounded-2xl shadow-glow-orange overflow-hidden transition-all duration-500 hover:-translate-y-1.5 active:scale-95"
            >
              <div className="relative z-10 flex items-center gap-3">
                <span>Start Project</span>
                <FiArrowUpRight size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </div>
              {/* Shine effect */}
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </a>
            
            <a
              href="#about"
              onClick={(e) => handleScrollTo(e, 'about')}
              className="px-10 py-5 border-white/20 text-white font-bold rounded-2xl transition-all duration-500 hover:bg-white/10 hover:border-white/40 hover:-translate-y-1.5 active:scale-95"
            >
              Explore Legacy
            </a>
          </motion.div>

          {/* Animated Trust Strip Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-20 flex flex-col md:flex-row items-center gap-8 md:gap-12"
          >
            <span className="text-white/20 text-[10px] font-bold uppercase tracking-[0.4em] whitespace-nowrap">Official Partners</span>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6">
              {trustLogos.map((logo, i) => (
                <motion.div
                  key={logo.alt}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + (i * 0.2), duration: 0.6 }}
                  className="px-6 py-3 border-white/5 opacity-50 hover:opacity-100 hover:border-white/20 hover:bg-white/5 transition-all duration-500 cursor-default flex items-center shadow-lg"
                >
                  <img src={logo.src} alt={logo.alt} className="h-6 filter grayscale brightness-200 contrast-75" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Floating Glass Cards */}
      <FloatingCard 
        icon={FiCheckCircle} 
        title="Ongoing Projects" 
        value="12 Mega Sites" 
        color="green" 
        delay={2} 
        position="top-[22%] right-[12%]" 
      />
      <FloatingCard 
        icon={FiActivity} 
        title="Market Value" 
        value="₹1,250 Cr+" 
        color="orange" 
        delay={2.3} 
        position="bottom-[32%] right-[22%]" 
      />
      <FloatingCard 
        icon={FiUsers} 
        title="Skilled Experts" 
        value="2,500+ Strong" 
        color="blue" 
        delay={2.6} 
        position="top-[48%] right-[6%]" 
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: -15 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute top-[15%] left-[10%] z-20 hidden xl:flex items-center gap-3 px-6 py-4 border-white/10 rotate-[-15deg] shadow-3xl animate-float"
      >
        <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">
          <FiStar size={24} fill="currentColor" />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">Global Trust</p>
          <p className="text-lg font-black text-white">★★★★★</p>
        </div>
      </motion.div>

      {/* Cinematic Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-30"
      >
        <span className="text-[10px] uppercase font-bold text-white/20 tracking-[0.4em] mb-4 [writing-mode:vertical-lr]">Discover</span>
        <div className="w-6 h-10 rounded-full border border-white/10 flex justify-center p-1.5">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-accent rounded-full shadow-glow-orange"
          />
        </div>
      </motion.div>
      
      {/* Dynamic Edge Vignette */}
      <div className="absolute inset-0 pointer-events-none z-20 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(11,17,33,0.4)_100%)]" />
    </section>
  );
};

export default Hero;
