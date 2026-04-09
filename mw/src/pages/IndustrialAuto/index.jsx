import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Zap, Activity, ShieldCheck, CheckCircle2, ArrowRight, Network } from 'lucide-react';

export default function IndustrialAuto() {
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
        {/* PCB/Circuit pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTU0LjYyNyAwdjYwaS0yVjBoMnptLTQgMHY2MGgtMlYwaDJ6bS00IDB2NjBoLTJWMGgyem0tNCAwdjYwaC0yVjBoMnptLTQgMHY2MGgtMlYwaDJ6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] opacity-30 z-0"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-block py-1 px-3 rounded-full bg-secondary/20 border border-secondary text-secondary text-sm font-bold mb-6 tracking-wide uppercase">
              Intelligent Control Systems
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Industrial Automation & <br className="hidden md:block"/>
              <span className="text-secondary">PLC Integration</span>
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-blue-100 font-light mb-10">
              Transforming conventional mechanical processes into highly efficient, data-driven operations. We design, program, and commission robust automation architectures using Tier-1 hardware.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/contact" className="bg-secondary text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-yellow-500 hover:scale-105 transition-all flex items-center justify-center shadow-lg shadow-yellow-600/20">
                Discuss Automation Requirements <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. CORE AUTOMATION DOMAINS */}
      <section className="px-4 max-w-7xl mx-auto -mt-12 relative z-10">
        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div variants={fadeUp} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
            <Cpu className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">PLC Programming</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Custom ladder logic and structured text programming for sequence control, safety interlocks, and complex machine operations.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
            <Activity className="w-12 h-12 text-secondary mb-6" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">VFD Integration</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Variable Frequency Drive parameterization for precise motor speed control, soft starting, and significant energy consumption reduction.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
            <Network className="w-12 h-12 text-green-500 mb-6" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">HMI & SCADA</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Intuitive Human-Machine Interface development and plant-wide SCADA implementation for real-time process monitoring and data logging.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. HARDWARE ECOSYSTEM (Actual Brands Used) */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Our Hardware Ecosystem</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Reliability in automation stems from the hardware. Naidu Solutions exclusively utilizes Tier-1 global brands to guarantee continuous operation in harsh industrial environments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Siemens Ecosystem */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <h3 className="text-2xl font-black text-[#009999] mb-6 flex items-center">
              SIEMENS Architecture
            </h3>
            <div className="space-y-6">
               <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Primary PLCs Implemented:</h4>
                  <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
                     <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#009999] mr-2" /> SIMATIC S7-1200</li>
                     <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#009999] mr-2" /> SIMATIC S7-1500</li>
                     <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#009999] mr-2" /> LOGO! 8 (Micro)</li>
                  </ul>
               </div>
               <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Drives & Control:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                     <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#009999] mr-2" /> SINAMICS V20 & G120 Drives</li>
                     <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#009999] mr-2" /> TIA Portal Integration</li>
                     <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#009999] mr-2" /> PROFINET / PROFIBUS Protocols</li>
                  </ul>
               </div>
            </div>
          </motion.div>

          {/* Rockwell / Allen-Bradley Ecosystem */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <h3 className="text-2xl font-black text-[#CE0000] mb-6 flex items-center">
              Allen-Bradley Architecture
            </h3>
            <div className="space-y-6">
               <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Primary PLCs Implemented:</h4>
                  <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
                     <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#CE0000] mr-2" /> Micro800 Series</li>
                     <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#CE0000] mr-2" /> CompactLogix 5380</li>
                     <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#CE0000] mr-2" /> ControlLogix 5580</li>
                  </ul>
               </div>
               <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Drives & Control:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                     <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#CE0000] mr-2" /> PowerFlex 525 AC Drives</li>
                     <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#CE0000] mr-2" /> Studio 5000 Logix Designer</li>
                     <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#CE0000] mr-2" /> EtherNet/IP Industrial Networks</li>
                  </ul>
               </div>
            </div>
          </motion.div>
          
          {/* Secondary Brands */}
          <motion.div 
             initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
             className="lg:col-span-2 bg-gray-100 dark:bg-gray-900 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-800"
          >
             <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Also proficient in the integration and retrofitting of:</p>
             <div className="flex flex-wrap justify-center gap-4 text-sm font-bold text-gray-800 dark:text-gray-200">
                <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded shadow-sm border border-gray-200 dark:border-gray-700">Schneider Electric (Modicon)</span>
                <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded shadow-sm border border-gray-200 dark:border-gray-700">Mitsubishi Electric</span>
                <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded shadow-sm border border-gray-200 dark:border-gray-700">Omron</span>
                <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded shadow-sm border border-gray-200 dark:border-gray-700">Delta</span>
             </div>
          </motion.div>

        </div>
      </section>

      {/* 4. REAL-WORLD CRANE AUTOMATION USE CASES */}
      <section className="bg-primary py-24 px-4 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold mb-4">Application Focus: Crane Automation</h2>
            <p className="text-blue-100 max-w-3xl mx-auto">
              How we apply advanced PLC and VFD logic specifically to Material Handling Equipment to increase safety and reduce operational fatigue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Anti-Sway Logic */}
             <div className="bg-blue-900/50 p-8 rounded-xl border border-blue-500/30">
                <ShieldCheck className="w-10 h-10 text-secondary mb-4" />
                <h3 className="text-xl font-bold mb-3">Electronic Anti-Sway Control</h3>
                <p className="text-blue-100 text-sm mb-4">
                   Implementing specialized VFD parameters and PLC algorithms to automatically counter the pendulum effect of a suspended load during Long Travel (LT) and Cross Travel (CT) motions.
                </p>
                <ul className="text-sm text-blue-200 space-y-2">
                   <li>• Reduces load positioning time by up to 40%</li>
                   <li>• Drastically improves operator safety</li>
                   <li>• Minimizes structural stress on the building gantry</li>
                </ul>
             </div>

             {/* Tandem Operation */}
             <div className="bg-blue-900/50 p-8 rounded-xl border border-blue-500/30">
                <Network className="w-10 h-10 text-secondary mb-4" />
                <h3 className="text-xl font-bold mb-3">Tandem Synchronization (Master/Slave)</h3>
                <p className="text-blue-100 text-sm mb-4">
                   Utilizing PROFINET or EtherNet/IP to perfectly synchronize two independent EOT cranes. Essential for lifting exceptionally long or asymmetrical loads (like wind turbine blades or long girders).
                </p>
                <ul className="text-sm text-blue-200 space-y-2">
                   <li>• Single-operator control via master radio remote</li>
                   <li>• Real-time encoder feedback ensuring zero speed deviation</li>
                   <li>• Automatic safety interlocks if one hoist faults</li>
                </ul>
             </div>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Upgrade Your Conventional Panels</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Replacing obsolete resistance-based control panels with modern PLC/VFD architecture pays for itself through reduced electricity consumption and elimination of gearbox shock loads.
        </p>
        <Link to="/controlpanels" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-800 transition-colors shadow-lg">
          Explore Custom Control Panels
        </Link>
      </section>

    </div>
  );
}