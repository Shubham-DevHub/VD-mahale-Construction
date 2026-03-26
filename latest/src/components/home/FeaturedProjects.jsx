import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiMapPin, FiExternalLink } from 'react-icons/fi';
import SectionHeader from '../common/SectionHeader';
import { projectsData } from '../../data/projectsData';
import './FeaturedProjects.css';

const FeaturedProjects = () => {
  const [filter, setFilter] = useState('all');
  
  const filteredProjects = filter === 'all' 
    ? projectsData.slice(0, 6) 
    : projectsData.filter(p => p.category === filter).slice(0, 6);

  return (
    <section className="projects-section">
      <div className="container">
        <div className="section-header-flex">
          <SectionHeader 
            label="Our Portfolio"
            title="Building a Greater Nation"
            subtitle="Explore our milestone projects that define the infrastructure landscape across the country."
            align="left"
          />
          
          <div className="filter-tabs hide-mobile">
            {['all', 'road', 'bridge', 'irrigation'].map(tab => (
              <button 
                key={tab}
                className={`filter-tab ${filter === tab ? 'active' : ''}`}
                onClick={() => setFilter(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className="project-card-v2"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="project-img-box">
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="project-badge">{project.status}</div>
                <div className="project-overlay-v2">
                  <div className="overlay-content">
                    <p className="project-client">Client: {project.client}</p>
                    <Link to={`/projects/${project.slug}`} className="view-btn">
                      <FiExternalLink /> View Case Study
                    </Link>
                  </div>
                </div>
              </div>
              <div className="project-details">
                <div className="project-meta">
                  <span className="project-loc"><FiMapPin /> {project.location}</span>
                  <span className="project-cat">{project.category}</span>
                </div>
                <h3>{project.title}</h3>
                <div className="project-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${project.completion}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{project.completion}% Completed</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-60">
          <Link to="/projects" className="btn btn-primary">
            View Full Portfolio <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
