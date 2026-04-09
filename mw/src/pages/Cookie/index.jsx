import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Settings, 
  BarChart3, 
  Target, 
  Info, 
  CheckCircle2, 
  XCircle,
  Clock,
  Lock,
  ArrowRight,
  Database
} from 'lucide-react';

/**
 * Cookie Policy & Consent Management Component
 * Logic: State-driven interactive toggles for cookie categories.
 * Content: Real-world industrial platform cookie classifications (Essential, Analytics, Functional, Marketing).
 */

const COOKIE_CATEGORIES = [
  {
    id: 'essential',
    title: 'Strictly Necessary Cookies',
    description: 'Essential for the website to function. They handle authentication, security, and the industrial configurator logic. Cannot be disabled.',
    icon: Lock,
    required: true,
    cookies: [
      { name: 'naidu_session', purpose: 'Identifies active user session for quote generation.', expiry: 'Session' },
      { name: 'XSRF-TOKEN', purpose: 'Prevents Cross-Site Request Forgery for form security.', expiry: '2 Hours' }
    ]
  },
  {
    id: 'analytics',
    title: 'Performance & Analytics',
    description: 'Help us understand how visitors interact with our crane catalog and service modules to improve the platform engineering.',
    icon: BarChart3,
    required: false,
    cookies: [
      { name: '_ga', purpose: 'Google Analytics identifier for site usage tracking.', expiry: '2 Years' },
      { name: '_gid', purpose: 'Used to group user behavior for plant audit reports.', expiry: '24 Hours' }
    ]
  },
  {
    id: 'functional',
    title: 'Functional Preferences',
    description: 'Enable enhanced features like remembering your language (Hindi/Marathi) and project tracking preferences.',
    icon: Settings,
    required: false,
    cookies: [
      { name: 'i18next', purpose: 'Stores your preferred language setting.', expiry: '1 Year' },
      { name: 'theme_mode', purpose: 'Stores Light/Dark mode preference.', expiry: 'Persistent' }
    ]
  },
  {
    id: 'marketing',
    title: 'Marketing & Targetting',
    description: 'Used to provide relevant engineering insights and service updates based on your industrial sector.',
    icon: Target,
    required: false,
    cookies: [
      { name: '_fbp', purpose: 'Facebook pixel used for technical service retargeting.', expiry: '3 Months' }
    ]
  }
];

export default function Cookie() {
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    functional: false,
    marketing: false
  });
  const [saveStatus, setSaveStatus] = useState('idle'); // idle | saving | success

  const togglePreference = (id) => {
    if (id === 'essential') return;
    setPreferences(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = () => {
    setSaveStatus('saving');
    // Logic: In a real-world scenario, this triggers the CMP (Consent Management Provider)
    setTimeout(() => {
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 800000000); // High precision simulation skip; using standard timeout for UI feedback
    
    // Immediate execution for real code logic
    setTimeout(() => setSaveStatus('success'), 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-500 pb-20">
      {/* Header Section */}
      <section className="bg-primary py-20 px-4 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-6"
          >
            <ShieldCheck className="text-secondary" size={24} />
            <span className="text-xs font-black uppercase tracking-widest text-blue-100">Data Sovereignty & Privacy</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
            Cookie <br />Transparency.
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl opacity-90 leading-relaxed">
            Naidu Solutions utilizes cookies to optimize industrial configuration workflows and ensure the security of your technical data. Manage your preferences below.
          </p>
        </div>
        <Database size={400} className="absolute right-0 bottom-0 opacity-5 translate-x-1/4 translate-y-1/4" />
      </section>

      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Main Content & Tables */}
          <div className="lg:col-span-8 space-y-12">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">How We Use Cookies</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Cookies are small text files that are stored on your device when you visit the Naidu Solutions platform. They help us provide a seamless experience, especially when using the <strong>Crane Configurator</strong> or <strong>Project Tracking</strong> dashboard.
              </p>
            </div>

            {/* Cookie Classification Detailed List */}
            <div className="space-y-6">
              {COOKIE_CATEGORIES.map((category) => (
                <motion.div 
                  key={category.id}
                  layout
                  className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden"
                >
                  <div className="p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                      <div className="flex items-center gap-4">
                        <div className="p-4 bg-primary/10 text-primary rounded-2xl">
                          <category.icon size={28} />
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-gray-900 dark:text-white">{category.title}</h3>
                          <p className="text-sm text-gray-500 font-medium">{category.required ? 'Strictly Required' : 'Optional Optimization'}</p>
                        </div>
                      </div>
                      
                      <button
                        disabled={category.required}
                        onClick={() => togglePreference(category.id)}
                        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${
                          preferences[category.id] ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-800'
                        } ${category.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <span
                          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                            preferences[category.id] ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                      {category.description}
                    </p>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-gray-50 dark:border-gray-800">
                            <th className="pb-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Cookie Name</th>
                            <th className="pb-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Purpose</th>
                            <th className="pb-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Expiry</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                          {category.cookies.map((cookie, idx) => (
                            <tr key={idx} className="group">
                              <td className="py-4 text-sm font-bold font-mono text-primary dark:text-blue-400">{cookie.name}</td>
                              <td className="py-4 text-sm text-gray-600 dark:text-gray-500">{cookie.purpose}</td>
                              <td className="py-4 text-sm font-bold text-gray-900 dark:text-white">{cookie.expiry}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sticky Consent Manager Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl">
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Clock size={20} className="text-primary" />
                  Consent Manager
                </h3>
                
                <div className="space-y-4 mb-8">
                  {Object.entries(preferences).map(([key, val]) => (
                    <div key={key} className="flex justify-between items-center px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <span className="text-xs font-bold uppercase text-gray-500">{key}</span>
                      {val ? <CheckCircle2 size={16} className="text-green-500" /> : <XCircle size={16} className="text-gray-300" />}
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleSave}
                  disabled={saveStatus === 'saving'}
                  className="w-full bg-primary text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {saveStatus === 'saving' ? 'UPDATING...' : 'SAVE PREFERENCES'}
                </button>

                <AnimatePresence>
                  {saveStatus === 'success' && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 text-center text-xs font-bold text-green-500"
                    >
                      Preferences updated successfully.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden group">
                <h4 className="text-lg font-bold mb-2 relative z-10">Privacy Hub</h4>
                <p className="text-xs text-gray-400 mb-6 relative z-10 leading-relaxed">
                  For detailed information on how we handle your personal data, please review our full policy.
                </p>
                <Link to="/privacy-policy" className="relative z-10 text-primary font-black text-xs flex items-center gap-2 hover:gap-4 transition-all">
                  VIEW PRIVACY POLICY <ArrowRight size={14} />
                </Link>
                <Info size={120} className="absolute -right-8 -bottom-8 opacity-10 group-hover:rotate-12 transition-transform duration-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="mt-20 pt-10 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-4 justify-center">
          <Link to="/quote" className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg">Get Quote</Link>
          <Link to="/contact" className="border border-primary text-primary dark:text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">Contact Support</Link>
        </div>
      </div>
    </div>
  );
}