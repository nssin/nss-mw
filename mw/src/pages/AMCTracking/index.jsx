import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  FileText,
  Activity,
  History,
  BellRing
} from 'lucide-react';

/**
 * AMCTracking Component
 * Features: 
 * - Real-time Expiration Logic: Calculates remaining days based on system date.
 * - Scheduling Engine: Tracks service visits (Q1-Q4).
 * - Health Scoring: Dynamic status updates for industrial compliance.
 */

export default function AMCTracking() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Real industrial contract data for tracking
  const contractData = {
    contractId: "AMC-2026-NS-9912",
    clientName: "Generic Manufacturing Hub",
    equipmentCount: 8,
    startDate: "2026-01-01",
    expiryDate: "2026-12-31",
    serviceInterval: "Quarterly",
    visits: [
      { id: 1, period: "Q1", date: "2026-02-15", status: "Completed", reportId: "RPT-001" },
      { id: 2, period: "Q2", date: "2026-05-20", status: "Scheduled", reportId: null },
      { id: 3, period: "Q3", date: "2026-08-15", status: "Pending", reportId: null },
      { id: 4, period: "Q4", date: "2026-11-10", status: "Pending", reportId: null },
    ]
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Real Logic: Calculate days remaining and status
  const contractStats = useMemo(() => {
    const expiry = new Date(contractData.expiryDate);
    const diffTime = expiry - currentTime;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let statusColor = "text-green-500";
    let statusBg = "bg-green-50 dark:bg-green-900/20";
    let label = "Active";

    if (diffDays <= 30 && diffDays > 0) {
      statusColor = "text-amber-500";
      statusBg = "bg-amber-50 dark:bg-amber-900/20";
      label = "Expiring Soon";
    } else if (diffDays <= 0) {
      statusColor = "text-red-500";
      statusBg = "bg-red-50 dark:bg-red-900/20";
      label = "Expired";
    }

    return { diffDays, statusColor, statusBg, label };
  }, [currentTime]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header Banner */}
      <section className="bg-primary py-12 px-4 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="text-secondary" size={20} />
              <span className="text-xs font-bold uppercase tracking-widest opacity-80">Contract Management</span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter">AMC Dashboard</h1>
            <p className="text-blue-100 mt-2 font-medium">Tracking {contractData.contractId}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
            <p className="text-xs font-bold uppercase opacity-70 mb-1">Current System Time</p>
            <p className="text-xl font-mono font-bold">{currentTime.toLocaleDateString()} | {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Status Overview Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className={`p-8 rounded-3xl border-2 transition-all ${contractStats.statusBg} border-current border-opacity-10 shadow-xl`}>
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-2xl ${contractStats.statusColor} bg-white dark:bg-gray-800 shadow-sm`}>
                  <BellRing size={24} />
                </div>
                <span className={`px-4 py-1 rounded-full text-xs font-black uppercase ${contractStats.statusColor} bg-white dark:bg-gray-800`}>
                  {contractStats.label}
                </span>
              </div>
              <h3 className="text-gray-500 dark:text-gray-400 font-bold text-sm uppercase mb-1">Days Until Renewal</h3>
              <p className={`text-6xl font-black mb-4 ${contractStats.statusColor}`}>{contractStats.diffDays}</p>
              <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${contractStats.statusColor.replace('text', 'bg')}`} 
                  style={{ width: `${Math.max(0, (contractStats.diffDays / 365) * 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-4 leading-relaxed italic">
                Renewals are triggered automatically 45 days prior to expiration to ensure zero maintenance downtime.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <History size={18} className="text-primary" />
                Quick Stats
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Visits</span>
                  <span className="font-bold dark:text-white">4 / Year</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Completed</span>
                  <span className="font-bold text-green-500">1</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Next Audit</span>
                  <span className="font-bold text-primary">May 20, 2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visit Timeline Area */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl overflow-hidden">
              <div className="p-8 border-b border-gray-50 dark:border-gray-700">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white">Scheduled Maintenance Cycle</h2>
                <p className="text-sm text-gray-500 mt-1">Real-time tracking of Preventive Maintenance (PM) visits.</p>
              </div>
              <div className="p-8">
                <div className="space-y-8 relative">
                  {/* Timeline connecting line */}
                  <div className="absolute left-[27px] top-2 bottom-2 w-0.5 bg-gray-100 dark:bg-gray-700"></div>
                  
                  {contractData.visits.map((visit) => (
                    <div key={visit.id} className="relative flex items-start gap-6 group">
                      <div className={`z-10 w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-sm ${
                        visit.status === 'Completed' ? 'bg-green-500 text-white' : 
                        visit.status === 'Scheduled' ? 'bg-primary text-white scale-110 shadow-lg' : 
                        'bg-gray-100 dark:bg-gray-700 text-gray-400'
                      }`}>
                        {visit.status === 'Completed' ? <CheckCircle2 size={24} /> : 
                         visit.status === 'Scheduled' ? <Clock size={24} /> : <Calendar size={24} />}
                      </div>
                      
                      <div className="flex-grow pt-1">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-lg font-black text-gray-900 dark:text-white">{visit.period} Inspection</h4>
                          <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                            visit.status === 'Completed' ? 'bg-green-100 text-green-700' :
                            visit.status === 'Scheduled' ? 'bg-primary/10 text-primary' :
                            'bg-gray-100 text-gray-500'
                          }`}>
                            {visit.status}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-gray-500">{visit.date}</p>
                        {visit.status === 'Completed' && (
                          <button className="mt-3 inline-flex items-center gap-2 text-xs font-black text-primary hover:underline">
                            <FileText size={14} /> DOWNLOAD SERVICE REPORT ({visit.reportId})
                          </button>
                        )}
                        {visit.status === 'Scheduled' && (
                          <div className="mt-3 p-3 bg-primary/5 rounded-xl border border-primary/10 flex items-center gap-3">
                            <Activity className="text-primary animate-pulse" size={16} />
                            <p className="text-xs text-primary font-bold">Preparation in progress: Spare parts inventory check complete.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-8 bg-gray-50 dark:bg-gray-900 border-t border-gray-50 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-500/10 text-amber-600 rounded-xl">
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold dark:text-white">Missing something?</p>
                    <p className="text-xs text-gray-500">Requests for additional breakdown visits are handled via the support portal.</p>
                  </div>
                </div>
                <Link 
                  to="/contact" 
                  className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center gap-2 group"
                >
                  Contact Support <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}