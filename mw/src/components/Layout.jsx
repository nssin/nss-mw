import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, MapPin, Phone, Mail, Facebook, Linkedin, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout() {
  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false); // Close mobile menu on navigation
  }, [location.pathname]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* 1. TOP BAR (Contact & Language) */}
      <div className="bg-primary text-white text-xs py-2 hidden md:block">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex space-x-6">
               <a href="mailto:sales.nss@tuta.io" className="flex items-center hover:text-secondary transition-colors">
                  <Mail className="w-3 h-3 mr-1.5" /> sales.nss@tuta.io
               </a>
               <a href="tel:+919049994500" className="flex items-center hover:text-secondary transition-colors">
                  <Phone className="w-3 h-3 mr-1.5" /> +91 90499 94500 (24/7 Breakdown)
               </a>
            </div>
            <div className="flex items-center space-x-4">
               <span className="opacity-70">Language:</span>
               <button onClick={() => changeLanguage('en')} className={`hover:text-secondary ${i18n.language === 'en' ? 'text-secondary font-bold' : ''}`}>EN</button>
               <button onClick={() => changeLanguage('hi')} className={`hover:text-secondary ${i18n.language === 'hi' ? 'text-secondary font-bold' : ''}`}>HI</button>
               <button onClick={() => changeLanguage('mr')} className={`hover:text-secondary ${i18n.language === 'mr' ? 'text-secondary font-bold' : ''}`}>MR</button>
            </div>
         </div>
      </div>

      {/* 2. MAIN NAVIGATION HEADER */}
      <header className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-black text-xl group-hover:bg-secondary transition-colors">
               N
            </div>
            <div className="flex flex-col">
               <span className="text-xl font-black text-gray-900 dark:text-white leading-tight tracking-tight">Naidu Solutions</span>
               <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Engineering & Services</span>
            </div>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-8 items-center font-semibold text-sm">
            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition-colors">About Us</Link>
            
            {/* Simple dropdown simulation for standard layout */}
            <div className="relative group cursor-pointer">
               <span className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition-colors py-8">{t('services')}</span>
               <div className="absolute top-10 left-0 w-64 bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
                  <div className="p-4 grid gap-2">
                     <span className="text-xs font-black text-gray-400 uppercase tracking-wider mb-1">Cranes</span>
                     <Link to="/services/eot-crane" className="text-sm p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">EOT Cranes</Link>
                     <Link to="/services/single-girder" className="text-sm p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">Single Girder</Link>
                     <Link to="/services/double-girder" className="text-sm p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">Double Girder</Link>
                     <span className="text-xs font-black text-gray-400 uppercase tracking-wider mt-2 mb-1">Automation</span>
                     <Link to="/industrialauto" className="text-sm p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">PLC & VFD Integration</Link>
                     <span className="text-xs font-black text-gray-400 uppercase tracking-wider mt-2 mb-1">Support</span>
                     <Link to="/services/amc" className="text-sm p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">Annual Maintenance (AMC)</Link>
                  </div>
               </div>
            </div>

            <Link to="/certifications" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition-colors">Certifications</Link>
            <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition-colors">Contact</Link>
            
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
            
            <Link to="/quote" className="text-primary dark:text-secondary hover:opacity-80 transition-opacity">Get Quote</Link>
            <Link to="/login" className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-primary dark:hover:bg-gray-200 transition-colors shadow-sm">Client Login</Link>
            
            <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center space-x-4">
             <button onClick={toggleTheme} className="p-2 text-gray-600 dark:text-gray-300">
               {darkMode ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             <button className="text-gray-900 dark:text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
               {menuOpen ? <X size={28} /> : <Menu size={28} />}
             </button>
          </div>
        </div>
        
        {/* Mobile Nav Dropdown */}
        <AnimatePresence>
         {menuOpen && (
           <motion.div 
             initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
             className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 overflow-hidden"
           >
             <div className="p-4 flex flex-col space-y-4 font-semibold text-gray-900 dark:text-white">
               <Link to="/about" className="p-2 border-b border-gray-100 dark:border-gray-700">About Us</Link>
               <Link to="/services" className="p-2 border-b border-gray-100 dark:border-gray-700">All Services</Link>
               <Link to="/services/eot-crane" className="p-2 pl-6 text-gray-600 dark:text-gray-400 text-sm">EOT Cranes</Link>
               <Link to="/industrialauto" className="p-2 pl-6 text-gray-600 dark:text-gray-400 text-sm">Industrial Automation</Link>
               <Link to="/services/amc" className="p-2 pl-6 text-gray-600 dark:text-gray-400 text-sm border-b border-gray-100 dark:border-gray-700">AMC</Link>
               <Link to="/certifications" className="p-2 border-b border-gray-100 dark:border-gray-700">Certifications</Link>
               <Link to="/contact" className="p-2 border-b border-gray-100 dark:border-gray-700">Contact Us</Link>
               
               <div className="grid grid-cols-2 gap-4 pt-4">
                  <Link to="/quote" className="p-3 text-center border-2 border-primary text-primary dark:border-secondary dark:text-secondary rounded-lg">Get Quote</Link>
                  <Link to="/login" className="p-3 text-center bg-primary text-white rounded-lg">Client Login</Link>
               </div>
               
               <div className="flex justify-center space-x-6 pt-6 pb-2 text-sm">
                  <button onClick={() => changeLanguage('en')} className={`${i18n.language === 'en' ? 'text-primary dark:text-secondary' : 'text-gray-500'}`}>EN</button>
                  <button onClick={() => changeLanguage('hi')} className={`${i18n.language === 'hi' ? 'text-primary dark:text-secondary' : 'text-gray-500'}`}>HI</button>
                  <button onClick={() => changeLanguage('mr')} className={`${i18n.language === 'mr' ? 'text-primary dark:text-secondary' : 'text-gray-500'}`}>MR</button>
               </div>
             </div>
           </motion.div>
         )}
        </AnimatePresence>
      </header>

      {/* 3. MAIN CONTENT INJECTION POINT */}
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>

      {/* 4. CORPORATE FOOTER WITH REAL DATA */}
      <footer className="bg-[#0B1121] text-gray-300 pt-16 pb-8 border-t-4 border-secondary mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
             
             {/* Corporate Identity */}
             <div className="space-y-6">
               <div className="flex items-center space-x-2">
                 <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-black">N</div>
                 <span className="text-xl font-black text-white leading-tight tracking-tight">Naidu Solutions</span>
               </div>
               <p className="text-sm text-gray-400 leading-relaxed">
                 Nashik's premier manufacturer of IS compliant material handling equipment and intelligent PLC automation architectures. Serving Maharashtra since 2009.
               </p>
               <div className="flex space-x-4 pt-2">
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"><Linkedin className="w-4 h-4 text-white" /></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors"><Facebook className="w-4 h-4 text-white" /></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors"><Instagram className="w-4 h-4 text-white" /></a>
               </div>
             </div>
             
             {/* Engineering Links */}
             <div>
               <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Engineering Services</h4>
               <ul className="space-y-3 text-sm">
                 <li><Link to="/services/eot-crane" className="hover:text-secondary transition-colors flex items-center">EOT Crane Fabrication</Link></li>
                 <li><Link to="/industrialauto" className="hover:text-secondary transition-colors flex items-center">PLC & VFD Integration</Link></li>
                 <li><Link to="/services/single-girder" className="hover:text-secondary transition-colors flex items-center">Single Girder Solutions</Link></li>
                 <li><Link to="/services/double-girder" className="hover:text-secondary transition-colors flex items-center">Double Girder Heavy Duty</Link></li>
                 <li><Link to="/services/amc" className="hover:text-secondary transition-colors flex items-center">Annual Maintenance Contracts</Link></li>
               </ul>
             </div>

             {/* Corporate Links */}
             <div>
               <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Company</h4>
               <ul className="space-y-3 text-sm">
                 <li><Link to="/about" className="hover:text-secondary transition-colors">Our History</Link></li>
                 <li><Link to="/team" className="hover:text-secondary transition-colors">Leadership Team</Link></li>
                 <li><Link to="/certifications" className="hover:text-secondary transition-colors">ISO & IS Compliances</Link></li>
                 <li><Link to="/careers" className="hover:text-secondary transition-colors">Careers & Recruitment</Link></li>
                 <li><Link to="/contact" className="hover:text-secondary transition-colors">Contact Headquarters</Link></li>
               </ul>
             </div>

             {/* Direct Contact (Nanded HQ) */}
             <div>
               <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Consultation Quarters</h4>
               <ul className="space-y-4 text-sm">
                 <li className="flex items-start">
                    <MapPin className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                    <span className="text-gray-400">121 Kissan Nagar, 1st Floor<br/>CIDCO, Nanded<br/>Maharashtra 431603</span>
                 </li>
                 <li className="flex items-start">
                    <Phone className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                    <div>
                       <a href="tel:+919049994500" className="block hover:text-white transition-colors">+91 90499 94500 (Founder)</a>
                       <a href="tel:+919822488532" className="block hover:text-white transition-colors mt-1">+91 98224 88532 (Co-Founder)</a>
                    </div>
                 </li>
                 <li className="flex items-start">
                    <Mail className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                    <a href="mailto:sales.nss@tuta.io" className="hover:text-white transition-colors">sales.nss@tuta.io</a>
                 </li>
               </ul>
             </div>
             
           </div>

           {/* Legal & Copyright */}
           <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
              <p>&copy; {new Date().getFullYear()} Naidu Solutions & Services. All Rights Reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                 <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                 <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                 <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
              </div>
           </div>
           
        </div>
      </footer>
    </div>
  );
}