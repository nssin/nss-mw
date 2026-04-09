import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Network, 
  ChevronRight, 
  Building2, 
  Construction, 
  Wrench, 
  Cpu, 
  ShieldCheck, 
  FileText, 
  Users, 
  Activity,
  Briefcase,
  Zap,
  LayoutGrid
} from 'lucide-react';

/**
 * Sitemap Component
 * Features: 
 * - Full visual tree of all 44+ industrial routes.
 * - Staggered animations for category clusters.
 * - Real-world path mapping for the Naidu Solutions ecosystem.
 */

const SITEMAP_STRUCTURE = [
  {
    category: "Corporate & Identity",
    icon: Building2,
    links: [
      { name: "About Naidu Solutions", path: "/about" },
      { name: "Our Expert Team", path: "/team" },
      { name: "Vision & Mission", path: "/visionmission" },
      { name: "Certifications", path: "/certifications" },
      { name: "Safety Standards", path: "/safety" },
      { name: "Careers", path: "/careers" },
      { name: "Industries Served", path: "/industries" },
      { name: "Client Testimonials", path: "/testimonials" }
    ]
  },
  {
    category: "Crane Engineering",
    icon: Construction,
    links: [
      { name: "All Crane Services", path: "/services" },
      { name: "EOT Cranes (Overhead)", path: "/services/eot-crane" },
      { name: "Single Girder Cranes", path: "/services/single-girder" },
      { name: "Double Girder Cranes", path: "/services/double-girder" },
      { name: "Jib Crane Solutions", path: "/services/jib-crane" },
      { name: "Gantry Crane Systems", path: "/services/gantry-crane" },
      { name: "Installation & Erection", path: "/craneinstall" },
      { name: "Custom Engineering", path: "/customeng" }
    ]
  },
  {
    category: "Maintenance & Support",
    icon: Wrench,
    links: [
      { name: "General Maintenance", path: "/cranemaintenance" },
      { name: "Annual Contracts (AMC)", path: "/services/amc" },
      { name: "AMC Tracking", path: "/amctracking" },
      { name: "Service History", path: "/servicehistory" },
      { name: "Modernization/Retrofit", path: "/modernization" },
      { name: "24/7 Breakdown Repair", path: "/breakdown" },
      { name: "Book Maintenance", path: "/book-service" },
      { name: "Emergency SOS", path: "/emergency" }
    ]
  },
  {
    category: "Automation & Digital",
    icon: Cpu,
    links: [
      { name: "Industrial Automation", path: "/industrialauto" },
      { name: "PLC Programming", path: "/plc" },
      { name: "Control Panel Fabrication", path: "/controlpanels" },
      { name: "Roof Profile Machines", path: "/roofprofile" },
      { name: "IoT Smart Dashboards", path: "/dashboard" },
      { name: "Engineering Case Studies", path: "/case-studies" },
      { name: "Projects Gallery", path: "/gallery" },
      { name: "Industrial Blog", path: "/blog" }
    ]
  },
  {
    category: "Procurement Tools",
    icon: Briefcase,
    links: [
      { name: "Request for Quote (RFQ)", path: "/rfq" },
      { name: "Instant Cost Estimator", path: "/quote" },
      { name: "Technical Consultation", path: "/consult" },
      { name: "Lead Generation Portal", path: "/quote" },
      { name: "Live Project Tracking", path: "/my-projects" },
      { name: "Client Login", path: "/login" },
      { name: "Document Center", path: "/documents" },
      { name: "Billing & Invoices", path: "/invoices" }
    ]
  },
  {
    category: "Compliance & Help",
    icon: ShieldCheck,
    links: [
      { name: "Privacy Policy", path: "/privacy-policy" },
      { name: "Terms & Conditions", path: "/terms" },
      { name: "Cookie Management", path: "/cookie" },
      { name: "Technical FAQ", path: "/faq" },
      { name: "Contact Support", path: "/contact" },
      { name: "Location Map", path: "/contact" },
      { name: "Active Service Requests", path: "/service-requests" },
      { name: "Platform Sitemap", path: "/sitemap" }
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Sitemap() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-500 pb-24">
      {/* Dynamic Header Section */}
      <section className="bg-primary py-20 px-4 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6 border border-white/20 backdrop-blur-md"
          >
            <Network size={18} className="text-secondary" />
            <span className="text-xs font-black uppercase tracking-widest text-blue-100">Global Ecosystem Map</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none">
            Platform <br />Navigation.
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl opacity-90 leading-relaxed">
            A comprehensive index of the Naidu Solutions architecture. Access any module across our engineering, automation, and maintenance hierarchy.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-5 translate-x-1/4 translate-y-1/4">
          <LayoutGrid size={500} />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-12">
        {/* Visual Navigation Tree */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {SITEMAP_STRUCTURE.map((section, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl p-8 md:p-10 group hover:shadow-primary/5 transition-all"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-primary/10 text-primary rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <section.icon size={28} />
                </div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                  {section.category}
                </h2>
              </div>

              <div className="space-y-1">
                {section.links.map((link, lIdx) => (
                  <Link
                    key={lIdx}
                    to={link.path}
                    className="flex items-center justify-between group/link py-3 px-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
                  >
                    <span className="text-sm font-bold text-gray-600 dark:text-gray-400 group-hover/link:text-primary dark:group-hover/link:text-blue-400 transition-colors">
                      {link.name}
                    </span>
                    <ChevronRight size={16} className="text-gray-300 group-hover/link:text-primary group-hover/link:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Global Statistics & Quick Search */}
        <div className="mt-20 pt-12 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-4xl font-black text-primary">48</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Modules</p>
            </div>
            <div className="w-px h-12 bg-gray-200 dark:bg-gray-800" />
            <div className="text-center">
              <p className="text-4xl font-black text-primary">100%</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Coverage</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Link to="/quote" className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-primary/20">
              Get Quote
            </Link>
            <Link to="/contact" className="border border-primary text-primary dark:text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Diagnostic Footer */}
        <div className="mt-12 p-8 bg-gray-900 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center gap-6 justify-center">
          <Activity size={24} className="text-secondary animate-pulse" />
          <p className="text-sm font-medium text-gray-400 text-center">
            The Naidu Solutions platform map is updated in real-time as new engineering services and digital modules are deployed to the ecosystem.
          </p>
        </div>
      </div>
    </div>
  );
}