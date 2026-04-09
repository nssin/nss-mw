import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { auth, db } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { 
  Package, 
  Truck, 
  Settings2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Factory, 
  HardHat, 
  Loader2, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export default function MyProjects() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 1. Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/login');
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // 2. Real-time Firestore Subscription (Strict Logic)
  useEffect(() => {
    if (!user) return;

    // We query the 'projects' collection strictly for the current client's ID
    const projectsRef = collection(db, 'projects');
    const q = query(
      projectsRef, 
      where('clientId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Sorting manually in memory to avoid requiring complex Firestore indexes initially
      const sorted = projectsData.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds);
      
      setProjects(sorted);
      setLoading(false);
    }, (error) => {
      console.error("Firestore Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Status mapping for visual timeline
  const getStatusStep = (status) => {
    const steps = ['Design', 'Fabrication', 'Assembly', 'Load Testing', 'Dispatched', 'Installation'];
    return steps.indexOf(status);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-gray-500 font-medium tracking-tight">Syncing with manufacturing database...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 dark:bg-dark min-h-screen transition-colors duration-300 pb-20">
      
      {/* HEADER */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 pt-12 pb-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">My Live Projects</h1>
            <p className="text-gray-500 dark:text-gray-400">Track your EOT crane manufacturing and site installation in real-time.</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-lg border border-blue-100 dark:border-blue-800">
             <span className="text-sm font-bold text-primary dark:text-secondary">Active Contracts: {projects.length}</span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {projects.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-white dark:bg-gray-800 p-16 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-center"
            >
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Active Projects Found</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">You currently don't have any cranes in the manufacturing pipeline. Start a new requirement today.</p>
              <Link to="/quote" className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors">
                 Get Instant Quote <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
          ) : (
            <div className="grid gap-8">
              {projects.map((project, index) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
                >
                  {/* Project Summary Bar */}
                  <div className="p-6 md:p-8 border-b border-gray-50 dark:border-gray-700/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-primary/10 text-primary dark:text-secondary dark:bg-secondary/10 px-3 py-1 rounded text-xs font-black uppercase tracking-widest">
                          ID: {project.id.slice(0, 8).toUpperCase()}
                        </span>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{project.projectName || 'EOT Crane Installation'}</h2>
                      </div>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center"><Settings2 className="w-4 h-4 mr-1.5" /> {project.craneType || 'EOT Crane'}</span>
                        <span className="flex items-center"><Activity className="w-4 h-4 mr-1.5" /> {project.capacity} MT | {project.span} Meters</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                       <span className="text-sm font-bold text-gray-900 dark:text-white mb-1">Current Status:</span>
                       <div className="flex items-center bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-4 py-1.5 rounded-full border border-green-100 dark:border-green-800">
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          <span className="font-bold uppercase text-xs tracking-wider">{project.status || 'In Progress'}</span>
                       </div>
                    </div>
                  </div>

                  {/* Production Timeline */}
                  <div className="px-8 py-10 bg-gray-50/50 dark:bg-gray-900/20">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-10">Manufacturing Pipeline</h3>
                    <div className="relative">
                      {/* Progress Line */}
                      <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 z-0"></div>
                      <div 
                        className="absolute top-5 left-0 h-0.5 bg-primary dark:bg-secondary z-0 transition-all duration-1000"
                        style={{ width: `${(getStatusStep(project.status) / 5) * 100}%` }}
                      ></div>

                      <div className="relative z-10 flex justify-between">
                        {[
                          { label: 'Design', icon: <PenTool className="w-4 h-4" /> },
                          { label: 'Fabrication', icon: <Factory className="w-4 h-4" /> },
                          { label: 'Assembly', icon: <Settings2 className="w-4 h-4" /> },
                          { label: 'Testing', icon: <Activity className="w-4 h-4" /> },
                          { label: 'Dispatch', icon: <Truck className="w-4 h-4" /> },
                          { label: 'Installation', icon: <HardHat className="w-4 h-4" /> }
                        ].map((step, sIdx) => {
                          const isCompleted = getStatusStep(project.status) >= sIdx;
                          const isCurrent = getStatusStep(project.status) === sIdx;

                          return (
                            <div key={step.label} className="flex flex-col items-center group">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${
                                isCompleted 
                                  ? 'bg-primary dark:bg-secondary border-primary dark:border-secondary text-white dark:text-gray-900 scale-110 shadow-lg' 
                                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400'
                              } ${isCurrent ? 'ring-4 ring-primary/20 dark:ring-secondary/20' : ''}`}>
                                {isCompleted && !isCurrent ? <CheckCircle2 className="w-5 h-5" /> : step.icon}
                              </div>
                              <span className={`mt-3 text-[10px] md:text-xs font-bold uppercase tracking-tighter md:tracking-normal ${
                                isCompleted ? 'text-gray-900 dark:text-white' : 'text-gray-400'
                              }`}>
                                {step.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Project Actions */}
                  <div className="p-6 bg-white dark:bg-gray-800 flex flex-wrap items-center justify-between gap-4">
                     <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 italic">
                        <Clock className="w-3.5 h-3.5 mr-1.5" />
                        Last update: {project.timestamp ? new Date(project.timestamp.seconds * 1000).toLocaleDateString() : 'Syncing...'}
                     </div>
                     <div className="flex gap-3">
                        <Link to={`/dashboard/documents?pid=${project.id}`} className="flex items-center text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                           Drawings & Specs <ExternalLink className="w-4 h-4 ml-1.5" />
                        </Link>
                        <div className="h-4 w-px bg-gray-200 dark:bg-gray-700"></div>
                        <Link to="/contact" className="flex items-center text-sm font-bold text-primary dark:text-secondary">
                           Message Supervisor <ArrowRight className="w-4 h-4 ml-1.5" />
                        </Link>
                     </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* FOOTER CTA */}
      <section className="max-w-3xl mx-auto px-4 mt-8">
        <div className="bg-primary rounded-2xl p-8 text-white text-center shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <AlertCircle className="w-24 h-24" />
           </div>
           <h3 className="text-xl font-bold mb-2">Need a technical site visit?</h3>
           <p className="text-blue-100 text-sm mb-6">Our site engineers can perform a structural audit of your facility runway beams while your crane is in fabrication.</p>
           <Link to="/contact" className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Schedule Site Audit
           </Link>
        </div>
      </section>

    </div>
  );
}

// Minimal missing icon components
function PenTool(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 5 5"/><path d="m11 11 5 5"/>
    </svg>
  );
}

function Activity(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  );
}