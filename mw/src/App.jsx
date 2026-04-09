import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation, Outlet, Navigate } from 'react-router-dom';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  sendEmailVerification 
} from 'firebase/auth';
import { 
  collection, 
  onSnapshot, 
  query, 
  addDoc, 
  serverTimestamp,
  orderBy 
} from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import { 
  LayoutDashboard, Home as HomeIcon, Quote, LogIn, Info, Users, Target, ShieldCheck, 
  HardHat, Phone, Briefcase, BookOpen, HelpCircle, Hammer, Settings, Wrench, 
  Truck, Zap, Activity, Cpu, FileText, ClipboardList, Calculator, MessageSquare, 
  FolderLock, CreditCard, Clock, History, FileSearch, Image, Star, Factory, 
  Lock, FileWarning, Cookie as CookieIcon, Map as MapIcon, Menu, X, ChevronRight, Search, Bell, Mail,
  MapPin, Navigation, ArrowRight, CircleDot, Square, User, Globe, Play, PlayCircle, Maximize2, MousePointer2, Filter, Layers, Sliders
} from 'lucide-react';
import { auth, db, appId } from './firebase';
import { cn } from './lib/utils';

// --- SHARED COMPONENTS & LAYOUT ---

const Layout = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* Sleek Sticky Top Navigation (Uber Movement Style) */}
      <header className="sticky top-0 z-[100] bg-black text-white h-16 flex items-center justify-between px-6 lg:px-12 border-b border-white/10">
        <div className="flex items-center gap-10">
          <Link to="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <Zap size={20} className="text-white" />
            NSS-MW
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-white/70">
            <Link to="/services" className="hover:text-white transition-colors">Products</Link>
            <Link to="/dashboard" className="hover:text-white transition-colors">Cities</Link>
            <Link to="/case-studies" className="hover:text-white transition-colors">Case Studies</Link>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
               <button onClick={() => signOut(auth)} className="text-[13px] hover:text-red-400 transition-colors">Sign Out</button>
               <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                 <User size={16} />
               </div>
            </div>
          ) : (
            <Link to="/login" className="text-[13px] font-medium hover:text-white/70 transition-colors flex items-center gap-2">
              <User size={16} />
              Sign In
            </Link>
          )}
        </div>
      </header>

      {/* Main Content Area - Natural Scrolling */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Shared Global Footer */}
      <footer className="bg-black text-white py-16 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tighter">NSS-MW</h3>
            <p className="text-white/50 text-sm">Let's find smarter ways forward, together.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Products</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>EOT Cranes</li>
              <li>Automation</li>
              <li>Installation</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Company</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>About Us</li>
              <li>Safety</li>
              <li>Careers</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Legal</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Privacy</li>
              <li>Terms</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-xs text-white/30 text-center">© 2026 NSS-MW Heavy Engineering. All rights reserved.</p>
      </footer>
    </div>
  );
};

// --- REDESIGNED PUBLIC MAIN PAGE (SCROLLING MAP UI) ---

