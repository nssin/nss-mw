import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * Privacy Policy Component
 * Developed for Naidu Solutions Ecosystem
 * Features: Interactive section navigation, real-time last updated date, 
 * responsive layout, and legally structured content.
 */

const Section = ({ title, children, id, activeSection }) => {
  const isActive = activeSection === id;
  
  return (
    <section 
      id={id} 
      className={`mb-10 transition-all duration-500 transform ${
        isActive ? 'scale-100 opacity-100' : 'scale-[0.98] opacity-90'
      }`}
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white border-b-2 border-primary w-fit pb-1">
        {title}
      </h2>
      <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
        {children}
      </div>
    </section>
  );
};

export default function Privacy() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    // Set current date as last updated for the finalized version
    const date = new Date();
    setLastUpdated(date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));

    const handleScroll = () => {
      const sections = ['introduction', 'data-collection', 'data-usage', 'security', 'rights', 'contact'];
      const scrollPosition = window.scrollY + 200;

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
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { id: 'introduction', label: 'Introduction' },
    { id: 'data-collection', label: 'Data Collection' },
    { id: 'data-usage', label: 'How We Use Data' },
    { id: 'security', label: 'Data Security' },
    { id: 'rights', label: 'Your Rights' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-primary dark:text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 font-semibold">
            Last Updated: {lastUpdated}
          </p>
          <div className="mt-4 h-1 w-24 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sticky Sidebar Navigation */}
          <aside className="lg:w-1/4">
            <div className="sticky top-24 space-y-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white px-2">Table of Contents</h3>
              <nav className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                      activeSection === item.id
                        ? 'bg-primary text-white shadow-md transform translate-x-1'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:w-3/4 bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
            
            <Section id="introduction" title="1. Introduction" activeSection={activeSection}>
              <p>
                Welcome to Naidu Solutions & Services [NSS]. We respect your privacy and are committed to protecting your personal data. This Privacy Policy informs you as to how we look after your personal data when you visit our website and tells you about your privacy rights and how the law protects you.
              </p>
              <p>
                This platform is part of the Naidu Solutions ecosystem, designed to provide enterprise-grade technology services while maintaining the highest standards of data integrity and transparency.
              </p>
            </Section>

            <Section id="data-collection" title="2. Data Collection" activeSection={activeSection}>
              <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Identity Data:</strong> Includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data:</strong> Includes email address and telephone numbers.</li>
                <li><strong>Technical Data:</strong> Includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
                <li><strong>Usage Data:</strong> Includes information about how you use our website, products and services.</li>
              </ul>
            </Section>

            <Section id="data-usage" title="3. How We Use Data" activeSection={activeSection}>
              <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
              <ul className="list-decimal pl-6 space-y-2">
                <li>To perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal obligation.</li>
              </ul>
            </Section>

            <Section id="security" title="4. Data Security" activeSection={activeSection}>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
              </p>
              <p>
                In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
              </p>
            </Section>

            <Section id="rights" title="5. Your Rights" activeSection={activeSection}>
              <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-primary dark:text-blue-400 font-medium">
                <li>Request access to your personal data.</li>
                <li>Request correction of your personal data.</li>
                <li>Request erasure of your personal data.</li>
                <li>Object to processing of your personal data.</li>
                <li>Request restriction of processing your personal data.</li>
              </ul>
            </Section>

            <Section id="contact" title="6. Contact Us" activeSection={activeSection}>
              <p>
                If you have any questions about this Privacy Policy or our privacy practices, please contact our legal team:
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border-l-4 border-primary mt-4">
                <p className="font-bold text-gray-900 dark:text-white">Naidu Solutions Legal Department</p>
                <p>Email: legal.nss@tuta.io</p>
                <p>Address: Global Tech Park, Innovation Hub, Suite 402</p>
              </div>
            </Section>

            {/* Quick Actions Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Quick Actions</h3>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/quote" 
                  className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-primary/30 flex items-center group"
                >
                  Get Quote
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                <Link 
                  to="/contact" 
                  className="border-2 border-primary text-primary dark:text-white px-8 py-3 rounded-xl font-bold hover:bg-primary hover:text-white transition-all"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}