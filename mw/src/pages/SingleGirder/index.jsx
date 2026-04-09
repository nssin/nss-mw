import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BoxSelect, Maximize, Activity, Cpu, ShieldCheck, PenTool } from 'lucide-react';

export default function SingleGirder() {
  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="w-full bg-gray-50 dark:bg-dark transition-colors duration-300 pb-24">
      
      {/* 1. HERO SECTION */}
      <section className="bg-primary text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgNDBMNDAgMEg0MFY0MEgwWiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] opacity-20 z-0"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-block py-1 px-3 rounded-full bg-blue-800 border border-blue-500 text-blue-200 text-sm font-bold mb-6 tracking-wide uppercase">
              1 MT to 20 MT Capacity
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Single Girder <span className="text-secondary">EOT Cranes</span>
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-blue-100 font-light mb-10">
              The industry standard for light to medium-duty material handling. Engineered for maximum floor clearance and highly efficient lateral movement.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
               <Link to="/quote" className="bg-secondary text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-yellow-500 hover:scale-105 transition-all flex items-center justify-center shadow-lg shadow-yellow-600/20">
                Configure Pricing <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. TECHNICAL SPECIFICATIONS DATA SHEET */}
      <section className="px-4 max-w-7xl mx-auto -mt-12 relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 p-8 md:p-12">
           <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">Engineering Specifications</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Spec Block 1 */}
              <div className="space-y-2">
                 <div className="flex items-center text-primary dark:text-secondary mb-2">
                    <Maximize className="w-5 h-5 mr-2" />
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Dimensional Limits</h3>
                 </div>
                 <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li><span className="font-semibold text-gray-800 dark:text-gray-200">Safe Working Load (SWL):</span> 1 MT to 20 MT</li>
                    <li><span className="font-semibold text-gray-800 dark:text-gray-200">Maximum Span:</span> Up to 30 Meters</li>
                    <li><span className="font-semibold text-gray-800 dark:text-gray-200">Height of Lift (HOL):</span> 6M, 9M, 12M, 18M (Standard)</li>
                 </ul>
              </div>

              {/* Spec Block 2 */}
              <div className="space-y-2">
                 <div className="flex items-center text-primary dark:text-secondary mb-2">
                    <Activity className="w-5 h-5 mr-2" />
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Operational Duty</h3>
                 </div>
                 <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li><span className="font-semibold text-gray-800 dark:text-gray-200">Duty Class (IS 3177):</span> Class I (Light) & Class II (Medium)</li>
                    <li><span className="font-semibold text-gray-800 dark:text-gray-200">Hoist Travel:</span> Under-slung on bottom flange</li>
                    <li><span className="font-semibold text-gray-800 dark:text-gray-200">Operation:</span> Pendant Push Button or Radio Remote</li>
                 </ul>
              </div>

              {/* Spec Block 3 */}
              <div className="space-y-2">
                 <div className="flex items-center text-primary dark:text-secondary mb-2">
                    <BoxSelect className="w-5 h-5 mr-2" />
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Structural Design</h3>
                 </div>
                 <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li><span className="font-semibold text-gray-800 dark:text-gray-200">Girder Profile:</span> I-Beam / Box Girder (Span dependent)</li>
                    <li><span className="font-semibold text-gray-800 dark:text-gray-200">Material:</span> IS 2062 Grade B Tested Steel</li>
                    <li><span className="font-semibold text-gray-800 dark:text-gray-200">End Carriages:</span> Fabricated box section with machined wheel blocks</li>
                 </ul>
              </div>
           </div>
        </div>
      </section>

      {/* 3. KEY ADVANTAGES */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Why Choose Single Girder Architecture?</h2>
        
        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <motion.div variants={fadeUp} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:-translate-y-1 transition-transform">
            <Maximize className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Space Optimization</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Excellent approach dimensions. The under-slung hoist allows for maximum lateral hook travel, utilizing the entire shop floor width.</p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:-translate-y-1 transition-transform">
            <ShieldCheck className="w-10 h-10 text-secondary mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Cost-Effective Load Profile</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Significantly lower deadweight compared to double girder systems, reducing the load on runway beams and the building's structural columns.</p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:-translate-y-1 transition-transform">
            <Cpu className="w-10 h-10 text-green-500 mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">VFD Integration</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Standard fitment of Variable Frequency Drives on Cross Travel (CT) and Long Travel (LT) motions for absolutely jerk-free movement.</p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:-translate-y-1 transition-transform">
            <PenTool className="w-10 h-10 text-purple-500 mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Rapid Installation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Simplified mechanical architecture allows for faster erection and commissioning at the site, minimizing production downtime.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* 4. VERIFIED USE CASES */}
      <section className="bg-gray-100 dark:bg-gray-900 py-20 px-4 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
           <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Proven Industry Applications</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                 Our Single Girder EOT Cranes are currently deployed across hundreds of facilities in Maharashtra, providing reliable daily operation in the following environments:
              </p>
              <ul className="space-y-4">
                 <li className="flex items-center text-gray-800 dark:text-gray-300 font-semibold bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div> CNC Machine Tool Loading
                 </li>
                 <li className="flex items-center text-gray-800 dark:text-gray-300 font-semibold bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div> Plastic Injection Molding Facilities
                 </li>
                 <li className="flex items-center text-gray-800 dark:text-gray-300 font-semibold bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div> Light Engineering Assembly Lines
                 </li>
                 <li className="flex items-center text-gray-800 dark:text-gray-300 font-semibold bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div> Warehouse Logistics & Storage
                 </li>
              </ul>
           </div>
           
           <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">When to Upgrade to Double Girder?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                 While highly efficient, a Single Girder is not suitable for all operations. You must upgrade to a Double Girder architecture if:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                 <li>Your required Safe Working Load (SWL) exceeds 20 MT.</li>
                 <li>The required span length exceeds 30 Meters.</li>
                 <li>You require a maintenance platform running along the length of the crane.</li>
                 <li>The duty cycle requires continuous, 24/7 heavy lifting (Class III or IV duty).</li>
              </ul>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                 <Link to="/services/double-girder" className="text-primary font-bold hover:text-blue-800 transition-colors flex items-center">
                    Explore Double Girder Specs <ArrowRight className="w-4 h-4 ml-1" />
                 </Link>
              </div>
           </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Ready to calculate the exact cost?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Input your specific Capacity (MT) and Span (Meters) requirements into our estimator to receive an immediate structural pricing breakdown.
        </p>
        <Link to="/quote" className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors">
          Open Quote Estimator
        </Link>
      </section>

    </div>
  );
}