import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Target, 
  Flag, 
  Building2, 
  ChevronRight, 
  CheckCircle, 
  ArrowRight, 
  HardHat 
} from 'lucide-react';
import { cn } from '../../lib/utils';

// Strict imports of global modular components as requested
import Header from '../../components/Header';
import Footer from '../../components/Footer';

/**
 * About Component - NSS-MW Corporate Identity Node
 * Implements the HEIGL-style industrial layout with explicit component imports.
 */
export default function About() {
  // Animation Variants for structural consistency across the platform
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

  const milestones = [
    { year: "2009", title: "Foundation", desc: "Established by Mr. Chandrashekhar Laxmannaidu Ammisetty, focusing on critical electrical maintenance and industrial troubleshooting." },
    { year: "2014", title: "Manufacturing Expansion", desc: "Launched in-house fabrication of Single and Double Girder EOT Cranes to address critical structural gaps in the heavy engineering market." },
    { year: "2021", title: "Automation Wing", desc: "Dedicated division created for custom PLC programming and advanced VFD control panels to optimize modern manufacturing nodes." }
  ];

  return (
    <>
      {/* 1. Global Modular Header Instance */}
      <Header />

      <main className="w-full bg-dark text-white font-sans overflow-x-hidden min-h-screen">
        
        {/* 2. HEIGL-STYLE HERO SECTION (Transparent Navigation Overlay Space) */}
        <section className="relative min-h-[65vh] w-full hero-blue-gradient flex flex-col justify-end pt-48 pb-24 border-b border-white/5">
          <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-16 relative z-10">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl space-y-8">
              <span className="text-white/70 font-bold uppercase tracking-[0.3em] text-[10px] block">
                | Established 2009 • Nashik Industrial Hub
              </span>
              <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[1.05] uppercase italic">
                Engineering Excellence <br/> Since Day One.
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl font-medium leading-relaxed">
                Founded by Mr. Chandrashekhar Laxmannaidu Ammisetty, Naidu Solutions & Services [NSS-MW] has evolved from a specialized repair node into a premier manufacturing house for heavy engineering.
              </p>
            </motion.div>
          </div>
          
          {/* Decorative Vertical Text */}
          <div className="absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none">
            <span className="text-[120px] font-black text-white/5 uppercase tracking-tighter vertical-text select-none">
              EST. 2009
            </span>
          </div>
        </section>

        {/* 3. CORPORATE JOURNEY (High Contrast Layout) */}
        <section className="py-32 px-6 lg:px-16 bg-dark border-b border-white/5">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-12">
              <div className="space-y-4">
                <div className="w-12 h-1 bg-primary"></div>
                <h2 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter">Our Journey</h2>
              </div>
              
              <div className="space-y-8 text-white/60 font-medium leading-loose text-lg max-w-xl">
                <p>
                  What began in 2009 as a dedicated service center for industrial electrical breakdowns quickly grew due to our uncompromising commitment to quality and rapid response times. 
                </p>
                <p>
                  Today, NSS-MW operates a state-of-the-art facility producing Double Girder EOT cranes up to 150 MT. Our automation wing designs and programs complex PLC control panels, driving efficiency for manufacturing plants across India.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 pt-12 border-t border-white/10">
                <div className="space-y-2">
                  <div className="text-6xl font-black text-white tracking-tighter">500+</div>
                  <div className="text-[10px] font-bold text-primary uppercase tracking-widest">Active Projects</div>
                </div>
                <div className="space-y-2">
                  <div className="text-6xl font-black text-white tracking-tighter italic">ISO</div>
                  <div className="text-[10px] font-bold text-primary uppercase tracking-widest">9001:2015 QC</div>
                </div>
              </div>
            </motion.div>

            {/* HEIGL-Style Milestone Block */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="bg-industrial-gray p-10 lg:p-16 border border-white/5 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute -right-20 -bottom-20 opacity-5 pointer-events-none">
                <Building2 className="w-[500px] h-[500px] text-white" />
              </div>
              
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-16 relative z-10 border-b border-white/10 pb-4">
                Corporate Roadmap
              </h3>
              
              <div className="space-y-16 relative z-10">
                {milestones.map((milestone, idx) => (
                  <motion.div key={idx} variants={fadeUp} className="flex gap-8 group">
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 bg-dark border-2 border-primary group-hover:bg-primary transition-all duration-500"></div>
                      {idx !== milestones.length - 1 && <div className="w-[1px] h-full bg-white/10 mt-4 group-hover:bg-primary/30 transition-colors"></div>}
                    </div>
                    <div className="pb-4">
                      <h4 className="font-black text-white text-3xl uppercase tracking-tighter mb-3">
                        <span className="text-primary mr-4">{milestone.year}</span> 
                        {milestone.title}
                      </h4>
                      <p className="text-base text-white/50 font-medium leading-relaxed max-w-md">
                        {milestone.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* 4. MISSION & VISION (Grid Blocks) */}
        <section className="bg-industrial-black py-32 px-6 lg:px-16 border-b border-white/5">
          <div className="max-w-[1400px] mx-auto">
            <motion.div 
              variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-1"
            >
              <motion.div variants={fadeUp} className="flex flex-col p-16 bg-dark border border-white/5 group hover:bg-industrial-gray transition-colors">
                <Target className="w-16 h-16 text-primary mb-10" strokeWidth={1} />
                <h3 className="text-4xl font-black uppercase tracking-tighter text-white mb-6 italic">Our Mission</h3>
                <p className="text-white/50 leading-relaxed font-medium mb-12 text-lg">
                  To engineer, manufacture, and maintain the most reliable material handling systems, ensuring zero downtime and maximum safety for our partners.
                </p>
                <Link to="/visionmission" className="mt-auto inline-flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest hover:text-white transition-colors">
                  View Strategic Objectives <ArrowRight size={14} />
                </Link>
              </motion.div>
              
              <motion.div variants={fadeUp} className="flex flex-col p-16 bg-dark border border-white/5 group hover:bg-industrial-gray transition-colors">
                <Flag className="w-16 h-16 text-primary mb-10" strokeWidth={1} />
                <h3 className="text-4xl font-black uppercase tracking-tighter text-white mb-6 italic">Our Vision</h3>
                <p className="text-white/50 leading-relaxed font-medium mb-12 text-lg">
                  To be the undisputed leader in industrial engineering solutions in Western India by 2030, recognized for technological innovation.
                </p>
                <Link to="/visionmission" className="mt-auto inline-flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest hover:text-white transition-colors">
                  View Future Roadmap <ArrowRight size={14} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 5. HEIGL-STYLE CALL TO ACTION */}
        <section className="bg-dark py-32 px-6 lg:px-16">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="max-w-[1400px] mx-auto bg-primary p-16 lg:p-24 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-16 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none"></div>
            
            <div className="relative z-10 w-full lg:w-3/5 space-y-6">
               <h2 className="text-4xl lg:text-6xl font-black text-dark uppercase tracking-tighter leading-tight">
                 Engineering <br/> The Future.
               </h2>
               <p className="text-dark/70 text-xl font-bold leading-relaxed max-w-md">
                 Our technical team is ready to design your specialized crane node or automation architecture.
               </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0">
              <Link to="/contact" className="bg-dark text-white px-12 py-5 font-black uppercase tracking-widest text-xs hover:bg-black transition-all text-center">
                Contact Team
              </Link>
              <Link to="/quote" className="bg-white text-dark px-12 py-5 font-black uppercase tracking-widest text-xs hover:bg-gray-100 transition-all text-center shadow-xl">
                Get Quote
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      {/* 6. Global Modular Footer Instance */}
      <Footer />
    </>
  );
}