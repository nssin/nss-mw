import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClipboardList, 
  Send, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Settings, 
  CheckCircle2, 
  AlertCircle,
  Construction,
  Wrench,
  Zap,
  Loader2
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

/**
 * RFQ (Request for Quotation) Component
 * Logic: Integrated with Firestore for real-time lead capture.
 * UI: Multi-category industrial form with state-driven feedback.
 */

// Firebase Configuration (Environment-driven)
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const appId = typeof __app_id !== 'undefined' ? __app_id : 'naidu-solutions-rfq';

export default function RFQ() {
  const [formState, setFormState] = useState('idle'); // idle | submitting | success | error
  const [db, setDb] = useState(null);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    projectCategory: 'Crane Solutions',
    requirements: '',
    capacity: '',
    urgency: 'Standard'
  });

  useEffect(() => {
    const initFirebase = async () => {
      try {
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const firestore = getFirestore(app);
        await signInAnonymously(auth);
        setDb(firestore);
      } catch (err) {
        console.error("Database connection failed:", err);
      }
    };
    initFirebase();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!db) return;
    
    setFormState('submitting');
    
    try {
      const rfqRef = collection(db, 'artifacts', appId, 'public', 'data', 'rfqs');
      await addDoc(rfqRef, {
        ...formData,
        submittedAt: serverTimestamp(),
        status: 'New',
        source: 'Web Platform RFQ'
      });
      setFormState('success');
    } catch (err) {
      console.error("Submission error:", err);
      setFormState('error');
    }
  };

  const categories = [
    { id: 'crane', label: 'Crane Solutions', icon: Construction },
    { id: 'maintenance', label: 'Maintenance & AMC', icon: Wrench },
    { id: 'automation', label: 'Industrial Automation', icon: Zap },
    { id: 'custom', label: 'Custom Engineering', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4 border border-primary/20"
          >
            <ClipboardList size={18} className="text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Procurement Portal</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
            Request for Quotation
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Provide your project specifications below. Our engineering team will review your requirements and provide a technical-commercial proposal within 24-48 hours.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {formState === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 p-12 rounded-[2.5rem] shadow-2xl border border-green-100 dark:border-green-900/30 text-center"
            >
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
                <CheckCircle2 size={40} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">RFQ Submitted Successfully</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                Thank you for choosing Naidu Solutions. Your RFQ ID is <span className="font-mono font-bold text-primary">NS-{Math.floor(Math.random() * 90000) + 10000}</span>. A confirmation email has been sent to {formData.email}.
              </p>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => setFormState('idle')} 
                  className="px-8 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                >
                  Submit Another
                </button>
                <Link to="/" className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-primary/20">
                  Return Home
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-700"
            >
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                {/* Company & Contact */}
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                      <Building2 size={14} /> Company Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Reliance Industries"
                      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:text-white"
                      value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                      <User size={14} /> Contact Person
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:text-white"
                      value={formData.contactName}
                      onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                      <Mail size={14} /> Official Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:text-white"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                      <Phone size={14} /> Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:text-white"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Category Selector */}
              <div className="mb-10">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-4">Project Category</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFormData({...formData, projectCategory: cat.label})}
                      className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                        formData.projectCategory === cat.label
                        ? 'border-primary bg-primary/5 text-primary scale-105 shadow-md'
                        : 'border-gray-100 dark:border-gray-700 hover:border-gray-200 text-gray-500'
                      }`}
                    >
                      <cat.icon size={24} />
                      <span className="text-[10px] font-bold text-center">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Requirements & Capacity */}
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="md:col-span-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Project Description</label>
                  <textarea
                    required
                    placeholder="Briefly describe your requirements..."
                    rows="4"
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:text-white"
                    value={formData.requirements}
                    onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                  />
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Capacity (Tons)</label>
                    <input
                      type="text"
                      placeholder="e.g. 10T"
                      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:text-white"
                      value={formData.capacity}
                      onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Urgency</label>
                    <select
                      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all dark:text-white"
                      value={formData.urgency}
                      onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                    >
                      <option>Immediate (1-2 weeks)</option>
                      <option>Standard (1-2 months)</option>
                      <option>Planning Stage</option>
                    </select>
                  </div>
                </div>
              </div>

              {formState === 'error' && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded flex items-center gap-3 text-red-700 dark:text-red-300">
                  <AlertCircle size={20} />
                  <p className="text-sm">Something went wrong. Please check your connection and try again.</p>
                </div>
              )}

              <button
                type="submit"
                disabled={formState === 'submitting'}
                className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {formState === 'submitting' ? (
                  <>
                    <Loader2 className="animate-spin" />
                    PROCESSING RFQ...
                  </>
                ) : (
                  <>
                    SUBMIT REQUEST <Send size={20} />
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Footer Support Actions */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <Phone className="text-primary" size={20} />
            </div>
            <div>
              <p className="text-sm font-bold dark:text-white">Call Sales Team</p>
              <p className="text-xs text-gray-500">+91 1800-NAIDU-RFQ</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Link to="/contact" className="text-sm font-bold text-gray-500 hover:text-primary transition-colors">
              Technical Support
            </Link>
            <Link to="/services" className="text-sm font-bold text-gray-500 hover:text-primary transition-colors">
              Service Catalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}