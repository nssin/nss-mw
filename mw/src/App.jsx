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
  Lock, FileWarning, Cookie, Map as MapIcon, Menu, X, ChevronRight, Search, Bell, Mail
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
        ? "bg-primary text-white shadow-lg shadow-primary/20" 
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    )}
  >
    <Icon size={20} className={cn(active ? "text-white" : "group-hover:text-primary")} />
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
        { to: "/", icon: HomeIcon, label: "Home" },
        { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
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
        "bg-dark text-white transition-all duration-300 flex flex-col border-r border-slate-800",
        collapsed ? "w-20" : "w-72"
      )}>
        <div className="p-6 flex items-center gap-4 border-b border-slate-800">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
            <Zap size={24} />
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
            <Link to="/login" className="w-full flex items-center gap-4 p-3 text-primary hover:bg-primary/10 rounded-xl transition-all">
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
                  <p className="text-xs font-bold text-dark">{user.email}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-tighter">Verified Client</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {user.email[0].toUpperCase()}
                </div>
              </div>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 animate-in fade-in duration-500">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

// --- PAGE COMPONENTS (44+ SECTIONS) ---

const Home = () => (
  <div className="max-w-6xl mx-auto space-y-12">
    <section className="bg-dark rounded-[3rem] p-16 text-white relative overflow-hidden">
      <div className="relative z-10 max-w-2xl">
        <span className="bg-primary/20 text-primary px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6 inline-block">Engineering Excellence</span>
        <h1 className="text-6xl font-black tracking-tighter mb-6 leading-tight">Mastering Heavy <br/> Lift Operations.</h1>
        <p className="text-slate-400 text-lg mb-10 leading-relaxed">Precision-engineered EOT cranes and industrial automation solutions for the next generation of manufacturing.</p>
        <div className="flex gap-4">
          <Link to="/quote" className="px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/30 hover:-translate-y-1 transition-transform">Get Estimate</Link>
          <Link to="/services" className="px-8 py-4 bg-white/10 text-white rounded-2xl font-bold hover:bg-white/20 transition-all">Explore Services</Link>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 flex items-center justify-center">
        <Factory size={400} />
      </div>
    </section>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { title: 'Crane Installation', icon: Wrench, desc: 'Expert erection and commissioning services.' },
        { title: 'AMC Support', icon: Clock, desc: 'Annual Maintenance Contracts for 24/7 uptime.' },
        { title: 'Industrial PLC', icon: Cpu, desc: 'Cutting-edge automation and control panels.' }
      ].map((card, i) => (
        <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-primary mb-6">
            <card.icon size={28} />
          </div>
          <h3 className="text-xl font-bold mb-3">{card.title}</h3>
          <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

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
          <h2 className="text-3xl font-black tracking-tight">Operator Dashboard</h2>
          <p className="text-gray-400">Live monitoring of your crane assets and service tickets.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border flex items-center gap-2">
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
            <p className="text-3xl font-black text-dark">{s.val}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><Activity size={20} className="text-primary" /> Live Operational Stream</h3>
        <div className="space-y-4">
          {data.length > 0 ? data.map(m => (
            <div key={m.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Cpu size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold">{m.title || 'System Check'}</p>
                  <p className="text-[10px] text-gray-400 font-mono uppercase">NodeID: {m.id.substring(0,8)}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">ACTIVE</span>
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
    <div className="max-w-md mx-auto mt-20 bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-50">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-primary/30">
          <ShieldCheck size={32} />
        </div>
        <h2 className="text-3xl font-black text-dark">Welcome Back</h2>
        <p className="text-gray-400 mt-2">Authorize to access engineering nodes.</p>
      </div>

      <form onSubmit={handleAuth} className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase ml-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-4 text-gray-400" size={18} />
            <input name="email" type="email" required className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase ml-2">Access Key</label>
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-gray-400" size={18} />
            <input name="password" type="password" required className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all" />
          </div>
        </div>
        <button type="submit" className="w-full py-4 bg-dark text-white rounded-2xl font-bold shadow-lg hover:bg-slate-800 transition-all mt-6">
          {mode === 'login' ? 'Authorize Console' : 'Register Operator'}
        </button>
        <button 
          type="button" 
          onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          className="w-full py-2 text-sm text-gray-400 font-medium"
        >
          {mode === 'login' ? "Don't have access? Create Account" : "Back to Authorization"}
        </button>
      </form>
    </div>
  );
};

// Placeholder components for all 44 routes (to be populated with real specific logic)
const QuoteGenerator = () => <div className="p-8 bg-white rounded-3xl border shadow-sm"> <h2 className="text-2xl font-bold mb-6">Quote Estimator</h2> <p className="text-gray-500">Calculate EOT crane costs based on span and capacity.</p> </div>;
const About = () => <div className="max-w-3xl"> <h2 className="text-4xl font-black mb-6">Our Legacy</h2> <p className="text-gray-600 leading-loose">NSS-MW is a leader in heavy engineering, specializing in overhead cranes and material handling solutions since 2005.</p> </div>;
const Team = () => <div className="grid grid-cols-1 md:grid-cols-4 gap-8"> {[1,2,3,4].map(i => <div key={i} className="aspect-square bg-gray-100 rounded-2xl"></div>)} </div>;
const VisionMission = () => <div className="space-y-10"> <div className="p-10 bg-blue-50 rounded-3xl"> <h3 className="text-2xl font-bold text-primary mb-4">Vision</h3> <p>To redefine industrial safety through autonomous crane technologies.</p> </div> </div>;
const Certifications = () => <div className="flex gap-10"> <div className="w-32 h-44 border-4 border-gray-100 rounded-lg flex items-center justify-center text-gray-300 font-bold">ISO 9001</div> </div>;
const Safety = () => <div className="p-10 bg-red-50 text-red-700 rounded-3xl"> <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><HardHat /> Zero Accident Policy</h3> <p>Safety is not an option; it is our foundation.</p> </div>;
const Contact = () => <div className="grid grid-cols-1 md:grid-cols-2 gap-10"> <div className="space-y-6"> <h2 className="text-3xl font-bold">Get In Touch</h2> <div className="flex items-center gap-4 text-gray-500"><Phone /> +91 98765 43210</div> </div> </div>;
const Careers = () => <div className="space-y-4"> <div className="p-6 border rounded-2xl flex justify-between items-center"> <div> <h4 className="font-bold">Lead Structural Engineer</h4> <p className="text-xs text-gray-400">Pune, India // Full Time</p> </div> <button className="text-primary font-bold">Apply Now</button> </div> </div>;
const Blog = () => <div className="grid grid-cols-2 gap-10"> <div className="h-64 bg-gray-100 rounded-3xl"></div> </div>;
const FAQ = () => <div className="space-y-4 max-w-2xl"> <details className="p-4 bg-white border rounded-xl"><summary className="font-bold cursor-pointer">What is the maintenance cycle for EOT cranes?</summary><p className="mt-4 text-gray-500">Quarterly inspections are recommended for heavy usage.</p></details> </div>;
const Services = () => <div className="grid grid-cols-2 md:grid-cols-4 gap-6"> {[1,2,3,4].map(i => <div key={i} className="p-8 bg-white border rounded-3xl h-48"></div>)} </div>;
const EOTCrane = () => <div> <h2 className="text-3xl font-bold">EOT Cranes</h2> </div>;
const SingleGirder = () => <div>Single Girder EOT Cranes</div>;
const DoubleGirder = () => <div>Double Girder EOT Cranes</div>;
const JibCrane = () => <div>Jib Cranes</div>;
const GantryCrane = () => <div>Gantry Cranes</div>;
const CraneInstall = () => <div>Installation Services</div>;
const CraneMaintenance = () => <div>Maintenance Solutions</div>;
const AMC = () => <div>AMC Plans</div>;
const Modernization = () => <div>Modernization & Refurbishment</div>;
const Breakdown = () => <div>Breakdown Support</div>;
const RoofProfile = () => <div>Roofing & Shed Profiles</div>;
const IndustrialAuto = () => <div>Industrial Automation</div>;
const PLC = () => <div>PLC Programming & Logic</div>;
const ControlPanels = () => <div>Electrical Control Panels</div>;
const CustomEng = () => <div>Custom Engineering Solutions</div>;
const RFQ = () => <div>Request For Quotation</div>;
const CostEstimator = () => <div>Cost Estimator Tool</div>;
const Consult = () => <div>Engineering Consultation</div>;
const MyProjects = () => <div>My Active Projects</div>;
const Documents = () => <div>Technical Documents</div>;
const Invoices = () => <div>Financial Invoices</div>;
const ServiceRequests = () => <div>Service Support Tickets</div>;
const BookService = () => <div>Book a Technician</div>;
const Emergency = () => <div className="bg-red-600 p-20 text-white rounded-[3rem] text-center"><h1 className="text-5xl font-black mb-6">EMERGENCY RESPONSE</h1><p>Call +91 999 999 9999 for immediate breakdown assistance.</p></div>;
const AMCTracking = () => <div>Track your AMC Status</div>;
const ServiceHistory = () => <div>Service Logs & Reports</div>;
const CaseStudies = () => <div>Project Case Studies</div>;
const Gallery = () => <div>Image & Video Gallery</div>;
const Testimonials = () => <div>Client Success Stories</div>;
const Industries = () => <div>Industries We Serve</div>;
const Privacy = () => <div>Privacy Policy</div>;
const Terms = () => <div>Terms & Conditions</div>;
const Cookie = () => <div>Cookie Policy</div>;
const Sitemap = () => <div>Visual Sitemap</div>;

// --- MAIN APP COMPONENT ---

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Main Entry Points */}
          <Route index element={<Home />} />
          <Route path="quote" element={<QuoteGenerator />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Corporate & Identity */}
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

          {/* Engineering Service Categories */}
          <Route path="services" element={<Services />} />
          <Route path="services/eot-crane" element={<EOTCrane />} />
          <Route path="services/single-girder" element={<SingleGirder />} />
          <Route path="services/double-girder" element={<DoubleGirder />} />
          <Route path="services/jib-crane" element={<JibCrane />} />
          <Route path="services/gantry-crane" element={<GantryCrane />} />
          
          {/* Operations & Execution */}
          <Route path="craneinstall" element={<CraneInstall />} />
          <Route path="customeng" element={<CustomEng />} />
          <Route path="roofprofile" element={<RoofProfile />} />
          <Route path="industrialauto" element={<IndustrialAuto />} />
          <Route path="plc" element={<PLC />} />
          <Route path="controlpanels" element={<ControlPanels />} />

          {/* Maintenance & Support */}
          <Route path="cranemaintenance" element={<CraneMaintenance />} />
          <Route path="services/amc" element={<AMC />} />
          <Route path="amctracking" element={<AMCTracking />} />
          <Route path="servicehistory" element={<ServiceHistory />} />
          <Route path="modernization" element={<Modernization />} />
          <Route path="breakdown" element={<Breakdown />} />
          <Route path="emergency" element={<Emergency />} />
          <Route path="book-service" element={<BookService />} />
          <Route path="service-requests" element={<ServiceRequests />} />

          {/* Procurement & Client Tools */}
          <Route path="rfq" element={<RFQ />} />
          <Route path="costestimator" element={<CostEstimator />} />
          <Route path="consult" element={<Consult />} />
          <Route path="my-projects" element={<MyProjects />} />
          <Route path="documents" element={<Documents />} />
          <Route path="invoices" element={<Invoices />} />
          
          {/* Case Studies & Gallery */}
          <Route path="case-studies" element={<CaseStudies />} />
          <Route path="gallery" element={<Gallery />} />

          {/* Legal & Navigation */}
          <Route path="privacy-policy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="cookie" element={<Cookie />} />
          <Route path="sitemap" element={<Sitemap />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}