import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Stats from './components/Stats';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Loader from './components/Loader';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <AnimatePresence>
          {loading && <Loader />}
        </AnimatePresence>

        {!loading && (
          <>
            <Navbar />
            <main>
              <Hero />
              <About />
              <Services />
              <Projects />
              <Stats />
              <WhyChooseUs />
              <Testimonials />
              <Contact />
            </main>
            <Footer />
            <ScrollToTop />
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
