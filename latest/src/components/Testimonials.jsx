import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Sharma',
    role: 'Director, Sharma Developers',
    text: 'VD Mahale Construction exceeded our expectations on the commercial complex project. Their attention to detail, strict adherence to timelines, and professional approach make them our go-to construction partner.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Priya Patil',
    role: 'Project Head, NHAI',
    text: 'The highway project was completed ahead of schedule with exceptional quality. Their team demonstrated outstanding technical expertise and project management skills throughout the engagement.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Amit Deshmukh',
    role: 'CEO, Deshmukh Industries',
    text: 'Working with VD Mahale has been a phenomenal experience. Their commitment to sustainable construction practices and use of modern technology sets them apart in the industry.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Sneha Joshi',
    role: 'Municipal Commissioner',
    text: 'The bridge construction project was a landmark achievement for our city. VD Mahale delivered a world-class structure that has transformed our urban connectivity.',
    rating: 5,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-rotation
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-yellow-500 font-semibold text-sm tracking-wider uppercase">
            Client Reviews
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white">
            What Our <span className="text-yellow-500">Clients Say</span>
          </h2>
          <div className="mt-4 w-20 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full" />
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 sm:p-12 border border-gray-100 dark:border-gray-700 shadow-lg min-h-[300px] flex items-center overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="w-full"
              >
                <FaQuoteLeft className="text-yellow-400/30 mb-6" size={40} />
                <p className="text-gray-700 dark:text-gray-200 text-lg sm:text-xl leading-relaxed mb-8 italic">
                  &ldquo;{testimonials[current].text}&rdquo;
                </p>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" size={16} />
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-black font-bold text-lg">
                    {testimonials[current].name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {testimonials[current].name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonials[current].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 w-12 h-12 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-200 hover:bg-yellow-400 hover:text-black transition-all duration-200"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 w-12 h-12 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-200 hover:bg-yellow-400 hover:text-black transition-all duration-200"
            aria-label="Next testimonial"
          >
            <FaChevronRight size={16} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => { setDirection(index > current ? 1 : -1); setCurrent(index); }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === current
                    ? 'bg-yellow-400 w-8'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-yellow-400/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
