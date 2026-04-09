import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Settings, Shield, Zap, HardHat, Factory, Wrench, BarChart, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const { t } = useTranslation();

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="w-full overflow-hidden bg-gray-50 dark:bg-dark transition-colors duration-300">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-primary dark:bg-gray-900 text-white pt-24 pb-32 px-4 overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNykiLz48L3N2Zz4=')] opacity-50 z-0"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-block py-1 px-3 rounded-full bg-blue-800/50 dark:bg-gray-800 border border-blue-400/30 text-blue-200 text-sm font-semibold mb-6 tracking-wide uppercase">
              ISO 9001:2015 Certified Manufacturing
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
              Industrial Crane & <br className="hidden md:block" />
              <span className="text-secondary">Automation Systems</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-blue-100 font-light">
              Designing, manufacturing, and modernizing heavy-duty EOT cranes and advanced PLC control panels for India's leading industrial sectors.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/quote" className="w-full sm:w-auto bg-secondary text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-yellow-500 hover:scale-105 transition-all flex items-center justify-center shadow-lg shadow-yellow-600/20">
                Configure Your Crane <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/services" className="w-full sm:w-auto bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 hover:border-white transition-all flex items-center justify-center">
                Explore Engineering Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. REAL CORPORATE METRICS */}
      <section className="relative z-20 -mt-16 px-4 max-w-7xl mx-auto">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <motion.div variants={fadeUp}>
            <div className="text-4xl font-black text-primary dark:text-secondary mb-2">15+</div>
            <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Years Experience</div>
          </motion.div>
          <motion.div variants={fadeUp}>
            <div className="text-4xl font-black text-primary dark:text-secondary mb-2">500+</div>
            <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Installations</div>
          </motion.div>
          <motion.div variants={fadeUp}>
            <div className="text-4xl font-black text-primary dark:text-secondary mb-2">50+</div>
            <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Expert Engineers</div>
          </motion.div>
          <motion.div variants={fadeUp}>
            <div className="text-4xl font-black text-primary dark:text-secondary mb-2">24/7</div>
            <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Breakdown Support</div>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. CORE SERVICES HIGHLIGHT */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Engineered for Heavy Duty</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            From robust Single Girder Cranes to complex PLC automation panels, we deliver end-to-end industrial solutions manufactured in Nashik.
          </p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Service 1 */}
          <motion.div variants={fadeUp} className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300 relative overflow-hidden">
            <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-primary dark:text-secondary mb-6 group-hover:scale-110 transition-transform">
              <Factory className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">EOT Cranes</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
              Heavy-duty Single and Double Girder Overhead Travelling Cranes with capacities up to 100 Tons and spans up to 30 meters.
            </p>
            <Link to="/services/eot-crane" className="inline-flex items-center text-primary dark:text-secondary font-bold hover:underline">
              View Specifications <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Service 2 */}
          <motion.div variants={fadeUp} className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300 relative overflow-hidden">
            <div className="w-14 h-14 bg-yellow-50 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
              <Settings className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Industrial Automation</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
              Custom PLC programming (Siemens, Allen-Bradley) and VFD integration for precise control and energy-efficient operations.
            </p>
            <Link to="/industrialauto" className="inline-flex items-center text-primary dark:text-secondary font-bold hover:underline">
              View Automation Solutions <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Service 3 */}
          <motion.div variants={fadeUp} className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300 relative overflow-hidden">
            <div className="w-14 h-14 bg-green-50 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-green-600 dark:text-green-400 mb-6 group-hover:scale-110 transition-transform">
              <Wrench className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">AMC & Modernization</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
              Comprehensive Annual Maintenance Contracts and legacy crane upgrades to meet the latest safety standards and improve efficiency.
            </p>
            <Link to="/services/amc" className="inline-flex items-center text-primary dark:text-secondary font-bold hover:underline">
              Explore AMC Packages <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 4. WHY CHOOSE NAIDU SOLUTIONS (Trust Factors) */}
      <section className="bg-gray-100 dark:bg-gray-900 py-24 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="w-full lg:w-1/2 space-y-6"
          >
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">Strict Safety Protocols & Unmatched Reliability</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              At Naidu Solutions & Services, we do not compromise on structural integrity. Every unit is load-tested and certified before handover, ensuring zero downtime for your production line.
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-800 dark:text-gray-300 font-medium">IS 3177 / IS 807 compliant design and fabrication.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-800 dark:text-gray-300 font-medium">Genuine branded electricals (Schneider, L&T, Siemens).</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-800 dark:text-gray-300 font-medium">Rapid Response Team mobilized within 4 hours for breakdowns.</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2 bg-primary rounded-2xl p-10 text-white shadow-2xl relative overflow-hidden"
          >
             <div className="absolute -right-10 -top-10 opacity-10">
               <Shield className="w-64 h-64" />
             </div>
             <h3 className="text-3xl font-bold mb-4 relative z-10">Need an immediate structural assessment?</h3>
             <p className="mb-8 text-blue-100 relative z-10 text-lg">Our engineering team provides free on-site consultation and load calculations to recommend the exact crane specifications for your facility.</p>
             <Link to="/consult" className="inline-flex items-center bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors relative z-10 shadow-lg">
                Book Free Consultation <HardHat className="ml-2 w-5 h-5" />
             </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}