import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Phone, Mail } from 'lucide-react';

/**
 * Global Industrial Footer Component
 * Implements the HEIGL-style dark footer structure, 
 * maintaining real NSS-MW company data and navigation links.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-industrial-black pt-24 pb-12 px-6 lg:px-16 border-t border-white/5 mt-auto relative z-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* 1. Brand & Identity Column */}
          <div className="space-y-6">
             <h3 className="text-3xl font-black tracking-widest text-white uppercase">NSS-MW</h3>
             <p className="text-white/50 text-sm leading-relaxed max-w-sm font-medium">
               Specialized manufacturer of heavy-duty EOT cranes and contract manufacturer in mechanical engineering. Quality operations since 2005.
             </p>
             <Link 
               to="/quote" 
               className="inline-flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest border-b border-white pb-1 hover:text-primary hover:border-primary transition-all mt-4 group"
             >
               Start a Project <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>

          {/* 2. Core Services Links */}
          <div className="space-y-6">
             <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-6">Services</h4>
             <ul className="space-y-4 text-sm font-medium text-white/80">
               <li><Link to="/services/eot-crane" className="hover:text-primary transition-colors">EOT Crane Fabrication</Link></li>
               <li><Link to="/industrialauto" className="hover:text-primary transition-colors">Industrial Automation</Link></li>
               <li><Link to="/craneinstall" className="hover:text-primary transition-colors">Site Installation</Link></li>
               <li><Link to="/services/amc" className="hover:text-primary transition-colors">Maintenance Contracts</Link></li>
             </ul>
          </div>

          {/* 3. Company & Corporate Links */}
          <div className="space-y-6">
             <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-6">Company</h4>
             <ul className="space-y-4 text-sm font-medium text-white/80">
               <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
               <li><Link to="/case-studies" className="hover:text-primary transition-colors">Project References</Link></li>
               <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
               <li><Link to="/safety" className="hover:text-primary transition-colors">Safety Standards</Link></li>
             </ul>
          </div>

          {/* 4. Contact & Location Information */}
          <div className="space-y-6">
             <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-6">Contact</h4>
             <ul className="space-y-4 text-sm font-medium text-white/80">
               <li className="flex items-start gap-4">
                 <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                 <span className="leading-relaxed">Industrial Hub 24,<br/>Pune, Maharashtra, India</span>
               </li>
               <li className="flex items-center gap-4">
                 <Phone size={18} className="text-primary shrink-0" />
                 <span className="font-mono">+91 98765 43210</span>
               </li>
               <li className="flex items-center gap-4">
                 <Mail size={18} className="text-primary shrink-0" />
                 <span>operations@nss-mw.com</span>
               </li>
             </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Strip */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex gap-6 text-[10px] font-bold uppercase tracking-[0.1em] text-white/40">
             <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
             <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
             <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
           </div>
           <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/40">
             © {currentYear} NSS-MW Engineering. All rights reserved.
           </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;