import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Building2, 
  Phone, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Loader2,
  HardHat,
  ShieldCheck,
  Briefcase
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';

// Environment Global Variables
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const appId = typeof __app_id !== 'undefined' ? __app_id : 'naidu-solutions-consult';

export default function Consult() {
  const [user, setUser] = useState(null);
  const [db, setDb] = useState(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    siteAddress: '',
    phone: '',
    reason: 'Site Inspection'
  });

  // 1. Firebase Initialization & Auth
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    setDb(firestore);

    const initAuth = async () => {
      try {
        await signInAnonymously(auth);
      } catch (err) {
        console.error("Auth failed:", err);
      }
    };
    initAuth();

    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) setUser(u);
    });
    return () => unsubscribe();
  }, []);

  // 2. Calendar Logic
  const daysInMonth = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const days = [];
    // Generate next 14 available business days
    let current = new Date();
    while (days.length < 14) {
      current.setDate(current.getDate() + 1);
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0) { // Skip Sundays
        days.push(new Date(current));
      }
    }
    return days;
  }, []);

  const timeSlots = [
    "10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM", "05:00 PM"
  ];

  // 3. Handlers
  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user || !db) return;
    setLoading(true);

    try {
      const bookingRef = collection(db, 'artifacts', appId, 'public', 'data', 'consultation_bookings');
      await addDoc(bookingRef, {
        userId: user.uid,
        ...formData,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedSlot,
        createdAt: serverTimestamp(),
        status: 'Confirmed'
      });
      setStep(3);
    } catch (err) {
      console.error("Booking Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 selection:bg-primary selection:text-white pb-20">
      {/* Hero Header */}
      <section className="bg-primary text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-md">
              <HardHat className="text-secondary" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-blue-100">Engineering Consultation</span>
          </motion.div>
          <h1 className="text-5xl font-black mb-4 tracking-tighter">Schedule Site Visit</h1>
          <p className="text-xl text-blue-100 max-w-2xl opacity-90">
            Book a face-to-face consultation with our senior engineers for precise span measurements, rail alignment audits, and modernization feasibility studies.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto -mt-10 px-4">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Main Booking Interface */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-8 md:p-12">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-3">
                        <Calendar className="text-primary" /> Select Date & Time
                      </h2>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 mb-10">
                        {daysInMonth.map((date, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedDate(date)}
                            className={`p-3 rounded-2xl border-2 flex flex-col items-center transition-all ${
                              selectedDate?.toDateString() === date.toDateString()
                              ? 'border-primary bg-primary/5 text-primary'
                              : 'border-gray-100 dark:border-gray-700 hover:border-gray-200'
                            }`}
                          >
                            <span className="text-[10px] uppercase font-black opacity-50">
                              {date.toLocaleDateString('en-US', { weekday: 'short' })}
                            </span>
                            <span className="text-lg font-black">{date.getDate()}</span>
                            <span className="text-[10px] uppercase font-black opacity-50">
                              {date.toLocaleDateString('en-US', { month: 'short' })}
                            </span>
                          </button>
                        ))}
                      </div>

                      <div className="space-y-4 mb-10">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Available Slots (IST)</label>
                        <div className="flex flex-wrap gap-3">
                          {timeSlots.map((slot) => (
                            <button
                              key={slot}
                              onClick={() => setSelectedSlot(slot)}
                              className={`px-6 py-3 rounded-xl font-bold transition-all border-2 ${
                                selectedSlot === slot
                                ? 'bg-primary border-primary text-white shadow-lg'
                                : 'bg-gray-50 dark:bg-gray-900 border-transparent text-gray-500'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        disabled={!selectedDate || !selectedSlot}
                        onClick={() => setStep(2)}
                        className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale"
                      >
                        Confirm Schedule <ChevronRight />
                      </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <button onClick={() => setStep(1)} className="mb-6 flex items-center gap-2 text-primary font-bold hover:underline">
                        <ChevronLeft size={20} /> Change Schedule
                      </button>
                      
                      <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Professional Details</h2>
                      
                      <form onSubmit={handleBooking} className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <User size={14} /> Full Name
                          </label>
                          <input
                            required
                            type="text"
                            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 p-4 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <Building2 size={14} /> Company
                          </label>
                          <input
                            required
                            type="text"
                            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 p-4 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
                            value={formData.company}
                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <MapPin size={14} /> Site Address (For Inspection)
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="Complete Industrial Area / Unit Address"
                            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 p-4 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
                            value={formData.siteAddress}
                            onChange={(e) => setFormData({...formData, siteAddress: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <Phone size={14} /> Contact Number
                          </label>
                          <input
                            required
                            type="tel"
                            placeholder="+91"
                            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 p-4 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <Briefcase size={14} /> Purpose
                          </label>
                          <select
                            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 p-4 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
                            value={formData.reason}
                            onChange={(e) => setFormData({...formData, reason: e.target.value})}
                          >
                            <option>Site Inspection</option>
                            <option>Span Measurement</option>
                            <option>AMC Audit</option>
                            <option>Modernization Consultation</option>
                          </select>
                        </div>
                        
                        <button
                          type="submit"
                          disabled={loading}
                          className="md:col-span-2 mt-4 bg-primary text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-70"
                        >
                          {loading ? <Loader2 className="animate-spin" /> : 'BOOK SITE VISIT'}
                        </button>
                      </form>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-500/30">
                        <CheckCircle2 size={48} className="text-white" />
                      </div>
                      <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Visit Confirmed!</h2>
                      <p className="text-gray-500 mb-10 max-w-sm mx-auto">
                        Your engineering consultation is booked for <strong>{selectedDate.toLocaleDateString()}</strong> at <strong>{selectedSlot}</strong>. 
                        A confirmation SMS has been sent to your mobile.
                      </p>
                      <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/" className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700">Go to Home</Link>
                        <Link to="/dashboard" className="border border-primary text-primary px-8 py-4 rounded-2xl font-bold hover:bg-gray-50">Track Visit</Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Sidebar Guidelines */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ShieldCheck className="text-primary" /> Booking Rules
              </h3>
              <ul className="space-y-4">
                {[
                  "Site must be accessible for inspection",
                  "Electrical power (DSL/Main) is helpful but not mandatory",
                  "At least one site engineer must be present",
                  "Confirmations are subject to route availability"
                ].map((rule, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden">
              <h3 className="text-xl font-bold mb-4 relative z-10">Emergency Audit?</h3>
              <p className="text-sm text-gray-400 mb-6 relative z-10">
                If your crane has already failed or is in a critical breakdown state, do not book a regular consultation.
              </p>
              <Link to="/breakdown" className="relative z-10 text-secondary font-black flex items-center gap-2 hover:gap-4 transition-all">
                GO TO BREAKDOWN PORTAL <ChevronRight size={18} />
              </Link>
              <Clock className="absolute -right-4 -bottom-4 opacity-10" size={160} />
            </div>
          </div>
        </div>

        {/* Quick Links Footer */}
        <div className="mt-20 pt-10 border-t border-gray-200 dark:border-gray-800 flex flex-wrap gap-4 justify-center">
          <Link to="/quote" className="text-sm font-bold text-gray-500 hover:text-primary transition-colors">Request Quote</Link>
          <span className="text-gray-200">|</span>
          <Link to="/contact" className="text-sm font-bold text-gray-500 hover:text-primary transition-colors">Support Center</Link>
          <span className="text-gray-200">|</span>
          <Link to="/services" className="text-sm font-bold text-gray-500 hover:text-primary transition-colors">Our Services</Link>
        </div>
      </div>
    </div>
  );
}