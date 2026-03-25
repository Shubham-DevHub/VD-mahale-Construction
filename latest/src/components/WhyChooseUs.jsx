import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaShieldAlt, FaClock, FaAward, FaHandshake, FaTools, FaLeaf } from 'react-icons/fa';

const features = [
  {
    icon: FaShieldAlt,
    title: 'Quality Assurance',
    description: 'Every project undergoes rigorous quality checks using international standards and best practices.',
  },
  {
    icon: FaClock,
    title: 'On-Time Delivery',
    description: 'We pride ourselves on completing projects within schedule without compromising on quality.',
  },
  {
    icon: FaAward,
    title: 'Award Winning',
    description: 'Recognized by industry leaders for excellence in construction and infrastructure development.',
  },
  {
    icon: FaHandshake,
    title: 'Client Partnership',
    description: 'We treat every client as a partner, providing transparent communication throughout the project.',
  },
  {
    icon: FaTools,
    title: 'Modern Equipment',
    description: 'State-of-the-art machinery and technology ensuring precision and efficiency in every build.',
  },
  {
    icon: FaLeaf,
    title: 'Sustainable Practices',
    description: 'Committed to eco-friendly construction methods and sustainable material sourcing.',
  },
];

const WhyChooseUs = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="whyus" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-yellow-500 font-semibold text-sm tracking-wider uppercase">
            Our Advantages
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white">
            Why Choose <span className="text-yellow-500">Us</span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            What sets us apart from the rest in the infrastructure and construction industry.
          </p>
          <div className="mt-4 w-20 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full" />
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl hover:shadow-yellow-400/10 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Glow effect on hover */}
              <div className="absolute -inset-px bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />

              <div className="w-12 h-12 bg-yellow-400/10 dark:bg-yellow-400/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-yellow-400 transition-colors duration-300">
                <feature.icon className="text-yellow-500 group-hover:text-black transition-colors duration-300" size={22} />
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
