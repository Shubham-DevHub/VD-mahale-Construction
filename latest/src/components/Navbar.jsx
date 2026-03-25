import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { BsSun, BsMoon } from 'react-icons/bs';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Why Us', href: '#whyus' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <span className="text-black font-black text-lg">VD</span>
            </div>
            <div>
              <span className={`font-bold text-xl tracking-tight ${
                scrolled ? 'text-gray-900 dark:text-white' : 'text-white'
              }`}>
                VD Mahale
              </span>
              <span className={`block text-[10px] uppercase tracking-[0.2em] -mt-1 ${
                scrolled ? 'text-yellow-600 dark:text-yellow-400' : 'text-yellow-400'
              }`}>
                Construction
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-yellow-400/20 ${
                  scrolled
                    ? 'text-gray-700 dark:text-gray-200 hover:text-yellow-600 dark:hover:text-yellow-400'
                    : 'text-white/90 hover:text-yellow-400'
                }`}
              >
                {link.name}
              </a>
            ))}

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className={`ml-2 p-2 rounded-lg transition-all duration-200 ${
                scrolled
                  ? 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  : 'text-white/90 hover:bg-white/10'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <BsSun size={18} /> : <BsMoon size={18} />}
            </button>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="ml-3 px-5 py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold text-sm rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-lg shadow-yellow-400/25"
            >
              Get Quote
            </a>
          </div>

          {/* Mobile buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${
                scrolled ? 'text-gray-700 dark:text-gray-200' : 'text-white'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <BsSun size={18} /> : <BsMoon size={18} />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 rounded-lg ${
                scrolled ? 'text-gray-700 dark:text-gray-200' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-xl"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 font-medium hover:bg-yellow-50 dark:hover:bg-gray-800 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="block mx-4 mt-3 px-5 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold text-center rounded-lg"
              >
                Get Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
