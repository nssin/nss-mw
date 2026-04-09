import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  initializeProjectTracking, 
  getFirestore, 
  collection, 
  onSnapshot, 
  query 
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { 
  Activity, 
  Package, 
  Truck, 
  Construction, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  AlertCircle,
  Loader2,
  Settings,
  FileText
} from 'lucide-react';

/**
 * MyProjects Component
 * Logic: Real-time synchronization with Firestore.
 * Data Path: /artifacts/{appId}/users/{userId}/projects
 * Features: Progress tracking, milestone validation, and technical status mapping.
 */

// Global configuration provided by the environment
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const appId = typeof __app_id !== 'undefined' ? __app_id : 'naidu-solutions-tracking';

export default function MyProjects() {
  const [user, setUser] = useState(null);
  const [db, setDb] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Initialize Firebase Auth
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    setDb(firestore);

    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          // In a real environment, this token would be used
          // await signInWithCustomToken(auth, __initial_auth_token);
          await signInAnonymously(auth); 
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) {
        console.error("Auth initialization failed:", err);
        setError("Authentication failure. Please refresh.");
      }
    };

    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  // 2. Real-time Project Fetching
  useEffect(() => {
    if (!user || !db) return;

    // RULE 1: Specific path for private user data
    const projectsRef = collection(db, 'artifacts', appId, 'users', user.uid, 'projects');
    
    // RULE 2: Simple query to avoid index requirements
    const q = query(projectsRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectsData);
      setLoading(false);
    }, (err) => {
      console.error("Firestore Error:", err);
      setError("Unable to retrieve live project data.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, db]);

  const getStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'engineering': return <Settings className="text-blue-500" />;
      case 'fabrication': return <Package className="text-amber-500" />;
      case 'dispatch': return <Truck className="text-purple-500" />;
      case 'erection': return <Construction className="text-orange-500" />;
      case 'completed': return <CheckCircle2 className="text-green-500" />;
      default: return <Clock className="text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-gray-500 font-bold animate-pulse">Establishing Secure Connection...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <section className="bg-primary py-16 px-4 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <Activity className="text-secondary" />
            <span className="text-xs font-black uppercase tracking-widest opacity-80">Live Project Dashboard</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter">My Active Projects</h1>
          <p className="text-blue-100 mt-2 max-w-xl">
            Real-time synchronization with our engineering and fabrication floor. Monitor your crane production line.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4">
          <Construction size={400} />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 mt-12">
        {error && (
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center gap-3">
            <AlertCircle />
            <span className="font-bold">{error}</span>
          </div>
        )}

        {projects.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-16 text-center border-2 border-dashed border-gray-200 dark:border-gray-700">
            <Package className="mx-auto text-gray-300 mb-6" size={64} />
            <h2 className="text-2xl font-bold dark:text-white mb-2">No Active Projects Found</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              It seems you don't have any ongoing installations. Start a new project to track its progress here.
            </p>
            <Link to="/quote" className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all inline-flex items-center gap-2">
              Start New Project <ChevronRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-8">
            <AnimatePresence>
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all"
                >
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-inner">
                        {getStatusIcon(project.currentPhase)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-2xl font-black text-gray-900 dark:text-white">{project.name || 'Untitled Project'}</h3>
                          <span className="text-[10px] font-black bg-primary/10 text-primary px-2 py-0.5 rounded uppercase">
                            #{project.id.slice(-6).toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 font-bold">{project.type || 'Crane Installation'}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-4xl font-black text-primary">{project.progress || 0}%</span>
                      <span className="text-xs font-black text-gray-400 uppercase">Total Completion</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full mb-10 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress || 0}%` }}
                      className="h-full bg-primary rounded-full relative"
                    >
                      <div className="absolute top-0 right-0 w-12 h-full bg-white/20 animate-pulse" />
                    </motion.div>
                  </div>

                  {/* Milestone Tracking */}
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {[
                      { label: 'Engineering', icon: Settings },
                      { label: 'Fabrication', icon: Package },
                      { label: 'QA Check', icon: CheckCircle2 },
                      { label: 'Dispatch', icon: Truck },
                      { label: 'Erection', icon: Construction }
                    ].map((step, idx) => {
                      const isDone = project.completedSteps?.includes(step.label);
                      const isCurrent = project.currentPhase === step.label;
                      
                      return (
                        <div key={idx} className={`p-4 rounded-2xl border-2 transition-all ${
                          isDone ? 'bg-green-50 border-green-500/20 text-green-700' :
                          isCurrent ? 'bg-primary/5 border-primary text-primary animate-pulse' :
                          'bg-gray-50 border-transparent text-gray-400 opacity-60'
                        }`}>
                          <step.icon size={20} className="mb-2" />
                          <p className="text-[10px] font-black uppercase tracking-tighter">{step.label}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <div className="flex gap-4">
                      <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-primary transition-colors">
                        <FileText size={16} /> Technical Drawings
                      </button>
                      <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-primary transition-colors">
                        <Activity size={16} /> Inspection Reports
                      </button>
                    </div>
                    <Link to="/contact" className="text-sm font-black text-primary hover:underline flex items-center gap-1">
                      Contact Project Manager <ChevronRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        <div className="mt-16 bg-gray-900 p-12 rounded-[3rem] text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-2">Technical Discrepancy?</h3>
            <p className="text-gray-400">If you notice any delays or data mismatches in your tracking, please notify our floor supervisor.</p>
          </div>
          <Link to="/contact" className="relative z-10 bg-white text-gray-900 px-10 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all flex items-center gap-2">
            Speak to Engineering <ChevronRight size={20} />
          </Link>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>
      </div>
    </div>
  );
}