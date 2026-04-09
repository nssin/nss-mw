import React, { useEffect, useState } from 'react';
import { auth, db, appId } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Maximize2, 
  Play, 
  Truck, 
  MousePointer2, 
  Filter, 
  Layers, 
  Sliders, 
  ChevronRight, 
  Loader2, 
  LogOut,
  Zap,
  Cpu,
  BarChart3,
  Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [telemetry, setTelemetry] = useState([]);
  const [activeNode, setActiveNode] = useState(null);
  const navigate = useNavigate();

  // Animation Variants for Lidar Panels
  const panelIn = {
    hidden: { opacity: 0, x: -40, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const rightPanelIn = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } }
  };

  const bottomPanelIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } }
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    // Real-time Public Telemetry Stream (NSS-MW System Wide)
    const q = query(
      collection(db, 'artifacts', appId, 'public', 'data', 'metrics'), 
      orderBy('timestamp', 'desc')
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTelemetry(data);
      if (data.length > 0 && !activeNode) setActiveNode(data[0]);
    }, (error) => {
      console.error("Firestore Stream Interrupted:", error);
    });

    return () => unsub();
  }, [activeNode]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err) { console.error(err); }
  };

  if (loadingAuth) {
    return (
      <div className="h-[90vh] w-full flex flex-col items-center justify-center bg-[#0D0D0D]">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.5em]">Synchronizing Lidar Nodes...</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] w-full bg-[#0D0D0D] relative overflow-hidden flex font-sans select-none">
      
      {/* 1. LIDAR POINT CLOUD BACKGROUND (MIMICRY) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] 
          bg-[radial-gradient(#ffffff_1px,_transparent_1px)] [background-size:40px_40px] transform rotate-12"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-[#0D0D0D]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0D0D0D_80%)]"></div>
      </div>

      {/* 2. LEFT FLOATING GLASS PANEL (STREETSCAPE.GL STYLE) */}
      <motion.div 
        initial="hidden" animate="visible" variants={panelIn}
        className="absolute left-6 top-6 bottom-32 w-85 bg-[#1A1A1A]/90 backdrop-blur-2xl border border-white/10 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 flex flex-col overflow-hidden"
      >
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <Activity size={16} className="text-blue-500" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-white/70 uppercase">System_Metrics</span>
          </div>
          <Maximize2 size={14} className="text-white/20 hover:text-white cursor-pointer transition-colors" />
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-10">
          {/* Real-time Load Graph Mimic */}
          <section className="space-y-4">
            <div className="flex justify-between items-end">
              <p className="text-[10px] text-white/40 uppercase tracking-widest">Active_Load_G</p>
              <p className="text-xl font-mono text-blue-400">1.24 <span className="text-[10px] text-white/20">g</span></p>
            </div>
            <div className="h-24 w-full bg-black/40 border border-white/5 rounded-sm relative overflow-hidden">
               <svg className="absolute inset-0 w-full h-full">
                 <path d="M0 50 Q 50 10, 100 50 T 200 50 T 300 50" fill="none" stroke="#3b82f6" strokeWidth="1" className="opacity-50" />
               </svg>
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10"></div>
            </div>
          </section>

          {/* Telemetry Log (Real Data) */}
          <section className="space-y-4">
            <p className="text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-2">
              <Terminal size={12} /> Operational_Log
            </p>
            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {telemetry.map((node) => (
                  <motion.div 
                    key={node.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setActiveNode(node)}
                    className={cn(
                      "p-3 border rounded-sm transition-all cursor-pointer group",
                      activeNode?.id === node.id 
                        ? "bg-blue-600/20 border-blue-500/50" 
                        : "bg-white/5 border-white/5 hover:bg-white/10"
                    )}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px] font-bold text-white/80 font-mono">NODE_{node.id.slice(0,5).toUpperCase()}</span>
                      <span className="text-[9px] text-blue-400 font-mono">LIVE</span>
                    </div>
                    <p className="text-[10px] text-white/40 truncate">{node.title || 'Inertial_Stabilization_Active'}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>
        </div>

        {/* User context footer in panel */}
        <div className="p-4 bg-black/40 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 text-xs font-bold border border-blue-500/30">
               {user?.email?.[0].toUpperCase() || 'P'}
             </div>
             <div className="flex flex-col">
               <span className="text-[10px] font-bold text-white/80">{user?.email || 'Public_Node'}</span>
               <span className="text-[8px] text-white/20 uppercase tracking-widest">Operator</span>
             </div>
          </div>
          {user && (
            <button onClick={handleLogout} className="text-white/20 hover:text-red-400 transition-colors">
              <LogOut size={16} />
            </button>
          )}
        </div>
      </motion.div>

      {/* 3. CENTRAL WIREFRAME FOCUS (LIDAR OBJECT) */}
      <div className="flex-1 flex items-center justify-center pt-20 relative overflow-hidden">
        <motion.div 
          animate={{ 
            rotateY: [0, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ perspective: 1000 }}
          className="relative"
        >
          <Truck size={450} strokeWidth={0.2} className="text-white/5 filter blur-[0.5px]" />
          {/* Overlaying "Point Cloud" Glows */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-[400px] h-[200px] bg-blue-500/5 blur-[100px] rounded-full animate-pulse"></div>
          </div>
        </motion.div>
        
        {/* Abstract scanning line effect */}
        <motion.div 
          animate={{ y: [-400, 400] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent z-10"
        />
      </div>

      {/* 4. RIGHT SIDE TOOLBAR */}
      <motion.div 
        initial="hidden" animate="visible" variants={rightPanelIn}
        className="absolute right-6 top-6 flex flex-col gap-3 z-[100]"
      >
        {[
          { icon: MousePointer2, label: 'Select' },
          { icon: Maximize2, label: 'Viewport' },
          { icon: Filter, label: 'Layers' },
          { icon: Sliders, label: 'Params' },
          { icon: Layers, label: 'Buffer' }
        ].map((tool, idx) => (
          <button 
            key={idx} 
            className="w-11 h-11 bg-[#1e1e1e]/90 hover:bg-white text-white/30 hover:text-black flex items-center justify-center 
              border border-white/10 rounded-sm shadow-2xl transition-all duration-300 group relative"
          >
            <tool.icon size={18} />
            <span className="absolute right-14 bg-black text-white text-[9px] px-2 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest font-bold border border-white/10">
              {tool.label}
            </span>
          </button>
        ))}
      </motion.div>

      {/* 5. BOTTOM TIMELINE CONTROL (KEPLER.GL STYLE) */}
      <motion.div 
        initial="hidden" animate="visible" variants={bottomPanelIn}
        className="absolute bottom-6 left-6 right-6 h-20 bg-[#1A1A1A]/95 backdrop-blur-3xl border border-white/10 rounded-sm p-5 z-[100] flex items-center gap-8 shadow-2xl"
      >
        <button className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white transition-colors">
          <Play size={20} fill="white" />
        </button>

        <div className="flex-1 space-y-3">
          <div className="flex justify-between text-[10px] font-mono text-white/30 uppercase tracking-widest">
            <span>Transmission_Epoch: {new Date().toLocaleDateString()}</span>
            <span className="text-blue-400">Stream_Sync_Active</span>
            <span>00:24:12 / 60:00:00</span>
          </div>
          <div className="h-[2px] w-full bg-white/10 rounded-full relative">
            <motion.div 
              animate={{ width: ['0%', '40%', '35%', '45%'] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute left-0 top-0 bottom-0 bg-blue-500 shadow-[0_0_10px_#3b82f6]"
            />
            <div className="absolute left-[45%] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg border-2 border-blue-500"></div>
          </div>
        </div>

        <div className="flex items-center gap-6 border-l border-white/10 pl-8">
           <div className="text-right">
             <p className="text-[9px] text-white/20 uppercase font-bold tracking-widest">Active_Nodes</p>
             <p className="text-lg font-mono text-white/80">{telemetry.length}</p>
           </div>
           <BarChart3 size={20} className="text-white/20" />
        </div>
      </motion.div>

    </div>
  );
}