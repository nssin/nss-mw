import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Hammer, 
  Cpu, 
  Activity, 
  Truck
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export default function Services() {
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

  // Real NSS-MW Service Data structured for the Heigl-style layout
  const services = [
    {
      id: '1',
      title: 'EOT CRANES',
      path: '/services/eot-crane',
      description: 'The heart of NSS-MW operations is heavy-duty crane fabrication. Here, ordered structural components are joined into highly stable constructions using advanced submerged arc welding and precise assembly processes.',
      icon: Hammer,
      facts: [
        'ISO 9001-certified fabrication processes',
        'Single & Double Girder systems available',
        'Load capacities spanning 5 to 150+ Tons',
        'Laser precision plate cutting integration',
        'Custom span engineering up to 35 meters'
      ]
    },
    {
      id: '2',
      title: 'PLC AUTOMATION',
      path: '/industrialauto',
      description: 'Industrial Automation is our precise control procedure. Using Computerized Numerical Control (CNC) and advanced logic programming, we manage complex operational nodes for ultimate factory efficiency and safety.',
      icon: Cpu,
      facts: [
        'High-precision PLC & SCADA control',
        'Siemens, Allen-Bradley, & Schneider systems',
        'Custom APFC and VFD drive synchronization',
        'Automated material flow architecture',
        'Fail-safe autonomous limit sensing'
      ]
    },
    {
      id: '3',
      title: 'MAINTENANCE & AMC',
      path: '/services/amc',
      description: 'Comprehensive Annual Maintenance Contracts and legacy equipment upgrades to meet modern safety standards. We ensure your production lines never experience unexpected mechanical downtime.',
      icon: Activity,
      facts: [
        '24/7 Breakdown & Emergency Response',
        'Preventive health checks & lubrication cycles',
        'Digital AMC tracking & service history logs',
        'Legacy crane VFD & radio control modernization',
        'OSHA compliant safety certifications'
      ]
    },
    {
      id: '4',
      title: 'SITE INSTALLATION',
      path: '/craneinstall',
      description: 'Expert erection and commissioning services. Our certified rapid-response teams manage the entire deployment lifecycle, from initial site structural survey to final load testing and handover.',
      icon: Truck,
      facts: [
        'Certified structural alignment protocols',
        'In-house heavy transport & logistics fleet',
        'On-site load testing up to 125% SWL',
        'Turnkey commissioning across 700+ global hubs',
        'Strict adherence to industrial safety matrix'
      ]
    }
  ];

  return (
    <div className="flex flex-col w-full bg-dark text-white font-sans overflow-x-hidden pt-28">
      
      {/* 1. HEIGL-STYLE PAGE HEADER */}
      <section className="py-24 px-6 lg:px-16 border-b border-white/5">
        <motion.div 
          initial="hidden" animate="visible" variants={fadeUp}
          className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between gap-16"
        >
          <div className="text-primary font-bold text-sm tracking-widest uppercase shrink-0">
            | Services
          </div>
          <div className="max-w-3xl space-y-8">
            <h1 className="text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1] text-white">
              We take over the complete process of heavy engineering.
            </h1>
            <p className="text-xl text-white/60 font-medium leading-relaxed">
              From structural cutting and fabrication to advanced PLC automation, mechanical processing, and final site installation of the industrial nodes.
            </p>
          </div>
        </motion.div>
      </section>

      {/* 2. HEIGL-STYLE SERVICE BLOCKS (Horizontal Rows) */}
      <section className="bg-dark">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <motion.div 
              key={service.id} 
              variants={fadeUp}
              className="border-b border-white/5 relative group"
            >
              {/* Highlight bar on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-24 flex flex-col lg:flex-row gap-12 lg:gap-16">
                
                {/* Left Column: Number & Description */}
                <div className="w-full lg:w-[45%] flex gap-6 lg:gap-8">
                  <span className="text-sm font-bold text-white/30 pt-2 shrink-0">#{service.id}</span>
                  <div className="space-y-8">
                    <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white">{service.title}</h2>
                    <p className="text-white/60 text-lg leading-relaxed font-medium">
                      {service.description}
                    </p>
                    <Link to={service.path} className="inline-flex items-center gap-3 text-primary font-bold text-sm hover:text-primary-light transition-colors">
                      View all specifications <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
                
                {/* Middle Column: Faux 3D Image Card */}
                <div className="w-full lg:w-[25%] flex items-center justify-center">
                  <div className="w-full aspect-square bg-[#3b82f6]/10 flex items-center justify-center border border-white/5 relative overflow-hidden group-hover:bg-[#3b82f6]/20 transition-colors duration-500">
                     <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
                     {/* Faux 3D Tool Icon */}
                     <service.icon 
                        size={100} 
                        strokeWidth={0.8} 
                        className="text-primary drop-shadow-[0_20px_30px_rgba(30,64,175,0.6)] transform -rotate-12 group-hover:rotate-0 transition-transform duration-700 relative z-10" 
                     />
                  </div>
                </div>

                {/* Right Column: Performance Facts */}
                <div className="w-full lg:w-[30%]">
                  <div className="bg-industrial-gray p-8 h-full border border-white/5 shadow-2xl">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-8">Performance Facts</h3>
                    <ul className="space-y-3">
                      {service.facts.map((fact, idx) => (
                        <li key={idx} className="flex items-center gap-4 bg-dark/60 p-4 border border-white/5 group-hover:border-white/10 transition-colors">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0 shadow-[0_0_8px_#1e40af]"></span> 
                          <span className="text-xs font-bold text-white/80 leading-relaxed">{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. CALL TO ACTION FOOTER BANNER */}
      <section className="hero-blue-gradient py-32 px-6 lg:px-16 border-b border-white/10">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <div className="space-y-6 max-w-2xl">
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter leading-tight">
              Ready to configure your heavy engineering node?
            </h2>
            <p className="text-blue-100 text-lg font-medium leading-relaxed">
              Our technical team is available 24/7 to provide load calculations, site feasibility studies, and custom automation architecture.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Link to="/quote" className="industrial-button-primary bg-white text-primary hover:bg-gray-100 shadow-2xl text-center">
              Request Quote
            </Link>
            <Link to="/contact" className="industrial-button-outline text-center">
              Contact Engineering
            </Link>
          </div>
        </motion.div>
      </section>
      
    </div>
  );
}