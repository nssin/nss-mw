import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Wrench, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  ShieldCheck, 
  Activity, 
  ArrowRight,
  ClipboardList,
  Clock,
  Droplets,
  Zap,
  HardHat
} from 'lucide-react';

/**
 * Crane Maintenance Component
 * Real Content: Daily, Monthly, and Quarterly maintenance schedules.
 * Real Logic: Maintenance health score calculation and interactive checklist state.
 */

const MaintenanceSchedule = ({ interval, items, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex-1 p-4 rounded-xl border-2 transition-all text-left ${
      active 
      ? 'border-primary bg-primary/5 shadow-md' 
      : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 hover:border-gray-200'
    }`}
  >
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${active ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'}`}>
      <Calendar size={20} />
    </div>
    <h4 className={`font-bold ${active ? 'text-primary' : 'text-gray-600 dark:text-gray-400'}`}>{interval}</h4>
    <p className="text-xs text-gray-500 mt-1">{items} Checkpoints</p>
  </button>
);

export default function CraneMaintenance() {
  const [activeTab, setActiveTab] = useState('monthly');
  const [checkedItems, setCheckedItems] = useState([]);

  const schedules = {
    daily: [
      { id: 'd1', label: 'Brake Functionality (Hoist & CT/LT)', type: 'safety' },
      { id: 'd2', label: 'Limit Switch Operation (Top/Bottom)', type: 'electrical' },
      { id: 'd3', label: 'Visible Structural Deformations/Cracks', type: 'mechanical' },
      { id: 'd4', label: 'Oil Leaks from Gearboxes/Thrusters', type: 'lubrication' },
      { id: 'd5', label: 'Pendant/Remote Control Response Check', type: 'electrical' }
    ],
    monthly: [
      { id: 'm1', label: 'Wire Rope: Broken Wires & Wear Analysis', type: 'safety' },
      { id: 'm2', label: 'Lubrication: Rope, Bearings & Open Gears', type: 'lubrication' },
      { id: 'm3', label: 'High-Tensile Bolting Torque Verification', type: 'mechanical' },
      { id: 'm4', label: 'DSL System: Carbon Brush Wear & Alignment', type: 'electrical' },
      { id: 'm5', label: 'Hook Block: Swivel & Safety Latch Integrity', type: 'safety' },
      { id: 'm6', label: 'VFD Fan & Panel Filter Cleaning', type: 'electrical' }
    ],
    quarterly: [
      { id: 'q1', label: 'Load Deflection Test (Full Load)', type: 'safety' },
      { id: 'q2', label: 'Gearbox Oil Analysis (Contamination/Viscosity)', type: 'lubrication' },
      { id: 'q3', label: 'NDT (Non-Destructive Testing) on Critical Welds', type: 'mechanical' },
      { id: 'q4', label: 'Master Controller Contact Wear Inspection', type: 'electrical' },
      { id: 'q5', label: 'Gantry Rail Alignment & Span Verification', type: 'mechanical' }
    ]
  };

  const toggleItem = (id) => {
    setCheckedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const healthScore = useMemo(() => {
    const total = schedules[activeTab].length;
    const current = schedules[activeTab].filter(i => checkedItems.includes(i.id)).length;
    return Math.round((current / total) * 100);
  }, [activeTab, checkedItems]);

  const getIcon = (type) => {
    switch(type) {
      case 'safety': return <ShieldCheck size={16} />;
      case 'electrical': return <Zap size={16} />;
      case 'mechanical': return <Wrench size={16} />;
      case 'lubrication': return <Droplets size={16} />;
      default: return <ClipboardList size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Header */}
      <section className="bg-primary py-16 px-4 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-blue-200 mb-4 font-bold text-sm tracking-widest uppercase">
            <Activity size={18} />
            Predictive Health Monitoring
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
            Total Productive <br />Maintenance (TPM)
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl leading-relaxed">
            Ensuring 99.9% uptime for industrial lifting equipment through standardized preventive maintenance protocols and real-time safety auditing.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-5 -translate-x-12 translate-y-12">
          <Wrench size={400} />
        </div>
      </section>

      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Schedule Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Maintenance Frequency</h3>
            <div className="flex flex-col gap-4">
              <MaintenanceSchedule 
                interval="Daily / Shift" 
                items={5} 
                active={activeTab === 'daily'} 
                onClick={() => {setActiveTab('daily'); setCheckedItems([]);}} 
              />
              <MaintenanceSchedule 
                interval="Monthly PM" 
                items={6} 
                active={activeTab === 'monthly'} 
                onClick={() => {setActiveTab('monthly'); setCheckedItems([]);}} 
              />
              <MaintenanceSchedule 
                interval="Quarterly / Annual" 
                items={5} 
                active={activeTab === 'quarterly'} 
                onClick={() => {setActiveTab('quarterly'); setCheckedItems([]);}} 
              />
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold mb-4">
                <AlertCircle size={20} />
                <span className="text-sm">Maintenance Alert</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Scheduled Wire Rope lubrication is overdue for Unit #NS-702 (EOT 10T). Immediate action required.
              </p>
              <button className="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-xl text-sm font-bold transition-all">
                Acknowledge Alert
              </button>
            </div>
          </div>

          {/* Checklist Area */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl overflow-hidden">
              <div className="p-8 border-b border-gray-50 dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white capitalize">
                    {activeTab} Checklist
                  </h2>
                  <p className="text-sm text-gray-500">Industry Protocol IS:13367-1-1992 Compliance</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-400 uppercase">Health Score</p>
                    <p className={`text-3xl font-black ${healthScore === 100 ? 'text-green-500' : 'text-primary'}`}>
                      {healthScore}%
                    </p>
                  </div>
                  <div className="w-16 h-16 rounded-full border-4 border-gray-100 dark:border-gray-700 flex items-center justify-center relative overflow-hidden">
                    <div 
                      className="absolute bottom-0 w-full bg-green-500 transition-all duration-700" 
                      style={{ height: `${healthScore}%`, opacity: 0.2 }}
                    ></div>
                    <Activity className={healthScore === 100 ? 'text-green-500' : 'text-gray-300'} />
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-3">
                {schedules[activeTab].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`w-full group flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                      checkedItems.includes(item.id)
                      ? 'bg-green-50/50 dark:bg-green-900/10 border-green-500/50'
                      : 'bg-gray-50 dark:bg-gray-900/50 border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                      checkedItems.includes(item.id) ? 'bg-green-500 text-white rotate-0' : 'border-2 border-gray-300 dark:border-gray-600 rotate-90'
                    }`}>
                      {checkedItems.includes(item.id) && <CheckCircle2 size={16} />}
                    </div>
                    <div className={`p-2 rounded-lg ${checkedItems.includes(item.id) ? 'bg-green-500/20 text-green-600' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'}`}>
                      {getIcon(item.type)}
                    </div>
                    <span className={`text-sm font-bold flex-grow text-left ${checkedItems.includes(item.id) ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                      {item.label}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.type}
                    </span>
                  </button>
                ))}
              </div>

              <div className="p-8 bg-gray-50 dark:bg-gray-900 border-t border-gray-50 dark:border-gray-700 flex justify-between items-center">
                <p className="text-xs text-gray-500 max-w-sm">
                  * Note: This checklist is for digital auditing purposes. All physical maintenance must be performed by authorized Naidu Solutions engineers.
                </p>
                <Link 
                  to="/book-service" 
                  className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center gap-2 group"
                >
                  Log Maintenance <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Support Banner */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-gray-900 p-8 rounded-3xl text-white relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">Emergency Support</h3>
              <p className="text-gray-400 mb-6">Critical breakdown? Our rapid response team is available 24/7 for emergency repairs and parts replacement.</p>
              <Link to="/breakdown" className="inline-flex items-center text-secondary font-black group-hover:gap-4 transition-all">
                RAISE EMERGENCY TICKET <ArrowRight className="ml-2" />
              </Link>
            </div>
            <Clock className="absolute right-0 top-0 text-white/5 -translate-y-4 translate-x-4" size={160} />
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Annual Maintenance Contracts</h3>
            <p className="text-gray-500 mb-6">Save up to 30% on maintenance costs with our Comprehensive AMC plans including spares and health audits.</p>
            <Link to="/amc" className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-xl font-bold text-center hover:bg-primary hover:text-white transition-all">
              View AMC Tiers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}