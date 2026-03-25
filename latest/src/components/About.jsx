import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBullseye, FaEye } from 'react-icons/fa';

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" className="py-24 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-yellow-500 font-semibold text-sm tracking-wider uppercase">
            Who We Are
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white">
            About <span className="text-yellow-500">VD Mahale</span>
          </h2>
          <div className="mt-4 w-20 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full" />
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/about.png"
                alt="VD Mahale team at work"
                className="w-full h-[400px] lg:h-[500px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl p-5 shadow-xl">
              <div className="text-3xl font-black text-black">18+</div>
              <div className="text-sm font-semibold text-black/70">Years of<br/>Excellence</div>
            </div>
            {/* Decorative accent */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-yellow-400/30 rounded-2xl" />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Crafting World-Class Infrastructure Since 2005
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              VD Mahale Construction is one of India&apos;s leading infrastructure companies,
              specializing in highway construction, bridges, commercial complexes, and
              large-scale civil engineering projects. With over 18 years of experience,
              we&apos;ve built a reputation for delivering projects on time, on budget, and
              beyond expectations.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              Our team of 200+ skilled engineers, architects, and project managers work
              with cutting-edge technology and sustainable practices to create
              infrastructure that stands the test of time.
            </p>

            {/* Mission & Vision Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center mb-3">
                  <FaBullseye className="text-yellow-500" size={20} />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Our Mission</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  To deliver innovative, sustainable infrastructure that empowers
                  communities and drives economic growth.
                </p>
              </div>
              <div className="p-5 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center mb-3">
                  <FaEye className="text-yellow-500" size={20} />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Our Vision</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  To become the most trusted name in Indian infrastructure,
                  setting global benchmarks in quality and innovation.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
