import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  PlayCircle, 
  ArrowRight, 
  Globe, 
  HardHat, 
  Activity, 
  ChevronRight,
  Hammer,
  Cpu,
  CheckCircle,
  Factory,
  Settings,
  Wrench,
  Shield,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export default function Home() {
  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-700 bg-white font-sans overflow-x-hidden">
      
      {/* 1. HERO SECTION: MAP BACKGROUND STYLE */}
      <section className="relative h-[85vh] w-full bg-[#244356] flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Faux Map Background / Abstract Geo-Grid */}
        <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#1a2b3c_100%)]"></div>
          <div className="w-full h-full scale-150 transform -rotate-12 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        </div>

        <div className="relative z-10 w-full max-w-5xl text-center space-y-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-block py-1 px-4 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-100 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              ISO 9001:2015 Certified Operations
            </span>
            <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tighter leading-[1.05] mb-10">
              Let's find smarter ways <br/> forward, together.
            </h1>
            
            {/* Large Center Search Bar */}
            <div className="w-full max-w-2xl mx-auto bg-white shadow-2xl rounded-sm flex items-center p-1 group transition-all focus-within:ring-4 focus-within:ring-blue-500/20">
               <div className="flex-1 flex items-center px-6 border-r border-gray-100">
                  <Search className="text-gray-300 mr-4" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search for an engineering node..." 
                    className="w-full py-5 text-lg outline-none text-black placeholder-gray-400"
                  />
               </div>
               <button className="hidden md:block px-8 py-5 text-gray-400 font-medium hover:text-black">
                 Near me
               </button>
            </div>

            <div className="mt-10 flex items-center justify-center gap-4 text-white/70">
              <PlayCircle size={28} className="text-white fill-white/20" />
              <p className="text-sm font-medium tracking-wide">NSS-MW provides real-time telemetry data across all operation hubs.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. ENGINEERING HIGHLIGHT: WHITE SECTION */}
      <section className="bg-white py-32 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-32">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="space-y-8"
          >
            <h2 className="text-6xl font-bold text-black tracking-tighter leading-none">NSS-MW <br/> Engineering</h2>
            <p className="text-gray-600 text-xl leading-relaxed max-w-md font-medium">
              We deliver end-to-end industrial solutions manufactured in Nashik, redefining heavy lifting and automation since 2005.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="space-y-8 text-gray-500 text-base leading-loose"
          >
            <p>Operations are the backdrop of our workflow — they are complicated, ever-changing nodes. As NSS-MW has powered the movement of heavy assets from A to B, we’ve uncovered unique insights about how and why industrial projects scale safely.</p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/quote" className="bg-black text-white px-8 py-4 font-bold rounded-sm hover:bg-zinc-800 transition-colors flex items-center gap-2 shadow-xl shadow-black/10">
                Configure Your Crane <ArrowRight size={18} />
              </Link>
              <Link to="/services" className="border-2 border-black/10 text-black px-8 py-4 font-bold rounded-sm hover:bg-gray-50 transition-colors">
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>

        {/* 3. CORE SERVICE NODES: 3-COLUMN ILLUSTRATED CARDS */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16"
        >
          {[
            { title: "EOT Crane Systems", color: "bg-[#274D39]", desc: "Heavy-duty Single and Double Girder systems with capacities up to 100 Tons.", icon: <Hammer size={40} className="text-white"/>, path: "/services/eot-crane" },
            { title: "Industrial Automation", color: "bg-[#F59E0B]", desc: "Custom PLC programming (Siemens, AB) and VFD integration for precise control.", icon: <Cpu size={40} className="text-white"/>, path: "/industrialauto" },
            { title: "AMC & Modernization", color: "bg-[#1E40AF]", desc: "Comprehensive contracts and legacy upgrades to meet modern safety standards.", icon: <Activity size={40} className="text-white"/>, path: "/services/amc" }
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp} className="group space-y-10">
              <div className={cn("aspect-square w-full rounded-sm flex items-center justify-center transition-all duration-500 group-hover:scale-[0.98] shadow-lg", item.color)}>
                 {item.icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-black tracking-tight">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                <Link to={item.path} className="inline-flex items-center gap-2 text-black font-bold border-b-2 border-black pb-1 hover:text-blue-600 hover:border-blue-600 transition-all text-xs uppercase tracking-widest">
                  View Node Specs <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. STAY CONNECTED: DARK UI DATA SECTION */}
      <section className="bg-[#121212] py-32 px-6 lg:px-24 text-white">
        <div className="max-w-7xl mx-auto space-y-16">
           <motion.div 
             initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
             className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/10 pb-16"
           >
              <div className="space-y-4">
                <h2 className="text-5xl font-bold tracking-tight">Stay Connected</h2>
                <p className="text-white/40 max-w-md font-medium text-lg leading-relaxed">Monitor system-wide agility, structural node health, and deployment status.</p>
              </div>
              <Link to="/consult" className="bg-white text-black px-10 py-4 font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-gray-200 transition-colors shadow-2xl">
                Register New Node
              </Link>
           </motion.div>

           <motion.div 
             initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
             className="overflow-x-auto"
           >
             <table className="w-full text-left">
               <thead>
                 <tr className="text-[10px] uppercase tracking-[0.3em] text-white/30 border-b border-white/10">
                   <th className="py-6 font-bold">Event Operator Node</th>
                   <th className="py-6 font-bold">Deployment Hub</th>
                   <th className="py-6 font-bold">Node Status</th>
                   <th className="py-6 font-bold text-right">View Log</th>
                 </tr>
               </thead>
               <tbody className="text-sm text-white/70">
                 {[
                   { node: "Node_742-MH", hub: "Mumbai Central", status: "ACTIVE" },
                   { node: "Node_109-GJ", hub: "Ahmedabad Hub", status: "STANDBY" },
                   { node: "Node_882-KA", hub: "Bangalore Node", status: "ACTIVE" },
                   { node: "Node_431-MH", hub: "Pune Facility", status: "MAINTENANCE" }
                 ].map((row, i) => (
                   <motion.tr key={i} variants={fadeUp} className="border-b border-white/5 hover:bg-white/5 transition-colors group cursor-pointer">
                     <td className="py-8 font-bold text-white tracking-tight text-lg">{row.node}</td>
                     <td className="py-8 text-white/50">{row.hub}</td>
                     <td className="py-8">
                       <span className={cn(
                         "px-3 py-1 rounded-full text-[10px] font-bold tracking-widest",
                         row.status === 'ACTIVE' ? 'bg-green-500/10 text-green-400' : 'bg-white/5 text-white/30'
                       )}>{row.status}</span>
                     </td>
                     <td className="py-8 text-right">
                       <button className="text-white/20 group-hover:text-white transition-all transform group-hover:translate-x-1 inline-flex items-center gap-3 font-bold text-xs uppercase tracking-widest">
                         Register View <ChevronRight size={16} />
                       </button>
                     </td>
                   </motion.tr>
                 ))}
               </tbody>
             </table>
           </motion.div>
        </div>
      </section>

      {/* 5. TRUST & SAFETY SECTION */}
      <section className="bg-gray-50 py-32 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="w-full lg:w-1/2 space-y-10"
          >
            <h2 className="text-5xl font-bold text-black tracking-tighter leading-tight">Unmatched Reliability. <br/> Certified Safety.</h2>
            <p className="text-gray-500 text-lg leading-relaxed font-medium">
              At NSS-MW, we do not compromise on structural integrity. Every unit is load-tested and certified before handover, ensuring zero downtime for your production line.
            </p>
            <div className="space-y-6">
              {[
                "IS 3177 / IS 807 compliant design and fabrication.",
                "Genuine branded electricals (Schneider, L&T, Siemens).",
                "Rapid Response Team mobilized within 4 hours for breakdowns."
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-4 text-black font-bold">
                  <CheckCircle size={24} className="text-green-600 shrink-0" />
                  <span className="tracking-tight">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2 bg-[#1e40af] rounded-sm p-16 text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -right-20 -top-20 opacity-10">
              <Shield size={300} strokeWidth={1} />
            </div>
            <h3 className="text-4xl font-bold mb-6 relative z-10 tracking-tight leading-tight">Need an immediate structural assessment?</h3>
            <p className="mb-12 text-blue-100/70 relative z-10 text-lg font-medium leading-relaxed">Our engineering team provides free on-site consultation and load calculations to recommend the exact specifications for your hub.</p>
            <Link to="/consult" className="inline-flex items-center bg-white text-black px-10 py-5 font-bold hover:bg-gray-100 transition-all relative z-10 shadow-xl text-xs uppercase tracking-widest">
              Book Consultation <HardHat className="ml-3 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}