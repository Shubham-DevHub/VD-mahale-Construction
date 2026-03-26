import React, { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiChevronDown, FiArrowRight, FiMenu, FiX, FiSearch, 
  FiMap, FiLayers, FiPackage, FiAward, FiTarget, FiActivity 
} from 'react-icons/fi';
import { servicesData } from '../../data/servicesData';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setActiveDropdown(null);
    document.body.style.overflow = 'auto';
  }, [location]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : 'auto';
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services', hasMega: true },
    { label: 'Projects', path: '/projects' },
    { label: 'Infrastructure', path: '/infrastructure' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <nav className={`main-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Brand/Logo */}
          <Link to="/" className="nav-brand">
            <div className="brand-icon">VD</div>
            <div className="brand-text">
              <span className="brand-name">MAHALE INFRA</span>
              <span className="brand-tag">Excellence in Engineering</span>
            </div>
          </Link>

          {/* Desktop Pill Navigation */}
          <div className="nav-segmented-pills hide-tablet">
            {navLinks.map((link) => (
              <div 
                key={link.path} 
                className="pill-item-wrapper"
                onMouseEnter={() => link.hasMega && setActiveDropdown('services')}
                onMouseLeave={() => link.hasMega && setActiveDropdown(null)}
              >
                <NavLink 
                  to={link.path} 
                  className={({ isActive }) => `pill-link ${isActive ? 'active' : ''}`}
                >
                  {link.label}
                  {link.hasMega && <FiChevronDown className="dropdown-chevron" />}
                </NavLink>

                {/* Glass Mega Dropdown */}
                {link.hasMega && (
                  <AnimatePresence>
                    {activeDropdown === 'services' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        className="mega-menu"
                      >
                        <div className="mega-menu-content">
                          <div className="mega-services-grid">
                            {servicesData.map(service => (
                              <Link 
                                key={service.id} 
                                to={`/services/${service.slug}`} 
                                className="mega-service-card"
                              >
                                <div className="m-card-icon">
                                  {service.icon === 'FiMap' ? <FiMap /> : 
                                   service.icon === 'FiLayers' ? <FiLayers /> : <FiPackage />}
                                </div>
                                <div className="m-card-info">
                                  <h5>{service.title}</h5>
                                  <p>{service.shortDescription}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="mega-featured-panel">
                            <div className="featured-inner">
                              <span className="feat-chip">Specialized</span>
                              <h3>Hybrid Annuity Projects</h3>
                              <p>Pioneering the next generation of public-private partnerships in Maharashtra.</p>
                              <Link to="/projects" className="px-4 py-2 bg-accent text-white rounded-lg text-xs font-bold hover:bg-accent/80 transition-all flex items-center gap-2">
                                Read Case Study <FiArrowRight />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Nav Actions */}
          <div className="nav-actions">
            <button className="search-toggle-pilled" onClick={() => setSearchOpen(true)}>
              <FiSearch />
            </button>
            <div className="theme-toggle-wrapper hide-mobile">
              <ThemeToggle />
            </div>
            <Link to="/contact" className="btn-premium-pilled hide-mobile">
              Get Started <FiArrowRight />
            </Link>
            
            <button className="mobile-toggle hide-desktop" onClick={toggleMobileMenu}>
              <FiMenu />
            </button>
          </div>
        </div>
      </nav>

      {/* Global Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="search-overlay"
          >
            <div className="search-modal-container">
              <div className="search-header">
                <FiSearch className="s-icon" />
                <input type="text" placeholder="Search infrastructure excellence..." autoFocus />
                <button title="Close Search" onClick={() => setSearchOpen(false)}><FiX /></button>
              </div>
              <div className="quick-links">
                <span>Quick Search:</span>
                <Link to="/services/road-construction">Roads</Link>
                <Link to="/services/bridges">Bridges</Link>
                <Link to="/infrastructure/rmc-plant">RMC Plant</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Right Full-Screen Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="mobile-panel"
          >
            <div className="m-panel-header">
              <Link to="/" className="nav-brand" onClick={toggleMobileMenu}>
                <div className="brand-icon">VD</div>
              </Link>
              <button className="m-close-btn" onClick={toggleMobileMenu}><FiX /></button>
            </div>

            <div className="m-panel-body">
              <div className="m-search-box">
                <FiSearch />
                <input type="text" placeholder="Search..." />
              </div>

              <div className="m-nav-list">
                {navLinks.map((link, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={link.path}
                  >
                    <Link to={link.path} className="m-nav-item" onClick={toggleMobileMenu}>
                      <span>0{idx + 1}.</span>
                      {link.label}
                      <FiArrowRight className="m-arrow" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="m-utility-grid">
                <div className="m-util-card">
                  <FiActivity />
                  <span>Safety Records</span>
                </div>
                <div className="m-util-card">
                  <FiAward />
                  <span>Awards</span>
                </div>
              </div>
            </div>

            <div className="m-panel-footer">
              <ThemeToggle />
              <Link to="/contact" className="btn-premium-pilled w-full" onClick={toggleMobileMenu}>
                Contact VDM Infra
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
