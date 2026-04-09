import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Construction, 
  Move, 
  Zap, 
  ClipboardCheck, 
  ShieldAlert, 
  ArrowRight, 
  FileText,
  HardHat,
  Truck,
  Activity,
  AlertTriangle
} from 'lucide-react';

/**
 * Professional Crane Installation Component
 * Features: Interactive Site Readiness Checklist, 5-Phase Installation Methodology,
 * and Safety Protocol Visualizer.
 */

const Step = ({ number, title, desc, isActive }) => (
  <div className={`relative flex gap-6 pb-12 last:pb-0 transition-all duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-40 scale-95'}`}>
    <div className="flex flex-col items-center">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl transition-colors ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
        {number}
      </div>
      <div className="w-1 h-full bg-gray-200 dark:bg-gray-700 mt-2 rounded-full"></div>
    </div>
    <div className="pt-2">
      <h3 className={`text-xl font-bold mb-2 transition-colors ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default function CraneInstall() {
  const [activeStep, setActiveStep] = useState(1);
  const [checklist, setChecklist] = useState({
    spanVerified: false,
    railAlignment: false,
    powerAvailable: false,
    clearanceCheck: false,
    foundationReady: false
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % 5) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleCheck = (item) => {
    setChecklist(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const readinessScore = Object.values(checklist).filter(Boolean).length * 20;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Header */}
      <section className="bg-primary py-20 px-4 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
            <Construction size={18} className="text-secondary" />
            <span className="text-xs font-bold uppercase tracking-widest">Execution Excellence</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">
            Erection & <br />Commissioning
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl leading-relaxed">
            Standard Operating Procedures (SOP) for safe and precision crane installation, ensuring alignment with IS:3177 and IS:807 industrial standards.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4">
          <HardHat size={400} />
        </div>
      </section>

      <div className="max-w-7xl mx-auto py-20 px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Methodology Timeline */}
          <div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-10 flex items-center">
              Installation Methodology
            </h2>
            <div className="space-y-2">
              <Step 
                number="1" 
                title="Site Logistics & Unloading" 
                desc="Mobilization of mobile cranes and specialized tools. Safe unloading of bridge girders and end carriages onto the designated assembly bay."
                isActive={activeStep === 1}
              />
              <Step 
                number="2" 
                title="Mechanical Pre-Assembly" 
                desc="Alignment of end carriages with main girders. High-tensile bolting using calibrated torque wrenches to ensure structural integrity."
                isActive={activeStep === 2}
              />
              <Step 
                number="3" 
                title="The Big Lift (Erection)" 
                desc="Tandem lifting of the bridge structure onto the gantry rails using certified mobile cranes. Final span and diagonal measurement verification."
                isActive={activeStep === 3}
              />
              <Step 
                number="4" 
                title="Electrical Integration" 
                desc="Installation of Down Shop Leads (DSL), festoon cable systems, and VFD control panels. Final wiring of limit switches and pendant/radio controls."
                isActive={activeStep === 4}
              />
              <Step 
                number="5" 
                title="Load Testing & Handover" 
                desc="Deflection tests at 100% load and dynamic tests at 110% load. Issuance of Form-11 safety certificate and operator training."
                isActive={activeStep === 5}
              />
            </div>
          </div>

          {/* Interactive Readiness Checklist */}
          <div className="space-y-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center justify-between">
                Site Readiness Checklist
                <span className="text-sm font-black text-primary bg-primary/10 px-3 py-1 rounded-full">{readinessScore}% Ready</span>
              </h3>
              
              <div className="space-y-4">
                {[
                  { id: 'spanVerified', label: 'Span & Rail Center Distance Verified', icon: Move },
                  { id: 'railAlignment', label: 'Gantry Rail Alignment & Leveling (IS Standards)', icon: Activity },
                  { id: 'powerAvailable', label: '415V, 3-Phase Power Supply at DSL Point', icon: Zap },
                  { id: 'clearanceCheck', label: 'Lateral & Vertical Clearance Verified', icon: Maximize },
                  { id: 'foundationReady', label: 'Gantry Column/Pillar Foundation Strength Certified', icon: Construction }
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className="w-full flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700 transition-all hover:scale-[1.02]"
                  >
                    <div className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center transition-colors ${checklist[item.id] ? 'bg-green-500 text-white' : 'border-2 border-gray-300 dark:border-gray-600'}`}>
                      {checklist[item.id] && <CheckCircle2 size={16} />}
                    </div>
                    <item.icon size={20} className={checklist[item.id] ? 'text-primary' : 'text-gray-400'} />
                    <span className={`text-sm font-semibold text-left ${checklist[item.id] ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>

              {readinessScore < 100 && (
                <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded flex gap-3">
                  <AlertTriangle className="text-yellow-600 shrink-0" size={20} />
                  <p className="text-xs text-yellow-800 dark:text-yellow-200">
                    Warning: Installation cannot proceed until all site parameters are verified as per Naidu Solutions Safety Guidelines.
                  </p>
                </div>
              )}
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                <Truck className="text-primary mb-2" size={24} />
                <h4 className="font-bold dark:text-white">Delivery Time</h4>
                <p className="text-xs text-gray-500">2-4 Days Post-Dispatch</p>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                <ShieldAlert className="text-primary mb-2" size={24} />
                <h4 className="font-bold dark:text-white">Safety Factor</h4>
                <p className="text-xs text-gray-500">5:1 Standard Ratio</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="mt-20 pt-10 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Request an Installation Audit</h3>
            <p className="text-gray-500 dark:text-gray-400">Our service engineers will visit your site for span verification and rail inspection.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link to="/quote" className="bg-primary text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all flex items-center group">
              Get Installation Quote <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link to="/contact" className="border-2 border-primary text-primary dark:text-white px-10 py-4 rounded-2xl font-black hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
              Contact Engineering
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}