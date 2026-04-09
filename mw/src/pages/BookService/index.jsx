import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wrench, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Loader2, 
  ShieldCheck, 
  AlertTriangle,
  ClipboardCheck,
  User,
  Phone,
  Settings,
  HardHat
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';

/**
 * BookService Component
 * Features:
 * - Real-time Availability Logic: Queries Firestore to disable booked slots.
 * - Dynamic Service Selection: Preventive, Breakdown, Audit, or AMC.
 * - Multi-step Industrial Workflow: Selection -> Availability -> Details -> Confirmation.
 */

const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const appId = typeof __app_id !== 'undefined' ? __app_id : 'naidu-solutions-service';

const SERVICE_TYPES = [
  { id: 'preventive', label: 'Preventive Maintenance', icon: ShieldCheck, desc: 'Routine health check & lubrication per IS standards.' },
  { id: 'breakdown', label: 'Breakdown Repair', icon: AlertTriangle, desc: 'Emergency response for active equipment failure.' },
  { id: 'audit', label: 'Safety Audit', icon: ClipboardCheck, desc: 'Third-party certification & deflection testing.' },
  { id: 'amc', label: 'AMC Scheduled Visit', icon: Settings, desc: 'Regular visit under Annual Maintenance Contract.' }
];

const TIME_SLOTS = ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"];

