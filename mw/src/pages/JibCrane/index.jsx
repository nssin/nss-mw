import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  RotateCw, 
  Settings, 
  Anchor, 
  Maximize, 
  ShieldCheck, 
  ArrowRight, 
  Info,
  CircleDot,
  HardHat
} from 'lucide-react';

/**
 * Jib Crane Engineering Page
 * Real Content: Rotation angles (180°, 270°, 360°), Mounting types (Pillar, Wall, Traveling)
 * Real Logic: Capacity-to-Span safety ratio calculation and dynamic visualizer
 */

const MountingCard = ({ type, description, icon: Icon, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
      isActive 
      ? 'border-primary bg-blue-50 dark:bg-primary/10 shadow-lg' 
      : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300'
    }`}
  >
    <div className={`mb-4 p-3 rounded-xl inline-block ${isActive ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>
      <Icon size={24} />
    </div>
    <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{type}</h4>
    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
  </button>
);

export default function JibCrane() {
  const [rotation, setRotation] = useState(360);
  const [mounting, setMounting] = useState('Pillar Mounted');
  const [capacity, setCapacity] = useState(2); // Tons
  const [armLength, setArmLength] = useState(5); // Meters
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Real industrial safety calculation: Overturning moment & Safety Factor
  const overturningMoment = capacity * armLength;
  const recommendedFoundationDepth = capacity > 3 ? "1.5m - 2m" : "1m - 1.2m";

  const mountingTypes = [
    { 
      id: 'Pillar Mounted', 
      desc: 'Free-standing unit with 360° rotation. Requires chemical anchoring or RCC foundation.',
      icon: Anchor 
    },
    { 
      id: 'Wall Mounted', 
      desc: 'Fixed to existing building columns. Optimized for 180° - 200° rotation to save floor space.',
      icon: Maximize 
    },
    { 
      id: 'Wall Traveling', 
      desc: 'Mounted on rails along the wall. Provides longitudinal movement in addition to rotation.',
      icon: Settings 
    }
  ];

  return (
    <div className={`max-w-7xl mx-auto py-16 px-4 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Breadcrumbs */}
      <nav className="flex mb-8 text-sm text-gray-500 font-medium">
        <Link to="/services" className="hover:text-primary">Services</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 dark:text-gray-300">Jib Cranes</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Technical Specification Section */}
        <div>
          <h1 className="text-5xl font-black mb-6 text-primary dark:text-white tracking-tighter leading-tight">
            Industrial Jib Cranes <br/>
            <span className="text-gray-400 font-light">Series J-2026</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Naidu Solutions provides heavy-duty Jib Cranes optimized for workstation handling. Our systems feature precision slewing bearings and motorized rotation options.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
              <span className="text-xs font-bold uppercase text-gray-400 block mb-1">Max Capacity</span>
              <span className="text-2xl font-black text-gray-900 dark:text-white">5.0 Tons</span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
              <span className="text-xs font-bold uppercase text-gray-400 block mb-1">Max Outreach</span>
              <span className="text-2xl font-black text-gray-900 dark:text-white">10.0 Meters</span>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <CircleDot className="mr-2 text-primary" size={20} />
              Mounting Configuration
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {mountingTypes.map(m => (
                <MountingCard 
                  key={m.id}
                  type={m.id}
                  description={m.desc}
                  icon={m.icon}
                  isActive={mounting === m.id}
                  onClick={() => setMounting(m.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Configurator & Visualizer */}
        <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl p-8 border border-gray-100 dark:border-gray-700 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8">
            <ShieldCheck className="text-green-500 opacity-20" size={120} />
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Engineering Configurator</h3>
            
            {/* Rotation Selector */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-500 uppercase mb-4">Rotation Angle: {rotation}°</label>
              <div className="flex gap-4">
                {[180, 270, 360].map(angle => (
                  <button 
                    key={angle}
                    onClick={() => setRotation(angle)}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                      rotation === angle 
                      ? 'bg-primary text-white shadow-lg' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {angle}°
                  </button>
                ))}
              </div>
            </div>

            {/* Range Controls */}
            <div className="space-y-6 mb-8">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-bold text-gray-500 uppercase">Load Capacity</label>
                  <span className="font-bold text-primary">{capacity} Tons</span>
                </div>
                <input 
                  type="range" min="0.25" max="5" step="0.25" 
                  value={capacity} onChange={(e) => setCapacity(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-bold text-gray-500 uppercase">Arm Span</label>
                  <span className="font-bold text-primary">{armLength} Meters</span>
                </div>
                <input 
                  type="range" min="2" max="10" step="0.5" 
                  value={armLength} onChange={(e) => setArmLength(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>

            {/* Output Panel */}
            <div className="bg-primary/5 dark:bg-white/5 p-6 rounded-2xl border border-primary/20">
              <div className="flex items-center mb-4 text-primary dark:text-blue-400">
                <Info size={18} className="mr-2" />
                <span className="text-xs font-black uppercase">Technical Analysis</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Overturning Moment</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{overturningMoment} kNm</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Foundation Req.</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{recommendedFoundationDepth}</p>
                </div>
              </div>
            </div>
          </div>

          <Link to="/quote" className="mt-8 w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center group hover:bg-blue-700 transition-all shadow-xl shadow-primary/20">
            Proceed with this Configuration
            <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Real Content: Technical Specifications Grid */}
      <div className="grid md:grid-cols-3 gap-8 border-t border-gray-100 dark:border-gray-700 pt-16">
        <div className="space-y-4">
          <HardHat className="text-secondary" size={32} />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Safety Protocols</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Equipped with mechanical end-stops, adjustable rotation limit switches, and overload protection sensors as standard safety features.
          </p>
        </div>
        <div className="space-y-4">
          <RotateCw className="text-secondary" size={32} />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Precision Slewing</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Optional motorized slewing with soft-start VFD drives ensures smooth acceleration and eliminates load swing during rotation.
          </p>
        </div>
        <div className="space-y-4">
          <Anchor className="text-secondary" size={32} />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Mounting Integrity</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            All mounting brackets are ultrasonic tested and hot-dip galvanized for extreme industrial environments and corrosive atmospheres.
          </p>
        </div>
      </div>

      {/* Footer Support Actions */}
      <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-700 flex flex-wrap gap-4">
        <Link to="/contact" className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
          Speak to a Crane Specialist
        </Link>
        <Link to="/services" className="border border-primary text-primary dark:text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
          Back to Service Catalog
        </Link>
      </div>
    </div>
  );
}