const Home = () => {
  return (
    <div className="flex flex-col w-full animate-in fade-in duration-700">
      {/* Hero Section: Map Background Style */}
      <section className="relative h-[85vh] w-full bg-[#244356] flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Faux Map Background / Abstract Geo-Grid */}
        <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#1a2b3c_100%)]"></div>
          <div className="w-full h-full scale-150 transform -rotate-12 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        </div>

        <div className="relative z-10 w-full max-w-4xl text-center space-y-8">
          <h2 className="text-4xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
            Let's find smarter ways <br/> forward, together.
          </h2>
          
          {/* Large Center Search Bar */}
          <div className="w-full max-w-2xl mx-auto bg-white shadow-2xl rounded-sm flex items-center p-1 group transition-all focus-within:ring-4 focus-within:ring-blue-500/20">
             <div className="flex-1 flex items-center px-6 border-r border-gray-100">
                <Search className="text-gray-300 mr-4" size={20} />
                <input 
                  type="text" 
                  placeholder="Search for a project node..." 
                  className="w-full py-5 text-lg outline-none text-black placeholder-gray-400"
                />
             </div>
             <button className="hidden md:block px-8 py-5 text-gray-400 font-medium hover:text-black">
               Near me
             </button>
          </div>

          <div className="flex items-center justify-center gap-4 text-white/80">
            <PlayCircle size={28} className="text-white fill-white/20" />
            <p className="text-sm font-medium tracking-wide">NSS-MW provides real-time telemetry data across all operation hubs.</p>
          </div>
        </div>
      </section>

      {/* Feature Grid: White Section */}
      <section className="bg-white py-24 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="space-y-8">
            <h2 className="text-6xl font-bold text-black tracking-tighter leading-none">NSS-MW <br/> Engineering</h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-md">
              Engineering provides data, tools and insights about operational safety so we can more deeply understand and address today’s industrial mobility challenges.
            </p>
          </div>
          <div className="space-y-6 text-gray-500 text-sm leading-loose">
            <p>Operations are the backdrop of our workflow — they are complicated, ever-changing nodes. As NSS-MW has powered the movement of heavy assets from A to B, we’ve uncovered unique insights about how and why projects scale.</p>
            <Link to="/about" className="inline-flex items-center gap-2 text-black font-bold border-b-2 border-black pb-1 hover:text-blue-600 hover:border-blue-600 transition-all">
              Stay in the loop <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* 3-Column Illustrated Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Open and Interoperable", color: "bg-[#274D39]", desc: "Free, downloadable data aligned with open standards for easy integration.", icon: <Globe size={40} className="text-white"/> },
            { title: "Extensive Global Network", color: "bg-[#F59E0B]", desc: "Leverage historical logs from 700+ sites based on actual observations.", icon: <HardHat size={40} className="text-white"/> },
            { title: "Insights at a Glance", color: "bg-[#1E40AF]", desc: "Tools built to address city transportation challenges, from planning to research.", icon: <Activity size={40} className="text-white"/> }
          ].map((item, i) => (
            <div key={i} className="group space-y-8">
              <div className={cn("aspect-square w-full rounded-sm flex items-center justify-center transition-transform group-hover:scale-[0.98]", item.color)}>
                 {item.icon}
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-black">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Data Section: Dark UI Mimicry */}
      <section className="bg-[#121212] py-24 px-6 lg:px-24 text-white">
        <div className="max-w-7xl mx-auto space-y-12">
           <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/10 pb-12">
              <div>
                <h2 className="text-4xl font-bold tracking-tight">Stay Connected</h2>
                <p className="text-white/40 mt-2">Monitor system-wide agility and node health.</p>
              </div>
              <button className="bg-white text-black px-8 py-3 font-bold text-sm rounded-sm hover:bg-gray-200">Register Node</button>
           </div>

           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="text-[10px] uppercase tracking-[0.2em] text-white/30 border-b border-white/10">
                   <th className="py-4">Event Operator Name</th>
                   <th className="py-4">Deployment Date</th>
                   <th className="py-4">View Berth</th>
                 </tr>
               </thead>
               <tbody className="text-sm text-white/70">
                 {[1,2,3,4].map(i => (
                   <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                     <td className="py-6 font-medium text-white">Project Node_{i*244} - Mumbai Hub</td>
                     <td className="py-6">April {i+5}, 2026</td>
                     <td className="py-6">
                       <button className="text-white/40 group-hover:text-white font-bold flex items-center gap-2">Register View <ChevronRight size={14} /></button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      </section>
    </div>
  );
};

// --- DASHBOARD REDESIGN (LIDAR / GLASS UI PANELS) ---

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, u => setUser(u));
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'artifacts', appId, 'public', 'data', 'metrics'), orderBy('timestamp', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setData(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [user]);

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="h-[calc(100vh-64px)] w-full bg-[#0d0d0d] relative overflow-hidden flex animate-in zoom-in-95 duration-500">
      {/* Background Point Cloud Visualization Mimicry */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(#ffffff_1px,_transparent_1px)] [background-size:24px_24px]"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent"></div>
      </div>

      {/* Floating Glass Panels - Streetscape.gl Style */}
      <div className="absolute left-6 top-6 w-80 bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/10 rounded-sm shadow-2xl p-6 z-20">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
           <h2 className="text-sm font-bold tracking-widest text-white/60 uppercase flex items-center gap-2">
             <Activity size={14} className="text-blue-500" /> Metrics
           </h2>
           <Maximize2 size={14} className="text-white/30" />
        </div>
        
        <div className="space-y-8">
           <div>
              <p className="text-[10px] text-white/30 uppercase tracking-widest mb-3">Load Acceleration</p>
              <div className="h-24 w-full bg-black/40 rounded-sm relative overflow-hidden border border-white/5">
                {/* Visual Sine Wave Mimic */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-px bg-white/10"></div>
                  <div className="absolute w-full h-full opacity-50 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>
                  <div className="absolute inset-0 flex items-end">
                    <div className="w-full h-1/2 bg-blue-500/10 blur-xl"></div>
                  </div>
                </div>
                <p className="absolute top-2 right-2 text-xs font-mono text-blue-400">1.2 g</p>
              </div>
           </div>

           <div>
              <p className="text-[10px] text-white/30 uppercase tracking-widest mb-3">Operational Stream</p>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {data.map(m => (
                  <div key={m.id} className="flex items-center justify-between text-[11px] py-2 border-b border-white/5">
                    <span className="text-white/60 truncate max-w-[120px]">{m.title || 'Sys_Check'}</span>
                    <span className="text-green-400 font-mono">ACTIVE</span>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>

      {/* Right Side Control Bar */}
      <div className="absolute right-6 top-6 flex flex-col gap-2 z-20">
        {[Maximize2, MousePointer2, Filter, Layers, Sliders].map((Icon, idx) => (
          <button key={idx} className="w-10 h-10 bg-[#1e1e1e] hover:bg-[#2e2e2e] text-white/40 hover:text-white flex items-center justify-center border border-white/10 rounded-sm shadow-xl transition-all">
            <Icon size={18} />
          </button>
        ))}
      </div>

      {/* Bottom Timeline Control Bar */}
      <div className="absolute bottom-6 left-6 right-6 bg-[#1e1e1e]/95 border border-white/10 rounded-sm p-4 z-20 flex items-center gap-6">
        <Play size={18} className="text-white fill-white" />
        <div className="flex-1 space-y-2">
           <div className="flex justify-between text-[10px] font-mono text-white/40">
             <span>Mon, 26 Sep 2026 13:04:38 GMT</span>
             <span>00:14</span>
           </div>
           <div className="h-1 bg-white/10 rounded-full relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-blue-500"></div>
           </div>
        </div>
      </div>

      {/* Central Interactive Wireframe Car/Truck Mimicry */}
      <div className="flex-1 flex items-center justify-center pt-20">
         <div className="relative">
            <Truck size={400} strokeWidth={0.5} className="text-white/5 opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-48 bg-blue-500/10 rounded-full blur-[100px] animate-pulse"></div>
            </div>
         </div>
      </div>
    </div>
  );
};

// --- AUTH COMPONENTS ---

const Login = () => {
  const navigate = useNavigate();
  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, e.target.email.value, e.target.password.value);
      navigate('/dashboard');
    } catch (err) { alert(err.message); }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-sm space-y-12">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold tracking-tight text-black">Sign In</h2>
          <p className="text-gray-500">Access the NSS-MW secure data nodes.</p>
        </div>
        <form onSubmit={handleAuth} className="space-y-4">
          <input name="email" type="email" placeholder="Operator Email" className="w-full bg-[#f6f6f6] p-4 text-black outline-none border-b-2 border-transparent focus:border-black transition-all" />
          <input name="password" type="password" placeholder="Access Key" className="w-full bg-[#f6f6f6] p-4 text-black outline-none border-b-2 border-transparent focus:border-black transition-all" />
          <button type="submit" className="w-full bg-black text-white py-4 font-bold flex items-center justify-center gap-2 hover:bg-gray-900">
            Continue <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

// Placeholder components for all 44 routes (to be populated with real specific logic)
const QuoteGenerator = () => <div className="p-24 bg-white"> <h2 className="text-6xl font-bold tracking-tighter mb-12">Quote Generator</h2> <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-500 leading-loose"> <p>Calculate EOT crane costs based on operational span and load capacity using the industry's most advanced logistics model.</p> </div> </div>;
const About = () => <div className="p-24 bg-white"> <h2 className="text-6xl font-bold tracking-tighter mb-12">Our Legacy</h2> <p className="text-gray-600 leading-loose max-w-3xl">NSS-MW is a leader in heavy engineering, specializing in overhead cranes and material handling solutions since 2005.</p> </div>;
const Team = () => <div className="p-24 grid grid-cols-1 md:grid-cols-4 gap-8"> {[1,2,3,4].map(i => <div key={i} className="aspect-square bg-gray-100 rounded-sm"></div>)} </div>;
const VisionMission = () => <div className="p-24 space-y-10"> <div className="p-10 bg-gray-50 rounded-sm"> <h3 className="text-2xl font-bold text-black mb-4">Vision</h3> <p className="text-gray-600">To redefine industrial safety through autonomous crane technologies.</p> </div> </div>;
const Certifications = () => <div className="p-24 flex gap-10"> <div className="w-32 h-44 border-4 border-gray-100 rounded-sm flex items-center justify-center text-gray-400 font-bold">ISO 9001</div> </div>;
const Safety = () => <div className="p-24 bg-red-50 text-red-800 rounded-sm"> <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><HardHat /> Zero Accident Policy</h3> <p>Safety is not an option; it is our foundation.</p> </div>;
const Contact = () => <div className="p-24 grid grid-cols-1 md:grid-cols-2 gap-10"> <div className="space-y-6"> <h2 className="text-3xl font-bold text-black">Get In Touch</h2> <div className="flex items-center gap-4 text-gray-600"><Phone /> +91 98765 43210</div> </div> </div>;
const Careers = () => <div className="p-24 space-y-4"> <div className="p-8 bg-gray-50 flex justify-between items-center rounded-sm"> <div> <h4 className="font-bold text-black">Lead Structural Engineer</h4> <p className="text-xs text-gray-500 mt-1">Pune, India // Full Time</p> </div> <button className="text-black font-bold text-sm bg-white px-6 py-2 rounded-sm border border-black/10 hover:bg-gray-100">Apply Now</button> </div> </div>;
const Blog = () => <div className="p-24 grid grid-cols-2 gap-10"> <div className="h-64 bg-gray-50 rounded-sm"></div> </div>;
const FAQ = () => <div className="p-24 space-y-4 max-w-4xl mx-auto"> <details className="p-8 border-b border-black/10"><summary className="font-bold cursor-pointer text-black text-xl outline-none">What is the maintenance cycle for EOT cranes?</summary><p className="mt-4 text-gray-500 leading-relaxed">Quarterly inspections are recommended for heavy usage hubs.</p></details> </div>;
const Services = () => <div className="p-24 grid grid-cols-2 md:grid-cols-4 gap-6"> {[1,2,3,4].map(i => <div key={i} className="p-8 bg-gray-50 rounded-sm h-48 hover:bg-black hover:text-white transition-all group"> <div className="w-10 h-10 rounded-full border border-black/10 group-hover:border-white/20 mb-4"></div> <p className="font-bold">Logistics Node {i}</p> </div>)} </div>;
const EOTCrane = () => <div className="p-24"> <h2 className="text-6xl font-bold text-black tracking-tighter">EOT Cranes</h2> </div>;
const SingleGirder = () => <div className="p-24 text-black font-medium text-2xl">Single Girder EOT Cranes</div>;
const DoubleGirder = () => <div className="p-24 text-black font-medium text-2xl">Double Girder EOT Cranes</div>;
const JibCrane = () => <div className="p-24 text-black font-medium text-2xl">Jib Cranes</div>;
const GantryCrane = () => <div className="p-24 text-black font-medium text-2xl">Gantry Cranes</div>;
const CraneInstall = () => <div className="p-24 text-black font-medium text-2xl">Installation Services</div>;
const CraneMaintenance = () => <div className="p-24 text-black font-medium text-2xl">Maintenance Solutions</div>;
const AMC = () => <div className="p-24 text-black font-medium text-2xl">AMC Plans</div>;
const Modernization = () => <div className="p-24 text-black font-medium text-2xl">Modernization & Refurbishment</div>;
const Breakdown = () => <div className="p-24 text-black font-medium text-2xl">Breakdown Support</div>;
const RoofProfile = () => <div className="p-24 text-black font-medium text-2xl">Roofing & Shed Profiles</div>;
const IndustrialAuto = () => <div className="p-24 text-black font-medium text-2xl">Industrial Automation</div>;
const PLC = () => <div className="p-24 text-black font-medium text-2xl">PLC Programming & Logic</div>;
const ControlPanels = () => <div className="p-24 text-black font-medium text-2xl">Electrical Control Panels</div>;
const CustomEng = () => <div className="p-24 text-black font-medium text-2xl">Custom Engineering Solutions</div>;
const RFQ = () => <div className="p-24 text-black font-medium text-2xl">Request For Quotation</div>;
const CostEstimator = () => <div className="p-24 text-black font-medium text-2xl">Cost Estimator Tool</div>;
const Consult = () => <div className="p-24 text-black font-medium text-2xl">Engineering Consultation</div>;
const MyProjects = () => <div className="p-24 text-black font-medium text-2xl">My Active Projects</div>;
const Documents = () => <div className="p-24 text-black font-medium text-2xl">Technical Documents</div>;
const Invoices = () => <div className="p-24 text-black font-medium text-2xl">Financial Invoices</div>;
const ServiceRequests = () => <div className="p-24 text-black font-medium text-2xl">Service Support Tickets</div>;
const BookService = () => <div className="p-24 text-black font-medium text-2xl">Book a Technician</div>;
const Emergency = () => <div className="bg-red-600 p-24 text-white text-center shadow-xl"><h1 className="text-5xl font-black mb-6 tracking-tighter uppercase">EMERGENCY RESPONSE</h1><p className="font-medium text-lg opacity-80">Call +91 999 999 9999 for immediate breakdown assistance.</p></div>;
const AMCTracking = () => <div className="p-24 text-black font-medium text-2xl">Track your AMC Status</div>;
const ServiceHistory = () => <div className="p-24 text-black font-medium text-2xl">Service Logs & Reports</div>;
const CaseStudies = () => <div className="p-24"> <h2 className="text-6xl font-bold tracking-tighter mb-12">Case Studies</h2> <div className="grid grid-cols-1 md:grid-cols-2 gap-12 leading-relaxed text-gray-500"> <p>Explore how NSS-MW has redefined logistical flow for major Indian industrial nodes.</p> </div> </div>;
const Gallery = () => <div className="p-24 text-black font-medium text-2xl">Image & Video Gallery</div>;
const Testimonials = () => <div className="p-24 text-black font-medium text-2xl">Client Success Stories</div>;
const Industries = () => <div className="p-24 text-black font-medium text-2xl">Industries We Serve</div>;
const Privacy = () => <div className="p-24 text-black font-medium text-2xl">Privacy Policy</div>;
const Terms = () => <div className="p-24 text-black font-medium text-2xl">Terms & Conditions</div>;
const Cookie = () => <div className="p-24 text-black font-medium text-2xl">Cookie Policy</div>;
const Sitemap = () => <div className="p-24 text-black font-medium text-2xl">Visual Sitemap</div>;

// --- MAIN APP COMPONENT ---

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Unified Layout with Top Navigation for ALL Public Pages */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="quote" element={<QuoteGenerator />} />
          <Route path="about" element={<About />} />
          <Route path="team" element={<Team />} />
          <Route path="visionmission" element={<VisionMission />} />
          <Route path="certifications" element={<Certifications />} />
          <Route path="safety" element={<Safety />} />
          <Route path="industries" element={<Industries />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="careers" element={<Careers />} />
          <Route path="blog" element={<Blog />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
          <Route path="services" element={<Services />} />
          <Route path="services/eot-crane" element={<EOTCrane />} />
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
          <Route path="rfq" element={<RFQ />} />
          <Route path="costestimator" element={<CostEstimator />} />
          <Route path="consult" element={<Consult />} />
          <Route path="my-projects" element={<MyProjects />} />
          <Route path="documents" element={<Documents />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="case-studies" element={<CaseStudies />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="privacy-policy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="cookie" element={<Cookie />} />
          <Route path="sitemap" element={<Sitemap />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}