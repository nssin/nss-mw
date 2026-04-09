import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { FileText, Tool, Clock, LogOut, Loader2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  
  // Real-time data states (Strictly driven by actual Firestore data)
  const [metrics, setMetrics] = useState({
    projects: 0,
    invoices: 0,
    amc: 0
  });

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/login');
      } else {
        setUser(currentUser);
        setLoadingAuth(false);
      }
    });
    return () => unsubscribeAuth();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    // Real-time Firestore subscriptions (Strictly actual data, no mock arrays)
    const projectsRef = collection(db, 'projects');
    const qProjects = query(projectsRef, where('clientId', '==', user.uid));
    const unsubProjects = onSnapshot(qProjects, (snapshot) => {
      setMetrics(prev => ({ ...prev, projects: snapshot.size }));
    });

    const invoicesRef = collection(db, 'invoices');
    const qInvoices = query(invoicesRef, where('clientId', '==', user.uid));
    const unsubInvoices = onSnapshot(qInvoices, (snapshot) => {
      setMetrics(prev => ({ ...prev, invoices: snapshot.size }));
    });

    const amcRef = collection(db, 'amc');
    const qAmc = query(amcRef, where('clientId', '==', user.uid));
    const unsubAmc = onSnapshot(qAmc, (snapshot) => {
      setMetrics(prev => ({ ...prev, amc: snapshot.size }));
    });

    return () => {
      unsubProjects();
      unsubInvoices();
      unsubAmc();
    };
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loadingAuth) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-dark">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 dark:bg-dark py-12 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Client Portal</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Signed in as <span className="font-semibold text-primary dark:text-secondary">{user.email}</span>
            </p>
          </div>
          <button 
            onClick={handleLogout} 
            className="mt-4 md:mt-0 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 px-5 py-2.5 rounded-lg font-semibold transition-all flex items-center border border-red-200 dark:border-red-800/50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Secure Logout
          </button>
        </motion.div>

        {/* Dashboard Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Projects Card */}
          <motion.div variants={itemVariants}>
            <Link to="/dashboard/projects" className="block h-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 hover:border-primary/50 dark:hover:border-secondary/50 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Tool className="w-32 h-32" />
              </div>
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-primary dark:text-secondary">
                  <Tool className="w-8 h-8" />
                </div>
                <span className="text-3xl font-black text-gray-900 dark:text-white">{metrics.projects}</span>
              </div>
              <h2 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Active Projects</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Track live crane manufacturing and installation status.</p>
              <div className="flex items-center text-primary dark:text-secondary font-semibold text-sm group-hover:translate-x-1 transition-transform">
                View Timeline <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
          </motion.div>

          {/* Invoices Card */}
          <motion.div variants={itemVariants}>
            <Link to="/dashboard/invoices" className="block h-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 hover:border-primary/50 dark:hover:border-secondary/50 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <FileText className="w-32 h-32" />
              </div>
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                  <FileText className="w-8 h-8" />
                </div>
                <span className="text-3xl font-black text-gray-900 dark:text-white">{metrics.invoices}</span>
              </div>
              <h2 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Invoices & Docs</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Download official quotations, POs, and final tax invoices.</p>
              <div className="flex items-center text-green-600 dark:text-green-400 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                Access Documents <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
          </motion.div>

          {/* AMC Tracking Card */}
          <motion.div variants={itemVariants}>
            <Link to="/dashboard/amc" className="block h-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 hover:border-primary/50 dark:hover:border-secondary/50 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Clock className="w-32 h-32" />
              </div>
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                  <Clock className="w-8 h-8" />
                </div>
                <span className="text-3xl font-black text-gray-900 dark:text-white">{metrics.amc}</span>
              </div>
              <h2 className="font-bold text-xl text-gray-900 dark:text-white mb-2">AMC Status</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Monitor upcoming scheduled maintenance and contract validity.</p>
              <div className="flex items-center text-purple-600 dark:text-purple-400 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                Check Schedule <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}