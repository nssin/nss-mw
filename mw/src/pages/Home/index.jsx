import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Maximize, 
  Truck, 
  Hourglass, 
  Download, 
  Hammer,
  Cpu,
  CheckCircle,
  Shield,
  HardHat
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
    <div className="flex flex-col w-full bg-dark text-white font-sans overflow-x-hidden">
      
      {/* 1. HEIGL-STYLE HERO SECTION (Blue Gradient + 3D CSS Object) */}
      <section className="relative min-h-[85vh] w-full hero-blue-gradient flex flex-col justify-end pt-32 overflow-hidden">
        
        {/* Main Hero Content */}
        <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between flex-1 pb-20 relative z-10">
          
          {/* Left: Typography & CTA */}
          <motion.div 
            initial="hidden" animate="visible" variants={fadeUp}
            className="w-full lg:w-1/2 space-y-8 z-20"
          >
            <span className="inline-block py-1 px-4 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              ISO 9001:2015 Certified Operations
            </span>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[1.05] text-white">
              INDUSTRIAL ENGINEERING <br /> & CRANE FABRICATION <br /> IN NANDED.
            </h1>
            <p className="text-lg text-white/80 max-w-md font-medium leading-relaxed">
              Specialized manufacturer of heavy-duty EOT cranes and contract manufacturer in structural mechanical engineering.
            </p>
            <div className="pt-4">
              <Link to="/quote" className="inline-flex items-center gap-4 bg-white text-primary px-8 py-4 font-bold text-sm hover:bg-gray-100 transition-colors shadow-2xl">
                Get a quote <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>

          {/* Right: CSS 3D Metal Tube Simulation (Mimicking HEIGL Object) */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-20 lg:mt-0 relative z-10 scale-75 lg:scale-100"
          >
            <div className="relative w-[450px] h-[180px] transform -rotate-12 skew-x-12 mt-10">
              {/* Front Face */}
              <div className="absolute inset-0 bg-[#e5e7eb] flex items-center pl-12 shadow-[20px_20px_50px_rgba(0,0,0,0.5)] border-b-[6px] border-[#d1d5db]">
                <span className="text-[#9ca3af] font-black text-6xl tracking-[0.2em] opacity-50 select-none">NSS-MW</span>
                <span className="absolute bottom-4 left-12 text-[#9ca3af] text-[10px] tracking-widest font-bold opacity-60">HEAVY ENGINEERING</span>
              </div>
              {/* Top Face */}
              <div className="absolute top-[-60px] left-[30px] w-[450px] h-[60px] bg-[#f3f4f6] skew-x-[-45deg] origin-bottom-left border-b border-[#e5e7eb]"></div>
              {/* Left Face (Hole) */}
              <div className="absolute top-[-60px] left-0 w-[60px] h-[180px] bg-[#1a1a1a] skew-y-[-45deg] origin-top-left shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.8)] flex items-center justify-center">
                 <div className="w-10 h-32 bg-[#000000] blur-[2px]"></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Info Bar (Bottom of Hero) */}
        <div className="w-full bg-[#1e3a8a]/60 backdrop-blur-md border-t border-white/20 flex flex-col md:flex-row relative z-20">
          <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-16 py-4 flex flex-wrap items-center justify-between gap-6">
            
            <div className="flex flex-wrap items-center gap-10">
              <div className="flex items-center gap-3 text-white/90">
                <div className="p-2 border border-white/20 border-dashed"><Maximize size={16} /></div>
                <span className="text-xs font-bold tracking-wide">12,500 sq.ft Production area.</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="p-2 border border-white/20 border-dashed"><Truck size={16} /></div>
                <span className="text-xs font-bold tracking-wide">Own transport fleet - for reliable delivery.</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="p-2 border border-white/20 border-dashed"><Hourglass size={16} /></div>
                <span className="text-xs font-bold tracking-wide">In the market since 2005.</span>
              </div>
            </div>

            <div className="bg-industrial-black/80 backdrop-blur-sm border border-white/10 p-4 -mt-12 md:-mt-16 relative z-30 max-w-xs shadow-2xl">
              <p className="text-[10px] leading-relaxed text-white/80 font-bold mb-3">
                The ISO 9001:2015 and OSHA certificates ensure compliance with high quality standards.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-primary-light transition-colors">
                ISO 9001:2015 <Download size={14} />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 2. HEIGL-STYLE PROCESS INTRO */}
      <section className="py-32 px-6 lg:px-16 bg-dark border-b border-white/5">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between gap-16">
          <div className="text-primary font-bold text-sm tracking-widest uppercase">
            | Services
          </div>
          <div className="max-w-2xl space-y-6">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter leading-tight text-white">
              We take over the complete process of heavy engineering.
            </h2>
            <p className="text-lg text-white/60 font-medium leading-relaxed">
              From structural cutting and fabrication to advanced welding, mechanical processing, and final site installation of the nodes.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HEIGL-STYLE SERVICE BLOCKS (Horizontal Rows) */}
      <section className="bg-dark">
        
        {/* Service Row 1 */}
        <div className="border-b border-white/5">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-20 flex flex-col lg:flex-row gap-12 lg:gap-8">
            <div className="w-full lg:w-[45%] flex gap-6">
              <span className="text-sm font-bold text-white/30">#1</span>
              <div className="space-y-6">
                <h3 className="text-4xl font-black uppercase tracking-tighter text-white">EOT Cranes</h3>
                <p className="text-white/60 leading-relaxed font-medium">
                  The heart of NSS-MW operations is crane fabrication - here the ordered components are joined into stable constructions using different welding and assembly processes.
                </p>
                <Link to="/services/eot-crane" className="inline-flex items-center gap-3 bg-primary text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary-light transition-colors">
                  View all services <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            
            <div className="w-full lg:w-[25%] flex items-center justify-center">
              <div className="w-full aspect-square bg-[#3b82f6]/10 flex items-center justify-center border border-white/5 relative overflow-hidden">
                 {/* Faux 3D Tool Icon */}
                 <Hammer size={80} strokeWidth={1} className="text-primary drop-shadow-[0_10px_20px_rgba(30,64,175,0.5)] transform -rotate-12" />
              </div>
            </div>

            <div className="w-full lg:w-[30%]">
              <div className="bg-industrial-gray p-6 h-full border border-white/5">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-6">Performance Facts</h4>
                <ul className="space-y-3 text-xs font-bold text-white/80">
                  <li className="flex items-center gap-3 bg-dark/50 p-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> ISO 9001-certified processes</li>
                  <li className="flex items-center gap-3 bg-dark/50 p-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Single & Double Girder systems</li>
                  <li className="flex items-center gap-3 bg-dark/50 p-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Regular safety testing every 2 years</li>
                  <li className="flex items-center gap-3 bg-dark/50 p-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Load capacities up to 150+ Tons</li>
                  <li className="flex items-center gap-3 bg-dark/50 p-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Laser precision plate cutting</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Service Row 2 */}
        <div className="border-b border-white/5">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-20 flex flex-col lg:flex-row gap-12 lg:gap-8">
            <div className="w-full lg:w-[45%] flex gap-6">
              <span className="text-sm font-bold text-white/30">#2</span>
              <div className="space-y-6">
                <h3 className="text-4xl font-black uppercase tracking-tighter text-white">PLC Automation</h3>
                <p className="text-white/60 leading-relaxed font-medium">
                  Industrial Automation is our precise control procedure – using Computerized Numerical Control we manage complex nodes on multi-axis machinery for ultimate factory efficiency.
                </p>
                <Link to="/industrialauto" className="inline-flex items-center gap-3 bg-primary text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary-light transition-colors">
                  View all services <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            
            <div className="w-full lg:w-[25%] flex items-center justify-center">
              <div className="w-full aspect-square bg-[#3b82f6]/10 flex items-center justify-center border border-white/5 relative overflow-hidden">
                 <Cpu size={80} strokeWidth={1} className="text-primary drop-shadow-[0_10px_20px_rgba(30,64,175,0.5)] transform rotate-12" />
              </div>
            </div>

            <div className="w-full lg:w-[30%]">
              <div className="bg-industrial-gray p-6 h-full border border-white/5">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-6">Performance Facts</h4>
                <ul className="space-y-3 text-xs font-bold text-white/80">
                  <li className="flex items-center gap-3 bg-dark/50 p-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> High-precision PLC control</li>
                  <li className="flex items-center gap-3 bg-dark/50 p-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Siemens & Allen-Bradley integration</li>
                  <li className="flex items-center gap-3 bg-dark/50 p-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> 3-, 4- and 5-axis control centers</li>
                  <li className="flex items-center gap-3 bg-dark/50 p-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> VFD drive synchronization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 4. STAY CONNECTED / TELEMETRY SECTION */}
      <section className="bg-dark py-32 px-6 lg:px-16 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto space-y-16">
           <motion.div 
             initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
             className="flex flex-col md:flex-row justify-between items-end gap-8 pb-10"
           >
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-white">Live Node Telemetry</h2>
                <p className="text-white/50 max-w-md font-medium text-lg leading-relaxed">Monitor system-wide agility, structural node health, and deployment status directly from our dashboard.</p>
              </div>
              <Link to="/dashboard" className="bg-primary text-white px-8 py-4 font-bold text-xs uppercase tracking-[0.2em] hover:bg-primary-light transition-colors shadow-xl">
                Access Operations
              </Link>
           </motion.div>

           <motion.div 
             initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
             className="overflow-x-auto border border-white/5 bg-industrial-gray p-8"
           >
             <table className="w-full text-left">
               <thead>
                 <tr className="text-[10px] uppercase tracking-[0.3em] text-white/30 border-b border-white/10">
                   <th className="py-6 font-bold">Event Operator Node</th>
                   <th className="py-6 font-bold">Deployment Hub</th>
                   <th className="py-6 font-bold">Node Status</th>
                 </tr>
               </thead>
               <tbody className="text-sm text-white/70">
                 {[
                   { node: "Node_742-MH", hub: "Mumbai Central", status: "ACTIVE" },
                   { node: "Node_109-GJ", hub: "Ahmedabad Hub", status: "STANDBY" },
                   { node: "Node_882-KA", hub: "Bangalore Node", status: "ACTIVE" },
                   { node: "Node_431-MH", hub: "Pune Facility", status: "MAINTENANCE" }
                 ].map((row, i) => (
                   <motion.tr key={i} variants={fadeUp} className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                     <td className="py-6 font-bold text-white tracking-tight text-base">{row.node}</td>
                     <td className="py-6 text-white/50">{row.hub}</td>
                     <td className="py-6">
                       <span className={cn(
                         "px-3 py-1 rounded-sm text-[10px] font-bold tracking-widest",
                         row.status === 'ACTIVE' ? 'bg-primary/20 text-primary-light' : 'bg-white/5 text-white/40'
                       )}>{row.status}</span>
                     </td>
                   </motion.tr>
                 ))}
               </tbody>
             </table>
           </motion.div>
        </div>
      </section>

      {/* 5. TRUST & SAFETY SECTION */}
      <section className="bg-industrial-gray py-32 px-6 lg:px-16">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-24">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="w-full lg:w-1/2 space-y-10"
          >
            <h2 className="text-5xl font-black text-white tracking-tighter leading-tight">Unmatched Reliability. <br/> Certified Safety.</h2>
            <p className="text-white/50 text-lg leading-relaxed font-medium">
              At NSS-MW, we do not compromise on structural integrity. Every unit is load-tested and certified before handover, ensuring zero downtime for your production line.
            </p>
            <div className="space-y-6">
              {[
                "IS 3177 / IS 807 compliant design and fabrication.",
                "Genuine branded electricals (Schneider, L&T, Siemens).",
                "Rapid Response Team mobilized within 4 hours for breakdowns."
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-4 text-white font-bold">
                  <CheckCircle size={24} className="text-primary shrink-0" />
                  <span className="tracking-tight text-white/90">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2 bg-primary rounded-sm p-16 text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -right-20 -top-20 opacity-10">
              <Shield size={300} strokeWidth={1} />
            </div>
            <h3 className="text-4xl font-black mb-6 relative z-10 tracking-tighter leading-tight">Need an immediate structural assessment?</h3>
            <p className="mb-12 text-white/80 relative z-10 text-lg font-medium leading-relaxed">Our engineering team provides free on-site consultation and load calculations to recommend the exact specifications for your hub.</p>
            <Link to="/consult" className="inline-flex items-center bg-white text-dark px-10 py-5 font-black hover:bg-gray-100 transition-all relative z-10 shadow-xl text-xs uppercase tracking-widest">
              Book Consultation <HardHat className="ml-3 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}