import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * Terms & Conditions Component
 * Finalized for the Naidu Solutions Ecosystem.
 * Features: Dynamic scroll tracking, responsive layout, and interactive sections.
 */

const TermSection = ({ id, title, children, activeSection }) => {
  const isActive = activeSection === id;
  
  return (
    <section 
      id={id} 
      className={`mb-12 transition-all duration-700 transform ${
        isActive ? 'opacity-100 translate-x-0' : 'opacity-60 -translate-x-2'
      }`}
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
        <span className={`w-1.5 h-8 bg-primary mr-4 rounded-full transition-all duration-500 ${isActive ? 'scale-y-100' : 'scale-y-50'}`}></span>
        {title}
      </h2>
      <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4 pl-6">
        {children}
      </div>
    </section>
  );
};

export default function Terms() {
  const [activeSection, setActiveSection] = useState('acceptance');
  const [effectiveDate, setEffectiveDate] = useState('');

  useEffect(() => {
    // Logic to set real-time effective date
    const date = new Date();
    setEffectiveDate(date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));

    const handleScroll = () => {
      const sections = ['acceptance', 'services', 'obligations', 'intellectual-property', 'liability', 'governing-law'];
      const scrollPosition = window.scrollY + 300;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 120,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { id: 'acceptance', label: '1. Acceptance' },
    { id: 'services', label: '2. Services' },
    { id: 'obligations', label: '3. User Obligations' },
    { id: 'intellectual-property', label: '4. Intellectual Property' },
    { id: 'liability', label: '5. Liability' },
    { id: 'governing-law', label: '6. Governing Law' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 selection:bg-primary selection:text-white">
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="mb-16 animate-fade-in">
          <h1 className="text-5xl font-black mb-4 text-primary dark:text-white tracking-tighter">
            Terms & Conditions
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            Effective Date: {effectiveDate} | Version 2.0.4
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Navigation Sidebar */}
          <aside className="lg:w-1/4 lg:block hidden">
            <div className="sticky top-28 border-l-2 border-gray-100 dark:border-gray-800">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`block w-full text-left px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                    activeSection === link.id
                      ? 'text-primary border-l-4 border-primary -ml-[3px] bg-blue-50/50 dark:bg-primary/10'
                      : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Legal Content Area */}
          <main className="lg:w-3/4">
            <TermSection id="acceptance" title="Acceptance of Terms" activeSection={activeSection}>
              <p>
                By accessing or using the Naidu Solutions platform, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to all of these terms, do not use our services.
              </p>
              <p>
                We reserve the right to change or modify these terms at any time at our sole discretion. Your continued use of the platform following the posting of changes will confirm your acceptance of such changes.
              </p>
            </TermSection>

            <TermSection id="services" title="Description of Services" activeSection={activeSection}>
              <p>
                Naidu Solutions provides an integrated ecosystem of software development, digital consulting, and enterprise infrastructure services. 
              </p>
              <p>
                The "Services" include, but are not limited to, the Naidu Solutions website, API access, cloud dashboards, and any other software or tools provided by us. We aim for 99.9% uptime but do not guarantee uninterrupted service.
              </p>
            </TermSection>

            <TermSection id="obligations" title="User Obligations" activeSection={activeSection}>
              <p>As a user of this platform, you represent and warrant that:</p>
              <ul className="list-disc space-y-2 ml-4">
                <li>You are at least 18 years of age.</li>
                <li>All registration information you submit is truthful and accurate.</li>
                <li>Your use of the services does not violate any applicable law or regulation.</li>
                <li>You will maintain the security of your account credentials and are responsible for all activities that occur under your account.</li>
              </ul>
            </TermSection>

            <TermSection id="intellectual-property" title="Intellectual Property Rights" activeSection={activeSection}>
              <p>
                The platform and its original content, features, and functionality are owned by Naidu Solutions and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>
              <p>
                You are granted a limited, non-exclusive, non-transferable license to access and use the platform for your internal business or personal purposes as permitted by these Terms.
              </p>
            </TermSection>

            <TermSection id="liability" title="Limitation of Liability" activeSection={activeSection}>
              <p className="italic bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                In no event shall Naidu Solutions, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.
              </p>
            </TermSection>

            <TermSection id="governing-law" title="Governing Law" activeSection={activeSection}>
              <p>
                These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which Naidu Solutions is headquartered, without regard to its conflict of law provisions.
              </p>
              <p>
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>
            </TermSection>

            {/* Final Action Block */}
            <div className="mt-20 p-8 rounded-3xl bg-gray-900 text-white dark:bg-primary shadow-2xl overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Ready to proceed?</h3>
                <p className="mb-8 text-gray-300 dark:text-blue-100 max-w-lg">
                  If you have read and understood our terms, you can proceed to request a quote for your project or reach out to our legal support for clarification.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/quote" className="bg-white text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                    Get Quote
                  </Link>
                  <Link to="/contact" className="border border-white/30 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors">
                    Contact Legal Support
                  </Link>
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}