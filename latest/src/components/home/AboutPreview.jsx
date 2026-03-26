import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import { companyData } from '../../data/companyData';
import './AboutPreview.css';

const AboutPreview = () => {
  return (
    <section className="about-preview">
      <div className="container">
        <div className="about-grid">
          {/* Left: Image Side */}
          <div className="about-image-side" data-aos="fade-right">
            <div className="image-stack">
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800" 
                alt="Legacy" 
                className="about-img-main"
                loading="lazy"
              />
              <div className="stat-floating shadow-lg">
                <span className="count">25+</span>
                <span className="label">Years of Excellence</span>
              </div>
              <div className="image-overlay-card">
                <div className="overlay-card-content">
                  <FiCheckCircle className="text-orange" size={28} />
                  <div>
                    <h4>150+ Projects</h4>
                    <p>Delivered Successfully</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Text Side */}
          <div className="about-text-side" data-aos="fade-left">
            <div className="section-label">
              <span className="line"></span>
              <span>Who We Are</span>
            </div>
            <h2 className="section-title">Established Leaders in <span className="text-orange">Infrastructure Development</span></h2>
            <p className="section-desc">
              {companyData.description}
            </p>
            
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon"><FiCheckCircle /></div>
                <div>
                  <h5>Class-A Registered Contractor</h5>
                  <p>Certified by State Government for large-scale infrastructure projects.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><FiCheckCircle /></div>
                <div>
                  <h5>In-House Production Units</h5>
                  <p>Full control over quality with our own RMC and Hotmix plants.</p>
                </div>
              </div>
            </div>

            <div className="about-actions">
              <Link to="/about" className="btn btn-primary">
                Learn Our History <FiArrowRight />
              </Link>
              <div className="founder-sign">
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Signature_of_Abraham_Lincoln.svg" alt="Signature" className="signature-img" loading="lazy" />
                <div className="founder-info">
                  <strong>V. D. Mahale</strong>
                  <span>Founder & Chairman</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
