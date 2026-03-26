import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Sanjeev Kumar',
    position: 'Chief Engineer, NHAI',
    quote: "VD Mahale Infrastructure has consistently delivered high-quality road projects ahead of schedule. Their attention to technical detail and site safety is exemplary in the industry.",
    avatar: 'https://i.pravatar.cc/150?u=sanjeev',
    rating: 5
  },
  {
    name: 'Anjali Deshmukh',
    position: 'Director, Smart Cities Mission',
    quote: "Their approach to urban infrastructure integration is visionary. The bridge and flyover projects they completed for us have significantly reduced congestion and improved quality of life.",
    avatar: 'https://i.pravatar.cc/150?u=anjali',
    rating: 5
  },
  {
    name: 'Vikram Singh',
    position: 'Project Manager, Adani Green',
    quote: "Excellent EPC services for our latest solar farm project. The structural foundations and electrical ducting work were performed with high precision and speed.",
    avatar: 'https://i.pravatar.cc/150?u=vikram',
    rating: 4
  }
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      rotateY: dir > 0 ? 45 : -45
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      zIndex: 1
    },
    exit: (dir) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      rotateY: dir < 0 ? 45 : -45,
      zIndex: 0
    })
  };

  return (
    <section id="testimonials" className="relative py-32 bg-primary overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[160px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overline-label mb-4"
          >
            Testimonials
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white text-4xl md:text-5xl font-bold mb-6"
          >
            Voice of Our <span className="text-gradient-accent">Global Partners</span>
          </motion.h2>
          <p className="text-white/60">Trust is the foundation of every structure we build.</p>
        </div>

        <div className="relative max-w-5xl mx-auto h-[450px] md:h-[400px]">
          <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) > 50;
                  if (swipe) {
                    if (offset.x > 0) prev();
                    else next();
                  }
                }}
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  rotateY: { duration: 0.6 }
                }}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
              >
              <div className="h-full border-white/10 p-8 md:p-16 flex flex-col md:flex-row items-center gap-10 md:gap-16 relative overflow-hidden">
                {/* Large Background Quote */}
                <FaQuoteLeft className="absolute top-[-20px] left-[-20px] text-white/5 text-[200px] -z-10" />
                
                {/* Avatar with accent ring */}
                <div className="relative shrink-0">
                  <div className="w-32 h-32 md:w-48 md:h-48 rounded-full p-2 border-2 border-dashed border-accent/40 animate-spin-slow">
                    <div className="w-full h-full rounded-full border-4 border-white overflow-hidden shadow-2xl">
                      <img 
                        src={testimonials[index].avatar} 
                        alt={testimonials[index].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  {/* Floating badge */}
                  <div className="absolute -bottom-2 -right-2 bg-accent text-white p-2 rounded-lg shadow-glow-orange">
                    <FiStar fill="currentColor" />
                  </div>
                </div>

                <div className="flex flex-col flex-grow text-center md:text-left">
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-6 justify-center md:justify-start">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i} 
                        size={18} 
                        className={i < testimonials[index].rating ? "fill-accent text-accent" : "text-white/20"} 
                      />
                    ))}
                  </div>

                  <p className="text-lg md:text-xl font-medium text-white italic leading-relaxed mb-8 font-inter">
                    "{testimonials[index].quote}"
                  </p>

                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">{testimonials[index].name}</h4>
                    <p className="text-accent text-sm font-bold uppercase tracking-widest">{testimonials[index].position}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute -bottom-12 md:bottom-auto md:top-1/2 md:-translate-y-1/2 left-0 right-0 flex justify-center md:justify-between px-4 md:-px-12 gap-8 z-20">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-xl text-white hover:bg-accent hover:border-accent transition-all duration-300 flex items-center justify-center shadow-lg"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-xl text-white hover:bg-accent hover:border-accent transition-all duration-300 flex items-center justify-center shadow-lg"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="mt-12 md:mt-4 flex justify-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                index === i ? 'w-10 bg-accent' : 'w-3 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
