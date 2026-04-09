import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertCircle, 
  Clock, 
  MapPin, 
  ShieldAlert, 
  Zap, 
  Wrench, 
  PhoneCall, 
  CheckCircle2, 
  ArrowRight,
  Truck,
  MessageSquare,
  Activity
} from 'lucide-react';

/**
 * Breakdown Component
 * Features:
 * - Real-time SOS Dispatch Logic: Simulates emergency ticketing.
 * - SLA Timer: Real-time response countdown.
 * - Industrial Diagnostic Guide: Real technical failure points.
 */

export default function Breakdown() {
  const [isEmergencySubmitting, setIsEmergencySubmitting] = useState(false);
  const [ticketCreated, setTicketCreated] = useState(false);
  const [activeSLA, setActiveSLA] = useState(120); // 120 minutes SLA
  const [formData, setFormData] = useState({
    unitId: '',
    issueType: 'Hoist Failure',
    location: '',
    contact: ''
  });

  useEffect(() => {
    let timer;
    if (ticketCreated && activeSLA > 0) {
      timer = setInterval(() => {
        setActiveSLA(prev => prev - 1);
      }, 60000); // Decr every minute
    }
    return () => clearInterval(timer);
  }, [ticketCreated, activeSLA]);

  const handleEmergencySubmit = (e) => {
    e.preventDefault();
    setIsEmergencySubmitting(true);
    // Real logic simulation: Backend ticket generation
    setTimeout(() => {
      setIsEmergencySubmitting(false);
      setTicketCreated(true);
    }, 2000);
  };

  const commonIssues = [
    { title: "DSL Power Failure", desc: "Carbon brush wear or alignment issue in Down Shop Lead system." },
    { title: "Hoist Jamming", desc: "Wire rope overlapping or limit switch malfunction preventing lifting." },
    { title: "VFD Fault E04", desc: "Over-current or earth fault in the drive control system." },
    { title: "Brake Slip", desc: "Thruster brake failure or liner wear causing load drifting." }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white transition-all duration-500">
      {/* Emergency SOS Header */}
      <section className="bg-red-600 py-16 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full mb-4 animate-pulse">
              <Zap size={18} className="text-yellow-400" />
              <span className="text-xs font-black uppercase tracking-widest">Immediate Response Active</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter">
              CRITICAL <br />BREAKDOWN.
            </h1>
            <p className="text-xl text-red-100 max-w-xl font-medium">
              Industrial downtime costs thousands per minute. Our rapid-dispatch teams are on standby across all major industrial zones.
            </p>
          </div>
          
          <div className="flex flex-col items-center bg-black/30 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
            <PhoneCall size={48} className="text-white mb-4 animate-bounce" />
            <p className="text-sm font-bold uppercase opacity-70 mb-1">Direct Hotline</p>
            <p className="text-3xl font-black tracking-widest">+91 1800-NAIDU-SOS</p>
          </div>
        </div>
        <div className="absolute top-0 right-0 opacity-10 -translate-y-1/2 translate-x-1/4">
          <AlertCircle size={600} />
        </div>
      </section>

      <div className="max-w-7xl mx-auto py-16 px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Ticketing & Dispatch Logic */}
          <div className="order-2 lg:order-1">
            {!ticketCreated ? (
              <div className="bg-gray-800 p-8 md:p-12 rounded-[3rem] border border-gray-700 shadow-2xl">
                <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                  <MessageSquare className="text-red-500" />
                  Raise SOS Ticket
                </h2>
                <form onSubmit={handleEmergencySubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Unit ID / Serial Number</label>
                    <input 
                      type="text" required placeholder="e.g. NS-EOT-2024-08" 
                      className="w-full bg-gray-900 border border-gray-700 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                      onChange={(e) => setFormData({...formData, unitId: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Issue Category</label>
                      <select 
                        className="w-full bg-gray-900 border border-gray-700 p-4 rounded-xl focus:outline-none"
                        onChange={(e) => setFormData({...formData, issueType: e.target.value})}
                      >
                        <option>Hoist Failure</option>
                        <option>Electrical Fault</option>
                        <option>Mechanical Jam</option>
                        <option>Brake Failure</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Contact Number</label>
                      <input 
                        type="tel" required placeholder="+91" 
                        className="w-full bg-gray-900 border border-gray-700 p-4 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Site Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input 
                        type="text" required placeholder="Plant Address" 
                        className="w-full bg-gray-900 border border-gray-700 pl-12 pr-4 py-4 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>
                  <button 
                    disabled={isEmergencySubmitting}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3"
                  >
                    {isEmergencySubmitting ? (
                      <Activity className="animate-spin" />
                    ) : (
                      <>DISPATCH SERVICE TEAM <ArrowRight /></>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-green-600/10 border-2 border-green-500 p-12 rounded-[3rem] text-center animate-fade-in">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
                  <CheckCircle2 size={48} className="text-white" />
                </div>
                <h2 className="text-4xl font-black mb-4">Ticket Confirmed.</h2>
                <p className="text-xl text-green-100/80 mb-8">
                  Support Ticket <span className="text-white font-mono">#NS-{Math.floor(Math.random() * 90000) + 10000}</span> has been broadcasted to the nearest response hub.
                </p>
                <div className="bg-black/20 rounded-2xl p-6 border border-white/5">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-2">Technician Arrival SLA</p>
                  <p className="text-4xl font-black text-white">{activeSLA} MINUTES</p>
                </div>
                <button onClick={() => setTicketCreated(false)} className="mt-8 text-sm text-green-300 hover:underline">Raise another issue</button>
              </div>
            )}
          </div>

          {/* Diagnostic Information */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
                <ShieldAlert className="text-red-500" />
                Pre-Arrival Protocol
              </h2>
              <div className="space-y-4">
                {[
                  "Isolate main power supply immediately.",
                  "Clear the load zone of all personnel.",
                  "Do not attempt to manually reset VFD errors.",
                  "Keep the breakdown site accessible for service vehicles."
                ].map((text, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </div>
                    <p className="text-sm text-gray-300">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Wrench className="text-primary" />
                Technical Failure Codes
              </h3>
              <div className="grid gap-4">
                {commonIssues.map((issue, i) => (
                  <div key={i} className="group">
                    <h4 className="text-sm font-bold text-gray-200 group-hover:text-red-400 transition-colors">{issue.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{issue.desc}</p>
                    <div className="h-px bg-gray-800 mt-4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Grid Footer */}
        <div className="mt-20 grid md:grid-cols-3 gap-6">
          <div className="p-8 bg-gray-800 rounded-3xl border border-gray-700 text-center">
            <Truck className="mx-auto mb-4 text-primary" size={32} />
            <h4 className="font-bold mb-2">Fleet Response</h4>
            <p className="text-xs text-gray-400">12 Mobile Service Vans equipped with genuine spares.</p>
          </div>
          <div className="p-8 bg-gray-800 rounded-3xl border border-gray-700 text-center">
            <Clock className="mx-auto mb-4 text-primary" size={32} />
            <h4 className="font-bold mb-2">24/7 Availability</h4>
            <p className="text-xs text-gray-400">Night-shift engineers dedicated to emergency recovery.</p>
          </div>
          <div className="p-8 bg-gray-800 rounded-3xl border border-gray-700 text-center">
            <CheckCircle2 className="mx-auto mb-4 text-primary" size={32} />
            <h4 className="font-bold mb-2">Certified Repair</h4>
            <p className="text-xs text-gray-400">All repairs follow IS:3177 safety re-certification.</p>
          </div>
        </div>

        {/* Global Links */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 pt-12 border-t border-gray-800">
          <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Support</Link>
          <Link to="/services" className="text-gray-400 hover:text-white transition-colors">Service Catalog</Link>
          <Link to="/amc" className="text-gray-400 hover:text-white transition-colors">Upgrade to AMC</Link>
        </div>
      </div>
    </div>
  );
}