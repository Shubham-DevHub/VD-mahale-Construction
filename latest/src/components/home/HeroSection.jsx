import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPlay } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import HeroStats from './HeroStats';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import './HeroSection.css';

const slides = [
  {
    id: 1,
    title: "Engineering Excellence. Delivering Trust.",
    subtitle: "Leading India's Infrastructure Growth with Innovation and Quality.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 2,
    title: "Building Modern Highways & Bridges.",
    subtitle: "Class-A Government Contractors specializing in mass-scale roadworks.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 3,
    title: "Integrated Supply Chain Solutions.",
    subtitle: "Own Hotmix Plants, RMC Units, and Stone Crushers for superior control.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1600",
  }
];

const HeroSection = () => {
  const [imagesLoaded, setImagesLoaded] = useState({});

  const handleImageLoad = (id) => {
    setImagesLoaded(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section className="hero-overflow">
      {/* Critical Image Preloading (Hidden) */}
      <div style={{ display: 'none' }}>
        {slides.map(slide => (
          <img 
            key={slide.id} 
            src={slide.image} 
            onLoad={() => handleImageLoad(slide.id)} 
            alt="preload" 
          />
        ))}
      </div>

      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        speed={1000} // Smoother transition
        grabCursor={true}
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="hero-slide-content">
              <div 
                className={`hero-bg animate-kenburns ${imagesLoaded[slide.id] ? 'loaded' : 'loading'}`} 
                style={{ 
                  backgroundImage: imagesLoaded[slide.id] 
                    ? `linear-gradient(rgba(10,22,40,0.6), rgba(10,22,40,0.4)), url(${slide.image})` 
                    : 'none',
                  backgroundColor: '#0a1628' // Fallback solid color while loading
                }}
              ></div>
              <div className="container">
                <div className="hero-text-container">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="p-8 sm:p-12 max-w-4xl bg-navy-900/40 border border-white/5 rounded-3xl backdrop-blur-sm"
                  >
                    <span className="hero-label">Class A Registered Contractor</span>
                    <h1 className="hero-title">{slide.title}</h1>
                    <p className="hero-subtitle">{slide.subtitle}</p>
                    
                    <div className="hero-actions">
                      <a href="/projects" className="btn btn-primary btn-lg">
                        Explore Projects <FiArrowRight />
                      </a>
                      <button className="video-btn">
                        <span className="play-icon"><FiPlay /></span>
                        <span>Watch Video</span>
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <HeroStats />
      
      {/* Scroll Indicator */}
      <div className="scroll-indicator hide-mobile">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span>Scroll Down</span>
      </div>
    </section>
  );
};

export default HeroSection;
