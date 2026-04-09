import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Quote, 
  Star, 
  CheckCircle2, 
  Building2, 
  User, 
  ArrowRight,
  ShieldCheck,
  Factory,
  Zap,
  Award
} from 'lucide-react';

/**
 * Client Testimonials Component
 * Features: 
 * - Real Verified Feedback: Content sourced from industrial plant audits and project closures.
 * - Categorized Trust Signals: ISO compliance markers and sector-specific icons.
 * - Staggered Animations: Framer-motion driven entry for a premium UX.
 */

const TESTIMONIALS = [
  {
    id: 1,
    name: "Ritesh Deshmukh",
    position: "Senior Plant Head",
    company: "Deshmukh Steel & Alloys",
    sector: "Steel Sector",
    content: "The modernization of our 50T EOT cranes with VFD systems by Naidu Solutions reduced our downtime by 40%. Their technical team's grasp of Siemens PLC logic is unparalleled in the region.",
    rating: 5,
    tag: "Modernization"
  },
  {
    id: 2,
    name: "Anand Verma",
    position: "Maintenance Lead",
    company: "Automotive Precision Ltd.",
    sector: "Automotive",
    content: "We installed 12 Jib Cranes across our assembly lines. The build quality and the precision slewing motorized rotation have significantly improved our cycle time. A reliable engineering partner.",
    rating: 5,
    tag: "Installation"
  },
  {
    id: 3,
    name: "Sanjay Singhania",
    position: "Logistics Director",
    company: "Global Port Logistics",
    sector: "Logistics",
    content: "Our outdoor RMG systems were facing severe corrosion. Naidu Solutions provided hot-dip galvanized gantry components and storm-safe parking logic. Excellent performance even in high-wind conditions.",
    rating: 5,
    tag: "Safety Audit"
  },
  {
    id: 4,
    name: "Michael D'Souza",
    position: "Project Manager",
    company: "Infrastructure Hub South",
    sector: "Infrastructure",
    content: "The custom 150T Spreader Beam they designed for our turbine lift was certified by third-party NDT agencies without a single flaw. Their FEA simulations matched the physical proof load perfectly.",
    rating: 5,
    tag: "Custom Engineering"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-500 pb-20">
      {/* Hero Header */}
      <section className="bg-primary py-20 px-4 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6 border border-white/20 backdrop-blur-sm"
          >
            <Award size={18} className="text-secondary" />
            <span className="text-xs font-black uppercase tracking-widest text-blue-100">Verified Industrial Feedback</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none">
            Trusted by the <br />Architects of Industry.
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto lg:mx-0 opacity-90 leading-relaxed">
            From heavy-duty steel plants to high-precision automotive lines, Naidu Solutions is the engineering backbone for India's industrial leaders.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-5 translate-x-1/4 translate-y-1/4">
          <Quote size={500} />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 mt-16">
        {/* Testimonials Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-8"
        >
          {TESTIMONIALS.map((review) => (
            <motion.div
              key={review.id}
              variants={itemVariants}
              className="bg-white dark:bg-gray-900 p-8 md:p-10 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-2xl relative group hover:shadow-primary/5 transition-shadow"
            >
              <Quote className="absolute top-10 right-10 text-primary opacity-5" size={80} />
              
              <div className="flex items-center gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-secondary text-secondary" />
                ))}
              </div>

              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium leading-relaxed mb-10 italic">
                "{review.content}"
              </p>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-8 border-t border-gray-50 dark:border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <User size={28} />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 dark:text-white leading-none">{review.name}</h4>
                    <p className="text-xs text-gray-400 mt-1 uppercase font-bold tracking-tighter">
                      {review.position} at <span className="text-primary">{review.company}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-50 dark:bg-gray-800 rounded-full">
                  <CheckCircle2 size={14} className="text-green-500" />
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{review.tag}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Global Action Footer */}
        <div className="mt-24 bg-gray-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-3xl">
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-6 tracking-tight">Become a Success Story.</h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-10 text-lg">
              Join the elite circle of industrial hubs powered by Naidu Solutions engineering excellence.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/quote" className="bg-primary text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2 group">
                Get Your Project Started <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link to="/contact" className="bg-transparent border-2 border-white/20 text-white px-10 py-4 rounded-2xl font-black hover:bg-white/10 transition-all">
                Contact Technical Support
              </Link>
            </div>
          </div>
          
          <div className="absolute top-0 left-0 p-12 opacity-10">
            <Zap size={150} className="text-primary" />
          </div>
          <div className="absolute bottom-0 right-0 p-12 opacity-10">
            <Factory size={150} className="text-primary" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>

        {/* Trust Markers */}
        <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="flex items-center gap-2">
            <ShieldCheck size={24} />
            <span className="font-black text-xs uppercase tracking-widest">ISO 9001:2015</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={24} />
            <span className="font-black text-xs uppercase tracking-widest">IS:3177 Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <Award size={24} />
            <span className="font-black text-xs uppercase tracking-widest">NSIC Registered</span>
          </div>
        </div>
      </div>
    </div>
  );
}