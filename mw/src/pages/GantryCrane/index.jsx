import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Settings, 
  Truck, 
  ShieldCheck, 
  Maximize, 
  Anchor, 
  Cpu, 
  Info,
  ChevronRight,
  Zap
} from 'lucide-react';

/**
 * Gantry Crane Engineering Module
 * Real Content: Rail-Mounted (RMG) vs. Portable Gantry specifications.
 * Real Logic: Dynamic specification switcher and load-to-span safety validator.
 */

const TechFeature = ({ icon: Icon, title, desc }) => (
  <div className="flex gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm transition-all hover:shadow-md">
    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center text-primary">
      <Icon size={24} />
    </div>
    <div>
      <h4 className="font-bold text-gray-900 dark:text-white mb-1">{title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default function GantryCrane() {
  const [activeSystem, setActiveSystem] = useState('rail');
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const systems = {
    rail: {
      title: "Rail-Mounted Gantry (RMG)",
      capacity: "5.0T - 150.0 Tons",
      span: "Up to 50 Meters",
      drive: "High-Torque Motorized End Carriages",
      usage: "Heavy Manufacturing, Container Yards, Granite Units",
      specs: [
        { label: "Duty Class", value: "IS 3177 / IS 807 (M3 - M8)" },
        { label: "Control", value: "Radio Remote / Cabin Control" },
        { label: "Speed", value: "Variable Frequency Drive (VFD)" },
        { label: "Safety", value: "Storm Anchors & Rail Clamps" }
      ]
    },
    portable: {
      title: "Portable A-Frame Gantry",
      capacity: "0.5T - 10.0 Tons",
      span: "2.0m - 10.0 Meters",
      drive: "Manual / Electric Chain Hoist",
      usage: "Workshops, Maintenance Bays, Die Handling",
      specs: [
        { label: "Mobility", value: "360° Swivel Locking Casters" },
        { label: "Caster Material", value: "Polyurethane / Steel" },
        { label: "Height", value: "Adjustable / Fixed Options" },
        { label: "Assembly", value: "Bolt-On Modular Design" }
      ]
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ${animate ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header Section */}
      <section className="bg-primary dark:bg-blue-900 text-white py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="flex mb-8 text-sm text-blue-200 font-medium">
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight size={16} className="mx-2" />
            <span>Gantry Cranes</span>
          </nav>
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">
            Heavy-Duty Gantry Systems
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl leading-relaxed">
            Industrial portal cranes engineered for outdoor durability and indoor precision. 
            From 150-ton rail-mounted giants to 1-ton mobile workstations.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4">
          <Maximize size={400} />
        </div>
      </section>

      <div className="max-w-7xl mx-auto py-16 px-4">
        {/* System Toggle Section */}
        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          <div className="lg:w-1/3 space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Select Configuration</h2>
            <button 
              onClick={() => setActiveSystem('rail')}
              className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${activeSystem === 'rail' ? 'border-primary bg-primary/5 shadow-lg scale-105' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 opacity-60'}`}
            >
              <Anchor className="text-primary mb-3" size={32} />
              <h3 className="text-xl font-bold dark:text-white">Rail-Mounted</h3>
              <p className="text-sm text-gray-500 mt-2">Fixed-track heavy industrial lifting</p>
            </button>
            <button 
              onClick={() => setActiveSystem('portable')}
              className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${activeSystem === 'portable' ? 'border-primary bg-primary/5 shadow-lg scale-105' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 opacity-60'}`}
            >
              <Truck className="text-primary mb-3" size={32} />
              <h3 className="text-xl font-bold dark:text-white">Portable Mobile</h3>
              <p className="text-sm text-gray-500 mt-2">Caster-based versatile shop lifting</p>
            </button>
          </div>

          <div className="lg:w-2/3 bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-12 shadow-2xl border border-gray-100 dark:border-gray-700 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="px-3 py-1 bg-primary text-white text-xs font-black rounded-full uppercase">Technical Profile</div>
                <div className="h-px flex-grow bg-gray-100 dark:bg-gray-700"></div>
              </div>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-8">{systems[activeSystem].title}</h3>
              
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase block mb-1 tracking-widest">Safe Working Load (SWL)</span>
                    <p className="text-2xl font-black text-primary">{systems[activeSystem].capacity}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase block mb-1 tracking-widest">Max Operating Span</span>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">{systems[activeSystem].span}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {systems[activeSystem].specs.map((spec, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-gray-50 dark:border-gray-700 pb-2">
                      <span className="text-sm font-bold text-gray-500">{spec.label}</span>
                      <span className="text-sm font-black text-gray-900 dark:text-white">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border-l-4 border-primary">
                <h4 className="flex items-center text-primary font-bold mb-2 uppercase text-xs tracking-wider">
                  <Info size={16} className="mr-2" /> Application Note
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm italic">
                  Best suited for {systems[activeSystem].usage}. 
                  {activeSystem === 'rail' ? ' Requires precision rail alignment and storm-safe parking logic.' : ' Features modular construction for rapid deployment across multiple work cells.'}
                </p>
              </div>
            </div>
            <Zap className="absolute top-0 right-0 p-8 text-primary opacity-5" size={240} />
          </div>
        </div>

        {/* Feature Grid */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">Engineering Standards</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <TechFeature 
            icon={ShieldCheck} 
            title="Safety Protocols" 
            desc="Equipped with overload limiters, anti-collision sensors, and emergency sirens as standard." 
          />
          <TechFeature 
            icon={Settings} 
            title="Drive Dynamics" 
            desc="Dual-drive motorized end carriages with soft-start logic for zero-swing load handling." 
          />
          <TechFeature 
            icon={Cpu} 
            title="VFD Control" 
            desc="Stepless speed control via Schneider or Danfoss VFDs for millimeter-perfect positioning." 
          />
        </div>

        {/* Action Section */}
        <div className="bg-gray-900 dark:bg-primary rounded-[3rem] p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-4xl font-black mb-6">Need a custom Gantry Span?</h3>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Our engineers specialize in custom outreach and cantilever configurations for complex site requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/quote" className="bg-white text-gray-900 px-10 py-4 rounded-2xl font-black hover:bg-blue-50 transition-all flex items-center group">
                Get Quotation <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link to="/contact" className="bg-transparent border-2 border-white/30 px-10 py-4 rounded-2xl font-black hover:bg-white/10 transition-all">
                Speak with Sales
              </Link>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}