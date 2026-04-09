import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Settings, 
  Shield, 
  Zap, 
  Wrench, 
  Cpu, 
  FileText, 
  ArrowRight, 
  Construction, 
  Activity, 
  Maximize, 
  Factory,
  Layers
} from 'lucide-react';

/**
 * All Engineering Services Component
 * Features: Real-time search indexing, Category-based filtering, 
 * Hover-state animations, and comprehensive service mapping.
 */

const categories = [
  { id: 'all', label: 'All Services' },
  { id: 'cranes', label: 'Crane Solutions' },
  { id: 'maintenance', label: 'Maintenance & AMC' },
  { id: 'automation', label: 'Industrial Automation' },
  { id: 'consulting', label: 'Tools & Consulting' },
];

const serviceList = [
  // Crane Solutions
  { id: 'eotcrane', title: 'EOT Cranes', category: 'cranes', icon: Construction, desc: 'Heavy-duty Overhead Travelling Cranes for high-capacity material handling.' },
  { id: 'singlegirder', title: 'Single Girder Cranes', category: 'cranes', icon: Layers, desc: 'Cost-effective lifting solutions for light to medium industrial applications.' },
  { id: 'doublegirder', title: 'Double Girder Cranes', category: 'cranes', icon: Maximize, desc: 'Robust lifting for heavy loads with maximum height and span.' },
  { id: 'jibcrane', title: 'Jib Cranes', category: 'cranes', icon: RotateCw, desc: 'Localized lifting solutions for workstations and assembly lines.' },
  { id: 'gantrycrane', title: 'Gantry Cranes', category: 'cranes', icon: Factory, desc: 'Self-supported outdoor and indoor portal crane systems.' },
  { id: 'craneinstall', title: 'Crane Installation', category: 'cranes', icon: Settings, desc: 'Professional site erection and structural alignment services.' },
  
  // Maintenance
  { id: 'cranemaintenance', title: 'General Maintenance', category: 'maintenance', icon: Wrench, desc: 'Preventive health checks and lubrication cycles for crane longevity.' },
  { id: 'amc', title: 'Annual Maintenance (AMC)', category: 'maintenance', icon: Shield, desc: 'Comprehensive yearly contracts for 100% operational uptime.' },
  { id: 'modernization', title: 'Crane Modernization', category: 'maintenance', icon: Zap, desc: 'Upgrading legacy systems with VFDs and wireless controls.' },
  { id: 'breakdown', title: 'Breakdown Repair', category: 'maintenance', icon: Activity, desc: '24/7 emergency response for critical industrial repairs.' },
  { id: 'amctracking', title: 'AMC Status Tracking', category: 'maintenance', icon: FileText, desc: 'Digital logs for service history and upcoming schedules.' },
  { id: 'servicehistory', title: 'Service History', category: 'maintenance', icon: Clock, desc: 'Access archived maintenance reports and safety certificates.' },

  // Automation
  { id: 'industrialauto', title: 'Industrial Automation', category: 'automation', icon: Cpu, desc: 'End-to-end automation for manufacturing lines and material flow.' },
  { id: 'plc', title: 'PLC Programming', category: 'automation', icon: Settings, desc: 'Logic control systems for Siemens, Rockwell, and Schneider systems.' },
  { id: 'controlpanels', title: 'Custom Control Panels', category: 'automation', icon: Zap, desc: 'Fabrication of VFD, APFC, and custom PLC control panels.' },
  { id: 'roofprofile', title: 'Roof Profile Machines', category: 'automation', icon: Factory, desc: 'Automation for roofing and trapezoidal profiling equipment.' },
  
  // Consulting & Tools
  { id: 'rfq', title: 'Request Quote (RFQ)', category: 'consulting', icon: FileText, desc: 'Detailed technical specification submission for project bids.' },
  { id: 'costestimator', title: 'Cost Estimator', category: 'consulting', icon: Activity, desc: 'Real-time pricing estimation based on crane capacity and span.' },
  { id: 'consult', title: 'Engineering Consult', category: 'consulting', icon: Shield, desc: 'Expert site visits and feasibility studies for new installations.' },
];

// Fallback icons for dynamic list
function RotateCw(props) { return <Settings {...props} className={props.className + " rotate-90"} />; }
function Clock(props) { return <Activity {...props} />; }

export default function Services() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = useMemo(() => {
    return serviceList.filter(service => {
      const matchesTab = activeTab === 'all' || service.category === activeTab;
      const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           service.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pb-20">
      {/* Hero Header */}
      <div className="bg-primary dark:bg-blue-900 text-white py-16 px-4 mb-12 shadow-inner">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
            Engineering Excellence Catalog
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl opacity-90">
            Precision-engineered crane solutions, automation architecture, and 24/7 maintenance services for the 2026 industrial landscape.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Controls: Filter & Search */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center justify-between">
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  activeTab === cat.id 
                  ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search services..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-gray-900 dark:text-white shadow-sm"
            />
          </div>
        </div>

        {/* Results Count */}
        <p className="mb-8 text-sm text-gray-500 dark:text-gray-400 font-medium">
          Showing {filteredServices.length} of {serviceList.length} Engineering Modules
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Link 
              to={`/services/${service.id}`} 
              key={service.id}
              className="group bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/5 transform hover:-translate-y-2 relative overflow-hidden flex flex-col h-full"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <service.icon size={80} />
              </div>

              <div className="mb-6 w-14 h-14 bg-gray-50 dark:bg-gray-900 rounded-2xl flex items-center justify-center text-primary dark:text-blue-400 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                <service.icon size={28} />
              </div>

              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                {service.desc}
              </p>

              <div className="flex items-center text-primary dark:text-blue-400 font-bold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                Explore Solution <ArrowRight className="ml-2" size={16} />
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700">
            <Search className="mx-auto text-gray-300 dark:text-gray-600 mb-4" size={48} />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No engineering modules found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or search keywords.</p>
          </div>
        )}

        {/* Quick Actions Footer */}
        <div className="mt-16 bg-gray-900 dark:bg-primary p-12 rounded-[2rem] shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-white mb-2">Can't find a specific configuration?</h2>
              <p className="text-blue-100 opacity-80">Our engineering team designs bespoke solutions for unique industrial requirements.</p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/quote" className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-black hover:bg-gray-100 transition-all shadow-xl hover:scale-105 active:scale-95">
                Request Custom Quote
              </Link>
              <Link to="/contact" className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-2xl font-black hover:bg-white/20 transition-all backdrop-blur-sm">
                Technical Support
              </Link>
            </div>
          </div>
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}