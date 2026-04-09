import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Factory, Settings, ShieldCheck, Zap, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export default function EOTCrane() {
  const [activeTab, setActiveTab] = useState('single');

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
        {/* Engineering blueprint background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgNjBMMjAgNDBMMDAgMjBMMjAgMEg2MEw0MCAyMEw2MCA0MEg0MEwyMCA2MEgwWiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] opacity-20 z-0"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-block py-1 px-3 rounded-full bg-secondary/20 border border-secondary text-secondary text-sm font-bold mb-6 tracking-wide uppercase">
              IS 3177 & IS 807 Compliant
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Electric Overhead <br className="hidden md:block"/>
              <span className="text-secondary">Travelling (EOT) Cranes</span>
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-blue-100 font-light mb-10">
              Precision-engineered material handling solutions designed for rigorous industrial environments. Capacities ranging from 1 MT to 100 MT.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/quote" className="bg-secondary text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-yellow-500 hover:scale-105 transition-all flex items-center justify-center shadow-lg shadow-yellow-600/20">
                Calculate Estimate <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a href="#technical-specs" className="bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 hover:border-white transition-all flex items-center justify-center">
                View Specifications
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. CORE FEATURES */}
      <section className="px-4 max-w-7xl mx-auto -mt-12 relative z-10">
        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div variants={fadeUp} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
            <ShieldCheck className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Structural Integrity</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Box-type plate girders fabricated from IS 2062 Gr.B steel plates. Submerged Arc Welding (SAW) used for critical load-bearing joints.</p>
          </motion.div>
          <motion.div variants={fadeUp} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
            <Zap className="w-12 h-12 text-secondary mb-6" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">VFD Automation</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Variable Frequency Drives (VFD) integrated for precise, jerk-free micro-speed movements and drastically reduced motor wear.</p>
          </motion.div>
          <motion.div variants={fadeUp} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
            <Settings className="w-12 h-12 text-green-500 mb-6" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Premium Hoists</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Equipped with highly durable wire rope hoists featuring conical rotor motors and built-in fail-safe electromagnetic brakes.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. TECHNICAL SPECIFICATIONS (Single vs Double) */}
      <section id="technical-specs" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Engineering Matrix</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Detailed technical capabilities for our primary EOT variants.</p>
        </div>

        {/* Custom Tab UI */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button 
              onClick={() => setActiveTab('single')}
              className={`flex-1 py-4 px-6 text-center font-bold text-lg transition-colors ${activeTab === 'single' ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              Single Girder EOT
            </button>
            <button 
              onClick={() => setActiveTab('double')}
              className={`flex-1 py-4 px-6 text-center font-bold text-lg transition-colors ${activeTab === 'double' ? 'bg-secondary text-gray-900' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              Double Girder EOT
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'single' ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Optimized for Light to Medium Duty</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Designed for efficient material handling where ceiling space is constrained. The hoist travels on the bottom flange of the main girder, maximizing floor clearance.</p>
                  <ul className="space-y-4">
                    <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-0.5" /><span className="text-gray-700 dark:text-gray-300"><strong>Capacity Range:</strong> 1 MT to 20 MT</span></li>
                    <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-0.5" /><span className="text-gray-700 dark:text-gray-300"><strong>Span Limit:</strong> Up to 30 Meters</span></li>
                    <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-0.5" /><span className="text-gray-700 dark:text-gray-300"><strong>Duty Class:</strong> Class I, II (Light to Medium)</span></li>
                    <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-0.5" /><span className="text-gray-700 dark:text-gray-300"><strong>Hoist Type:</strong> Under-slung Electric Wire Rope Hoist</span></li>
                  </ul>
                  <div className="mt-8">
                    <Link to="/services/single-girder" className="text-primary dark:text-secondary font-bold hover:underline flex items-center">View Deep Dive <ArrowRight className="w-4 h-4 ml-1" /></Link>
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center"><AlertCircle className="w-5 h-5 text-secondary mr-2" /> Ideal Applications</h4>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <li className="border-b border-gray-200 dark:border-gray-800 pb-2">CNC Machine loading/unloading shops</li>
                    <li className="border-b border-gray-200 dark:border-gray-800 pb-2">Warehouses with limited headroom</li>
                    <li className="border-b border-gray-200 dark:border-gray-800 pb-2">Small scale assembly lines</li>
                    <li>Plastic injection molding facilities</li>
                  </ul>
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Heavy-Duty Industrial Power</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Engineered for extreme loads and continuous operation. The hoist travels on rails mounted atop the two parallel girders, providing maximum lifting height and stability.</p>
                  <ul className="space-y-4">
                    <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-secondary mr-3 mt-0.5" /><span className="text-gray-700 dark:text-gray-300"><strong>Capacity Range:</strong> 5 MT to 100 MT</span></li>
                    <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-secondary mr-3 mt-0.5" /><span className="text-gray-700 dark:text-gray-300"><strong>Span Limit:</strong> Up to 40 Meters</span></li>
                    <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-secondary mr-3 mt-0.5" /><span className="text-gray-700 dark:text-gray-300"><strong>Duty Class:</strong> Class III, IV (Heavy & Extra Heavy)</span></li>
                    <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-secondary mr-3 mt-0.5" /><span className="text-gray-700 dark:text-gray-300"><strong>Hoist Type:</strong> Crab/Trolley mounted Electric Winch</span></li>
                  </ul>
                  <div className="mt-8">
                    <Link to="/services/double-girder" className="text-primary dark:text-secondary font-bold hover:underline flex items-center">View Deep Dive <ArrowRight className="w-4 h-4 ml-1" /></Link>
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center"><AlertCircle className="w-5 h-5 text-secondary mr-2" /> Ideal Applications</h4>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <li className="border-b border-gray-200 dark:border-gray-800 pb-2">Steel yards and rolling mills</li>
                    <li className="border-b border-gray-200 dark:border-gray-800 pb-2">Heavy casting and foundry operations</li>
                    <li className="border-b border-gray-200 dark:border-gray-800 pb-2">Large scale power plant maintenance</li>
                    <li>Automobile manufacturing chassis lines</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* 4. MATERIALS & COMPONENTS */}
      <section className="bg-gray-900 text-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold mb-4">Component Origin & Integrity</h2>
             <p className="text-gray-400 max-w-2xl mx-auto">We utilize only certified, Tier-1 industrial components to ensure zero operational failure.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="border-l-2 border-primary pl-4">
              <h4 className="font-bold text-xl mb-2 text-primary">Steel Structure</h4>
              <p className="text-sm text-gray-400">IS 2062 Grade B / SAILMA High Tensile Steel with ultrasonic testing.</p>
            </div>
            <div className="border-l-2 border-secondary pl-4">
              <h4 className="font-bold text-xl mb-2 text-secondary">Motors</h4>
              <p className="text-sm text-gray-400">BBL / CGL / Siemens Sq. Cage Induction Motors (S4 Duty, IP55).</p>
            </div>
            <div className="border-l-2 border-green-500 pl-4">
              <h4 className="font-bold text-xl mb-2 text-green-500">Gearboxes</h4>
              <p className="text-sm text-gray-400">Premium Transmission / Elecon Helical gearboxes with hardened teeth.</p>
            </div>
            <div className="border-l-2 border-purple-500 pl-4">
              <h4 className="font-bold text-xl mb-2 text-purple-500">Switchgear</h4>
              <p className="text-sm text-gray-400">Schneider Electric / L&T / Siemens contactors, relays, and VFDs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Need a Custom Calculation?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Use our intelligent quote generator to instantly estimate the cost of an EOT crane based on your required capacity and span.
        </p>
        <Link to="/quote" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-800 transition-colors shadow-lg">
          Launch Quote Generator
        </Link>
      </section>

    </div>
  );
}