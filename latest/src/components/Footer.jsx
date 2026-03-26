import { motion } from 'framer-motion';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube, FiPhone, FiMail, FiMapPin, FiArrowUp } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    organization: [
      { name: 'Introduction', href: '#about' },
      { name: 'Leadership', href: '#' },
      { name: 'Vision & Mission', href: '#' },
      { name: 'Awards', href: '#' },
    ],
    businesses: [
      { name: 'Roads & Highways', href: '#' },
      { name: 'Railways', href: '#' },
      { name: 'Metro Projects', href: '#' },
      { name: 'Renewable Energy', href: '#' },
    ],
    quicklinks: [
      { name: 'Career Opportunities', href: '#' },
      { name: 'Investor Relations', href: '#' },
      { name: 'Media Center', href: '#' },
      { name: 'Contact Us', href: '#contact' },
    ]
  };

  return (
    <footer className="relative bg-[#0B1121] text-white pt-24 pb-12 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Column */}
          <div className="space-y-6 text-center md:text-left flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center font-black text-2xl italic shadow-glow-orange">VM</div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-2xl tracking-tighter">VD MAHALE</span>
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-orange-500/80">Infrastructure</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Building India's future through world-class infrastructure, precision engineering, and a commitment to sustainable growth since 2005.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              {[FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube, FaWhatsapp].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-accent hover:shadow-glow-orange transition-all duration-300 border border-white/5 bg-white/5"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([key, links]) => (
            <div key={key}>
              <h4 className="text-lg font-bold mb-8 relative inline-block group capitalize text-center w-full md:w-auto md:text-left">
                {key}
                <span className="absolute -bottom-2 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-8 h-[3px] bg-accent rounded-full transition-all duration-300 group-hover:w-full" />
              </h4>
              <ul className="space-y-4 text-center md:text-left">
                {links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-400 hover:text-white text-sm flex items-center group transition-colors">
                      <span className="w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-4 group-hover:mr-3" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-10 border-y border-white/5 mb-12">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-accent shrink-0 border border-white/5 bg-white/5">
              <FiPhone size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Call Support</p>
              <p className="text-white font-bold tracking-tight">+91-141-4106040</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-accent shrink-0 border border-white/5 bg-white/5">
              <FiMail size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Email Inquiry</p>
              <p className="text-white font-bold tracking-tight">info@vdmahale.com</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-accent shrink-0 border border-white/5 bg-white/5">
              <FiMapPin size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Offices</p>
              <p className="text-white font-bold tracking-tight">Mumbai, Maharashtra, IND</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-white/5 opacity-60">
          <p className="text-xs text-gray-400">
            &copy; {currentYear} VD Mahale Infrastructure Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-xs text-gray-400 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-400 hover:text-white">Terms of Service</a>
            <a href="#" className="text-xs text-gray-400 hover:text-white">Sitemap</a>
          </div>
          <button 
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all group border border-white/5 bg-white/5"
          >
            <FiArrowUp className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Silhouette Decorative SVG */}
      <div className="absolute bottom-0 left-0 w-full opacity-5 pointer-events-none translate-y-1">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120H1440V80L1380 60L1320 80L1260 40L1200 70L1140 30L1080 60L1020 20L960 50L900 10L840 40L780 0L720 30L660 10L600 40L540 20L480 50L420 30L360 60L300 40L240 70L180 50L120 80L60 60L0 80V120Z" fill="white"/>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
