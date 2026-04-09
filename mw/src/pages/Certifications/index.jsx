import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, FileCheck, CheckCircle2, Factory, Scale } from 'lucide-react';

export default function Certifications() {
  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="w-full bg-gray-50 dark:bg-dark transition-colors duration-300 pb-24">
      
      {/* 1. HERO SECTION */}
      <section className="bg-primary text-white py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Award className="w-16 h-16 mx-auto mb-6 text-secondary" />
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Certifications & <span className="text-secondary">Compliances</span>
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-blue-100 font-light">
              Naidu Solutions & Services strictly adheres to international quality management systems and stringent Indian Standards for heavy machinery fabrication.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. ISO CERTIFICATION BLOCK */}
      <section className="px-4 max-w-7xl mx-auto -mt-10 relative z-10">
        <motion.div 
          initial="hidden" animate="visible" variants={fadeUp}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 md:p-12 flex flex-col md:flex-row items-center gap-10"
        >
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="w-48 h-48 bg-gray-50 dark:bg-gray-900 rounded-full border-4 border-primary flex items-center justify-center shadow-inner relative overflow-hidden">
              <ShieldCheck className="w-24 h-24 text-primary" />
              <div className="absolute inset-0 bg-blue-600/5 rotate-45 transform origin-bottom-left"></div>
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <div className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold text-sm rounded-full mb-4">
              Status: Active & Verified
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">ISO 9001:2015</h2>
            <h3 className="text-xl text-primary dark:text-secondary font-semibold mb-6">Quality Management System (QMS)</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <div>
                <span className="font-bold text-gray-900 dark:text-gray-200 block">Scope of Certification:</span>
                Design, Manufacturing, Installation, and Servicing of Material Handling Equipment & Automation Control Panels.
              </div>
              <div>
                <span className="font-bold text-gray-900 dark:text-gray-200 block">Registration Body:</span>
                [Pending Formal Verification Upload]
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 border-l-4 border-secondary pl-4 italic">
              "This certification guarantees that our fabrication processes, from raw material procurement to final load testing, are strictly monitored and documented for consistent, uncompromising quality."
            </p>
          </div>
        </motion.div>
      </section>

      {/* 3. INDIAN STANDARDS (IS) COMPLIANCE */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Engineering Design Standards</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Every EOT Crane and Gantry system designed by our mechanical division is strictly calculated and fabricated according to the following Bureau of Indian Standards.
          </p>
        </div>

        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* IS 3177 */}
          <motion.div variants={fadeUp} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <FileCheck className="w-8 h-8 text-secondary mr-3" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">IS 3177 (1999)</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Code of Practice for Electric Overhead Travelling Cranes and Gantry Cranes other than steel work cranes. Governs the mechanical and electrical design parameters.
            </p>
          </motion.div>

          {/* IS 807 */}
          <motion.div variants={fadeUp} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <Scale className="w-8 h-8 text-secondary mr-3" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">IS 807 (2006)</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Code of Practice for Design, Manufacture, Erection and Testing (Structural Portion) of Cranes and Hoists. Ensures strict structural integrity and load-bearing math.
            </p>
          </motion.div>

          {/* IS 3938 */}
          <motion.div variants={fadeUp} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <Factory className="w-8 h-8 text-secondary mr-3" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">IS 3938 (1983)</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Specification for Electric Wire Rope Hoists. Dictates the rigorous standards for the lifting mechanisms and wire rope safety factors utilized in our systems.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* 4. SAFETY & LOAD TESTING PROTOCOLS */}
      <section className="bg-white dark:bg-gray-900 py-20 px-4 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="w-full lg:w-1/2">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Pre-Dispatch Validation</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We do not rely solely on design mathematics. Before any equipment leaves the Naidu Solutions manufacturing facility, it undergoes severe physical testing to guarantee operational safety.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-900 dark:text-gray-200 block">125% Dynamic Load Test</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">All hoists are subjected to a dynamic load test at 125% of their Safe Working Load (SWL).</span>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-900 dark:text-gray-200 block">Non-Destructive Testing (NDT)</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Critical welds on major load-bearing girders undergo rigorous NDT (Ultrasonic/Radiography) verification.</span>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-900 dark:text-gray-200 block">Panel Heat Run Tests</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">All automation panels undergo extended heat run testing to ensure thermal stability under factory conditions.</span>
                </div>
              </li>
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2 bg-gray-100 dark:bg-gray-800 rounded-2xl h-80 flex items-center justify-center border border-gray-200 dark:border-gray-700">
             {/* Future placeholder for a video loop of load testing */}
             <div className="text-center">
                <ShieldCheck className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                <span className="text-gray-500 font-semibold uppercase tracking-widest text-sm">Testing Facility Footage</span>
             </div>
          </motion.div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Require Official Documentation?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          For procurement departments requiring our official ISO certificates, MSME registration, or specific IS compliance documents for vendor onboarding, please contact our administrative team.
        </p>
        <Link to="/contact" className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors">
          Request Compliance Documents
        </Link>
      </section>

    </div>
  );
}