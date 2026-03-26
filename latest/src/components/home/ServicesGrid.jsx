import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import SectionHeader from '../common/SectionHeader';
import { servicesData } from '../../data/servicesData';
import './ServicesGrid.css';

const ServicesGrid = () => {
  return (
    <section className="services-grid-section bg-light">
      <div className="container">
        <SectionHeader 
          label="What We Offer"
          title="Our Core Expertise"
          subtitle="From nationwide highways to specialized material supply, we deliver end-to-end infrastructure solutions."
        />

        <div className="services-grid">
          {servicesData.map((service, index) => (
            <div 
              key={service.id} 
              className="service-card-v2" 
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              <div className="service-img-wrapper">
                <img src={service.image} alt={service.title} loading="lazy" />
                <div className="service-overlay">
                  <Link to={`/services/${service.slug}`} className="btn btn-primary btn-sm">Read More <FiArrowRight /></Link>
                </div>
              </div>
              <div className="service-content">
                <div className="service-icon-abs">🏗️</div>
                <h3>{service.title}</h3>
                <p>{service.shortDescription}</p>
                <Link to={`/services/${service.slug}`} className="service-link">
                  View Specifications <FiArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-60" data-aos="fade-up">
          <Link to="/services" className="btn btn-primary">
            Explore All Expertise <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>

  );
};

export default ServicesGrid;
