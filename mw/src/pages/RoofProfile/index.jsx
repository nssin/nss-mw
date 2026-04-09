import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Settings, 
  Cpu, 
  Maximize, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Activity, 
  Layers, 
  Factory, 
  CheckCircle2,
  Info
} from 'lucide-react';

/**
 * Roof Profile Machines Engineering Module
 * Real Content: Technical specifications for Trapezoidal, Standing Seam, and Tile profile machines.
 * Real Logic: State-driven specification matrix and industrial performance metrics.
 */

const SpecRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
    <span className="text-sm font-black text-gray-900 dark:text-white">{value}</span>
  </div>
);

export default function RoofProfile() {
  const [activeProfile, setActiveProfile] = useState('trapezoidal');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const profileData = {
    trapezoidal: {
      title: "Trapezoidal (Box) Profile Machine",
      desc: "High-speed roll forming line for industrial roofing and wall cladding. Optimized for $1000\text{mm} - 1220\text{mm}$ coil widths.",
      specs: {
        "Forming Stages": "18 - 22 Stations",
        "Material Thickness": "$0.35\text{mm} - 0.80\text{mm}$",
        "Forming Speed": "15 - 20 m/min",
        "Shaft Diameter": "$70\text{mm} - 80\text{mm}$ (Solid Steel)",
        "Drive Power": "7.5 kW + 5.5 kW Hydraulic",
        "Control System": "Siemens / Delta PLC with Touch HMI"
      }
    },
    standingSeam: {
      title: "Standing Seam (Snap-Lock) Machine",
      desc: "Specialized for concealed fastener roofing systems. Features mobile on-site roll forming capability for long-span projects.",
      specs: {
        "Forming Stages": "14 Stations",
        "Material Thickness": "$0.50\text{mm} - 0.70\text{mm}$ (Al-Zn / Al)",
        "Forming Speed": "10 - 12 m/min",
        "Seam Height": "$25\text{mm} / 38\text{mm} / 65\text{mm}$",
        "Drive Power": "5.5 kW Geared Motor",
        "Cutting System": "Hydraulic Post-Cutting (Burr-Free)"
      }
    },
    tileProfile: {
      title: "Glazed Tile Profile Machine",
      desc: "Aesthetic roofing solution for residential and commercial architecture. Includes high-pressure hydraulic step-pressing unit.",
      specs: {
        "Forming Stages": "16 Stations",
        "Material Thickness": "$0.40\text{mm} - 0.60\text{mm}$",
        "Step Distance": "$250\text{mm} - 350\text{mm}$ (Adjustable)",
        "Pressing Force": "15 - 20 Tons Hydraulic",
        "Drive Power": "11 kW Hybrid System",
        "Control System": "Digital Encoder Precision Tracking"
      }
    }
  };

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Header */}
      <section className="bg-primary py-20 px-4 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6 backdrop-blur-sm border border-white/20">
            <Factory size={16} className="text-secondary" />
            <span className="text-xs font-bold uppercase tracking-widest">Advanced Roll Forming</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none">
            Precision Roof <br />Profile Lines
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl leading-relaxed">
            Industrial-grade profiling machinery engineered for $24/7$ production with millimeter-level precision and high-speed hydraulic automation.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4">
          <Layers size={500} />
        </div>
      </section>

      <div className="max-w-7xl mx-auto py-20 px-4">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Machine Selection Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-2xl font-black mb-6 text-gray-900 dark:text-white">Machine Categories</h2>
            {Object.keys(profileData).map((key) => (
              <button
                key={key}
                onClick={() => setActiveProfile(key)}
                className={`w-full p-6 rounded-2xl text-left transition-all duration-300 border-2 ${
                  activeProfile === key 
                  ? 'border-primary bg-primary/5 shadow-lg scale-105' 
                  : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 hover:border-gray-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={`font-bold ${activeProfile === key ? 'text-primary' : 'text-gray-500'}`}>
                    {profileData[key].title.split(' ')[0]}
                  </span>
                  {activeProfile === key && <Activity className="text-primary animate-pulse" size={18} />}
                </div>
                <h3 className="text-lg font-black mt-1 dark:text-white">{profileData[key].title}</h3>
              </button>
            ))}

            <div className="mt-8 p-6 bg-gray-900 rounded-3xl text-white">
              <h4 className="font-bold flex items-center gap-2 mb-4">
                <ShieldCheck className="text-secondary" size={20} />
                Quality Assurance
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed italic">
                All Naidu Solutions roll-forming rollers are Chrome plated ($0.05\text{mm}$ thickness) and heat-treated for $HRC 58-62$ hardness to prevent profile scratching.
              </p>
            </div>
          </div>

          {/* Technical Specifications Area */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden animate-fade-in">
              <div className="p-10 md:p-14">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Cpu size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-primary uppercase tracking-widest">Engineering Profile</p>
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white">{profileData[activeProfile].title}</h2>
                  </div>
                </div>

                <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                  {profileData[activeProfile].desc}
                </p>

                <div className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
                  <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Settings size={16} />
                    Technical Matrix
                  </h4>
                  <div className="grid md:grid-cols-1 gap-x-12">
                    {Object.entries(profileData[activeProfile].specs).map(([label, value]) => (
                      <SpecRow key={label} label={label} value={value} />
                    ))}
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { icon: Zap, label: "Low Power" },
                    { icon: Maximize, label: "Modular" },
                    { icon: ShieldCheck, label: "HSS Dies" },
                    { icon: CheckCircle2, label: "PLC Sync" }
                  ].map((feat, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 text-center">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center text-gray-400">
                        <feat.icon size={18} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-tighter text-gray-500">{feat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-10 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl">
                    <Info size={24} />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
                    Custom roller designs available for specific architectural profiles and non-standard material widths.
                  </p>
                </div>
                <div className="flex gap-4">
                  <Link to="/quote" className="bg-primary text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all flex items-center group shadow-xl shadow-primary/20">
                    Get Quote <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Action Footer */}
        <div className="mt-20 pt-10 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-4 justify-center">
          <Link to="/services" className="px-8 py-3 rounded-xl font-bold text-gray-500 hover:text-primary transition-all">
            Back to All Services
          </Link>
          <Link to="/contact" className="border border-primary text-primary dark:text-white px-8 py-3 rounded-xl font-bold hover:bg-primary hover:text-white transition-all">
            Technical Support
          </Link>
        </div>
      </div>
    </div>
  );
}