export default function BookService() {
  const [db, setDb] = useState(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);
  
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    unitId: '',
    description: ''
  });

  // 1. Initialize Firebase
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    setDb(firestore);

    signInAnonymously(auth).catch(err => console.error("Auth Error", err));
  }, []);

  // 2. Availability Logic: Fetch booked slots for selected date
  useEffect(() => {
    if (!selectedDate || !db) return;

    const checkAvailability = async () => {
      setCheckingAvailability(true);
      const dateStr = selectedDate.toISOString().split('T')[0];
      const serviceRef = collection(db, 'artifacts', appId, 'public', 'data', 'service_bookings');
      const q = query(serviceRef, where("date", "==", dateStr));
      
      try {
        const querySnapshot = await getDocs(q);
        const booked = querySnapshot.docs.map(doc => doc.data().time);
        setBookedSlots(booked);
      } catch (err) {
        console.error("Availability Check Failed", err);
      } finally {
        setCheckingAvailability(false);
      }
    };

    checkAvailability();
  }, [selectedDate, db]);

  // 3. Generate Business Days (Next 14 Days, Exclude Sundays)
  const businessDays = useMemo(() => {
    const days = [];
    let current = new Date();
    while (days.length < 14) {
      current.setDate(current.getDate() + 1);
      if (current.getDay() !== 0) days.push(new Date(current));
    }
    return days;
  }, []);

  const handleFinalBooking = async (e) => {
    e.preventDefault();
    if (!db) return;
    setLoading(true);

    try {
      const serviceRef = collection(db, 'artifacts', appId, 'public', 'data', 'service_bookings');
      await addDoc(serviceRef, {
        ...formData,
        serviceType: selectedService.label,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedSlot,
        createdAt: serverTimestamp(),
        status: 'Confirmed'
      });
      setStep(4);
    } catch (err) {
      console.error("Booking Error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 pb-20">
      {/* Dynamic Progress Header */}
      <section className="bg-primary text-white py-12 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tighter">Maintenance Booking</h1>
            <p className="text-blue-100 mt-2">Engineer Dispatch Management System v2.0</p>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <div 
                key={i} 
                className={`w-12 h-2 rounded-full transition-all duration-500 ${step >= i ? 'bg-secondary' : 'bg-white/20'}`} 
              />
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto mt-12 px-4">
        <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-2xl overflow-hidden min-h-[500px]">
          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {/* Step 1: Service Type */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-3">
                    <Wrench className="text-primary" /> Select Service Category
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4 mb-10">
                    {SERVICE_TYPES.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedService(type)}
                        className={`p-6 rounded-3xl border-2 text-left transition-all ${
                          selectedService?.id === type.id 
                          ? 'border-primary bg-primary/5 shadow-lg scale-[1.02]' 
                          : 'border-gray-100 dark:border-gray-700 hover:border-gray-200'
                        }`}
                      >
                        <type.icon className={selectedService?.id === type.id ? 'text-primary' : 'text-gray-400'} size={28} />
                        <h3 className="text-lg font-bold mt-4 dark:text-white">{type.label}</h3>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{type.desc}</p>
                      </button>
                    ))}
                  </div>
                  <button
                    disabled={!selectedService}
                    onClick={() => setStep(2)}
                    className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    Check Availability <ChevronRight />
                  </button>
                </motion.div>
              )}

              {/* Step 2: Date & Availability Logic */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <button onClick={() => setStep(1)} className="mb-6 flex items-center gap-2 text-primary font-bold">
                    <ChevronLeft size={20} /> Change Service
                  </button>
                  <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Engineer Dispatch Slot</h2>
                  
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-10">
                    {businessDays.map((date, i) => (
                      <button
                        key={i}
                        onClick={() => {setSelectedDate(date); setSelectedSlot(null);}}
                        className={`p-2 rounded-xl border-2 flex flex-col items-center transition-all ${
                          selectedDate?.toDateString() === date.toDateString()
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-gray-100 dark:border-gray-700 hover:border-gray-200'
                        }`}
                      >
                        <span className="text-[10px] uppercase font-bold">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <span className="text-lg font-black">{date.getDate()}</span>
                      </button>
                    ))}
                  </div>

                  {selectedDate && (
                    <div className="space-y-4">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Available Times for {selectedDate.toLocaleDateString()}</label>
                      {checkingAvailability ? (
                        <div className="flex items-center gap-3 text-primary animate-pulse py-4">
                          <Loader2 className="animate-spin" /> Syncing with Fleet DB...
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {TIME_SLOTS.map(slot => {
                            const isBooked = bookedSlots.includes(slot);
                            return (
                              <button
                                key={slot}
                                disabled={isBooked}
                                onClick={() => setSelectedSlot(slot)}
                                className={`py-4 rounded-xl font-bold transition-all border-2 ${
                                  isBooked ? 'bg-gray-100 text-gray-300 cursor-not-allowed border-transparent line-through' :
                                  selectedSlot === slot ? 'bg-primary border-primary text-white' : 'bg-gray-50 dark:bg-gray-900 border-transparent text-gray-500'
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    disabled={!selectedSlot}
                    onClick={() => setStep(3)}
                    className="w-full mt-10 bg-primary text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl disabled:opacity-50"
                  >
                    Confirm Personnel Details <ChevronRight />
                  </button>
                </motion.div>
              )}

              {/* Step 3: Contact Details */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <button onClick={() => setStep(2)} className="mb-6 flex items-center gap-2 text-primary font-bold">
                    <ChevronLeft size={20} /> Back to Slots
                  </button>
                  <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Unit & Contact Information</h2>
                  
                  <form onSubmit={handleFinalBooking} className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><User size={14}/> Full Name</label>
                      <input required className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 p-4 rounded-xl dark:text-white focus:ring-2 focus:ring-primary outline-none" 
                             onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><Phone size={14}/> Phone Number</label>
                      <input required type="tel" className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 p-4 rounded-xl dark:text-white focus:ring-2 focus:ring-primary outline-none" 
                             onChange={e => setFormData({...formData, phone: e.target.value})} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><Settings size={14}/> Machine ID / Serial No.</label>
                      <input required placeholder="e.g. NS-EOT-2024-001" className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 p-4 rounded-xl dark:text-white focus:ring-2 focus:ring-primary outline-none" 
                             onChange={e => setFormData({...formData, unitId: e.target.value})} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Problem Description / Special Instructions</label>
                      <textarea rows="4" className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 p-4 rounded-xl dark:text-white focus:ring-2 focus:ring-primary outline-none" 
                                onChange={e => setFormData({...formData, description: e.target.value})} />
                    </div>
                    
                    <button type="submit" disabled={loading} className="md:col-span-2 bg-primary text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-70">
                      {loading ? <Loader2 className="animate-spin" /> : 'CONFIRM MAINTENANCE DISPATCH'}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Step 4: Success */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-500/30">
                    <CheckCircle2 size={48} className="text-white" />
                  </div>
                  <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Service Booked!</h2>
                  <p className="text-gray-500 mb-10 max-w-sm mx-auto">
                    Engineer dispatch confirmed for <strong>{selectedDate.toLocaleDateString()}</strong> at <strong>{selectedSlot}</strong>. 
                    Reference ID: <span className="text-primary font-mono font-bold">NS-SVC-{Math.floor(Math.random()*90000)+10000}</span>
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/" className="bg-primary text-white px-10 py-4 rounded-2xl font-bold shadow-lg">Return Home</Link>
                    <Link to="/dashboard" className="border border-primary text-primary px-10 py-4 rounded-2xl font-bold">Track Status</Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Support Sidebar Info */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <HardHat className="text-secondary" /> Expert Dispatch
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              All Naidu Solutions service engineers are Level-2 certified and carry calibrated diagnostic equipment for on-site health assessments.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <ShieldCheck className="text-primary" /> Safety Assured
            </h3>
            <p className="text-sm text-gray-500">Every service visit includes a mandatory IS-compliant safety inspection of wire ropes and brakes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}