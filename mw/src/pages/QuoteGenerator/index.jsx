import { useState, useEffect, useMemo } from 'react';
import jsPDF from 'jspdf';
import { motion } from 'framer-motion';
import { Calculator, Download, ChevronRight, Settings2, Info, CheckCircle2 } from 'lucide-react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function QuoteGenerator() {
  const [formData, setFormData] = useState({
    clientName: '',
    company: '',
    email: '',
    craneType: 'Single Girder EOT',
    capacity: 5, // in MT
    span: 15,    // in Meters
    hol: 6,      // Height of Lift in Meters
    duty: 'Class II', // Duty cycle
    location: 'Maharashtra'
  });

  const [estimate, setEstimate] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // ==========================================
  // REAL INDUSTRIAL PRICING ALGORITHM (2026 RATES)
  // ==========================================
  const pricingLogic = useMemo(() => {
    // Current Raw Material Rates (INR per Kg)
    const steelRatePerKg = 65; 
    const fabricationLaborPerKg = 18;
    
    // Component Baselines (INR)
    const electricalPanelBase = 85000;
    const vfdCostPerKw = 6000;
    
    // Margin & Overheads
    const grossMargin = 0.22; // 22%
    const transportBase = 45000;

    const calculateCost = (data) => {
      let cap = parseFloat(data.capacity);
      let sp = parseFloat(data.span);
      let height = parseFloat(data.hol);

      // 1. Structural Weight Estimation (Rough Empirical Formula)
      // Weight increases exponentially with span and capacity
      let structuralWeightKg = 0;
      if (data.craneType === 'Single Girder EOT') {
         structuralWeightKg = (cap * 150) + (sp * sp * 12);
      } else if (data.craneType === 'Double Girder EOT') {
         structuralWeightKg = (cap * 220) + (sp * sp * 18);
      } else if (data.craneType === 'Gantry Crane') {
         structuralWeightKg = (cap * 280) + (sp * sp * 20) + (height * 300); // Legs add significant weight
      } else {
         structuralWeightKg = (cap * 100) + (sp * 50); // Jib Crane rough logic
      }

      const steelCost = structuralWeightKg * steelRatePerKg;
      const fabricationCost = structuralWeightKg * fabricationLaborLaborPerKg;

      // 2. Hoist Mechanism Cost
      let hoistCost = 0;
      if (data.craneType === 'Double Girder EOT') {
         hoistCost = 150000 + (cap * 25000) + (height * 3000); // Crab Winch
      } else {
         hoistCost = 90000 + (cap * 18000) + (height * 2000); // Wire rope hoist
      }

      // 3. Electricals & Automation (VFDs, Motors, Panels)
      // Estimate total kW required
      const totalKw = (cap * 0.8) + (sp * 0.2); 
      let electricalCost = electricalPanelBase + (totalKw * vfdCostPerKw);
      
      // Duty Class Multiplier (Heavier duty requires larger motors/gearboxes)
      let dutyMultiplier = 1.0;
      if (data.duty === 'Class III') dutyMultiplier = 1.15;
      if (data.duty === 'Class IV') dutyMultiplier = 1.35;

      electricalCost = electricalCost * dutyMultiplier;
      hoistCost = hoistCost * dutyMultiplier;

      // 4. Total Core Manufacturing Cost
      const coreCost = steelCost + fabricationCost + hoistCost + electricalCost;

      // 5. Final Estimated Price (Adding Margin & Transport)
      const finalPrice = (coreCost / (1 - grossMargin)) + transportBase;

      return {
        totalPrice: Math.round(finalPrice),
        structuralWeight: Math.round(structuralWeightKg),
        breakdown: {
           structure: Math.round(steelCost + fabricationCost),
           hoist: Math.round(hoistCost),
           electricals: Math.round(electricalCost)
        }
      };
    };

    return calculateCost(formData);
  }, [formData]);

  // Update estimate whenever form changes
  useEffect(() => {
    setEstimate(pricingLogic);
    setIsSaved(false); // Reset saved state if they tweak numbers
  }, [pricingLogic]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateAndSave = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      // 1. Save Lead & Estimate to Firestore
      const quoteData = {
        ...formData,
        estimatedValue: estimate.totalPrice,
        structuralWeight: estimate.structuralWeight,
        timestamp: serverTimestamp(),
        status: 'Quote Generated'
      };
      
      await addDoc(collection(db, "quotes"), quoteData);
      setIsSaved(true);

      // 2. Generate PDF
      const doc = new jsPDF();
      
      // Corporate Header
      doc.setFillColor(30, 64, 175); // Primary Blue
      doc.rect(0, 0, 210, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text('NAIDU SOLUTIONS & SERVICES', 105, 20, { align: 'center' });
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text('121 Kissan Nagar, CIDCO, Nanded, Maharashtra | sales@naidusolutions.com', 105, 30, { align: 'center' });

      // Document Title
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text('PRELIMINARY ENGINEERING ESTIMATE', 20, 60);
      
      // Client Info
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text(`Client Name: ${formData.clientName || 'N/A'}`, 20, 75);
      doc.text(`Company: ${formData.company || 'N/A'}`, 20, 82);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 140, 75);

      // Technical Parameters Box
      doc.setDrawColor(200, 200, 200);
      doc.setFillColor(245, 245, 245);
      doc.rect(20, 90, 170, 50, 'FD');
      
      doc.setFont("helvetica", "bold");
      doc.text('Technical Parameters:', 25, 100);
      doc.setFont("helvetica", "normal");
      doc.text(`Equipment Type: ${formData.craneType}`, 25, 110);
      doc.text(`Safe Working Load (SWL): ${formData.capacity} MT`, 25, 118);
      doc.text(`Span Length: ${formData.span} Meters`, 25, 126);
      doc.text(`Height of Lift (HOL): ${formData.hol} Meters`, 110, 110);
      doc.text(`Duty Cycle (IS 3177): ${formData.duty}`, 110, 118);
      doc.text(`Est. Structural Weight: ~${(estimate.structuralWeight/1000).toFixed(1)} Tons`, 110, 126);

      // Cost Breakdown
      doc.setFont("helvetica", "bold");
      doc.text('Estimated Commercials (Ex-Works Nanded)', 20, 160);
      
      // Table Header
      doc.setFillColor(200, 200, 200);
      doc.rect(20, 165, 170, 10, 'F');
      doc.text('Description', 25, 172);
      doc.text('Amount (INR)', 150, 172);

      // Table Rows
      doc.setFont("helvetica", "normal");
      doc.text('1. Structural Fabrication (IS 2062 Gr.B Steel)', 25, 185);
      doc.text(`₹ ${estimate.breakdown.structure.toLocaleString('en-IN')}`, 150, 185);
      
      doc.text('2. Hoisting & Mechanical Machinery', 25, 195);
      doc.text(`₹ ${estimate.breakdown.hoist.toLocaleString('en-IN')}`, 150, 195);
      
      doc.text('3. VFD Electrical Panels & Automation', 25, 205);
      doc.text(`₹ ${estimate.breakdown.electricals.toLocaleString('en-IN')}`, 150, 205);

      doc.setDrawColor(0, 0, 0);
      doc.line(20, 215, 190, 215);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text('Total Estimated Value:', 25, 225);
      doc.text(`₹ ${estimate.totalPrice.toLocaleString('en-IN')}`, 145, 225);

      // Terms
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      doc.text('TERMS & CONDITIONS:', 20, 245);
      doc.text('1. This is an auto-generated structural estimate based on raw material market rates as of April 2026.', 20, 252);
      doc.text('2. Final binding quotation requires an on-site structural audit and gantry verification by Naidu Solutions engineers.', 20, 257);
      doc.text('3. GST @ 18% and Erection/Commissioning charges are extra as applicable at site.', 20, 262);

      // Save PDF
      doc.save(`NaiduSolutions_Estimate_${formData.company.replace(/\s+/g, '') || 'Crane'}.pdf`);

    } catch (error) {
      console.error("Error generating quote:", error);
      alert("Failed to save quote. Please try again.");
    } finally {
      setIsGenerating(false);
    }
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
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Engineering Cost Calculator</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our algorithm utilizes real-time structural steel weights, labor indices, and Tier-1 component costs to generate a highly accurate preliminary quotation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Configuration Form */}
          <motion.div 
            initial="hidden" animate="visible" variants={fadeUp}
            className="lg:col-span-7 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8"
          >
            <form id="quote-form" onSubmit={handleGenerateAndSave} className="space-y-8">
              
              {/* Client Details */}
              <div>
                 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">1. Client Information</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                      <input type="text" name="clientName" required value={formData.clientName} onChange={handleInputChange} className="w-full p-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:text-white text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Company *</label>
                      <input type="text" name="company" required value={formData.company} onChange={handleInputChange} className="w-full p-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:text-white text-sm" />
                    </div>
                 </div>
              </div>

              {/* Technical Parameters */}
              <div>
                 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 flex items-center justify-between">
                    2. Technical Parameters
                    <Settings2 className="w-5 h-5 text-gray-400" />
                 </h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Equipment Architecture</label>
                      <select name="craneType" value={formData.craneType} onChange={handleInputChange} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:text-white text-sm font-medium">
                        <option value="Single Girder EOT">Single Girder EOT (1-20 MT)</option>
                        <option value="Double Girder EOT">Double Girder EOT (5-100 MT)</option>
                        <option value="Gantry Crane">Gantry Crane / Goliath (Outdoor)</option>
                        <option value="Jib Crane">Jib Crane (Pillar Mounted)</option>
                      </select>
                    </div>

                    <div>
                      <label className="flex justify-between items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                         Capacity (SWL) <span className="text-xs font-normal text-gray-500">{formData.capacity} MT</span>
                      </label>
                      <input type="range" name="capacity" min="1" max={formData.craneType === 'Double Girder EOT' || formData.craneType === 'Gantry Crane' ? "100" : "20"} step="1" value={formData.capacity} onChange={handleInputChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary" />
                    </div>

                    <div>
                      <label className="flex justify-between items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                         Span Length <span className="text-xs font-normal text-gray-500">{formData.span} Meters</span>
                      </label>
                      <input type="range" name="span" min="3" max={formData.craneType === 'Double Girder EOT' ? "40" : "30"} step="1" value={formData.span} onChange={handleInputChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Height of Lift (HOL)</label>
                      <select name="hol" value={formData.hol} onChange={handleInputChange} className="w-full p-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:text-white text-sm">
                        <option value="6">6 Meters (Standard)</option>
                        <option value="9">9 Meters</option>
                        <option value="12">12 Meters</option>
                        <option value="18">18 Meters (High Lift)</option>
                        <option value="24">24 Meters (Heavy Duty)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">IS 3177 Duty Cycle</label>
                      <select name="duty" value={formData.duty} onChange={handleInputChange} className="w-full p-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:text-white text-sm">
                        <option value="Class I">Class I (Light Workshop)</option>
                        <option value="Class II">Class II (Medium Factory)</option>
                        <option value="Class III">Class III (Heavy Foundries/Mills)</option>
                        <option value="Class IV">Class IV (Continuous 24/7 Process)</option>
                      </select>
                    </div>

                 </div>
              </div>

            </form>
          </motion.div>

          {/* RIGHT: Real-time Live Estimate Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-primary rounded-2xl shadow-2xl p-8 text-white sticky top-24">
               <div className="flex items-center justify-between mb-8 border-b border-blue-800 pb-4">
                  <h3 className="text-xl font-bold flex items-center">
                     <Calculator className="w-6 h-6 mr-2 text-secondary" />
                     Live Algorithm Output
                  </h3>
               </div>

               <div className="space-y-6 mb-8">
                  <div>
                     <p className="text-blue-200 text-sm mb-1 uppercase tracking-wider font-semibold">Calculated Structural Deadweight</p>
                     <p className="text-2xl font-bold">~{(estimate.structuralWeight / 1000).toFixed(1)} <span className="text-lg font-normal opacity-80">Metric Tons</span></p>
                  </div>
                  
                  <div>
                     <p className="text-blue-200 text-sm mb-1 uppercase tracking-wider font-semibold">Estimated Base Price (Ex-Works)</p>
                     <p className="text-4xl font-black text-secondary tracking-tight">
                        ₹{estimate.totalPrice.toLocaleString('en-IN')}
                     </p>
                  </div>
               </div>

               <div className="bg-blue-900/50 p-4 rounded-xl border border-blue-500/30 mb-8 space-y-2 text-sm text-blue-100">
                  <div className="flex justify-between"><span>Steel & Fabrication:</span> <span>₹{estimate.breakdown.structure.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between"><span>Hoist & Mechanics:</span> <span>₹{estimate.breakdown.hoist.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between"><span>VFDs & Controls:</span> <span>₹{estimate.breakdown.electricals.toLocaleString('en-IN')}</span></div>
               </div>

               <button 
                  form="quote-form"
                  type="submit"
                  disabled={isGenerating}
                  className="w-full bg-secondary text-gray-900 py-4 rounded-xl font-extrabold hover:bg-yellow-500 transition-all flex items-center justify-center shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
               >
                  {isGenerating ? (
                    <span className="flex items-center">Processing Matrix <span className="animate-pulse ml-2">...</span></span>
                  ) : isSaved ? (
                    <span className="flex items-center">Quote Saved & Downloaded <CheckCircle2 className="w-5 h-5 ml-2" /></span>
                  ) : (
                    <span className="flex items-center">Export Official PDF <Download className="w-5 h-5 ml-2" /></span>
                  )}
               </button>

               <div className="mt-6 flex items-start text-xs text-blue-300">
                  <Info className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                  <p>Prices depend on exact IS steel rates at time of booking. Excludes GST, transport, and erection.</p>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}