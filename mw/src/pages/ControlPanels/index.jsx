import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Settings, 
  Shield, 
  Zap, 
  Cpu, 
  Box, 
  Thermometer, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  PenTool, 
  Wind,
  Info
} from 'lucide-react';

/**
 * Custom Control Panels Engineering Module
 * Real Content: IP54/55/65/66 Ratings, CRCA fabrication specs, RAL coating standards.
 * Real Logic: Interactive IP Rating selector and technical specification matrix.
 */

const SpecBlock = ({ icon: Icon, title, value }) => (
  <div className="flex items-start gap-4 p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
    <div className="p-2 bg-primary/10 text-primary rounded-lg">
      <Icon size={20} />
    </div>
    <div>
      <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{title}</h4>
      <p className="text-sm font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  </div>
);

export default function ControlPanels() {
  const [activeRating, setActiveRating] = useState('IP55');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const ipRatings = {
    'IP54': 'Dust protected, Splashing water protection. Ideal for indoor clean factory environments.',
    'IP55': 'Dust protected, Water jets protection. Standard for most industrial indoor workshops.',
    'IP65': 'Dust-tight, Water jets protection. Suitable for outdoor or wash-down areas.',
    'IP66': 'Dust-tight, Powerful water jets protection. Designed for extreme marine or heavy-rain environments.'
  };

  const fabricationSpecs = [
    { label: "Material", value: "CRCA (Cold Rolled Close Annealed) Sheet Steel" },
    { label: "Sheet Thickness", value: "1.6mm (Body) / 2.0mm (Door & Gland Plate)" },
    { label: "Powder Coating", value: "Pure Polyester (70-90 Microns)" },
    { label: "Shade", value: "RAL 7032 (Siemens Grey) / RAL 7035 (Light Grey)" },
    { label: "Busbar", value: "Electrolytic Grade Aluminum / Copper (EC Grade)" },
    { label: "Gasket", value: "Neoprene / Polyurethane Foam (PU) Cast-in-situ" }
  ];

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Engineering Header */}
      <section className="bg-primary py-20 px-4 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6 backdrop-blur-sm border border-white/20">
            <Box size={16} className="text-secondary" />
            <span className="text-xs font-bold uppercase tracking-widest text-blue-100">Enclosure Systems</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-tight">
            Industrial Control <br />Panel Fabrication
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl leading-relaxed">
            CPRI-tested designs for VFD, APFC, PLC, and Crane Control systems. Engineered for thermal stability, electromagnetic compatibility, and structural integrity.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4">
          <Settings size={500} />
        </div>
      </section>

      <div className="max-w-7xl mx-auto py-20 px-4">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Fabrication Standards */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
              <PenTool className="text-primary" />
              Fabrication Specs
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
              <div className="p-8">
                <div className="space-y-4">
                  {fabricationSpecs.map((spec, i) => (
                    <div key={i} className="flex justify-between items-center py-3 border-b border-gray-50 dark:border-gray-700 last:border-0">
                      <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{spec.label}</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-900 p-8 text-white">
                <h4 className="font-bold flex items-center gap-2 mb-2">
                  <Shield className="text-secondary" size={18} />
                  CPRI Compliance
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed italic">
                  All panels undergo Short Circuit, Temperature Rise, and Degree of Protection (IP) tests to ensure compliance with IEC 61439 standards.
                </p>
              </div>
            </div>
          </div>

          {/* Logic & Performance Panel */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
              <Zap className="text-primary" />
              Protection & Logic
            </h2>
            
            <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 shadow-2xl">
              {/* IP Rating Selector Logic */}
              <div className="mb-12">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-6">Select Degree of Protection (Ingress Protection)</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.keys(ipRatings).map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setActiveRating(rating)}
                      className={`py-4 rounded-2xl font-black text-lg transition-all border-2 ${
                        activeRating === rating 
                        ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30 scale-105' 
                        : 'bg-gray-50 dark:bg-gray-900 border-transparent text-gray-400'
                      }`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
                <div className="mt-6 p-6 bg-primary/5 rounded-2xl border border-primary/10 flex items-start gap-4">
                  <Info className="text-primary shrink-0" size={20} />
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-medium italic">
                    {ipRatings[activeRating]}
                  </p>
                </div>
              </div>

              {/* Technical Feature Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <SpecBlock icon={Wind} title="Ventilation" value="Forced Cooling with IP54 Filter Fans" />
                <SpecBlock icon={Thermometer} title="Temperature" value="Operating Limit: -5°C to +55°C" />
                <SpecBlock icon={Layers} title="Mounting" value="Floor Standing / Wall Mounted" />
                <SpecBlock icon={Cpu} title="Wiring" value="Color-coded FRLS Copper" />
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-gray-400 uppercase">Typical Lead Time</p>
                  <p className="text-lg font-black text-gray-900 dark:text-white">2 - 3 Weeks</p>
                </div>
                <Link to="/quote" className="w-full md:w-auto bg-primary text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all flex items-center justify-center group shadow-xl shadow-primary/20">
                  Request Panel Quote <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mt-20 grid md:grid-cols-4 gap-6">
          {[
            { title: "VFD Drive Panels", desc: "Energy-saving motor control with heat dissipation logic." },
            { title: "APFC Panels", desc: "Automatic Power Factor Correction for electricity bill optimization." },
            { title: "PLC Control Desks", desc: "Operator consoles for complex industrial automation logic." },
            { title: "Crane Panels", desc: "Specialized vibration-resistant panels for heavy-duty lifting." }
          ].map((item, i) => (
            <div key={i} className="p-8 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-800">
              <CheckCircle2 className="text-primary mb-4" size={24} />
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}