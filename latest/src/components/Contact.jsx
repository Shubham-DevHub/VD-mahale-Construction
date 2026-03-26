import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiCheckCircle } from 'react-icons/fi';

const contactInfo = [
  {
    icon: FiPhone,
    title: 'Phone Support',
    details: ['+91 141 4106040', '+91 98765 43210'],
    color: 'orange'
  },
  {
    icon: FiMail,
    title: 'Email Inquiry',
    details: ['info@vdmahale.com', 'projects@vdmahale.com'],
    color: 'blue'
  },
  {
    icon: FiMapPin,
    title: 'Office Location',
    details: ['Senapati Bapat Road', 'Pune, Maharashtra 411016'],
    color: 'green'
  },
  {
    icon: FiClock,
    title: 'Working Hours',
    details: ['Mon - Sat: 9:00 - 18:00', 'Sunday: Closed'],
    color: 'purple'
  },
];

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-32 bg-secondary overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="overline-label mb-4"
          >
            Connect With Us
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Start Your <span className="text-gradient-accent">Global Partnership</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-secondary max-w-2xl mx-auto"
          >
            Whether you have a query about a project or want to join our team, 
            our door is always open. Let's build the future together.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="p-6 flex gap-5 group hover:border-accent/30 transition-all duration-500 bg-navy-900/40 border border-white/5 rounded-2xl"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 text-accent group-hover:scale-110 group-hover:shadow-glow-orange transition-all duration-500`}>
                    <info.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{info.title}</h4>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-sm text-secondary">{detail}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="border-white/10 h-[240px] overflow-hidden group bg-navy-900/20 border rounded-2xl"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.2!2d73.8475!3d18.5177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf!2sPune!5e0!3m2!1sen!2sin!4v1650000000000!"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Office Location"
                className="grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="border-white/20 p-8 md:p-12 shadow-2xl relative overflow-hidden bg-navy-900/60 border rounded-[2.5rem]">
              {/* Shine Effect */}
              <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-transparent via-white/[0.03] to-transparent rotate-[45deg] pointer-events-none" />

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-secondary ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    aria-label="Your Full Name"
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-6 py-4 rounded-xl !bg-transparent border-white/10 focus:border-accent focus:shadow-glow-orange focus:scale-[1.01] outline-none transition-all placeholder:text-white/20 bg-black/20 border"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-secondary ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-label="Your Email Address"
                    placeholder="rahul@example.com"
                    className="w-full px-6 py-4 rounded-xl !bg-transparent border-white/10 focus:border-accent focus:shadow-glow-orange focus:scale-[1.01] outline-none transition-all placeholder:text-white/20 bg-black/20 border"
                  />
                </div>
              </div>

              <div className="space-y-2 mb-8">
                <label className="text-[11px] font-bold uppercase tracking-widest text-secondary ml-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  aria-label="Your Phone Number"
                  placeholder="+91 98765 43210"
                  className="w-full px-6 py-4 rounded-xl !bg-transparent border-white/10 focus:border-accent focus:shadow-glow-orange outline-none transition-all placeholder:text-white/20 bg-black/20 border"
                />
              </div>

              <div className="space-y-2 mb-10">
                <label className="text-[11px] font-bold uppercase tracking-widest text-secondary ml-1">Project Details</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  aria-label="Project Details or Message"
                  placeholder="Tell us about your infrastructure goals..."
                  className="w-full px-6 py-4 rounded-xl !bg-transparent border-white/10 focus:border-accent focus:shadow-glow-orange outline-none transition-all resize-none placeholder:text-white/20 bg-black/20 border"
                />
              </div>

              <button
                type="submit"
                disabled={status !== 'idle'}
                aria-label="Submit contact form"
                className={`group relative w-full md:w-auto px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-2xl overflow-hidden shadow-glow-orange transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] ${status !== 'idle' ? 'opacity-80' : ''}`}
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {status === 'idle' && (
                    <>
                      <span>Send Message</span>
                      <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                  {status === 'sending' && (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  )}
                  {status === 'success' && (
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center gap-3"
                    >
                      <span>Message Sent</span>
                      <FiCheckCircle className="text-white" />
                    </motion.div>
                  )}
                </div>
                
                {/* Button Shine Sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1200ms]" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
