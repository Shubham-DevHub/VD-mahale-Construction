import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { FiArrowUpRight, FiSearch, FiPhone, FiMail, FiChevronDown, FiSettings, FiActivity, FiTruck, FiBriefcase } from 'react-icons/fi';
import { FaWhatsapp, FaRoad, FaHardHat } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services', hasDropdown: true },
  { name: 'Projects', href: '#projects' },
  { name: 'Why Us', href: '#whyus' },
];

const serviceHighlights = [
  { icon: FaRoad, name: 'Highways', desc: 'National connectivity projects' },
  { icon: FiTruck, name: 'Railways', desc: 'Heavy rail infrastructure' },
  { icon: FaHardHat, name: 'Bridges', desc: 'Complex structural engineering' },
  { icon: FiSettings, name: 'Renewables', desc: 'EPC for solar/wind farms' },
  { icon: FiActivity, name: 'Metro', desc: 'Urban transit networks' },
  { icon: FiBriefcase, name: 'Smart Cities', desc: 'Integrated urban planning' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const { darkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = navLinks.map(link => document.querySelector(link.href));
      const scrollPos = window.scrollY + 120;
      
      sections.forEach((section, i) => {
        if (section && scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
          setActiveLink(navLinks[i].href);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    setMegaMenuOpen(false);
    setActiveLink(href);
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 overflow-visible ${
          scrolled
            ? 'h-[75px] border-b border-white/5 shadow-2xl'
            : 'h-[100px] bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between pointer-events-auto">
          {/* Brand/Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="group flex items-center gap-3 relative z-[60]"
            aria-label="VD Mahale Construction Home"
          >
            <div className="w-11 h-11 bg-orange-500 rounded-2xl flex items-center justify-center shadow-glow-orange group-hover:scale-110 transition-transform duration-500">
              <span className="text-white font-black text-xl italic tracking-tighter">VM</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-black text-2xl tracking-tighter leading-none transition-colors duration-500 ${
                scrolled ? 'text-heading' : 'text-white'
              }`}>
                VD MAHALE
              </span>
              <span className={`text-[10px] uppercase font-bold tracking-[0.4em] mt-1 transition-opacity duration-500 ${
                scrolled ? 'opacity-40 text-heading' : 'opacity-60 text-white'
              }`}>
                Infrastructure
              </span>
            </div>
          </a>

          {/* Desktop Dashboard Segmented Nav */}
          <div className="hidden lg:flex items-center gap-8 h-full">
            <div className="relative flex items-center p-1.5 border-white/10 rounded-2xl h-[56px]">
              {navLinks.map((link) => {
                const isActive = activeLink === link.href;
                const isServices = link.name === 'Services';
                
                return (
                  <div 
                    key={link.name}
                    className="relative px-1"
                    onMouseEnter={() => isServices && setMegaMenuOpen(true)}
                    onMouseLeave={() => isServices && setMegaMenuOpen(false)}
                  >
                    <div className="relative">
                      <a
                        href={link.href}
                        onClick={(e) => link.hasDropdown ? setMegaMenuOpen(!megaMenuOpen) : handleNavClick(e, link.href)}
                        className={`relative px-5 py-2.5 rounded-xl text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-500 flex items-center gap-2 group/nav-link ${
                          isActive 
                            ? 'text-accent' 
                            : 'text-white/60 hover:text-white'
                        }`}
                      >
                        {isActive && (
                          <motion.div 
                            layoutId="nav-pill"
                            className="absolute inset-0 bg-white/10 dark:bg-white/5 border border-white/10 shadow-lg rounded-xl z-[-1]"
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                        <span>{link.name}</span>
                        {isServices && <FiChevronDown className={`transition-transform duration-300 ${megaMenuOpen ? 'rotate-180' : ''}`} />}
                      </a>
                    </div>

                    {/* Mega Dropdown for Services */}
                    {isServices && (
                      <AnimatePresence>
                        {megaMenuOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 15, scale: 0.95 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] border-white/10 p-8 shadow-3xl pointer-events-auto"
                          >
                            <div className="grid grid-cols-2 gap-8">
                              {serviceHighlights.map((s) => (
                                <a 
                                  key={s.name}
                                  href="#services"
                                  onClick={(e) => handleNavClick(e, '#services')}
                                  className="group/item flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all"
                                >
                                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover/item:scale-110 group-hover/item:bg-accent group-hover/item:text-white transition-all duration-300">
                                    <s.icon size={20} />
                                  </div>
                                  <div>
                                    <p className="font-bold text-white text-sm mb-1">{s.name}</p>
                                    <p className="text-[11px] text-white/40 leading-relaxed font-medium">{s.desc}</p>
                                  </div>
                                </a>
                              ))}
                            </div>
                            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                              <p className="text-[10px] uppercase font-bold tracking-widest text-white/30">Crafting Excellence Since 2005</p>
                              <a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="text-xs font-bold text-accent hover:underline flex items-center gap-1 uppercase">
                                View Full Capabilities <FiArrowUpRight />
                              </a>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-5 ml-4">
              <div className="w-[1px] h-8 bg-white/10" />
              <ThemeToggle />
              <motion.a
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="px-7 py-3.5 bg-accent text-white font-bold text-xs uppercase tracking-[0.15em] rounded-2xl shadow-glow-orange flex items-center gap-2 group"
              >
                <span>Consultation</span>
                <FiArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
            </div>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              className={`p-3 rounded-2xl border-white/10 ${
                scrolled ? 'text-heading' : 'text-white'
              } hover:scale-110 active:scale-95 transition-all`}
            >
              <HiMenu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Side Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-[#0B1121]/80 backdrop-blur-md z-[100]"
            />
            <motion.div
              initial={{ x: '100vw' }}
              animate={{ x: 0 }}
              exit={{ x: '100vw' }}
              transition={{ type: 'spring', damping: 25, stiffness: 150 }}
              className="fixed top-0 right-0 w-[85%] h-full !bg-[#0B1121]/95 !rounded-none z-[110] shadow-3xl flex flex-col border-l border-white/5"
            >
              {/* Mobile Header */}
              <div className="p-8 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center font-black text-white">VM</div>
                  <span className="font-black text-xl text-white tracking-tighter uppercase">Menu</span>
                </div>
                <button 
                  onClick={() => setMobileOpen(false)}
                  className="w-11 h-11 rounded-2xl border-white/10 text-white flex items-center justify-center hover:bg-white/10"
                >
                  <HiX size={24} />
                </button>
              </div>

              {/* Mobile Content */}
              <div className="flex-grow p-8 overflow-y-auto no-scrollbar">
                {/* Search in Mobile */}
                <div className="relative mb-12">
                  <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" />
                  <input 
                    type="text" 
                    placeholder="Search Infrastructure..." 
                    className="w-full pl-14 pr-6 py-4 rounded-2xl !bg-white/5 border-white/5 text-white text-sm outline-none focus:border-accent/30 transition-all font-medium"
                  />
                </div>

                {/* Nav Links */}
                <nav className="space-y-4 mb-16">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (i * 0.1) }}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`flex items-center justify-between px-8 py-6 rounded-2xl transition-all duration-300 ${
                        activeLink === link.href
                          ? '!bg-accent/10 border-accent/30 text-accent shadow-glow-orange/10'
                          : 'border-transparent text-white/40 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="font-black text-xl uppercase tracking-[0.2em]">{link.name}</span>
                      <motion.div
                        animate={activeLink === link.href ? { x: [0, 5, 0] } : {}}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <FiArrowUpRight className={activeLink === link.href ? 'text-accent' : 'opacity-0'} size={24} />
                      </motion.div>
                    </motion.a>
                  ))}
                </nav>

                {/* Contact Cards in Mobile Menu */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.a 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    href="tel:+911234567890" 
                    className="flex flex-col items-center gap-3 p-6 border-white/5 rounded-3xl hover:border-accent/30 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                      <FiPhone size={18} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Voice Support</span>
                  </motion.a>
                  <motion.a 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    href="https://wa.me/911234567890" 
                    className="flex flex-col items-center gap-3 p-6 border-white/5 rounded-3xl hover:border-green-500/30 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                      <FaWhatsapp size={20} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Direct Message</span>
                  </motion.a>
                </div>
              </div>

              {/* Mobile Footer CTA */}
              <div className="p-8 bg-white/5 border-t border-white/5">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  aria-label="Get a free consultation"
                  className="w-full py-5 bg-accent text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 shadow-glow-orange"
                >
                  <span>Get In Touch</span>
                  <FiArrowUpRight />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
