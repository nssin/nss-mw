import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Zap } from 'lucide-react';

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

// --- GLOBAL LAYOUT WRAPPER ---

const Layout = () => {
  return (
    <div className="min-h-screen bg-dark text-white font-sans flex flex-col selection:bg-primary selection:text-white">
      {/* Global Modular Header (Handles scroll transitions & Auth) */}
      <Header />

      {/* Main Viewport Node - No top padding for seamless hero background integration */}
      <main className="flex-1 w-full flex flex-col">
        <Suspense fallback={
          <div className="h-screen w-full flex flex-col items-center justify-center bg-dark">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-24 h-24 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <Zap size={32} className="text-white animate-pulse" />
            </div>
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-white/40">Initializing Node...</p>
          </div>
        }>
          <Outlet />
        </Suspense>
      </main>

      {/* Global Modular Footer */}
      <Footer />
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