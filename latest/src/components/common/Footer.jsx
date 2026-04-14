import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiChevronRight } from 'react-icons/fi';
import { FaLinkedinIn, FaFacebookF, FaYoutube, FaInstagram, FaTwitter } from 'react-icons/fa';
import { companyData } from '../../data/companyData';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Company Profile */}
          <div className="footer-col" data-aos="fade-up">
            <Link to="/" className="footer-logo">
              <div className="logo-text">VD MAHALE</div>
              <span className="logo-tag">Building India's Infrastructure</span>
            </Link>
            <p className="footer-desc">{companyData.description}</p>
            <div className="footer-social">
              <a href={companyData.socialMedia.linkedin} className="social-icon"><FaLinkedinIn /></a>
              <a href={companyData.socialMedia.facebook} className="social-icon"><FaFacebookF /></a>
              <a href={companyData.socialMedia.twitter} className="social-icon"><FaTwitter /></a>
              <a href={companyData.socialMedia.instagram} className="social-icon"><FaInstagram /></a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="footer-col" data-aos="fade-up" data-aos-delay="100">
            <h4 className="footer-title">Our Services</h4>
            <ul className="footer-links">
              <li><Link to="/services/road-construction"><FiChevronRight /> Road Construction</Link></li>
              <li><Link to="/services/bridge-construction"><FiChevronRight /> Bridge Engineering</Link></li>
              <li><Link to="/services/rmc-supply"><FiChevronRight /> RMC Supply</Link></li>
              <li><Link to="/services/hotmix-plant"><FiChevronRight /> Hotmix Operations</Link></li>
              <li><Link to="/services/stone-crusher"><FiChevronRight /> Stone Crushing</Link></li>
              <li><Link to="/services/earthwork"><FiChevronRight /> Bulk Earthwork</Link></li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="footer-col" data-aos="fade-up" data-aos-delay="200">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/about"><FiChevronRight /> About Us</Link></li>
              <li><Link to="/projects"><FiChevronRight /> Ongoing Projects</Link></li>
              <li><Link to="/infrastructure"><FiChevronRight /> Our Infrastructure</Link></li>
              <li><Link to="/careers"><FiChevronRight /> Career Openings</Link></li>
              <li><Link to="/media"><FiChevronRight /> Media Gallery</Link></li>
              <li><Link to="/contact"><FiChevronRight /> Contact Support</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div className="footer-col" data-aos="fade-up" data-aos-delay="300">
            <h4 className="footer-title">Get in Touch</h4>
            <ul className="footer-contact">
              <li>
                <FiMapPin className="text-orange" />
                <span>{companyData.contact.address}</span>
              </li>
              <li>
                <FiPhone className="text-orange" />
                <span>{companyData.contact.phones[0]}</span>
              </li>
              <li>
                <FiMail className="text-orange" />
                <span>{companyData.contact.emails[0]}</span>
              </li>
              <li>
                <FiClock className="text-orange" />
                <span>{companyData.contact.workingHours}</span>
              </li>
            </ul>
            <div className="newsletter-box">
              <p>Subscribe to our newsletter</p>
              <form className="footer-form">
                <input type="email" placeholder="Your email..." required />
                <button type="submit"><FiSend /></button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-flex">
          <p>© 2024 {companyData.name}. All Rights Reserved.</p>
          <div className="bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/sitemap">Sitemap</Link>
            <Link to="/login" className="footer-login-btn">ERP Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
