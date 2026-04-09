import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Flag, ShieldCheck, Zap, Users, ArrowRight } from 'lucide-react';

export default function VisionMission() {
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
    <div className="w-full bg-gray-50 dark:bg-dark transition-colors duration-300 pb-24">
      
      {/* 1. HERO SECTION */}
      <section className="bg-primary text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30 z-0"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Corporate <span className="text-secondary">Directives</span>
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-blue-100 font-light">
              The foundational principles and long-term objectives driving Naidu Solutions & Services' engineering and manufacturing operations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. THE STATEMENTS (MISSION & VISION) */}
      <section className="px-4 max-w-7xl mx-auto -mt-10 relative z-10">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* THE MISSION */}
          <motion.div variants={fadeUp} className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl border-t-4 border-t-secondary border-x border-b border-gray-100 dark:border-gray-700">
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-primary dark:text-secondary" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Corporate Mission</h2>
            <div className="prose dark:prose-invert text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              <p className="font-medium">
                "To engineer, manufacture, and meticulously maintain the most robust and reliable material handling and automation systems in the industrial sector. We are committed to ensuring absolute structural safety, maximizing operational uptime, and delivering bespoke technological solutions that directly enhance the manufacturing capabilities of our partners."
              </p>
            </div>
          </motion.div>

          {/* THE VISION */}
          <motion.div variants={fadeUp} className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl border-t-4 border-t-primary border-x border-b border-gray-100 dark:border-gray-700">
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
              <Flag className="w-8 h-8 text-primary dark:text-secondary" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Corporate Vision</h2>
            <div className="prose dark:prose-invert text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              <p className="font-medium">
                "To cement our position as the undisputed benchmark for industrial engineering excellence in Western India by 2030. We envision a future where Naidu Solutions & Services is synonymous with uncompromising mechanical integrity, pioneering PLC automation, and a client-first approach that redefines industry standards for crane manufacturing and maintenance."
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. CORE VALUES */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Core Values</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            These fundamental beliefs dictate our behavior, influence our hiring, and guide our engineering decisions on the fabrication floor.
          </p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Value 1 */}
          <motion.div variants={fadeUp} className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <ShieldCheck className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Uncompromising Safety</h3>
            <p className="text-gray-600 dark:text-gray-400">
              We never cut corners. Every weld, every electrical panel, and every load test strictly adheres to IS standards. Human life and operational safety are our absolute top priorities.
            </p>
          </motion.div>

          {/* Value 2 */}
          <motion.div variants={fadeUp} className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <Zap className="w-12 h-12 text-secondary mb-6" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Rapid Responsiveness</h3>
            <p className="text-gray-600 dark:text-gray-400">
              In the industrial sector, downtime equals immense financial loss. Our culture demands urgency and immediate action, especially regarding breakdown repairs and AMC support.
            </p>
          </motion.div>

          {/* Value 3 */}
          <motion.div variants={fadeUp} className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <Users className="w-12 h-12 text-green-500 mb-6" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Client-Centric Integrity</h3>
            <p className="text-gray-600 dark:text-gray-400">
              We recommend what you technically need, not what maximizes our margins. Transparency in pricing, materials, and capabilities builds the long-term trust we value above single transactions.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* 4. CTA */}
      <section className="px-4">
        <div className="max-w-4xl mx-auto bg-primary rounded-2xl p-10 text-center shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-4">Experience Our Values in Action</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            Align your facility with an engineering partner that prioritizes structural safety and rapid support.
          </p>
          <Link to="/contact" className="inline-flex items-center bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg">
            Connect With Our Team <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}