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
  MapPin, Navigation, ArrowRight, CircleDot, Square
} from 'lucide-react';
import { auth, db, appId } from './firebase';
import { cn } from './lib/utils';

// --- SHARED COMPONENTS & LAYOUT ---

const SidebarLink = ({ to, icon: Icon, label, active, collapsed }) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
      active 
        ? "bg-uber-black text-white shadow-lg shadow-black/10" 
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    )}
  >
    <Icon size={20} className={cn(active ? "text-white" : "group-hover:text-white")} />
    {!collapsed && <span className="text-sm font-medium truncate">{label}</span>}
  </Link>
);

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const navigationGroups = [
    {
      title: "Core",
      links: [
        { to: "/dashboard", icon: LayoutDashboard, label: "Command Center" },
        { to: "/quote", icon: Quote, label: "Quote Generator" },
      ]
    },
    {
      title: "Services",
      links: [
        { to: "/services/eot-crane", icon: Hammer, label: "EOT Cranes" },
        { to: "/services/amc", icon: Clock, label: "AMC Tracking" },
        { to: "/craneinstall", icon: Wrench, label: "Installation" },
      ]
    },
    {
      title: "Management",
      links: [
        { to: "/my-projects", icon: FolderLock, label: "My Projects" },
        { to: "/invoices", icon: CreditCard, label: "Invoices" },
        { to: "/service-requests", icon: MessageSquare, label: "Requests" },
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
      {/* Sidebar Navigation Tree */}
      <aside className={cn(
        "bg-[#121212] text-white transition-all duration-300 flex flex-col border-r border-slate-800",
        collapsed ? "w-20" : "w-72"
      )}>
        <div className="p-6 flex items-center gap-4 border-b border-slate-800">
          <div className="w-10 h-10 bg-uber-black rounded-xl flex items-center justify-center shadow-lg border border-slate-700">
            <Zap size={24} className="text-white" />
          </div>
          {!collapsed && <span className="font-black text-xl tracking-tighter">NSS-MW</span>}
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar">
          {navigationGroups.map((group, idx) => (
            <div key={idx}>
              {!collapsed && <p className="text-[10px] font-bold text-slate-500 mb-4 px-4 tracking-[0.2em] uppercase">{group.title}</p>}
              <div className="space-y-1">
                {group.links.map((link) => (
                  <SidebarLink 
                    key={link.to} 
                    {...link} 
                    active={location.pathname === link.to} 
                    collapsed={collapsed} 
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          {user ? (
            <button 
              onClick={() => signOut(auth).then(() => navigate('/login'))}
              className="w-full flex items-center gap-4 p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
            >
              <X size={20} />
              {!collapsed && <span className="text-sm font-bold">TERMINATE</span>}
            </button>
          ) : (
            <Link to="/login" className="w-full flex items-center gap-4 p-3 text-white hover:bg-white/10 rounded-xl transition-all">
              <LogIn size={20} />
              {!collapsed && <span className="text-sm font-bold">LOGIN</span>}
            </Link>
          )}
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 shadow-sm">
          <button onClick={() => setCollapsed(!collapsed)} className="p-2 hover:bg-gray-100 rounded-lg">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input type="text" placeholder="Search files, projects..." className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm outline-none w-64" />
            </div>
            <Bell size={20} className="text-gray-400 cursor-pointer" />
            {user && (
              <div className="flex items-center gap-3 border-l pl-6 border-gray-100">
                <div className="text-right">
                  <p className="text-xs font-bold text-uber-black">{user.email}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-tighter">Verified Client</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-uber-black text-white flex items-center justify-center font-bold">
                  {user.email[0].toUpperCase()}
                </div>
              </div>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 animate-in fade-in duration-500 bg-uber-light">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

// --- REDESIGNED PUBLIC LANDING PAGE (SPLIT SCREEN) ---

const Home = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-uber-light font-sans">
      {/* Left Panel: Light UI */}
      <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-between relative">
        <header className="mb-16">
          <h1 className="text-2xl font-semibold tracking-tight text-uber-black">NSS-MW</h1>
        </header>

        <main className="flex-1 flex flex-col justify-center max-w-lg">
          <h2 className="text-5xl lg:text-[4rem] font-bold text-uber-black leading-[1.1] mb-2 tracking-tight">
            Go Anywhere
          </h2>
          <h2 className="text-5xl lg:text-[4rem] font-medium text-gray-500 leading-[1.1] mb-10 tracking-tight">
            With NSS-MW
          </h2>
          
          <p className="text-uber-black font-medium mb-8">
            Request heavy engineering, track transport, and go.
          </p>

          <div className="space-y-4 relative">
            {/* Visual connecting line for input fields */}
            <div className="absolute left-[23px] top-[26px] bottom-[26px] w-[2px] bg-gray-200 z-0 hidden sm:block"></div>
            
            <div className="relative z-10 flex items-center bg-white rounded-xl overflow-hidden border border-gray-200 focus-within:border-uber-black focus-within:ring-1 focus-within:ring-uber-black transition-all">
              <div className="pl-5 pr-3 py-4 bg-white">
                <CircleDot size={18} className="text-uber-black" />
              </div>
              <input 
                type="text" 
                placeholder="Enter Site Location" 
                className="flex-1 py-4 px-2 outline-none text-uber-black font-medium placeholder-gray-500"
              />
              <button className="pr-5 pl-2 py-4 bg-white hover:bg-gray-50 transition-colors">
                <Navigation size={18} className="text-uber-black transform rotate-45" />
              </button>
            </div>

            <div className="relative z-10 flex items-center bg-white rounded-xl overflow-hidden border border-gray-200 focus-within:border-uber-black focus-within:ring-1 focus-within:ring-uber-black transition-all">
              <div className="pl-5 pr-3 py-4 bg-white">
                <Square size={16} className="text-uber-black fill-uber-black" />
              </div>
              <input 
                type="text" 
                placeholder="Enter Destination Facility" 
                className="flex-1 py-4 px-2 outline-none text-uber-black font-medium placeholder-gray-500"
              />
            </div>
            
            <Link to="/quote" className="block w-full mt-6 bg-uber-black hover:bg-black text-white text-center py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 group">
              See Estimates 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </main>
        
        <footer className="mt-16 text-sm text-gray-500">
          <p>© 2026 NSS-MW Heavy Engineering.</p>
        </footer>
      </div>

      {/* Right Panel: Dark Green UI */}
      <div className="w-full lg:w-1/2 bg-uber-green relative overflow-hidden flex flex-col p-8 lg:p-12 lg:rounded-l-[2.5rem] lg:my-4 lg:mr-4 shadow-2xl shadow-black/20">
        
        {/* Top Navigation */}
        <nav className="flex items-center justify-between z-20 relative">
          <div className="flex gap-6 lg:gap-8 text-white/90 text-sm font-medium">
            <Link to="/services" className="hover:text-white transition-colors">Transport</Link>
            <Link to="/craneinstall" className="hover:text-white transition-colors">Install</Link>
            <Link to="/about" className="hover:text-white transition-colors hidden sm:block">Business</Link>
            <Link to="/contact" className="hover:text-white transition-colors hidden sm:block">Contact</Link>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-white/90 text-sm font-medium hover:text-white transition-colors hidden sm:block">EN</button>
            <Link to="/login" className="bg-white text-uber-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors">
              Sign Up
            </Link>
          </div>
        </nav>

        {/* Central Illustration Area */}
        <div className="flex-1 flex items-center justify-center relative z-10 my-12 min-h-[300px]">
          {/* Abstract background graphics mimicking the smoke/clouds */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 bg-[#3d6852] rounded-full blur-3xl absolute top-10 right-10 mix-blend-screen opacity-60"></div>
            <div className="w-80 h-80 bg-[#1e3b2c] rounded-full blur-3xl absolute bottom-0 left-0 mix-blend-multiply opacity-80"></div>
            <div className="w-72 h-72 bg-[#4a7d62] rounded-full blur-3xl absolute -top-10 -left-10 mix-blend-screen opacity-40"></div>
          </div>
          
          {/* Main Visual Element */}
          <div className="relative z-20 transform hover:scale-105 transition-transform duration-700">
            <Truck size={180} strokeWidth={1} className="text-[#a8c9b9] drop-shadow-2xl" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/40 blur-md rounded-full"></div>
          </div>
        </div>

        {/* Bottom QR Card */}
        <div className="bg-white rounded-2xl p-6 flex items-center justify-between z-20 relative shadow-xl mt-auto">
          <div className="flex items-center gap-6">
            {/* Faux QR Code Pattern */}
            <div className="w-20 h-20 bg-white border border-gray-100 rounded-lg p-1.5 grid grid-cols-5 grid-rows-5 gap-0.5 shadow-sm">
              {[...Array(25)].map((_, i) => (
                <div key={i} className={cn("bg-uber-black rounded-[1px]", Math.random() > 0.4 ? "opacity-100" : "opacity-0")}></div>
              ))}
              {/* Center NSS Logo in Faux QR */}
              <div className="absolute top-1/2 left-[30px] -translate-y-1/2 bg-white px-1 font-black text-[8px] tracking-tighter text-uber-black">NSS</div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-uber-black tracking-tight mb-1">Download the NSS-MW app</h3>
              <p className="text-gray-500 text-sm">Scan to track operations</p>
            </div>
          </div>
          <button className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 rounded-full transition-colors group">
            <ArrowRight size={24} className="text-uber-black group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- OTHER COMPONENTS ---

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
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-uber-black">Operator Dashboard</h2>
          <p className="text-gray-500">Live monitoring of your crane assets and service tickets.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border flex items-center gap-2 shadow-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Real-time Linked</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Cranes', val: '12', color: 'blue' },
          { label: 'Pending AMC', val: '02', color: 'amber' },
          { label: 'Service History', val: '148', color: 'green' },
          { label: 'Open Invoices', val: '$4,200', color: 'purple' }
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{s.label}</p>
            <p className="text-3xl font-black text-uber-black">{s.val}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-uber-black"><Activity size={20} /> Live Operational Stream</h3>
        <div className="space-y-4">
          {data.length > 0 ? data.map(m => (
            <div key={m.id} className="flex items-center justify-between p-4 bg-uber-light rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Cpu size={18} className="text-uber-black" />
                </div>
                <div>
                  <p className="text-sm font-bold text-uber-black">{m.title || 'System Check'}</p>
                  <p className="text-[10px] text-gray-500 font-mono uppercase">NodeID: {m.id.substring(0,8)}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">ACTIVE</span>
            </div>
          )) : (
            <div className="py-20 text-center text-gray-400">
              <Search className="mx-auto mb-4 opacity-20" size={48} />
              <p>Awaiting data from Firestore cloud...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Login = () => {
  const [mode, setMode] = useState('login');
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const u = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(u.user);
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          { to_email: email, app_name: "NSS-MW" },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
      }
      navigate('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-uber-light font-sans">
      <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-uber-black rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-black/20">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-3xl font-bold text-uber-black tracking-tight">System Access</h2>
          <p className="text-gray-500 mt-2 text-sm">Authorize to access engineering nodes.</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase ml-2">Operator Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-gray-400" size={18} />
              <input name="email" type="email" required className="w-full pl-12 pr-4 py-4 bg-uber-light border border-gray-200 rounded-2xl focus:border-uber-black focus:ring-1 focus:ring-uber-black outline-none transition-all font-medium text-uber-black" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase ml-2">Access Key</label>
            <div className="relative">
              <Lock className="absolute left-4 top-4 text-gray-400" size={18} />
              <input name="password" type="password" required className="w-full pl-12 pr-4 py-4 bg-uber-light border border-gray-200 rounded-2xl focus:border-uber-black focus:ring-1 focus:ring-uber-black outline-none transition-all font-medium text-uber-black" />
            </div>
          </div>
          <button type="submit" className="w-full py-4 bg-uber-black text-white rounded-2xl font-medium shadow-lg hover:bg-black transition-colors mt-6 flex items-center justify-center gap-2 group">
            {mode === 'login' ? 'Authorize Console' : 'Register Operator'}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            type="button" 
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="w-full py-2 text-sm text-gray-500 font-medium hover:text-uber-black transition-colors"
          >
            {mode === 'login' ? "Don't have access? Create Account" : "Back to Authorization"}
          </button>
        </form>
      </div>
    </div>
  );
};

// Placeholder components for all 44 routes (to be populated with real specific logic)
const QuoteGenerator = () => <div className="p-8 bg-white rounded-3xl border shadow-sm"> <h2 className="text-2xl font-bold mb-6 text-uber-black">Quote Estimator</h2> <p className="text-gray-500">Calculate EOT crane costs based on span and capacity.</p> </div>;
const About = () => <div className="max-w-3xl"> <h2 className="text-4xl font-bold mb-6 text-uber-black tracking-tight">Our Legacy</h2> <p className="text-gray-600 leading-loose">NSS-MW is a leader in heavy engineering, specializing in overhead cranes and material handling solutions since 2005.</p> </div>;
const Team = () => <div className="grid grid-cols-1 md:grid-cols-4 gap-8"> {[1,2,3,4].map(i => <div key={i} className="aspect-square bg-gray-200 rounded-2xl"></div>)} </div>;
const VisionMission = () => <div className="space-y-10"> <div className="p-10 bg-uber-light rounded-3xl border border-gray-200"> <h3 className="text-2xl font-bold text-uber-black mb-4">Vision</h3> <p className="text-gray-600">To redefine industrial safety through autonomous crane technologies.</p> </div> </div>;
const Certifications = () => <div className="flex gap-10"> <div className="w-32 h-44 border-4 border-gray-200 rounded-xl flex items-center justify-center text-gray-400 font-bold">ISO 9001</div> </div>;
const Safety = () => <div className="p-10 bg-red-50 text-red-800 rounded-3xl"> <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><HardHat /> Zero Accident Policy</h3> <p>Safety is not an option; it is our foundation.</p> </div>;
const Contact = () => <div className="grid grid-cols-1 md:grid-cols-2 gap-10"> <div className="space-y-6"> <h2 className="text-3xl font-bold text-uber-black">Get In Touch</h2> <div className="flex items-center gap-4 text-gray-600"><Phone /> +91 98765 43210</div> </div> </div>;
const Careers = () => <div className="space-y-4"> <div className="p-6 bg-white border border-gray-200 rounded-2xl flex justify-between items-center shadow-sm"> <div> <h4 className="font-bold text-uber-black">Lead Structural Engineer</h4> <p className="text-xs text-gray-500 mt-1">Pune, India // Full Time</p> </div> <button className="text-uber-black font-bold text-sm bg-uber-light px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">Apply Now</button> </div> </div>;
const Blog = () => <div className="grid grid-cols-2 gap-10"> <div className="h-64 bg-gray-200 rounded-3xl"></div> </div>;
const FAQ = () => <div className="space-y-4 max-w-2xl"> <details className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm"><summary className="font-bold cursor-pointer text-uber-black outline-none">What is the maintenance cycle for EOT cranes?</summary><p className="mt-4 text-gray-600 leading-relaxed">Quarterly inspections are recommended for heavy usage.</p></details> </div>;
const Services = () => <div className="grid grid-cols-2 md:grid-cols-4 gap-6"> {[1,2,3,4].map(i => <div key={i} className="p-8 bg-white border border-gray-200 rounded-3xl h-48 shadow-sm hover:shadow-md transition-shadow cursor-pointer"></div>)} </div>;
const EOTCrane = () => <div> <h2 className="text-3xl font-bold text-uber-black">EOT Cranes</h2> </div>;
const SingleGirder = () => <div className="text-uber-black font-medium">Single Girder EOT Cranes</div>;
const DoubleGirder = () => <div className="text-uber-black font-medium">Double Girder EOT Cranes</div>;
const JibCrane = () => <div className="text-uber-black font-medium">Jib Cranes</div>;
const GantryCrane = () => <div className="text-uber-black font-medium">Gantry Cranes</div>;
const CraneInstall = () => <div className="text-uber-black font-medium">Installation Services</div>;
const CraneMaintenance = () => <div className="text-uber-black font-medium">Maintenance Solutions</div>;
const AMC = () => <div className="text-uber-black font-medium">AMC Plans</div>;
const Modernization = () => <div className="text-uber-black font-medium">Modernization & Refurbishment</div>;
const Breakdown = () => <div className="text-uber-black font-medium">Breakdown Support</div>;
const RoofProfile = () => <div className="text-uber-black font-medium">Roofing & Shed Profiles</div>;
const IndustrialAuto = () => <div className="text-uber-black font-medium">Industrial Automation</div>;
const PLC = () => <div className="text-uber-black font-medium">PLC Programming & Logic</div>;
const ControlPanels = () => <div className="text-uber-black font-medium">Electrical Control Panels</div>;
const CustomEng = () => <div className="text-uber-black font-medium">Custom Engineering Solutions</div>;
const RFQ = () => <div className="text-uber-black font-medium">Request For Quotation</div>;
const CostEstimator = () => <div className="text-uber-black font-medium">Cost Estimator Tool</div>;
const Consult = () => <div className="text-uber-black font-medium">Engineering Consultation</div>;
const MyProjects = () => <div className="text-uber-black font-medium">My Active Projects</div>;
const Documents = () => <div className="text-uber-black font-medium">Technical Documents</div>;
const Invoices = () => <div className="text-uber-black font-medium">Financial Invoices</div>;
const ServiceRequests = () => <div className="text-uber-black font-medium">Service Support Tickets</div>;
const BookService = () => <div className="text-uber-black font-medium">Book a Technician</div>;
const Emergency = () => <div className="bg-red-600 p-20 text-white rounded-[3rem] text-center shadow-xl shadow-red-600/20"><h1 className="text-5xl font-black mb-6 tracking-tighter">EMERGENCY RESPONSE</h1><p className="font-medium text-lg">Call +91 999 999 9999 for immediate breakdown assistance.</p></div>;
const AMCTracking = () => <div className="text-uber-black font-medium">Track your AMC Status</div>;
const ServiceHistory = () => <div className="text-uber-black font-medium">Service Logs & Reports</div>;
const CaseStudies = () => <div className="text-uber-black font-medium">Project Case Studies</div>;
const Gallery = () => <div className="text-uber-black font-medium">Image & Video Gallery</div>;
const Testimonials = () => <div className="text-uber-black font-medium">Client Success Stories</div>;
const Industries = () => <div className="text-uber-black font-medium">Industries We Serve</div>;
const Privacy = () => <div className="text-uber-black font-medium">Privacy Policy</div>;
const Terms = () => <div className="text-uber-black font-medium">Terms & Conditions</div>;
const Cookie = () => <div className="text-uber-black font-medium">Cookie Policy</div>;
const Sitemap = () => <div className="text-uber-black font-medium">Visual Sitemap</div>;

// --- MAIN APP COMPONENT ---

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Decoupled Public Routes rendering full screen */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        {/* Dashboard Routes rendering within the Sidebar Layout */}
        <Route element={<Layout />}>
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