import { motion } from 'framer-motion';
import { FiSettings, FiActivity, FiBriefcase, FiTruck } from 'react-icons/fi';
import { FaRoad, FaHardHat } from 'react-icons/fa';
import ServiceCard from './Cards/ServiceCard';

const services = [
  {
    icon: FaRoad,
    title: 'Highways & Expressways',
    description: 'Specializing in large-scale road construction with high-grade asphalt and concrete surfacing for national connectivity.',
    image: '/images/service-1.png'
  },
  {
    icon: FiTruck,
    title: 'Railway Infrastructure',
    description: 'Comprehensive solutions for railway track laying, earthworks, and bridge construction for modern transit systems.',
    image: '/images/service-2.png'
  },
  {
    icon: FaHardHat,
    title: 'Bridges & Flyovers',
    description: 'Engineering complex structures and overpasses to facilitate smooth urban transit and inter-city crossings.',
    image: '/images/service-3.png'
  },
  {
    icon: FiSettings,
    title: 'Renewable Energy',
    description: 'EPC services for solar and wind farms, supporting India\'s transition to clean and sustainable energy sources.',
    image: '/images/service-4.png'
  },
  {
    icon: FiActivity,
    title: 'Metro Rail Projects',
    description: 'Developing urban metro networks including elevated corridors and underground tunnel systems.',
    image: '/images/service-1.png'
  },
  {
    icon: FiBriefcase,
    title: 'Smart City Dev',
    description: 'Implementing integrated urban planning and smart infrastructure for the next generation of Indian cities.',
    image: '/images/service-2.png'
  }
];

const Services = () => {
  return (
    <section id="services" className="relative py-32 bg-secondary overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="dotGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dotGrid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overline-label mb-4"
          >
            Capabilities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Engineering Excellence in <br/>
            <span className="text-accent underline-effect">Every Dimension</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-secondary"
          >
            VD Mahale Infra provides end-to-end solutions for the nation's most critical 
            infrastructure challenges, delivering projects that stand the test of time.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.title}
              {...service}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 text-center md:text-left shadow-lg bg-navy-900/60 rounded-[2rem]"
        >
          <div>
            <h4 className="text-xl font-bold mb-1">Looking for a specialized solution?</h4>
            <p className="text-secondary text-sm">Our expert team can design custom infrastructure plans for your specific requirements.</p>
          </div>
          <a 
            href="#contact" 
            aria-label="Book a consultation with our infrastructure experts"
            className="px-8 py-4 bg-accent text-white font-bold rounded-xl shadow-glow-orange hover:-translate-y-1 transition-all whitespace-nowrap"
          >
            Consult with Experts
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
