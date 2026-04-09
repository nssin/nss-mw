import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calculator, Hammer, Zap, Settings, TrendingUp, AlertCircle, ArrowRight } from 'lucide-react';

export default function CostEstimator() {
  // State for raw material inputs
  const [steelRate, setSteelRate] = useState(65); // INR/kg for IS 2062
  const [laborRate, setLaborRate] = useState(18); // INR/kg for fabrication
  const [vfdKwRate, setVfdKwRate] = useState(6000); // INR/kW for tier-1 VFDs
  const [margin, setMargin] = useState(20); // Gross margin %

  // State for project parameters
  const [projectData, setProjectData] = useState({
    type: 'Single Girder',
    capacity: 5,
    span: 15,
    hoistType: 'Wire Rope (Standard)',
    electricals: 'VFD (Siemens/L&T)'
  });

  // Calculate real-time costs based on dynamic market variables
  const calculations = useMemo(() => {
    let cap = parseFloat(projectData.capacity);
    let span = parseFloat(projectData.span);

    // 1. Structural Weight (Empirical Industrial Logic)
    let weightKg = 0;
    if (projectData.type === 'Single Girder') {
      weightKg = (cap * 150) + (span * span * 12);
    } else {
      weightKg = (cap * 220) + (span * span * 18);
    }

    // Cost Breakdown
    const rawSteelCost = weightKg * parseFloat(steelRate);
    const fabricationCost = weightKg * parseFloat(laborRate);
    const totalStructuralCost = rawSteelCost + fabricationCost;

    // 2. Mechanical (Hoist/Crab)
    let mechCost = 0;
    if (projectData.type === 'Single Girder') {
      mechCost = 90000 + (cap * 18000); // Under-slung hoist
    } else {
      mechCost = 150000 + (cap * 25000); // Crab winch
    }

    // Premium Hoist Add-on
    if (projectData.hoistType === 'Wire Rope (Heavy Duty)') mechCost *= 1.3;
    if (projectData.hoistType === 'Chain Hoist (Light Duty)') mechCost *= 0.7;

    // 3. Electricals
    const estKw = (cap * 0.8) + (span * 0.2);
    let elecCost = 85000; // Base panel cost
    
    if (projectData.electricals === 'VFD (Siemens/L&T)') {
      elecCost += (estKw * parseFloat(vfdKwRate));
    } else if (projectData.electricals === 'Contactor Logic (Basic)') {
      elecCost += (estKw * 2500); // Cheaper but obsolete tech
    } else if (projectData.electricals === 'Full PLC Auto (Siemens)') {
      elecCost += 150000 + (estKw * parseFloat(vfdKwRate)); // PLC hardware + programming
    }

    // 4. Totals & Margins
    const baseCost = totalStructuralCost + mechCost + elecCost;
    const marginMultiplier = 1 / (1 - (parseFloat(margin) / 100));
    const finalPrice = Math.round(baseCost * marginMultiplier);

    return {
      weightTonnes: (weightKg / 1000).toFixed(2),
      structural: Math.round(totalStructuralCost),
      mechanical: Math.round(mechCost),
      electrical: Math.round(elecCost),
      base: Math.round(baseCost),
      final: finalPrice,
      profit: finalPrice - Math.round(baseCost)
    };
  }, [steelRate, laborRate, vfdKwRate, margin, projectData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData(prev => ({ ...prev, [name]: value }));
  };

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="w-full bg-gray-50 dark:bg-dark transition-colors duration-300 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Internal Cost Estimator</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Adjust live market variables (Steel/Labor/VFD rates) to simulate raw manufacturing costs versus final quoted margins.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Live Market Variables & Configuration */}
          <motion.div 
            initial="hidden" animate="visible" variants={fadeUp}
            className="lg:col-span-7 space-y-6"
          >
            {/* Variable Adjusters */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center border-b border-gray-100 dark:border-gray-700 pb-3">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary dark:text-secondary" /> Live Market Variables (INR)
               </h3>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="flex justify-between items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                       IS 2062 Steel (per Kg) <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">₹{steelRate}</span>
                    </label>
                    <input type="range" min="40" max="100" step="1" value={steelRate} onChange={(e) => setSteelRate(e.target.value)} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary" />
                  </div>
                  <div>
                    <label className="flex justify-between items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                       Fabrication Labor (per Kg) <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">₹{laborRate}</span>
                    </label>
                    <input type="range" min="10" max="30" step="0.5" value={laborRate} onChange={(e) => setLaborRate(e.target.value)} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary" />
                  </div>
                  <div>
                    <label className="flex justify-between items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                       Tier-1 VFD Base (per kW) <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">₹{vfdKwRate}</span>
                    </label>
                    <input type="range" min="4000" max="10000" step="100" value={vfdKwRate} onChange={(e) => setVfdKwRate(e.target.value)} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-secondary" />
                  </div>
                  <div>
                    <label className="flex justify-between items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                       Target Gross Margin (%) <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded">{margin}%</span>
                    </label>
                    <input type="range" min="5" max="40" step="1" value={margin} onChange={(e) => setMargin(e.target.value)} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-green-500" />
                  </div>
               </div>
            </div>

            {/* Project Specs */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center border-b border-gray-100 dark:border-gray-700 pb-3">
                  <Settings className="w-5 h-5 mr-2 text-primary dark:text-secondary" /> Project Specifications
               </h3>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Architecture</label>
                    <select name="type" value={projectData.type} onChange={handleInputChange} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg outline-none">
                      <option value="Single Girder">Single Girder (Light/Medium Duty)</option>
                      <option value="Double Girder">Double Girder (Heavy Duty)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Capacity: {projectData.capacity} MT</label>
                    <input type="range" name="capacity" min="1" max={projectData.type === 'Single Girder' ? "20" : "100"} step="1" value={projectData.capacity} onChange={handleInputChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Span: {projectData.span} Meters</label>
                    <input type="range" name="span" min="5" max={projectData.type === 'Single Girder' ? "30" : "40"} step="1" value={projectData.span} onChange={handleInputChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Hoist Mechanism</label>
                    <select name="hoistType" value={projectData.hoistType} onChange={handleInputChange} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg outline-none text-sm">
                      <option value="Wire Rope (Standard)">Wire Rope (Standard Duty)</option>
                      <option value="Wire Rope (Heavy Duty)">Wire Rope (Heavy Duty Class IV)</option>
                      {projectData.type === 'Single Girder' && <option value="Chain Hoist (Light Duty)">Chain Hoist (Light Duty)</option>}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Electrical Integration</label>
                    <select name="electricals" value={projectData.electricals} onChange={handleInputChange} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg outline-none text-sm">
                      <option value="VFD (Siemens/L&T)">Standard VFD Logic</option>
                      <option value="Contactor Logic (Basic)">Basic Contactor Logic (Obsolete)</option>
                      <option value="Full PLC Auto (Siemens)">Full PLC Automation (Siemens S7)</option>
                    </select>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* RIGHT: Real-time Output Dashboard */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 text-white sticky top-24 border-t-4 border-secondary">
               <h3 className="text-xl font-bold flex items-center mb-8 border-b border-gray-700 pb-4">
                  <Calculator className="w-6 h-6 mr-2 text-secondary" />
                  Cost Breakdown Analysis
               </h3>

               {/* Key Metric */}
               <div className="mb-8">
                  <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">Final Client Quotation</p>
                  <p className="text-5xl font-black text-white tracking-tight">₹{(calculations.final / 100000).toFixed(2)}L</p>
                  <p className="text-sm text-green-400 font-semibold mt-2">Included Margin: ₹{(calculations.profit / 100000).toFixed(2)}L ({margin}%)</p>
               </div>

               {/* Cost Segments */}
               <div className="space-y-4 mb-8">
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex justify-between items-center">
                     <div className="flex items-center">
                        <Hammer className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                           <span className="block text-sm font-bold">Structure & Fabrication</span>
                           <span className="block text-xs text-gray-400">{calculations.weightTonnes} MT Deadweight</span>
                        </div>
                     </div>
                     <span className="font-bold text-lg">₹{(calculations.structural / 100000).toFixed(2)}L</span>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex justify-between items-center">
                     <div className="flex items-center">
                        <Settings className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                           <span className="block text-sm font-bold">Mechanical (Hoist/Crab)</span>
                           <span className="block text-xs text-gray-400">{projectData.hoistType}</span>
                        </div>
                     </div>
                     <span className="font-bold text-lg">₹{(calculations.mechanical / 100000).toFixed(2)}L</span>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex justify-between items-center">
                     <div className="flex items-center">
                        <Zap className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                           <span className="block text-sm font-bold">Electricals & Logic</span>
                           <span className="block text-xs text-gray-400">{projectData.electricals}</span>
                        </div>
                     </div>
                     <span className="font-bold text-lg">₹{(calculations.electrical / 100000).toFixed(2)}L</span>
                  </div>
               </div>

               {/* Summary */}
               <div className="flex justify-between items-center pt-4 border-t border-gray-700 text-gray-300">
                  <span className="font-bold uppercase text-sm tracking-wider">Total Raw Cost (Base):</span>
                  <span className="font-bold text-xl text-white">₹{(calculations.base / 100000).toFixed(2)}L</span>
               </div>

               <div className="mt-6 flex items-start text-xs text-gray-500">
                  <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5 text-yellow-600" />
                  <p>Internal tool only. Estimates do not include GST, transport (ex-Nanded), or site erection labor.</p>
               </div>
               
               <Link to="/quote" className="mt-6 block w-full bg-transparent border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 py-3 rounded-lg text-center font-bold transition-all text-sm">
                  Switch to Client PDF Generator
               </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}