import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  Zap, 
  PhoneCall, 
  MapPin, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  Navigation, 
  Loader2,
  HardHat,
  MessageSquare,
  Activity
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore, collection, addDoc, doc, onSnapshot, serverTimestamp } from 'firebase/firestore';

/**
 * Emergency SOS Component
 * Logic: Real-time Firestore-backed emergency ticketing & dispatch tracking.
 * Content: Validated industrial emergency protocols for Naidu Solutions.
 */

// Global config variables provided by the environment
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const appId = typeof __app_id !== 'undefined' ? __app_id : 'naidu-solutions-emergency';

export default function Emergency() {
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTicket, setActiveTicket] = useState(null);
  const [ticketStatus, setTicketStatus] = useState(null);
  const [formData, setFormData] = useState({
    unitId: '',
    location: '',
    phone: '',
    description: '',
    severity: 'High'
  });

  // 1. Initialize Firebase Services
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const authInstance = getAuth(app);
    const firestore = getFirestore(app);
    setDb(firestore);
    setAuth(authInstance);

    const initAuth = async () => {
      try {
        await signInAnonymously(authInstance);
      } catch (err) {
        console.error("SOS Authentication Error:", err);
      }
    };
    initAuth();
  }, []);

  // 2. Real-time Status Routing: Listen for updates on the specific ticket
  useEffect(() => {
    if (!activeTicket || !db) return;

    const ticketRef = doc(db, 'artifacts', appId, 'public', 'data', 'emergency_tickets', activeTicket);
    const unsubscribe = onSnapshot(ticketRef, (docSnap) => {
      if (docSnap.exists()) {
        setTicketStatus(docSnap.data());
      }
    }, (err) => console.error("Real-time Tracking Error:", err));

    return () => unsubscribe();
  }, [activeTicket, db]);

  const handleSOS = async (e) => {
    e.preventDefault();
    if (!db || !auth.currentUser) return;
    setIsSubmitting(true);

    try {
      const ticketRef = collection(db, 'artifacts', appId, 'public', 'data', 'emergency_tickets');
      const docRef = await addDoc(ticketRef, {
        userId: auth.currentUser.uid,
        ...formData,
        status: 'DISPATCH_QUEUED',
        timestamp: serverTimestamp(),
        estimatedArrival: 'Calculating...'
      });
      setActiveTicket(docRef.id);
    } catch (err) {
      console.error("SOS Transmission Failure:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white pb-20">
      {/* SOS Pulse Header */}
      <section className="bg-red-700 py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full mb-6 border border-white/20 animate-pulse">
              <Zap size={18} className="text-yellow-400" />
              <span className="text-xs font-black uppercase tracking-widest">Global SOS Protocol Active</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
              CRITICAL <br />BREAKDOWN.
            </h1>
            <p className="text-xl text-red-100 max-w-xl font-medium opacity-90">
              Immediate deployment of Naidu Solutions rapid-response engineering teams. Minimum response time: 60-120 Minutes.
            </p>
          </motion.div>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-black/30 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/10 shadow-3xl text-center"
          >
            <PhoneCall size={64} className="text-white mb-6 mx-auto animate-bounce" />
            <p className="text-sm font-bold uppercase opacity-60 mb-2">Emergency Hotline</p>
            <p className="text-4xl font-black tracking-widest">+91 1800-NAIDU-911</p>
            <p className="text-xs mt-4 text-red-200 uppercase font-black">24/7/365 Command Center</p>
          </motion.div>
        </div>
        
        {/* Animated Background Pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600 rounded-full mix-blend-screen opacity-20 animate-ping pointer-events-none" />
      </section>

      <div className="max-w-7xl mx-auto py-20 px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Real-time Ticket Interface */}
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait">
              {!activeTicket ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-zinc-900 p-8 md:p-12 rounded-[3rem] border border-zinc-800 shadow-2xl"
                >
                  <h2 className="text-3xl font-black mb-8 flex items-center gap-3 text-red-500">
                    <AlertTriangle /> Trigger SOS Dispatch
                  </h2>
                  <form onSubmit={handleSOS} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-zinc-500 uppercase tracking-widest">Machine Unit ID</label>
                        <input 
                          required type="text" placeholder="e.g. NS-EOT-08-2026"
                          className="w-full bg-zinc-800 border border-zinc-700 p-4 rounded-2xl focus:ring-2 focus:ring-red-600 outline-none transition-all"
                          onChange={e => setFormData({...formData, unitId: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-zinc-500 uppercase tracking-widest">Site Contact Number</label>
                        <input 
                          required type="tel" placeholder="+91"
                          className="w-full bg-zinc-800 border border-zinc-700 p-4 rounded-2xl focus:ring-2 focus:ring-red-600 outline-none transition-all"
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-zinc-500 uppercase tracking-widest">GPS / Site Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={20} />
                        <input 
                          required type="text" placeholder="Industrial Area, City, Pin"
                          className="w-full bg-zinc-800 border border-zinc-700 pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-red-600 outline-none"
                          onChange={e => setFormData({...formData, location: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-zinc-500 uppercase tracking-widest">Failure Description</label>
                      <textarea 
                        rows="4" placeholder="Briefly describe the mechanical/electrical failure..."
                        className="w-full bg-zinc-800 border border-zinc-700 p-4 rounded-2xl focus:ring-2 focus:ring-red-600 outline-none"
                        onChange={e => setFormData({...formData, description: e.target.value})}
                      />
                    </div>
                    
                    <button 
                      type="submit" disabled={isSubmitting}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-6 rounded-2xl font-black text-xl transition-all shadow-xl shadow-red-600/20 flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" /> : <>TRANSMIT SOS SIGNAL <Activity /></>}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="status"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-zinc-900 p-12 rounded-[3.5rem] border-2 border-red-600/50 shadow-3xl text-center"
                >
                  <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-red-600/30">
                    <Navigation size={48} className="text-white animate-pulse" />
                  </div>
                  <h2 className="text-4xl font-black mb-4 tracking-tighter uppercase">Signal Received.</h2>
                  <p className="text-zinc-400 mb-10 max-w-sm mx-auto">
                    Emergency Ticket <span className="text-red-500 font-mono font-bold">#{activeTicket.slice(0, 8).toUpperCase()}</span> is currently being routed to the nearest response hub.
                  </p>

                  <div className="grid gap-4 mb-10">
                    <div className="p-6 bg-zinc-800/50 rounded-2xl flex justify-between items-center border border-zinc-700">
                      <span className="text-xs font-bold text-zinc-500 uppercase">Dispatch Status</span>
                      <span className="text-sm font-black text-red-500">{ticketStatus?.status || 'QUEUED'}</span>
                    </div>
                    <div className="p-6 bg-zinc-800/50 rounded-2xl flex justify-between items-center border border-zinc-700">
                      <span className="text-xs font-bold text-zinc-500 uppercase">Estimated Arrival</span>
                      <span className="text-sm font-black text-white">{ticketStatus?.estimatedArrival || 'TBD'}</span>
                    </div>
                  </div>

                  <div className="p-6 bg-red-600/10 border border-red-600/20 rounded-2xl flex items-center gap-4 text-left">
                    <ShieldAlert className="text-red-500 shrink-0" />
                    <p className="text-xs text-red-200">Engineer identity and vehicle tracking link will be sent via SMS shortly.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Safety Protocols */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                <HardHat className="text-red-600" /> Immediate Safety Actions
              </h2>
              <div className="space-y-4">
                {[
                  { title: "Power Isolation", desc: "Turn off the main isolator switch at the gantry level immediately." },
                  { title: "Hazard Zoning", desc: "Clear all personnel from the load zone. Use barricade tapes if available." },
                  { title: "No Manual Resets", desc: "Do not attempt to reset VFD or Control Panel errors manually." },
                  { title: "Operator Debrief", desc: "Keep the crane operator available to provide fault context to the technician." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 10 }}
                    className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-3xl flex gap-6"
                  >
                    <div className="w-10 h-10 bg-red-600/20 text-red-500 rounded-xl flex items-center justify-center font-black text-lg shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 p-10 rounded-[2.5rem] border border-zinc-800 relative overflow-hidden group">
              <MessageSquare className="absolute -right-8 -top-8 text-white/5 group-hover:rotate-12 transition-transform duration-700" size={180} />
              <h3 className="text-2xl font-bold mb-4 relative z-10">Direct Audio Channel</h3>
              <p className="text-sm text-zinc-500 mb-8 relative z-10">
                Facing a communication barrier? Connect directly to our Master Service Engineer via secure voice channel.
              </p>
              <button className="relative z-10 bg-white text-black px-8 py-4 rounded-2xl font-black hover:bg-zinc-200 transition-all flex items-center gap-2">
                <Activity size={18} /> INITIATE VOICE CALL
              </button>
            </div>
          </div>
        </div>

        {/* Global Action Footer */}
        <div className="mt-24 pt-12 border-t border-zinc-800 flex flex-wrap justify-center gap-8">
          <Link to="/contact" className="text-zinc-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Contact Support</Link>
          <Link to="/services" className="text-zinc-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Service Catalog</Link>
          <Link to="/amc" className="text-zinc-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Upgrade to AMC</Link>
        </div>
      </div>
    </div>
  );
}