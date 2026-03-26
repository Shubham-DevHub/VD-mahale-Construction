import React from 'react';
import SectionHeader from '../common/SectionHeader';
import { certificationsData } from '../../data/certificationsData';
import './CertificationsBar.css';

const CertificationsBar = () => {
  return (
    <section className="certs-section">
      <div className="container">
        <div className="certs-grid">
          <div className="certs-info" data-aos="fade-right">
            <h3>Our Quality Certifications</h3>
            <p>Committed to international standards in construction, safety, and environment.</p>
          </div>
          <div className="certs-list" data-aos="fade-left">
            {certificationsData.map((item) => (
              <div key={item.id} className="cert-item">
                <div className="cert-logo-box">
                  {item.logo ? <img src={item.logo} alt={item.name} /> : <span>{item.name.split(' ')[0]}</span>}
                </div>
                <div className="cert-text">
                  <strong>{item.name}</strong>
                  <span>{item.body}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsBar;
