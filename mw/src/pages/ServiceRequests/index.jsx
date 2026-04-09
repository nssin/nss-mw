import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { auth, db } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { 
  Wrench, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  User, 
  Calendar, 
  MessageSquare, 
  Plus, 
  Loader2, 
  ChevronRight,
  ShieldAlert,
  Hammer
} from 'lucide-react';

export default function ServiceRequests() {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 1. Authentication Check
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/login');
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribeAuth();
  }, [navigate]);

  // 2. Real-time Firestore Subscription (Strict Logic)
  useEffect(() => {
    if (!user) return;

    // Query 'services' collection filtered by the authenticated user's ID
    const servicesRef = collection(db, 'services');
    const q = query(
      servicesRef, 
      where('clientId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const requestList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Real-time sorting by timestamp (Newest first)
      const sorted = requestList.sort((a, b) => {
        const timeA = a.timestamp?.seconds || 0;
        const timeB = b.timestamp?.seconds || 0;
        return timeB - timeA;
      });

      setRequests(sorted);
      setLoading(false);
    }, (error) => {
      console.error("Service Sync Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const getPriorityStyles = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'emergency': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200';
      case 'medium': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'on-site': return <Hammer className="w-5 h-5 text-blue-500 animate-pulse" />;
      case 'assigned': return <User className="w-5 h-5 text-purple-500" />;
      default: return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Syncing Service Tickets...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 dark:bg-dark min-h-screen transition-colors duration-300 pb-20">
      
      {/* HEADER */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 pt-12 pb-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 flex items-center">
              <Wrench className="mr-3 text-primary" /> Active Service Tickets
            </h1>
            <p className="text-gray-500 dark:text-gray-400">Real-time status of your technical support and breakdown requests.</p>
          </div>
          
          <Link 
            to="/bookservice" 
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-800 transition-all shadow-lg active:scale-95"
          >
            <Plus className="w-5 h-5" /> Book New Service
          </Link>
        </div>
      </section>

      {/* TICKETS LIST */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {requests.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-white dark:bg-gray-800 p-16 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-center"
            >
              <ShieldAlert className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Active Tickets</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-8">All your equipment is currently operating within parameters. No pending service requests found.</p>
              <Link to="/services/amc" className="text-primary font-bold hover:underline">Explore AMC Benefits</Link>
            </motion.div>
          ) : (
            <div className="grid gap-6">
              {requests.map((ticket, index) => (
                <motion.div 
                  key={ticket.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:border-primary/30 transition-all"
                >
                  <div className="p-6 md:p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    
                    {/* Ticket Details */}
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${getPriorityStyles(ticket.priority)}`}>
                          {ticket.priority} Priority
                        </span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">ID: {ticket.id.slice(0, 8)}</span>
                      </div>
                      
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{ticket.issueTitle || 'Crane Maintenance'}</h2>
                      
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5" /> Raised: {ticket.timestamp ? new Date(ticket.timestamp.seconds * 1000).toLocaleDateString() : 'Syncing...'}</span>
                        <span className="flex items-center uppercase font-bold tracking-tight"><AlertTriangle className="w-4 h-4 mr-1.5 text-secondary" /> {ticket.craneType || 'EOT Crane'}</span>
                      </div>
                    </div>

                    {/* Status Display */}
                    <div className="w-full lg:w-64 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                       <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-bold text-gray-500 uppercase">Current Status</span>
                          <div className="flex items-center text-sm font-black text-primary dark:text-secondary uppercase">
                             {ticket.status}
                          </div>
                       </div>
                       <div className="flex items-center gap-3">
                          <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                             {getStatusIcon(ticket.status)}
                          </div>
                          <div className="flex-grow h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                             <motion.div 
                               initial={{ width: 0 }} 
                               animate={{ width: ticket.status === 'Completed' ? '100%' : ticket.status === 'On-Site' ? '70%' : '30%' }}
                               className="h-full bg-primary dark:bg-secondary"
                             />
                          </div>
                       </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 w-full lg:w-auto">
                       <Link 
                        to={`/contact?ticket=${ticket.id}`} 
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                       >
                         <MessageSquare className="w-4 h-4" /> Message Desk
                       </Link>
                       <button className="p-2 text-primary dark:text-secondary hover:translate-x-1 transition-transform">
                          <ChevronRight className="w-6 h-6" />
                       </button>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* EMERGENCY BOX */}
      <section className="max-w-7xl mx-auto px-4 mt-8">
        <div className="bg-red-600 rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
           <div className="absolute left-0 top-0 opacity-10">
              <ShieldAlert className="w-48 h-48 -translate-x-12 -translate-y-12" />
           </div>
           <div className="relative z-10">
              <h3 className="text-2xl font-black mb-2 flex items-center">
                 <AlertTriangle className="mr-3 w-8 h-8 text-secondary" /> Production-Halt Emergency?
              </h3>
              <p className="text-red-100 max-w-xl">Our 24/7 Rapid Response Team is standby for all contract clients. For immediate crane breakdown intervention, call our founder directly.</p>
           </div>
           <div className="relative z-10">
              <a href="tel:+919049994500" className="inline-block bg-white text-red-600 px-8 py-4 rounded-xl font-black text-lg shadow-lg hover:bg-red-50 transition-colors">
                 CALL: +91 90499 94500
              </a>
           </div>
        </div>
      </section>

    </div>
  );
}