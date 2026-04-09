import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History, 
  FileText, 
  Download, 
  Search, 
  Filter, 
  Calendar, 
  Wrench, 
  CheckCircle2, 
  AlertCircle, 
  Clock,
  Loader2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, query, orderBy } from 'firebase/firestore';

/**
 * ServiceHistory Component
 * Logic: Real-time retrieval of maintenance logs from Firestore.
 * Data Path: /artifacts/{appId}/users/{userId}/service_history
 * Features: Interactive filtering, report downloads, and status tracking.
 */

// Global configuration provided by the environment
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const appId = typeof __app_id !== 'undefined' ? __app_id : 'naidu-solutions-history';

export default function ServiceHistory() {
  const [user, setUser] = useState(null);
  const [db, setDb] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // 1. Initialize Firebase & Auth
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    setDb(firestore);

    const initAuth = async () => {
      try {
        await signInAnonymously(auth);
      } catch (err) {
        console.error("Auth Error:", err);
      }
    };
    initAuth();

    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  // 2. Real-time Log Retrieval
  useEffect(() => {
    if (!user || !db) return;

    // RULE 1 & 2: Specific path and simple query
    const logsRef = collection(db, 'artifacts', appId, 'users', user.uid, 'service_history');
    const q = query(logsRef); // Note: Simple query to avoid index requirement errors

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const historyData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort in memory as per Rule 2
      historyData.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds);
      setLogs(historyData);
      setLoading(false);
    }, (err) => {
      console.error("Firestore Fetch Error:", err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, db]);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.unitId?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         log.serviceType?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || log.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-gray-500 font-bold">Retrieving Maintenance Archives...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 transition-colors duration-300">
      {/* Page Header */}
      <section className="bg-primary py-16 px-4 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-4"
          >
            <History className="text-secondary" size={20} />
            <span className="text-xs font-black uppercase tracking-widest opacity-80">Audit Trail & Logs</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter">Past Service History</h1>
          <p className="text-blue-100 mt-2 max-w-2xl">
            Access your comprehensive equipment service logs, inspection reports, and safety certificates. Verified records for industrial compliance.
          </p>
        </div>
        <History size={300} className="absolute right-0 bottom-0 opacity-5 translate-x-1/4 translate-y-1/4" />
      </section>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        {/* Filter Bar */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-grow relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search by Unit ID or Service Type..."
              className="w-full bg-gray-50 dark:bg-gray-900 border-none pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-primary outline-none text-sm dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {['All', 'Completed', 'Pending'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                  filterStatus === status 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* History Table/List */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900/50">
                  <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Date & Unit</th>
                  <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Service Type</th>
                  <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Engineer</th>
                  <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Reports</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                <AnimatePresence>
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-20 text-center">
                        <AlertCircle className="mx-auto text-gray-300 mb-4" size={48} />
                        <p className="text-gray-500 font-bold">No maintenance logs found matching your criteria.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((log, index) => (
                      <motion.tr 
                        key={log.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors"
                      >
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 text-primary rounded-xl">
                              <Calendar size={20} />
                            </div>
                            <div>
                              <p className="font-black text-gray-900 dark:text-white">
                                {log.timestamp?.toDate ? log.timestamp.toDate().toLocaleDateString() : 'N/A'}
                              </p>
                              <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Unit: {log.unitId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{log.serviceType}</p>
                        </td>
                        <td className="p-6">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                              <Wrench size={12} className="text-gray-500" />
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{log.engineerName}</span>
                          </div>
                        </td>
                        <td className="p-6">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            log.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {log.status === 'Completed' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                            {log.status}
                          </span>
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex justify-end gap-2">
                            <button className="p-2 text-gray-400 hover:text-primary transition-colors hover:bg-primary/5 rounded-lg" title="View PDF">
                              <FileText size={18} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-primary transition-colors hover:bg-primary/5 rounded-lg" title="Download Report">
                              <Download size={18} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

        {/* Global Action Footer */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-lg flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center shrink-0">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold dark:text-white mb-1">Safety Audit Coming Up?</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">Your next mandatory structural audit is due in 45 days. Schedule now to maintain compliance.</p>
              <Link to="/book-service" className="text-primary font-black text-sm flex items-center gap-1 hover:underline">
                Book Audit Now <ChevronRight size={14} />
              </Link>
            </div>
          </div>
          <div className="bg-gray-900 p-8 rounded-3xl text-white shadow-lg flex items-center gap-6">
            <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center shrink-0">
              <Clock size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">24/7 Breakdown History</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">View past emergency intervention logs and root cause analysis reports for your fleet.</p>
              <Link to="/breakdown" className="text-secondary font-black text-sm flex items-center gap-1 hover:underline">
                View Emergency Logs <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}