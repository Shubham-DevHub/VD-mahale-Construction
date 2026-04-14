import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Components
import Navbar from './components/common/Navbar';

import Footer from './components/common/Footer';
import FloatingButtons from './components/common/FloatingButtons';
import ScrollToTop from './components/common/ScrollToTop';
import InitialLoader from './components/common/InitialLoader';
import PageWrapper from './components/common/PageWrapper';
import ScrollProgress from './components/common/ScrollProgress';
import CookieConsent from './components/common/CookieConsent';

import Home from './pages/Home';

// Lazy Loaded Pages
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Infrastructure = lazy(() => import('./pages/Infrastructure'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const Media = lazy(() => import('./pages/Media'));
const ERPLogin = lazy(() => import('./pages/ERPLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const EmployeeDashboard = lazy(() => import('./pages/EmployeeDashboard'));
const ProjectDashboard = lazy(() => import('./pages/ProjectDashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  // Refresh AOS on route change
  useEffect(() => {
    AOS.refresh();
  }, [location]);

  const isErpRoute = location.pathname.startsWith('/login') || 
                     location.pathname.startsWith('/admin-dashboard') || 
                     location.pathname.startsWith('/employee-dashboard') ||
                     location.pathname.startsWith('/project-dashboard');

  return (
    <div className="app">
      {!isErpRoute && <ScrollProgress />}
      <InitialLoader />
      {!isErpRoute && <Navbar />}

      {!isErpRoute && <FloatingButtons />}
      {!isErpRoute && <ScrollToTop />}
      {!isErpRoute && <CookieConsent />}
      
      <main>
        <AnimatePresence mode="wait">
          <Suspense fallback={null}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
              <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
              <Route path="/services/:slug" element={<PageWrapper><ServiceDetail /></PageWrapper>} />
              <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
              <Route path="/projects/:slug" element={<PageWrapper><ProjectDetail /></PageWrapper>} />
              <Route path="/infrastructure" element={<PageWrapper><Infrastructure /></PageWrapper>} />
              <Route path="/careers" element={<PageWrapper><Careers /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
              <Route path="/media" element={<PageWrapper><Media /></PageWrapper>} />
              <Route path="/login" element={<PageWrapper><ERPLogin /></PageWrapper>} />
              <Route path="/admin-dashboard" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
              <Route path="/employee-dashboard" element={<PageWrapper><EmployeeDashboard /></PageWrapper>} />
              <Route path="/project-dashboard" element={<PageWrapper><ProjectDashboard /></PageWrapper>} />
              <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>

      {!isErpRoute && <Footer />}
    </div>
  );
}

export default App;
