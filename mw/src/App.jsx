import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation, Outlet, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { 
  Zap, User, Globe, HardHat, Activity, Hammer, Cpu, ArrowRight, Mail, Phone, MapPin, 
  ChevronRight, Menu, X, Search, Info, Settings, ShieldAlert, Truck, Box, Layers
} from 'lucide-react';
import { cn } from './lib/utils';

// --- DYNAMIC COMPONENT IMPORTS ---
// Standardized directory structure: src/pages/[PageName]/index.jsx
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const QuoteGenerator = lazy(() => import('./pages/QuoteGenerator'));
const About = lazy(() => import('./pages/About'));
const Team = lazy(() => import('./pages/Team'));
const VisionMission = lazy(() => import('./pages/VisionMission'));
const Certifications = lazy(() => import('./pages/Certifications'));
const Safety = lazy(() => import('./pages/Safety'));
const Industries = lazy(() => import('./pages/Industries'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Careers = lazy(() => import('./pages/Careers'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));
const Services = lazy(() => import('./pages/Services'));
const SingleGirder = lazy(() => import('./pages/SingleGirder'));
const DoubleGirder = lazy(() => import('./pages/DoubleGirder'));
const JibCrane = lazy(() => import('./pages/JibCrane'));
const GantryCrane = lazy(() => import('./pages/GantryCrane'));
const CraneInstall = lazy(() => import('./pages/CraneInstall'));
const CustomEng = lazy(() => import('./pages/CustomEng'));
const RoofProfile = lazy(() => import('./pages/RoofProfile'));
const IndustrialAuto = lazy(() => import('./pages/IndustrialAuto'));
const PLC = lazy(() => import('./pages/PLC'));
const ControlPanels = lazy(() => import('./pages/ControlPanels'));
const CraneMaintenance = lazy(() => import('./pages/CraneMaintenance'));
const AMC = lazy(() => import('./pages/AMC'));
const AMCTracking = lazy(() => import('./pages/AMCTracking'));
const ServiceHistory = lazy(() => import('./pages/ServiceHistory'));
const Modernization = lazy(() => import('./pages/Modernization'));
const Breakdown = lazy(() => import('./pages/Breakdown'));
const Emergency = lazy(() => import('./pages/Emergency'));
const BookService = lazy(() => import('./pages/BookService'));
const ServiceRequests = lazy(() => import('./pages/ServiceRequests'));
const RFQ = lazy(() => import('./pages/RFQ'));
const CostEstimator = lazy(() => import('./pages/CostEstimator'));
const Consult = lazy(() => import('./pages/Consult'));
const MyProjects = lazy(() => import('./pages/MyProjects'));
const Documents = lazy(() => import('./pages/Documents'));
const Invoices = lazy(() => import('./pages/Invoices'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Cookie = lazy(() => import('./pages/Cookie'));
const Sitemap = lazy(() => import('./pages/Sitemap'));

// --- GLOBAL LAYOUT COMPONENT ---

const Layout = () => {
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => {
      unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-dark text-white font-sans flex flex-col selection:bg-industrial-lime selection:text-black">
      {/* 1. INDUSTRIAL TOP NAVIGATION (Image bab9a3 Style) */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 h-20 flex items-center px-6 lg:px-12",
        isScrolled ? "bg-industrial-black/95 backdrop-blur-md border-b border-white/5 shadow-xl" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-industrial-lime flex items-center justify-center rounded-sm group-hover:rotate-90 transition-transform duration-500">
              <Zap size={22} className="text-black" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase italic">NSS-MW</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {[
              { label: 'Home', to: '/' },
              { label: 'Pages', to: '/sitemap' },
              { label: 'Services', to: '/services' },
              { label: 'Company', to: '/about' },
              { label: 'Projects', to: '/case-studies' }
            ].map((link) => (
              <Link 
                key={link.to} 
                to={link.to} 
                className={cn(
                  "text-[11px] font-bold uppercase tracking-[0.2em] hover:text-industrial-lime transition-colors",
                  location.pathname === link.to ? "text-industrial-lime" : "text-white/70"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <Link to="/contact" className="hidden sm:flex items-center gap-2 text-industrial-lime font-bold text-[11px] uppercase tracking-widest hover:text-white transition-colors">
              <Mail size={16} /> Contact Us
            </Link>
            <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
            {user ? (
              <button onClick={() => signOut(auth)} className="w-10 h-10 rounded-sm bg-industrial-black border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <LogOut size={18} className="text-white/60" />
              </button>
            ) : (
              <Link to="/login" className="w-10 h-10 rounded-sm bg-industrial-lime flex items-center justify-center hover:bg-white transition-colors shadow-lg shadow-industrial-lime/10">
                <User size={18} className="text-black" />
              </Link>
            )}
            <button className="lg:hidden p-2 text-white"><Menu size={24}/></button>
          </div>
        </div>
      </header>

      {/* 2. MAIN VIEWPORT (Enabled natural vertical scrolling) */}
      <main className="flex-1 w-full flex flex-col pt-20">
        <Suspense fallback={
          <div className="h-[70vh] w-full flex flex-col items-center justify-center">
            <div className="relative">
              <Zap size={64} className="text-industrial-lime animate-pulse" />
              <div className="absolute inset-0 bg-industrial-lime/20 blur-2xl rounded-full"></div>
            </div>
            <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">Establishing Node Link...</p>
          </div>
        }>
          <Outlet />
        </Suspense>
      </main>

      {/* 3. INDUSTRIAL FOOTER (Image bac565 Style) */}
      <footer className="bg-industrial-black pt-24 pb-12 px-6 lg:px-12 border-t border-white/5 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="space-y-8">
               <h3 className="text-2xl font-black italic tracking-tighter text-white">NSS-MW</h3>
               <p className="text-white/40 text-sm leading-loose">
                 Global leader in heavy structural engineering, overhead crane system deployment, and custom industrial automation since 2005.
               </p>
               <div className="flex gap-4">
                 {[1,2,3].map(i => <div key={i} className="w-8 h-8 bg-white/5 rounded-sm hover:bg-industrial-lime group cursor-pointer transition-all flex items-center justify-center"><div className="w-1 h-1 bg-white group-hover:bg-black rounded-full"></div></div>)}
               </div>
            </div>

            <div className="space-y-8">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-industrial-lime">Locations</h4>
               <div className="space-y-6">
                 <div>
                   <p className="text-xs font-bold text-white uppercase mb-1">Bangladesh</p>
                   <p className="text-sm text-white/40">Sylhet 3100, BD Nodes</p>
                 </div>
                 <div>
                   <p className="text-xs font-bold text-white uppercase mb-1">New Jersey</p>
                   <p className="text-sm text-white/40">Malioboro Road 70, NJ 08701</p>
                 </div>
               </div>
            </div>

            <div className="space-y-8">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-industrial-lime">Communication</h4>
               <div className="space-y-6">
                  <div>
                    <p className="text-xs font-bold text-white uppercase mb-1">Get In Touch</p>
                    <p className="text-sm text-white/40">Inquiry: hello@nss-mw.com</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white uppercase mb-1">Talk To Us</p>
                    <p className="text-sm text-white/40 font-mono">+8801714457298</p>
                  </div>
               </div>
            </div>

            <div className="space-y-8">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-industrial-lime">Support Nodes</h4>
               <ul className="space-y-4 text-sm text-white/40">
                 <li><Link to="/faq" className="hover:text-white">Help Center</Link></li>
                 <li><Link to="/emergency" className="hover:text-white">Breakdown Node</Link></li>
                 <li><Link to="/documents" className="hover:text-white">Certifications</Link></li>
                 <li><Link to="/privacy-policy" className="hover:text-white">Privacy Protocol</Link></li>
               </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
             <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/20">Developed by NSS Systems Engineering Group</p>
             <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/20">© 2026 NSS-MW Operations. All Nodes Active.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- MAIN APPLICATION ROUTER ---

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Core Navigation Nodes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="quote" element={<QuoteGenerator />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="services" element={<Services />} />

          {/* Product & Service Specialized Nodes */}
          <Route path="services/eot-crane" element={<SingleGirder />} />
          <Route path="services/single-girder" element={<SingleGirder />} />
          <Route path="services/double-girder" element={<DoubleGirder />} />
          <Route path="services/jib-crane" element={<JibCrane />} />
          <Route path="services/gantry-crane" element={<GantryCrane />} />
          <Route path="craneinstall" element={<CraneInstall />} />
          <Route path="customeng" element={<CustomEng />} />
          <Route path="roofprofile" element={<RoofProfile />} />
          <Route path="industrialauto" element={<IndustrialAuto />} />
          <Route path="plc" element={<PLC />} />
          <Route path="controlpanels" element={<ControlPanels />} />
          <Route path="cranemaintenance" element={<CraneMaintenance />} />
          <Route path="services/amc" element={<AMC />} />
          <Route path="amctracking" element={<AMCTracking />} />
          <Route path="servicehistory" element={<ServiceHistory />} />
          <Route path="modernization" element={<Modernization />} />
          <Route path="breakdown" element={<Breakdown />} />
          <Route path="emergency" element={<Emergency />} />
          <Route path="book-service" element={<BookService />} />
          <Route path="service-requests" element={<ServiceRequests />} />

          {/* Identity & Corporate Nodes */}
          <Route path="team" element={<Team />} />
          <Route path="visionmission" element={<VisionMission />} />
          <Route path="certifications" element={<Certifications />} />
          <Route path="safety" element={<Safety />} />
          <Route path="industries" element={<Industries />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="careers" element={<Careers />} />
          <Route path="blog" element={<About />} />
          <Route path="faq" element={<FAQ />} />

          {/* Operational Procurement Nodes */}
          <Route path="rfq" element={<RFQ />} />
          <Route path="costestimator" element={<CostEstimator />} />
          <Route path="consult" element={<Consult />} />
          <Route path="my-projects" element={<MyProjects />} />
          <Route path="documents" element={<Documents />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="case-studies" element={<CaseStudies />} />
          <Route path="gallery" element={<Gallery />} />

          {/* Compliance & Governance Nodes */}
          <Route path="privacy-policy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="cookie" element={<Cookie />} />
          <Route path="sitemap" element={<Sitemap />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Internal Helper for Logout Icon (Lucide mismatch fallback)
const LogOut = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);