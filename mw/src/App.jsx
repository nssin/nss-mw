import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home/index.jsx';
import QuoteGenerator from './pages/QuoteGenerator/index.jsx';
import Login from './pages/Login/index.jsx';
import Dashboard from './pages/Dashboard/index.jsx';
import About from './pages/About/index.jsx';
import Team from './pages/Team/index.jsx';
import VisionMission from './pages/VisionMission/index.jsx';
import Certifications from './pages/Certifications/index.jsx';
import Safety from './pages/Safety/index.jsx';
import Contact from './pages/Contact/index.jsx';
import Careers from './pages/Careers/index.jsx';
import Blog from './pages/Blog/index.jsx';
import FAQ from './pages/FAQ/index.jsx';
import Services from './pages/Services/index.jsx';
import EOTCrane from './pages/EOTCrane/index.jsx';
import SingleGirder from './pages/SingleGirder/index.jsx';
import DoubleGirder from './pages/DoubleGirder/index.jsx';
import JibCrane from './pages/JibCrane/index.jsx';
import GantryCrane from './pages/GantryCrane/index.jsx';
import CraneInstall from './pages/CraneInstall/index.jsx';
import CraneMaintenance from './pages/CraneMaintenance/index.jsx';
import AMC from './pages/AMC/index.jsx';
import Modernization from './pages/Modernization/index.jsx';
import Breakdown from './pages/Breakdown/index.jsx';
import RoofProfile from './pages/RoofProfile/index.jsx';
import IndustrialAuto from './pages/IndustrialAuto/index.jsx';
import PLC from './pages/PLC/index.jsx';
import ControlPanels from './pages/ControlPanels/index.jsx';
import CustomEng from './pages/CustomEng/index.jsx';
import RFQ from './pages/RFQ/index.jsx';
import CostEstimator from './pages/CostEstimator/index.jsx';
import Consult from './pages/Consult/index.jsx';
import MyProjects from './pages/MyProjects/index.jsx';
import Documents from './pages/Documents/index.jsx';
import Invoices from './pages/Invoices/index.jsx';
import ServiceRequests from './pages/ServiceRequests/index.jsx';
import BookService from './pages/BookService/index.jsx';
import Emergency from './pages/Emergency/index.jsx';
import AMCTracking from './pages/AMCTracking/index.jsx';
import ServiceHistory from './pages/ServiceHistory/index.jsx';
import CaseStudies from './pages/CaseStudies/index.jsx';
import Gallery from './pages/Gallery/index.jsx';
import Testimonials from './pages/Testimonials/index.jsx';
import Industries from './pages/Industries/index.jsx';
import Privacy from './pages/Privacy/index.jsx';
import Terms from './pages/Terms/index.jsx';
import Cookie from './pages/Cookie/index.jsx';
import Sitemap from './pages/Sitemap/index.jsx';

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