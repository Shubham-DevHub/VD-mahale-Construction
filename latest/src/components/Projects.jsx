import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaMapMarkerAlt, FaExpandArrowsAlt } from 'react-icons/fa';

const categories = ['All', 'Highways', 'Buildings', 'Bridges', 'Water'];

const projects = [
  {
    id: 1,
    title: 'NH-48 Highway Extension',
    category: 'Highways',
    location: 'Maharashtra',
    value: '₹450 Cr',
    image: '/images/project-highway.png',
    description: '120 km four-lane highway expansion with modern toll infrastructure.',
  },
  {
    id: 2,
    title: 'Skyline Business Park',
    category: 'Buildings',
    location: 'Pune',
    value: '₹280 Cr',
    image: '/images/project-building.png',
    description: 'State-of-the-art 25-storey commercial complex with sustainable design.',
  },
  {
    id: 3,
    title: 'Krishna River Bridge',
    category: 'Bridges',
    location: 'Karnataka',
    value: '₹180 Cr',
    image: '/images/project-bridge.png',
    description: 'Multi-span prestressed concrete bridge with 800m total length.',
  },
  {
    id: 4,
    title: 'Jayakwadi Dam Renovation',
    category: 'Water',
    location: 'Maharashtra',
    value: '₹320 Cr',
    image: '/images/project-dam.png',
    description: 'Comprehensive renovation and capacity enhancement of irrigation dam.',
  },
  {
    id: 5,
    title: 'Mumbai-Nagpur Expressway',
    category: 'Highways',
    location: 'Maharashtra',
    value: '₹680 Cr',
    image: '/images/project-highway.png',
    description: '210 km section of the Samruddhi Mahamarg with 6-lane access-controlled expressway.',
  },
  {
    id: 6,
    title: 'Godavari Flyover',
    category: 'Bridges',
    location: 'Nashik',
    value: '₹95 Cr',
    image: '/images/project-bridge.png',
    description: 'Urban flyover spanning 1.2 km, reducing congestion in the city center.',
  },
];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-yellow-500 font-semibold text-sm tracking-wider uppercase">
            Our Portfolio
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white">
            Featured <span className="text-yellow-500">Projects</span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A showcase of our landmark projects that define India&apos;s modern infrastructure landscape.
          </p>
          <div className="mt-4 w-20 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full" />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg shadow-yellow-400/25'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                      <FaExpandArrowsAlt className="text-black" size={18} />
                    </div>
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full">
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                      <FaMapMarkerAlt size={12} className="text-yellow-500" />
                      {project.location}
                    </span>
                    <span className="font-bold text-yellow-600 dark:text-yellow-400">
                      {project.value}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects;
