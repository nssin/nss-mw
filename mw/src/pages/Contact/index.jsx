import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      // 1. Save directly to Firestore leads collection
      await addDoc(collection(db, "leads"), {
        ...formData,
        timestamp: serverTimestamp(),
        source: 'Contact Form',
        status: 'New'
      });

      // 2. Clear form and show success
      setFormData({
        name: '', company: '', email: '', phone: '', subject: 'General Inquiry', message: ''
      });
      setSubmitStatus('success');
      
    } catch (error) {
      console.error("Error submitting form: ", error);
      setSubmitStatus('error');
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
      // Reset status after 5 seconds
      if(submitStatus === 'success') {
         setTimeout(() => setSubmitStatus(null), 5000);
      }
    }
  };

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="w-full bg-gray-50 dark:bg-dark transition-colors duration-300 pb-24">
      
      {/* 1. HERO SECTION */}
      <section className="bg-primary text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Connect With <span className="text-secondary">Engineering</span>
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-blue-100 font-light">
              Whether you need a new crane configuration, emergency breakdown support, or a technical consultation, our leadership is ready to assist.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. CONTACT INFO & FORM GRID */}
      <section className="px-4 max-w-7xl mx-auto -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COL: Contact Information */}
          <motion.div 
            initial="hidden" animate="visible" variants={fadeUp}
            className="lg:col-span-1 space-y-6"
          >
            {/* HQ Card */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">Consultation Quarters</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg mr-4 text-primary dark:text-secondary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white block mb-1">Nanded HQ</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      121 Kissan Nagar, 1st Floor<br/>
                      CIDCO, Nanded<br/>
                      Maharashtra 431603
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg mr-4 text-green-600 dark:text-green-400">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Founder (Mr. Chandrashekhar)</span>
                      <a href="tel:+919049994500" className="text-gray-900 dark:text-white font-semibold hover:text-primary transition-colors block">+91 90499 94500</a>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Co-Founder (Akshit Ammisetty)</span>
                      <a href="tel:+919822488532" className="text-gray-900 dark:text-white font-semibold hover:text-primary transition-colors block">+91 98224 88532</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-lg mr-4 text-secondary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                     <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Direct Email</span>
                     <a href="mailto:sales.nss@tuta.io" className="text-gray-900 dark:text-white font-semibold hover:text-primary transition-colors">sales.nss@tuta.io</a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg mr-4 text-purple-600 dark:text-purple-400">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                     <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Operating Hours</span>
                     <p className="text-gray-900 dark:text-white font-semibold text-sm">Mon - Sat: 09:00 AM - 07:00 PM</p>
                     <p className="text-red-600 dark:text-red-400 font-bold text-xs mt-1">24/7 For Breakdown Emergencies</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COL: Contact Form connected to Firestore */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Send an Inquiry</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Fill out the form below and our engineering team will respond within 2-4 hours.</p>

            {submitStatus === 'success' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg flex items-start text-green-700 dark:text-green-400">
                <CheckCircle2 className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold">Inquiry Received Successfully</h4>
                  <p className="text-sm mt-1">Your message has been securely routed to our database. A technical representative will contact you shortly.</p>
                </div>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-start text-red-700 dark:text-red-400">
                <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold">Submission Failed</h4>
                  <p className="text-sm mt-1">Database connection error: {errorMessage}. Please call us directly.</p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name *</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} disabled={isSubmitting}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:text-white transition-all outline-none disabled:opacity-50" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Company Name</label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange} disabled={isSubmitting}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:text-white transition-all outline-none disabled:opacity-50" placeholder="Acme Industries" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} disabled={isSubmitting}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:text-white transition-all outline-none disabled:opacity-50" placeholder="john@acme.com" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Phone Number *</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} disabled={isSubmitting}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:text-white transition-all outline-none disabled:opacity-50" placeholder="+91 98765 43210" />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Inquiry Type</label>
                <select name="subject" value={formData.subject} onChange={handleChange} disabled={isSubmitting}
                  className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:text-white transition-all outline-none disabled:opacity-50">
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="New Crane Sales">New Crane Sales / Quotation</option>
                  <option value="Breakdown Repair">Emergency Breakdown Repair</option>
                  <option value="AMC Contract">Annual Maintenance Contract (AMC)</option>
                  <option value="Automation/PLC">Automation & PLC Programming</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Message / Technical Requirements *</label>
                <textarea name="message" required rows="4" value={formData.message} onChange={handleChange} disabled={isSubmitting}
                  className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:text-white transition-all outline-none resize-none disabled:opacity-50" 
                  placeholder="Please describe your requirements, spanning dimensions, or issues..." />
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto bg-primary text-white py-3 px-8 rounded-lg font-bold hover:bg-blue-800 transition-all flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting securely...
                  </>
                ) : (
                  <>
                    Submit Inquiry <Send className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* 3. MAP IFRAME PLACEHOLDER */}
      <section className="mt-20">
         <div className="w-full h-96 bg-gray-300 dark:bg-gray-700 relative flex items-center justify-center">
            {/* Real implementation should use Google Maps Embed API here */}
            <div className="text-center p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-xl">
               <MapPin className="w-10 h-10 text-primary mx-auto mb-2" />
               <p className="font-bold text-gray-900 dark:text-white">Interactive Map</p>
               <p className="text-sm text-gray-600 dark:text-gray-400">121 Kissan Nagar, 1st Floor, CIDCO, Nanded, Maharashtra 431603</p>
            </div>
         </div>
      </section>

    </div>
  );
}