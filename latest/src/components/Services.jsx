import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaRoad, FaBuilding, FaHardHat, FaProjectDiagram, FaArchway, FaTint } from 'react-icons/fa';

const services = [
  {
    icon: FaRoad,
    title: 'Road Construction',
    description: 'State-of-the-art highway and road construction with advanced materials and techniques for lasting durability.',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    icon: FaBuilding,
    title: 'Infrastructure Development',
    description: 'Comprehensive infrastructure solutions including commercial complexes, industrial parks, and urban developments.',
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    icon: FaHardHat,
    title: 'Civil Engineering',
    description: 'Expert civil engineering services covering structural design, geotechnical analysis, and construction management.',
    color: 'from-orange-400 to-orange-600',
  },
  {
    icon: FaProjectDiagram,
    title: 'Project Management',
    description: 'End-to-end project management ensuring timely delivery, cost efficiency, and uncompromised quality standards.',
    color: 'from-yellow-400 to-yellow-500',
  },
  {
    icon: FaArchway,
    title: 'Bridge Construction',
    description: 'Design and construction of bridges ranging from small spans to large-scale multi-lane highway overpasses.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: FaTint,
    title: 'Water Infrastructure',
    description: 'Dam construction, irrigation canals, water treatment facilities, and stormwater management systems.',
    color: 'from-yellow-500 to-orange-500',
  },
];

const Services = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="services" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-yellow-500 font-semibold text-sm tracking-wider uppercase">
            What We Do
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white">
            Our <span className="text-yellow-500">Services</span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Delivering comprehensive construction and infrastructure solutions 
            with unmatched expertise and innovation.
          </p>
          <div className="mt-4 w-20 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full" />
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              {/* Hover gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <service.icon className="text-white" size={24} />
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                {service.description}
              </p>

              {/* Arrow link */}
              <div className="mt-5 flex items-center text-yellow-500 font-medium text-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Learn More <span className="ml-2">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
