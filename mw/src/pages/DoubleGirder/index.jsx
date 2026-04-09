import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Anchor, Factory, Scale, CheckCircle2, AlertTriangle, Hammer, Shield } from 'lucide-react';

export default function DoubleGirder() {
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
        {/* Heavy duty pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMjBMMjAgMEg0MEwyMCA0MEgwIDIwWiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] opacity-20 z-0"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-block py-1 px-3 rounded-full bg-secondary text-gray-900 font-bold mb-6 tracking-widest uppercase text-xs">
              Extreme Load Capacity: Up to 100 MT
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Double Girder <span className="text-secondary">EOT Cranes</span>
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-blue-100 font-light mb-10">
              The pinnacle of industrial lifting power. Engineered for continuous, heavy-duty operations (Class III & IV) with maximum span stability and high hook clearance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
               <Link to="/quote" className="bg-secondary text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-yellow-500 hover:scale-105 transition-all flex items-center justify-center shadow-lg shadow-yellow-600/20">
                Calculate Structural Cost <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. TECHNICAL SPECIFICATIONS DATA SHEET */}
      <section className="px-4 max-w-7xl mx-auto -mt-12 relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 p-8 md:p-12">
           <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-6 mb-8">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Heavy-Duty Specifications</h2>
              <Anchor className="w-10 h-10 text-primary hidden md:block" />
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Spec Block 1 */}
              <div className="space-y-2">
                 <div className="flex items-center text-primary dark:text-secondary mb-2">
                    <Scale className="w-5 h-5 mr-2" />
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Load & Span Limits</h3>
                 </div>
                 <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li><span className="font-semibold text-gray-800 dark:text-gray-200">Safe Working Load (SWL):</span> 5 MT to 100 MT</li>
                    <li><span className="font-semibold text-gray-800 dark:text-gray-200">Maximum Span:</span> Up to 40 Meters</li>
                    <li><span className="font-semibold text-gray-800 dark:text-gray-200">Design Code:</span> IS 807 & IS 3177</li>
                 </ul>
              </div>

              {/* Spec Block 2 */}
              <div className="space-y-2">
                 <div className="flex items-center text-primary dark:text-secondary mb-2">
                    <Factory className="w-5 h-5 mr-2" />
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Operational Duty</h3>
                 </div>
                 <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li><span className="font-semibold text-gray-800 dark:text-gray-200">Duty Class:</span> Class III (Heavy) & Class IV (Extra Heavy)</li>
                    <li><span className="font-semibold text-gray-800 dark:text-gray-200">Hoist Mechanism:</span> Top-running Crab/Winch Trolley</li>
                    <li><span className="font-semibold text-gray-800 dark:text-gray-200">Control System:</span> VFD Panels / Master Controller / Cabin</li>
                 </ul>
              </div>

              {/* Spec Block 3 */}
              <div className="space-y-2">
                 <div className="flex items-center text-primary dark:text-secondary mb-2">
                    <Hammer className="w-5 h-5 mr-2" />
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Structural Fabrication</h3>
                 </div>
                 <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li><span className="font-semibold text-gray-800 dark:text-gray-200">Girder Type:</span> Dual Plate-Box Girders (SAW Welded)</li>
                    <li><span className="font-semibold text-gray-800 dark:text-gray-200">Platform:</span> Full-length checkered plate walkway</li>
                    <li><span className="font-semibold text-gray-800 dark:text-gray-200">Material:</span> Tested IS 2062 Gr.B / SAILMA</li>
                 </ul>
              </div>
           </div>
        </div>
      </section>

      {/* 3. STRUCTURAL ADVANTAGES OVER SINGLE GIRDER */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">The Dual Girder Advantage</h2>
        
        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <motion.div variants={fadeUp} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm mr-3">1</span>
              Maximum Hook Height
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Unlike a single girder crane where the hoist hangs below the beam, a double girder system runs the crab trolley <em>on top</em> of the two parallel girders. This architectural difference provides significantly higher clearance and maximizes your factory's lifting height (HOL).
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm mr-3">2</span>
              Maintenance Walkway
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Double girder cranes include a full-length, hand-railed platform alongside the girders. This provides critical, safe access for technicians to perform routine maintenance on the electrical panels, motors, and crab mechanism without requiring scaffolding or scissor lifts.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm mr-3">3</span>
              Extreme Span Rigidity
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              When spans exceed 30 meters, single girders begin to experience severe lateral deflection under load. The dual box-girder design mathematically eliminates this flex, ensuring perfect rigidity and safety when transporting 50-100 ton loads across massive shop floors.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm mr-3">4</span>
              Auxiliary Hoist Capability
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              The heavy-duty crab trolley permits the installation of a secondary (Auxiliary) hoist alongside the main hook. This allows for rapid, energy-efficient handling of lighter loads (e.g., 5 MT) while reserving the main hook for extreme loads (e.g., 50 MT).
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* 4. VERIFIED HEAVY INDUSTRY USE CASES */}
      <section className="bg-gray-100 dark:bg-gray-900 py-20 px-4 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
           <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Designed for Extreme Environments</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                 Naidu Solutions Double Girder cranes are the backbone of heavy manufacturing across India. These systems are designed to operate 24/7 under harsh conditions:
              </p>
              <ul className="space-y-4">
                 <li className="flex items-center text-gray-800 dark:text-gray-300 font-semibold bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                    <Shield className="w-5 h-5 text-primary mr-3" /> Steel Rolling Mills & Foundries
                 </li>
                 <li className="flex items-center text-gray-800 dark:text-gray-300 font-semibold bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                    <Shield className="w-5 h-5 text-primary mr-3" /> Power Plant Turbine Maintenance
                 </li>
                 <li className="flex items-center text-gray-800 dark:text-gray-300 font-semibold bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                    <Shield className="w-5 h-5 text-primary mr-3" /> Heavy Transformer Manufacturing
                 </li>
                 <li className="flex items-center text-gray-800 dark:text-gray-300 font-semibold bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                    <Shield className="w-5 h-5 text-primary mr-3" /> Railway Workshops & Loco Sheds
                 </li>
              </ul>
           </div>
           
           <div className="w-full lg:w-1/2 bg-yellow-50 dark:bg-yellow-900/10 p-8 rounded-2xl border border-yellow-200 dark:border-yellow-700/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <AlertTriangle className="w-32 h-32 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 relative z-10 flex items-center">
                <AlertTriangle className="w-6 h-6 text-secondary mr-2" /> Critical Installation Note
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 relative z-10 font-medium">
                 Double Girder systems possess significantly higher deadweight. Before quotation, your facility's runway beams and concrete/steel support columns must be load-verified.
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 relative z-10">
                 If your building structure is not rated for Double Girder deadweight, you may need to rely on a heavy-duty Single Girder configuration or reinforce your gantry columns.
              </p>
              <div className="mt-6 pt-6 border-t border-yellow-200 dark:border-yellow-700/50 relative z-10">
                 <Link to="/contact" className="text-gray-900 dark:text-white font-bold hover:text-primary transition-colors flex items-center">
                    Request Structural Verification Audit <ArrowRight className="w-4 h-4 ml-1" />
                 </Link>
              </div>
           </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Configure Your Heavy-Duty System</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Input your specific Capacity (5-100 MT) and Span requirements into our estimator to receive an immediate pricing breakdown for a Double Girder architecture.
        </p>
        <Link to="/quote" className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors">
          Open Quote Estimator
        </Link>
      </section>

    </div>
  );
}