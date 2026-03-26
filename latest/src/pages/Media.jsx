import React from 'react';
import SectionHeader from '../components/common/SectionHeader';
import { newsData } from '../data/newsData';
import { Link } from 'react-router-dom';
import { FiCalendar, FiArrowRight } from 'react-icons/fi';
import '../components/services/Services.css'; // Reusing layout for consistency

const Media = () => {
  return (
    <div className="media-page" style={{ paddingTop: '100px', paddingBottom: '100px', backgroundColor: 'var(--bg-primary)' }}>

      <div className="container">
        <SectionHeader 
          label="Media Center"
          title="News & Updates"
          subtitle="Stay informed about our latest milestones, awards, and corporate announcements."
        />
        
        <div className="news-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
          gap: '30px', 
          marginTop: '50px' 
        }}>
          {newsData.map((item, index) => (
            <div key={item.id} className="news-card" data-aos="fade-up" data-aos-delay={index * 100} style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>

              <div className="news-img" style={{ height: '240px', overflow: 'hidden' }}>
                <img src={item.thumbnail} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="news-body" style={{ padding: '25px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px', color: 'var(--accent-orange)', fontSize: '13px', fontWeight: '600' }}>
                  <FiCalendar /> {item.date}
                </div>
                <h3 style={{ marginBottom: '15px', color: 'var(--text-heading)' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-body)', marginBottom: '20px' }}>{item.excerpt}</p>

                <Link to={`/media/${item.slug}`} className="btn-text">
                  Read Article <FiArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Media;
