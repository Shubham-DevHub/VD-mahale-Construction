import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import ProjectCard from './Cards/ProjectCard';

const projects = [
  {
    title: 'Delhi-Mumbai Expressway Package 7',
    category: 'Highways',
    status: 'Ongoing',
    value: '185',
    location: 'Rajasthan, IND',
    client: 'NHAI',
    size: '45.8 KM',
    duration: '24 Months',
    image: '/images/hero.png'
  },
  {
    title: 'Eastern Peripheral Road Bridge',
    category: 'Bridges',
    status: 'Completed',
    value: '42',
    location: 'Haryana, IND',
    client: 'NHIDCL',
    size: '1.2 KM',
    duration: '18 Months',
    image: '/images/service-1.png'
  },
  {
    title: 'Jodhpur Water Supply Tunnel',
    category: 'Infrastructure',
    status: 'Upcoming',
    value: '95',
    location: 'Jodhpur, IND',
    client: 'PHED',
    size: '12.5 KM',
    duration: '36 Months',
    image: '/images/service-2.png'
  },
  {
    title: 'Bikaner Solar Park Foundation',
    category: 'Renewable',
    status: 'Completed',
    value: '28',
    location: 'Bikaner, IND',
    client: 'Adani Green',
    size: '450 MW',
    duration: '12 Months',
    image: '/images/service-3.png'
  },
  {
    title: 'Pune Metro Line 2 Corridor',
    category: 'Highways',
    status: 'Ongoing',
    value: '120',
    location: 'Pune, IND',
    client: 'PMRDA',
    size: '8.4 KM',
    duration: '30 Months',
    image: '/images/service-4.png'
  },
  {
    title: 'Gujarat Industrial Belt Road',
    category: 'Highways',
    status: 'Completed',
    value: '75',
    location: 'Surat, IND',
    client: 'GIDC',
    size: '22 KM',
    duration: '20 Months',
    image: '/images/service-1.png'
  }
];

const categories = ['All', 'Highways', 'Bridges', 'Renewable', 'Infrastructure'];

const Projects = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [isChanging, setIsChanging] = useState(false);

  const handleTabChange = (cat) => {
    setIsChanging(true);
    setActiveTab(cat);
    setTimeout(() => setIsChanging(false), 600);
  };

  const filteredProjects = activeTab === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <section id="projects" className="relative py-32 bg-primary overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="overline-label mb-4"
            >
              Portfolio
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white text-4xl md:text-5xl font-bold mb-6"
            >
              Transforming Visions into <br/>
              <span className="text-gradient-accent">Concrete Reality</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/60"
            >
              Explore our landmark projects across different sectors, showcasing 
              our engineering prowess and commitment to timely delivery.
            </motion.p>
          </div>

          {/* Filter Tabs - Dashboard Style */}
          <div className="flex p-1.5 border-white/10 rounded-2xl overflow-x-auto no-scrollbar scroll-smooth bg-navy-900/40 border" role="tablist" aria-label="Project Categories">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeTab === cat}
                aria-controls="project-grid"
                onClick={() => handleTabChange(cat)}
                className={`relative px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 min-w-fit ${
                  activeTab === cat 
                    ? 'text-accent' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {activeTab === cat && (
                  <motion.div 
                    layoutId="project-tab"
                    className="absolute inset-0 bg-white/10 dark:bg-white/5 rounded-xl border border-white/10"
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid / Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px]">
          <AnimatePresence mode="wait">
            {isChanging ? (
              <motion.div 
                key="skeleton-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="border-white/5 h-[400px] p-6 space-y-4 animate-pulse bg-navy-900/50 border rounded-2xl">
                    <div className="w-full h-48 bg-white/5 rounded-2xl" />
                    <div className="w-2/3 h-6 bg-white/5 rounded-lg" />
                    <div className="w-full h-4 bg-white/5 rounded-lg" />
                    <div className="w-1/2 h-4 bg-white/5 rounded-lg" />
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="project-grid"
                id="project-grid"
                role="tabpanel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ProjectCard {...project} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Explore More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <a
            href="#"
            aria-label="View our full portfolio of infrastructure projects"
            className="group inline-flex items-center gap-4 px-10 py-5 border-white/20 text-white font-bold rounded-2xl hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 bg-navy-900/30 border"
          >
            <span>View All Projects</span>
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white group-hover:translate-x-1 transition-transform" aria-hidden="true">
              <FiArrowRight size={16} />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
