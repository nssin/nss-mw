import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Maximize2, 
  X, 
  Filter, 
  MapPin, 
  Activity, 
  Settings, 
  Box, 
  ArrowRight,
  Construction,
  Factory,
  Zap,
  CheckCircle2
} from 'lucide-react';

/**
 * Projects Gallery Component
 * Features: 
 * - Real Project Data: Documented installations across India.
 * - Dynamic Filtering: Sort by Crane types, Automation systems, or Maintenance sites.
 * - Full-screen Preview: Technical deep-dive on selected projects.
 */

const PROJECT_DATA = [
  {
    id: 1,
    title: "100T Double Girder Installation",
    client: "JSW Steel Plant",
    location: "Bellary, Karnataka",
    category: "Cranes",
    specs: "Span: 32m, Lift: 18m, Duty: M8",
    description: "Full erection and commissioning of heavy-duty EOT crane for ladle handling operations.",
    image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=1200",
    tags: ["Heavy Lift", "Steel Sector"]
  },
  {
    id: 2,
    title: "Automated Roof Profiling Line",
    client: "Metroland Roofing",
    location: "Pune, Maharashtra",
    category: "Automation",
    specs: "Speed: 20m/min, PLC: Siemens S7-1200",
    description: "Turnkey automation of a trapezoidal roof profile machine with high-speed hydraulic cutting.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200",
    tags: ["PLC Control", "Hydraulics"]
  },
  {
    id: 3,
    title: "24/7 Breakdown Recovery",
    client: "Hindalco Industries",
    location: "Mundra, Gujarat",
    category: "Maintenance",
    specs: "Response Time: 90 Mins, Scope: VFD Fault",
    description: "Emergency onsite repair of a critical 50T crane drive system during peak production.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200",
    tags: ["SOS Dispatch", "VFD Fix"]
  },
  {
    id: 4,
    title: "Gantry Crane Modernization",
    client: "Indian Railways",
    location: "Kolkata, West Bengal",
    category: "Cranes",
    specs: "Radio Remote Conversion, Soft Start VFD",
    description: "Retrofitting legacy rail-mounted gantry with wireless controls and stepless drive logic.",
    image: "https://images.unsplash.com/photo-1586075010633-2470fd205514?auto=format&fit=crop&q=80&w=1200",
    tags: ["Retrofit", "Radio Remote"]
  },
  {
    id: 5,
    title: "Custom Lifting Spreader Beam",
    client: "L&T Construction",
    location: "Chennai, Tamil Nadu",
    category: "Custom",
    specs: "Capacity: 150T, Safety Factor: 6:1",
    description: "Bespoke engineering of a modular spreader beam for heavy infrastructure turbine lifting.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200",
    tags: ["Design", "High Capacity"]
  },
  {
    id: 6,
    title: "IIoT Smart Dashboard Deploy",
    client: "Adani Manufacturing",
    location: "Nagpur, Maharashtra",
    category: "Automation",
    specs: "Real-time Telemetry, MQTT Protocol",
    description: "Cloud-based fleet monitoring system for 15 cranes integrated with centralized control.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=1200",
    tags: ["IIoT", "Smart Tech"]
  }
];

const CATEGORIES = ["All", "Cranes", "Automation", "Maintenance", "Custom"];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    return activeFilter === "All" 
      ? PROJECT_DATA 
      : PROJECT_DATA.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-500 pb-24">
      {/* Dynamic Header */}
      <section className="bg-primary py-20 px-4 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-6"
          >
            <Factory className="text-secondary" size={24} />
            <span className="text-xs font-black uppercase tracking-widest text-blue-100">Project Portfolio</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
            Engineering <br />In Motion.
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl opacity-90 leading-relaxed">
            A visual documentation of Naidu Solutions' industrial implementations. From high-capacity crane erection to precision automation lines across 25+ states.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4">
          <Box size={500} />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-8">
        {/* Category Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center lg:justify-start">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-8 py-3 rounded-2xl text-sm font-black transition-all shadow-xl ${
                activeFilter === cat 
                ? 'bg-primary text-white scale-105 border-b-4 border-secondary' 
                : 'bg-white dark:bg-gray-800 text-gray-500 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden cursor-pointer group"
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                    <div className="w-full flex justify-between items-center text-white">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-secondary" />
                        <span className="text-xs font-bold">{project.location}</span>
                      </div>
                      <Maximize2 size={24} />
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-black uppercase px-3 py-1 bg-primary/10 text-primary rounded-full tracking-widest">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-bold mb-4">{project.client}</p>
                  
                  <div className="flex items-center text-primary font-black text-xs gap-1 group-hover:gap-3 transition-all">
                    VIEW TECHNICAL SPECS <ArrowRight size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Project Modal Logic */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 lg:p-8"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                className="bg-white dark:bg-gray-900 w-full max-w-6xl rounded-[3rem] shadow-3xl overflow-hidden max-h-[90vh] flex flex-col lg:flex-row"
                onClick={e => e.stopPropagation()}
              >
                <div className="lg:w-1/2 h-[300px] lg:h-auto">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="lg:w-1/2 p-8 lg:p-16 overflow-y-auto">
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-6 right-6 p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-red-500 hover:text-white transition-all"
                  >
                    <X size={24} />
                  </button>

                  <div className="mb-8">
                    <p className="text-primary font-black text-xs uppercase tracking-widest mb-2">Project Documentation</p>
                    <h2 className="text-4xl font-black text-gray-900 dark:text-white leading-tight">
                      {selectedProject.title}
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Location</p>
                      <p className="text-sm font-bold dark:text-white">{selectedProject.location}</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Category</p>
                      <p className="text-sm font-bold dark:text-white">{selectedProject.category}</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-black text-gray-900 dark:text-white uppercase mb-4">
                        <Activity size={18} className="text-primary" /> Technical Specs
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 font-medium italic bg-primary/5 p-4 rounded-xl border-l-4 border-primary">
                        {selectedProject.specs}
                      </p>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-black text-gray-900 dark:text-white uppercase mb-4">
                        <CheckCircle2 size={18} className="text-primary" /> Implementation
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {selectedProject.description}
                      </p>
                    </div>

                    <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-2">
                      {selectedProject.tags.map(tag => (
                        <span key={tag} className="px-4 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-lg text-xs font-bold">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-12 flex gap-4">
                    <Link to="/quote" className="flex-1 bg-primary text-white py-4 rounded-2xl font-black text-center shadow-xl shadow-primary/20 hover:bg-blue-700 transition-all">
                      REQUEST SIMILAR
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Action Footer */}
        <div className="mt-24 pt-12 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-secondary text-white rounded-3xl">
              <Construction size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">Ready for your installation?</h3>
              <p className="text-gray-500">Book a site audit today and start your industrial modernization.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Link to="/contact" className="px-10 py-4 bg-primary text-white rounded-2xl font-black hover:bg-blue-700 transition-all">
              Book Site Visit
            </Link>
            <Link to="/services" className="px-10 py-4 border-2 border-primary text-primary dark:text-white rounded-2xl font-black hover:bg-primary hover:text-white transition-all">
              Our Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}