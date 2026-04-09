import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClipboardCheck, Clock, ShieldAlert, Wrench, Zap, FileText, CheckCircle2, ArrowRight, AlertTriangle } from 'lucide-react';

export default function AMC() {
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
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgNjBMMjAgNDBMMDAgMjBMMjAgMEg2MEw0MCAyMEw2MCA0MEg0MEwyMCA2MEgwWiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] opacity-20 z-0"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-block py-1 px-3 rounded-full bg-secondary/20 border border-secondary text-secondary text-sm font-bold mb-6 tracking-wide uppercase">
              Zero Downtime Strategy
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Annual Maintenance <span className="text-secondary">Contracts (AMC)</span>
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-blue-100 font-light mb-10">
              Protect your industrial assets. Our stringent preventative maintenance protocols catch mechanical fatigue and electrical faults before they cause catastrophic production halts.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/contact" className="bg-secondary text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-yellow-500 hover:scale-105 transition-all flex items-center justify-center shadow-lg shadow-yellow-600/20">
                Request AMC Quotation <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. STRICT SLA & RESPONSE TIMES */}
      <section className="px-4 max-w-7xl mx-auto -mt-12 relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 p-8 md:p-12">
           <div className="text-center mb-10">
             <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Service Level Agreement (SLA)</h2>
             <p className="text-gray-600 dark:text-gray-400">Guaranteed response metrics for contracted facilities across Maharashtra.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center p-6 border border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 rounded-xl">
                 <ShieldAlert className="w-12 h-12 text-red-600 mx-auto mb-4" />
                 <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Emergency Breakdown</h3>
                 <div className="text-3xl font-black text-red-600 dark:text-red-400 mb-2">4 - 8 Hours</div>
                 <p className="text-sm text-gray-600 dark:text-gray-400">On-site engineer deployment for critical production-halting crane failures.</p>
              </motion.div>
              
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center p-6 border border-blue-100 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl">
                 <ClipboardCheck className="w-12 h-12 text-primary mx-auto mb-4" />
                 <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Preventative Visits</h3>
                 <div className="text-3xl font-black text-primary mb-2">Quarterly</div>
                 <p className="text-sm text-gray-600 dark:text-gray-400">Mandatory 30-point mechanical and electrical audit with official health reporting.</p>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center p-6 border border-green-100 dark:border-green-900/30 bg-green-50/50 dark:bg-green-900/10 rounded-xl">
                 <Clock className="w-12 h-12 text-green-600 mx-auto mb-4" />
                 <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Technical Support</h3>
                 <div className="text-3xl font-black text-green-600 dark:text-green-400 mb-2">24 / 7</div>
                 <p className="text-sm text-gray-600 dark:text-gray-400">Direct phone access to senior automation engineers for remote VFD/PLC troubleshooting.</p>
              </motion.div>
           </div>
        </div>
      </section>

      {/* 3. THE 30-POINT AUDIT PROTOCOL */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Standard Preventative Maintenance Protocol</h2>
        
        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Mechanical Checklist */}
          <motion.div variants={fadeUp} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center mb-6">
              <Wrench className="w-8 h-8 text-primary mr-3" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Mechanical</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-0.5" /><span className="text-gray-700 dark:text-gray-300 text-sm">Wire rope physical inspection (fraying, kinks) and core lubrication.</span></li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-0.5" /><span className="text-gray-700 dark:text-gray-300 text-sm">Hoist and LT/CT gearbox oil level check and top-up.</span></li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-0.5" /><span className="text-gray-700 dark:text-gray-300 text-sm">Electromagnetic brake liner thickness measurement and air-gap adjustment.</span></li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-0.5" /><span className="text-gray-700 dark:text-gray-300 text-sm">Wheel flange wear inspection and bearing lubrication.</span></li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-0.5" /><span className="text-gray-700 dark:text-gray-300 text-sm">Rope guide and pressure ring alignment check.</span></li>
            </ul>
          </motion.div>

          {/* Electrical Checklist */}
          <motion.div variants={fadeUp} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center mb-6">
              <Zap className="w-8 h-8 text-secondary mr-3" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Electrical & Auto</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-secondary mr-3 mt-0.5" /><span className="text-gray-700 dark:text-gray-300 text-sm">Motor Insulation Resistance (Megger Test) verification.</span></li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-secondary mr-3 mt-0.5" /><span className="text-gray-700 dark:text-gray-300 text-sm">Contactor health check (carbon deposits/pitting on contacts).</span></li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-secondary mr-3 mt-0.5" /><span className="text-gray-700 dark:text-gray-300 text-sm">VFD parameter verification and cooling fan cleaning.</span></li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-secondary mr-3 mt-0.5" /><span className="text-gray-700 dark:text-gray-300 text-sm">Cross Travel (CT) festoon cable and trolley track integrity.</span></li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-secondary mr-3 mt-0.5" /><span className="text-gray-700 dark:text-gray-300 text-sm">Rotary and gravity limit switch physical actuation test.</span></li>
            </ul>
          </motion.div>

          {/* Structural Checklist */}
          <motion.div variants={fadeUp} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center mb-6">
              <AlertTriangle className="w-8 h-8 text-green-500 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Structural</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5" /><span className="text-gray-700 dark:text-gray-300 text-sm">End carriage to main girder HT bolt torque verification.</span></li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5" /><span className="text-gray-700 dark:text-gray-300 text-sm">Visual inspection of primary load-bearing SAW welds.</span></li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5" /><span className="text-gray-700 dark:text-gray-300 text-sm">Gantry rail alignment, span variation, and fish-plate bolt tightness.</span></li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5" /><span className="text-gray-700 dark:text-gray-300 text-sm">Walkway platform and safety handrail rigidity check.</span></li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5" /><span className="text-gray-700 dark:text-gray-300 text-sm">Gantry end-stopper and buffer condition analysis.</span></li>
            </ul>
          </motion.div>
        </motion.div>
      </section>

      {/* 4. AMC PACKAGES */}
      <section className="bg-gray-100 dark:bg-gray-900 py-20 px-4 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Contract Tiers</h2>
              <p className="text-gray-600 dark:text-gray-400">Choose the coverage that matches your factory's risk profile and production hours.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              
              {/* Non-Comprehensive */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Non-Comprehensive AMC</h3>
                 <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Standard labor coverage.</p>
                 <div className="text-4xl font-black text-gray-900 dark:text-white mb-6">Service-Only</div>
                 <ul className="space-y-4 mb-8">
                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300"><CheckCircle2 className="w-4 h-4 text-primary mr-2" /> 4 Scheduled Preventative Visits</li>
                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300"><CheckCircle2 className="w-4 h-4 text-primary mr-2" /> Priority Breakdown Response</li>
                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300"><CheckCircle2 className="w-4 h-4 text-primary mr-2" /> Lubrication & Adjustments Included</li>
                    <li className="flex items-center text-sm text-gray-400 dark:text-gray-500 line-through"><CheckCircle2 className="w-4 h-4 mr-2" /> Spares & Consumables Included</li>
                    <li className="flex items-center text-sm text-red-500"><AlertTriangle className="w-4 h-4 mr-2" /> All spares billed additionally at actuals</li>
                 </ul>
                 <Link to="/contact" className="block w-full text-center bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-lg font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Request Service Pricing</Link>
              </div>

              {/* Comprehensive */}
              <div className="bg-primary rounded-2xl p-8 shadow-xl relative overflow-hidden text-white transform md:-translate-y-4">
                 <div className="absolute top-0 right-0 bg-secondary text-gray-900 text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMMENDED</div>
                 <h3 className="text-2xl font-bold mb-2">Comprehensive AMC</h3>
                 <p className="text-blue-200 mb-6 text-sm">Total peace of mind coverage.</p>
                 <div className="text-4xl font-black mb-6 text-secondary">All-Inclusive</div>
                 <ul className="space-y-4 mb-8">
                    <li className="flex items-center text-sm text-white"><CheckCircle2 className="w-4 h-4 text-secondary mr-2" /> 4 Scheduled Preventative Visits</li>
                    <li className="flex items-center text-sm text-white"><CheckCircle2 className="w-4 h-4 text-secondary mr-2" /> Priority Breakdown Response</li>
                    <li className="flex items-center text-sm text-white"><CheckCircle2 className="w-4 h-4 text-secondary mr-2" /> Lubrication & Adjustments Included</li>
                    <li className="flex items-center text-sm text-white"><CheckCircle2 className="w-4 h-4 text-secondary mr-2" /> Consumables Included (Oils, Greases)</li>
                    <li className="flex items-center text-sm text-white"><CheckCircle2 className="w-4 h-4 text-secondary mr-2" /> Electrical Spares Replacement Included</li>
                 </ul>
                 <Link to="/contact" className="block w-full text-center bg-secondary text-gray-900 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors">Request Complete Assessment</Link>
              </div>

           </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <FileText className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Currently Operating Without an AMC?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            An unmaintained crane is an extreme safety liability. Contact us today to schedule a comprehensive one-time health audit of your existing lifting equipment, regardless of the original manufacturer.
          </p>
          <Link to="/bookservice" className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors shadow-lg">
            Book Crane Health Audit
          </Link>
        </div>
      </section>

    </div>
  );
}