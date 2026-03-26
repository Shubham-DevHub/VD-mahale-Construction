import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiArrowRight } from 'react-icons/fi';
import SectionHeader from '../common/SectionHeader';
import { newsData } from '../../data/newsData';
import './LatestNews.css';

const LatestNews = () => {
  return (
    <section className="news-section">
      <div className="container">
        <SectionHeader 
          label="Media Center"
          title="Latest Updates & Insights"
          subtitle="Stay informed with the latest developments at VD Mahale Infra and the construction industry."
        />


        <div className="news-grid">
          {newsData.map((item, index) => (
            <div 
              key={item.id} 
              className="news-card-v2"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="news-img">
                <img src={item.thumbnail} alt={item.title} loading="lazy" />
                <div className="news-date">
                  <FiCalendar /> {item.date}
                </div>
              </div>
              <div className="news-body">
                <span className="news-tag">{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <Link to={`/media/${item.slug}`} className="news-link">
                  Read Article <FiArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
