import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import QuoteGenerator from './pages/QuoteGenerator';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Team from './pages/Team';
import VisionMission from './pages/VisionMission';
import Certifications from './pages/Certifications';
import Safety from './pages/Safety';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import FAQ from './pages/FAQ';
import Services from './pages/Services';
import EOTCrane from './pages/EOTCrane';
import SingleGirder from './pages/SingleGirder';
import DoubleGirder from './pages/DoubleGirder';
import JibCrane from './pages/JibCrane';
import GantryCrane from './pages/GantryCrane';
import CraneInstall from './pages/CraneInstall';
import CraneMaintenance from './pages/CraneMaintenance';
import AMC from './pages/AMC';
import Modernization from './pages/Modernization';
import Breakdown from './pages/Breakdown';
import RoofProfile from './pages/RoofProfile';
import IndustrialAuto from './pages/IndustrialAuto';
import PLC from './pages/PLC';
import ControlPanels from './pages/ControlPanels';
import CustomEng from './pages/CustomEng';
import RFQ from './pages/RFQ';
import CostEstimator from './pages/CostEstimator';
import Consult from './pages/Consult';
import MyProjects from './pages/MyProjects';
import Documents from './pages/Documents';
import Invoices from './pages/Invoices';
import ServiceRequests from './pages/ServiceRequests';
import BookService from './pages/BookService';
import Emergency from './pages/Emergency';
import AMCTracking from './pages/AMCTracking';
import ServiceHistory from './pages/ServiceHistory';
import CaseStudies from './pages/CaseStudies';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import Industries from './pages/Industries';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookie from './pages/Cookie';
import Sitemap from './pages/Sitemap';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="quote" element={<QuoteGenerator />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="about" element={<About />} />
          <Route path="team" element={<Team />} />
          <Route path="visionmission" element={<VisionMission />} />
          <Route path="certifications" element={<Certifications />} />
          <Route path="safety" element={<Safety />} />
          <Route path="contact" element={<Contact />} />
          <Route path="careers" element={<Careers />} />
          <Route path="blog" element={<Blog />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="services" element={<Services />} />
          <Route path="services/eot-crane" element={<EOTCrane />} />
          <Route path="services/single-girder" element={<SingleGirder />} />
          <Route path="services/double-girder" element={<DoubleGirder />} />
          <Route path="services/jib-crane" element={<JibCrane />} />
          <Route path="services/gantry-crane" element={<GantryCrane />} />
          <Route path="craneinstall" element={<CraneInstall />} />
          <Route path="cranemaintenance" element={<CraneMaintenance />} />
          <Route path="services/amc" element={<AMC />} />
          <Route path="modernization" element={<Modernization />} />
          <Route path="breakdown" element={<Breakdown />} />
          <Route path="roofprofile" element={<RoofProfile />} />
          <Route path="industrialauto" element={<IndustrialAuto />} />
          <Route path="plc" element={<PLC />} />
          <Route path="controlpanels" element={<ControlPanels />} />
          <Route path="customeng" element={<CustomEng />} />
          <Route path="rfq" element={<RFQ />} />
          <Route path="costestimator" element={<CostEstimator />} />
          <Route path="consult" element={<Consult />} />
          <Route path="myprojects" element={<MyProjects />} />
          <Route path="documents" element={<Documents />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="servicerequests" element={<ServiceRequests />} />
          <Route path="bookservice" element={<BookService />} />
          <Route path="emergency" element={<Emergency />} />
          <Route path="amctracking" element={<AMCTracking />} />
          <Route path="servicehistory" element={<ServiceHistory />} />
          <Route path="casestudies" element={<CaseStudies />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="industries" element={<Industries />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="cookie" element={<Cookie />} />
          <Route path="sitemap" element={<Sitemap />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}