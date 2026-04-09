import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Factory, 
  Zap, 
  Waves, 
  Construction, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Settings, 
  Activity,
  Flame,
  Wind,
  Box
} from 'lucide-react';

/**
 * Industries Component
 * Real Content: Technical applications for Steel, Power, and Cement plants.
 * Real Logic: State-driven industrial vertical navigation and spec mapping.
 */

const INDUSTRY_DATA = [
  {
    id: 'steel',
    title: 'Steel & Metallurgy',
    icon: Flame,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200',
    description: 'High-heat, heavy-duty material handling solutions for integrated steel plants and rolling mills.',
    applications: [
      { area: 'Ladle Handling', spec: '100T+ Double Girder, M8 Duty Class' },
      { area: 'Scrap Yard', spec: 'Magnet Cranes with High Speed CT/LT' },
      { area: 'Rolling Mills', spec: 'Coil Handling C-Hooks & Automated Tongs' },
      { area: 'Safety', spec: 'Redundant Braking & Heat Shield Protection' }
    ],
    standard: 'IS 3177 / IS 4137 (Class IV)'
  },
  {
    id: 'power',
    title: 'Power Generation',
    icon: Zap,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1200',
    description: 'Precision lifting systems for turbine halls, rotor placement, and thermal power plant maintenance.',
    applications: [
      { area: 'Turbine Hall', spec: 'Slow-speed Precision VFD Control (±1mm)' },
      { area: 'Gantry Rails', spec: 'High-lift Height Systems (up to 50m)' },
      { area: 'Auxiliary Bay', spec: 'Standard EOT & Electric Chain Hoists' },
      { area: 'Control', spec: 'Remote Radio Controls with Tandem Logic' }
    ],
    standard: 'ASME B30 / IS 807 Compliance'
  },
  {
    id: 'cement',
    title: 'Cement & Bulk Material',
    icon: Factory,
    color: 'text-zinc-500',
    bg: 'bg-zinc-500/10',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200',
    description: 'Dust-proof, continuous duty cycles for clinker handling, raw mills, and gypsum storage units.',
    applications: [
      { area: 'Clinker Handling', spec: 'Grab Bucket Cranes (Dual Winch Logic)' },
      { area: 'Raw Mill Bay', spec: 'Heavy Duty Maintenance Cranes (IP65)' },
      { area: 'Storage Silos', spec: 'Automated Overhead Hoist Networks' },
      { area: 'Protection', spec: 'Pressurized Control Panels & Dust Seals' }
    ],
    standard: 'IS: 3177 M5-M7 Duty Cycles'
  }
];

export default function Industries() {
  const [activeIndustry, setActiveIndustry] = useState(INDUSTRY_DATA[0]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-500 pb-20">
      {/* Hero Header */}
      <section className="bg-primary py-20 px-4 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <ShieldCheck className="text-secondary" size={24} />
            <span className="text-xs font-black uppercase tracking-widest text-blue-100">Market Specific Engineering</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none">
            Built for <br />Heavy Industry.
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl opacity-90 leading-relaxed">
            Naidu Solutions provides specialized engineering for India’s most demanding industrial environments. Our systems are tuned to the unique duty cycles of Steel, Power, and Cement plants.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4 scale-150">
          <Settings size={400} className="animate-[spin_20s_linear_infinite]" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-12">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Industry Selector Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 px-4">Select Industrial Vertical</h3>
            {INDUSTRY_DATA.map((ind) => (
              <button
                key={ind.id}
                onClick={() => setActiveIndustry(ind)}
                className={`w-full p-8 rounded-[2.5rem] border-2 text-left transition-all duration-300 relative overflow-hidden group ${
                  activeIndustry.id === ind.id 
                  ? 'border-primary bg-primary/5 shadow-2xl scale-[1.02] z-10' 
                  : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-200'
                }`}
              >
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`p-4 rounded-2xl ${ind.bg} ${ind.color}`}>
                    <ind.icon size={28} />
                  </div>
                  <div>
                    <h4 className={`text-xl font-black ${activeIndustry.id === ind.id ? 'text-primary' : 'text-gray-900 dark:text-white'}`}>
                      {ind.title}
                    </h4>
                    <p className="text-xs text-gray-500 font-bold mt-1 uppercase tracking-tighter">{ind.standard}</p>
                  </div>
                </div>
                {activeIndustry.id === ind.id && (
                  <motion.div 
                    layoutId="activeBorder" 
                    className="absolute inset-0 bg-primary/5 pointer-events-none" 
                  />
                )}
              </button>
            ))}

            <div className="mt-8 p-8 bg-gray-900 rounded-[2.5rem] text-white overflow-hidden relative">
              <div className="relative z-10">
                <h4 className="font-bold mb-4 flex items-center gap-2">
                  <Waves className="text-secondary" size={20} />
                  Marine & Ports
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  We also serve ports and shipyards with IP67 rated components for high-salinity coastal areas.
                </p>
                <Link to="/contact" className="text-xs font-black text-secondary hover:underline">ENQUIRE FOR PORT SOLUTIONS →</Link>
              </div>
              <Wind className="absolute -right-4 -bottom-4 text-white/5" size={150} />
            </div>
          </div>

          {/* Technical Implementation Display */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndustry.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-3xl overflow-hidden"
              >
                <div className="aspect-[21/9] relative overflow-hidden">
                  <img 
                    src={activeIndustry.image} 
                    alt={activeIndustry.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-8 left-8">
                    <span className="px-4 py-1.5 bg-primary text-white text-[10px] font-black uppercase rounded-full tracking-widest shadow-xl">
                      Technical Deep-Dive
                    </span>
                  </div>
                </div>

                <div className="p-10 md:p-14">
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${activeIndustry.bg} ${activeIndustry.color}`}>
                      <activeIndustry.icon size={36} />
                    </div>
                    <div>
                      <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
                        {activeIndustry.title}
                      </h2>
                      <p className="text-gray-500 font-bold">{activeIndustry.standard}</p>
                    </div>
                  </div>

                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-12">
                    {activeIndustry.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {activeIndustry.applications.map((app, i) => (
                      <div key={i} className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 group hover:border-primary/30 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                          <CheckCircle2 className="text-green-500 shrink-0" size={18} />
                          <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-wider text-xs">
                            {app.area}
                          </h4>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                          {app.spec}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="p-8 bg-primary/5 rounded-[2rem] border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
                        <Activity className="text-primary" size={32} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold dark:text-white">Custom Engineering Available</h4>
                        <p className="text-sm text-gray-500">We adapt to your specific plant layout and gantry heights.</p>
                      </div>
                    </div>
                    <Link 
                      to="/quote" 
                      className="w-full md:w-auto bg-primary text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group"
                    >
                      REQUEST PROPOSAL <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Other Industries Grid */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          {[
            { icon: Box, title: "Automotive", desc: "Rapid work-cell lifting with high-precision slewing jib cranes." },
            { icon: Waves, title: "Infrastructure", desc: "Long-span gantry systems for bridge girder and metro construction." },
            { icon: Settings, title: "Manufacturing", desc: "Cost-effective single girder cranes with modular maintenance profiles." }
          ].map((item, i) => (
            <div key={i} className="p-10 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all">
              <item.icon className="text-primary mb-6" size={40} />
              <h4 className="text-xl font-black text-gray-900 dark:text-white mb-4">{item.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              <Link to="/contact" className="inline-flex items-center text-xs font-black text-primary mt-6 hover:gap-3 transition-all uppercase tracking-widest">
                Learn More <ArrowRight size={14} className="ml-2" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}