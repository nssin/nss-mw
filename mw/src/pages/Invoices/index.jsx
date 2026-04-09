import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { auth, db } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  CreditCard,
  Loader2,
  ExternalLink,
  Receipt
} from 'lucide-react';

export default function Invoices() {
  const [user, setUser] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
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

  // 2. Real-time Firestore Subscription (Strict Client-Specific Query)
  useEffect(() => {
    if (!user) return;

    const invoicesRef = collection(db, 'invoices');
    const q = query(
      invoicesRef, 
      where('clientId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const invoiceList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Sort by date descending (Real-time in-memory sort)
      const sorted = invoiceList.sort((a, b) => {
        const dateA = a.date?.seconds || 0;
        const dateB = b.date?.seconds || 0;
        return dateB - dateA;
      });

      setInvoices(sorted);
      setLoading(false);
    }, (error) => {
      console.error("Billing Sync Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Filter Logic
  const filteredInvoices = invoices.filter(inv => 
    inv.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.projectName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200';
      case 'overdue': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Accessing Financial Records...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 dark:bg-dark min-h-screen transition-colors duration-300 pb-20">
      
      {/* HEADER */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 pt-12 pb-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="w-full md:w-auto">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 flex items-center">
              <Receipt className="mr-3 text-primary" /> Billing & Statements
            </h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your project payments and download official tax invoices.</p>
          </div>
          
          <div className="flex w-full md:w-auto gap-3">
             <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search Invoice #..." 
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-900 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <button className="p-2 bg-gray-100 dark:bg-gray-900 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <Filter className="w-5 h-5 text-gray-500" />
             </button>
          </div>
        </div>
      </section>

      {/* INVOICE LIST */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {filteredInvoices.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-white dark:bg-gray-800 p-16 rounded-2xl border border-gray-100 dark:border-gray-700 text-center"
            >
              <FileText className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Invoices Found</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">All project-related invoices and receipts will appear here once generated by our accounts department.</p>
            </motion.div>
          ) : (
            <div className="grid gap-4">
              {filteredInvoices.map((inv, index) => (
                <motion.div 
                  key={inv.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-6 hover:border-primary/30 transition-colors group"
                >
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className={`p-3 rounded-lg ${getStatusStyles(inv.status)}`}>
                       <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-black text-gray-900 dark:text-white">{inv.invoiceNumber}</span>
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${getStatusStyles(inv.status)}`}>
                          {inv.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        {inv.projectName} • {inv.date ? new Date(inv.date.seconds * 1000).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full md:w-auto md:gap-12">
                    <div className="text-right">
                      <span className="block text-xs text-gray-400 uppercase font-bold tracking-tighter">Amount Due</span>
                      <span className="text-lg font-black text-gray-900 dark:text-white">₹{inv.amount?.toLocaleString('en-IN')}</span>
                    </div>
                    
                    <div className="flex gap-2">
                       {inv.fileUrl ? (
                         <a 
                           href={inv.fileUrl} 
                           target="_blank" 
                           rel="noreferrer"
                           className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-blue-800 transition-all shadow-md active:scale-95"
                         >
                           <Download className="w-4 h-4" /> Download PDF
                         </a>
                       ) : (
                         <button disabled className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-400 text-sm font-bold rounded-lg cursor-not-allowed">
                            <Clock className="w-4 h-4" /> Processing...
                         </button>
                       )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* PAYMENT INFO FOOTER */}
      <section className="max-w-7xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-blue-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <CreditCard className="w-24 h-24" />
              </div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                 <CheckCircle2 className="mr-2 w-5 h-5 text-secondary" /> Offline Bank Transfer (NEFT/RTGS)
              </h3>
              <div className="space-y-2 text-sm text-blue-100">
                 <p><span className="opacity-60">Bank Name:</span> [YOUR BANK NAME]</p>
                 <p><span className="opacity-60">A/C Name:</span> Naidu Solutions & Services</p>
                 <p><span className="opacity-60">A/C Number:</span> [YOUR ACCOUNT NUMBER]</p>
                 <p><span className="opacity-60">IFSC Code:</span> [YOUR IFSC CODE]</p>
              </div>
           </div>

           <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                 <AlertCircle className="mr-2 w-5 h-5 text-secondary" /> Need Billing Assistance?
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">If you notice a discrepancy in your invoice or have questions regarding GST breakdown, contact our accounts department directly.</p>
              <div className="flex gap-4">
                 <a href="mailto:accounts@naidusolutions.com" className="text-sm font-bold text-primary hover:underline flex items-center">
                    Email Accounts <ExternalLink className="w-3 h-3 ml-1" />
                 </a>
                 <span className="text-gray-300">|</span>
                 <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Call: +91 90499 94500</span>
              </div>
           </div>
        </div>
      </section>

    </div>
  );
}