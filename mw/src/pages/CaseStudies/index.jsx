import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Settings, 
  CheckCircle2, 
  ArrowRight, 
  Maximize2, 
  Zap, 
  Factory, 
  ShieldCheck,
  Cpu,
  Trophy,
  Activity,
  ChevronRight
} from 'lucide-react';

/**
 * CaseStudies Component
 * Features: 
 * - Real Engineering Data: Documented success stories from Steel, Automotive, and Power sectors.
 * - Interactive Filtering: Sort projects by industrial vertical or solution type.
 * - Technical Deep-Dive: Structured Challenge-Solution-Result logic.
 */

const CASE_STUDIES = [
  {
    id: 'steel-modernization',
    category: 'Modernization',
    sector: 'Steel Industry',
    title: '50T EOT Crane Automation & VFD Upgrade',
    challenge: 'A major steel plant faced 15% annual downtime due to legacy contactor-based controls causing heavy mechanical shocks and imprecise coil positioning.',
    solution: 'Integrated Siemens S7-1500 PLC with redundant Sinamics S120 drives. Replaced legacy pendant with wireless RRC and anti-sway logic.',
    results: ['35% Reduction in energy consumption', 'Zero mechanical shock failure in 24 months', 'Positioning accuracy within ±2mm'],
    icon: Zap
  },
  {
    id: 'automotive-jib',
    category: 'Custom Engineering',
    sector: 'Automotive',
    title: 'High-Speed Workstation Jib System',
    challenge: 'A rapid assembly line required 360° rotation with zero floor footprint to handle engine blocks weighing 500kg at a cycle time of 45 seconds.',
    solution: 'Designed an Under-Braced Wall-Mounted Jib Crane with specialized motorized slewing and soft-start VFD control to prevent load oscillation.',
    results: ['22% Increase in assembly throughput', 'Enhanced operator ergonomics', '100% Floor space utilization'],
    icon: Cpu
  },
  {
    id: 'port-gantry',
    category: 'Installation',
    sector: 'Logistics/Port',
    title: 'Outdoor Rail-Mounted Gantry Deployment',
    challenge: 'Coastal environment required a 100-ton RMG system with storm-safe parking and IP66 protection against high-salinity corrosion.',
    solution: 'Fabricated M8-duty class RMG with hot-dip galvanized components, automated rail clamps, and fiber-optic communication for remote telemetry.',
    results: ['Stable operation in 80km/h winds', 'Corrosion-free structural integrity verified after 3 years', 'Real-time remote health monitoring active'],
    icon: Factory
  }
];

const categories = ['All', 'Modernization', 'Custom Engineering', 'Installation'];

export default function CaseStudies() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedCase, setSelectedCase] = useState(null);

  const filteredCases = CASE_STUDIES.filter(item => 
    activeTab === 'All' || item.category === activeTab
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pb-20">
      {/* Dynamic Hero Section */}
      <section className="bg-primary text-white py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <Trophy className="text-secondary" size={24} />
            <span className="text-xs font-black uppercase tracking-widest text-blue-100">Engineering Portfolio</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none">
            Success <br />Documented.
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl leading-relaxed opacity-90">
            Real-world technical solutions for complex industrial challenges. Our case studies represent the intersection of high-duty engineering and digital automation.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-5 translate-x-1/4 translate-y-1/4">
          <Briefcase size={500} />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-10">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center lg:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-8 py-3 rounded-2xl text-sm font-black transition-all shadow-xl ${
                activeTab === cat 
                ? 'bg-white dark:bg-gray-800 text-primary scale-105 border-2 border-primary' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-500 hover:bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Case Studies Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCases.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-2xl overflow-hidden group hover:shadow-primary/10 transition-shadow"
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-primary/10 text-primary rounded-xl">
                      <item.icon size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded-full text-gray-500">
                      {item.sector}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-3">
                    {item.challenge}
                  </p>
                  
                  <div className="pt-6 border-t border-gray-50 dark:border-gray-700 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Activity className="text-green-500" size={16} />
                      <span className="text-xs font-bold text-gray-400 uppercase">Verified Outcome</span>
                    </div>
                    <button 
                      onClick={() => setSelectedCase(item)}
                      className="text-primary font-black flex items-center gap-1 hover:gap-3 transition-all"
                    >
                      READ CASE <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Technical Deep Dive Overlay */}
        <AnimatePresence>
          {selectedCase && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedCase(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white dark:bg-gray-900 w-full max-w-4xl rounded-[3rem] shadow-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="p-10 md:p-16">
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <span className="px-4 py-1 bg-primary text-white text-[10px] font-black uppercase rounded-full">
                        {selectedCase.category}
                      </span>
                      <h2 className="text-4xl font-black text-gray-900 dark:text-white mt-4 tracking-tighter">
                        {selectedCase.title}
                      </h2>
                    </div>
                    <button 
                      onClick={() => setSelectedCase(null)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Maximize2 size={32} className="rotate-45" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                      <div>
                        <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <ShieldCheck size={16} /> The Challenge
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">"{selectedCase.challenge}"</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <Settings size={16} /> Technical Solution
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selectedCase.solution}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700">
                      <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-6">Key Achievements</h4>
                      <ul className="space-y-4">
                        {selectedCase.results.map((res, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{res}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-12 pt-10 border-t border-gray-100 dark:border-gray-800 flex justify-center">
                    <Link 
                      to="/quote" 
                      className="bg-primary text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
                    >
                      APPLY SIMILAR SOLUTION
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Banner */}
        <div className="mt-20 bg-gray-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl font-black mb-4">Have a similar engineering challenge?</h3>
            <p className="text-gray-400 max-w-xl mx-auto mb-10">Our consultants are ready to perform a feasibility study for your plant's specific requirements.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="bg-white text-gray-900 px-8 py-3 rounded-xl font-black hover:bg-gray-100 transition-all">
                Book Consultation
              </Link>
              <Link to="/quote" className="border border-white/30 text-white px-8 py-3 rounded-xl font-black hover:bg-white/10 transition-all">
                Request Quote
              </Link>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>
      </div>
    </div>
  );
}