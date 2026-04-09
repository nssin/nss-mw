import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Flag, Award, Building2, ChevronRight, Clock } from 'lucide-react';

export default function About() {
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
    <div className="w-full bg-gray-50 dark:bg-dark transition-colors duration-300">
      
      {/* 1. HERO SECTION */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="text-primary dark:text-secondary font-bold tracking-wider uppercase text-sm mb-4 block">Established 2009</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
              Engineering Excellence Since <span className="text-primary dark:text-secondary">Day One</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Founded by Mr. R.K. Naidu, Naidu Solutions & Services has evolved from a specialized electrical repair unit into Nashik's premier manufacturer of heavy-duty EOT Cranes and intelligent Industrial Automation systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. CORPORATE HISTORY & CORE VALUES */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Journey</h2>
            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
              <p>
                What began in 2009 as a dedicated service center for industrial electrical breakdowns quickly grew due to our uncompromising commitment to quality and rapid response times. Recognizing the structural gap in the market for reliable, locally manufactured material handling equipment, we expanded our operations.
              </p>
              <p>
                Today, Naidu Solutions & Services operates a state-of-the-art manufacturing facility capable of producing robust Double Girder EOT cranes up to 100 MT capacity. Our dedicated automation wing designs and programs complex PLC control panels, driving efficiency for manufacturing plants across Maharashtra and beyond.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="border-l-4 border-primary pl-4">
                <div className="text-2xl font-black text-gray-900 dark:text-white">500+</div>
                <div className="text-sm font-semibold text-gray-500">Successful Projects</div>
              </div>
              <div className="border-l-4 border-secondary pl-4">
                <div className="text-2xl font-black text-gray-900 dark:text-white">ISO 9001</div>
                <div className="text-sm font-semibold text-gray-500">Certified Processes</div>
              </div>
            </div>
          </motion.div>

          {/* Timeline / Visual Element */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 relative"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <Building2 className="w-48 h-48" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 relative z-10">Corporate Milestones</h3>
            <div className="space-y-8 relative z-10">
              <motion.div variants={fadeUp} className="flex">
                <div className="mr-4 flex flex-col items-center">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 mt-2"></div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">2009 - Foundation</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Established by Mr. R.K. Naidu, focusing on critical electrical maintenance.</p>
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className="flex">
                <div className="mr-4 flex flex-col items-center">
                  <div className="w-3 h-3 bg-secondary rounded-full"></div>
                  <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 mt-2"></div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">2014 - Manufacturing Expansion</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Launched in-house fabrication of Single and Double Girder EOT Cranes.</p>
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className="flex">
                <div className="mr-4 flex flex-col items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">2021 - Automation Wing</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Dedicated division created for custom PLC programming and advanced VFD control panels.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. MISSION & VISION PREVIEW */}
      <section className="bg-primary text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <motion.div variants={fadeUp} className="flex flex-col items-center text-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <Target className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
              <p className="text-blue-100 mb-6">To engineer, manufacture, and maintain the most reliable material handling and automation systems, ensuring zero downtime and maximum safety for our industrial partners.</p>
              <Link to="/visionmission" className="mt-auto text-sm font-bold text-secondary hover:text-white transition-colors flex items-center">Read Full Mission <ChevronRight className="w-4 h-4 ml-1" /></Link>
            </motion.div>
            
            <motion.div variants={fadeUp} className="flex flex-col items-center text-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <Flag className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
              <p className="text-blue-100 mb-6">To be the undisputed leader in industrial engineering solutions in Western India by 2030, recognized for technological innovation and uncompromising quality standards.</p>
              <Link to="/visionmission" className="mt-auto text-sm font-bold text-secondary hover:text-white transition-colors flex items-center">Read Full Vision <ChevronRight className="w-4 h-4 ml-1" /></Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="py-20 px-4">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-10 text-center"
        >
          <Award className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Partner With Engineering Excellence</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Whether you require a new EOT crane installation, a legacy system modernized, or a complex PLC automation setup, our technical team is ready to design your solution.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors">Contact Our Team</Link>
            <Link to="/team" className="border-2 border-primary text-primary dark:text-white dark:border-gray-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Meet The Engineers</Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}