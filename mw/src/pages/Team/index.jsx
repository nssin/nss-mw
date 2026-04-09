import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserCircle2, HardHat, Cog, Award, Linkedin, Mail } from 'lucide-react';

export default function Team() {
  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="w-full bg-gray-50 dark:bg-dark transition-colors duration-300 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="bg-primary text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              The Engineering <span className="text-secondary">Leadership</span>
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-blue-100 font-light">
              Built on decades of hands-on industrial experience, our leadership team drives the mechanical and automation innovations at Naidu Solutions & Services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. LEADERSHIP PROFILES */}
      <section className="px-4 max-w-7xl mx-auto -mt-10 relative z-10">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* FOUNDER PROFILE */}
          <motion.div variants={fadeUp} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="h-32 bg-gray-200 dark:bg-gray-700 w-full relative">
               {/* Placeholder for Firebase Storage URL background */}
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
            </div>
            <div className="px-8 pb-8 relative">
              <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center -mt-12 mb-4 shadow-lg border-4 border-white dark:border-gray-800">
                {/* Fallback avatar icon until Firebase images are uploaded */}
                <UserCircle2 className="w-20 h-20 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Chandrashekhar Laxmannaidu Ammisetty</h2>
              <h3 className="text-primary dark:text-secondary font-semibold mb-4">Founder & Managing Director</h3>
              
              <div className="prose dark:prose-invert text-gray-600 dark:text-gray-400 text-sm mb-6">
                <p>
                  The visionary behind Naidu Solutions & Services. With an extensive background originating in critical electrical maintenance and heavy machinery repair, Mr. Chandrashekhar built the company from the ground up in 2009. His deep technical knowledge of industrial crane structural integrity and motor controls laid the foundation for the company's manufacturing expansion.
                </p>
              </div>

              <div className="flex space-x-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                <button className="text-gray-400 hover:text-primary transition-colors"><Mail className="w-5 h-5" /></button>
                <button className="text-gray-400 hover:text-blue-600 transition-colors"><Linkedin className="w-5 h-5" /></button>
              </div>
            </div>
          </motion.div>

          {/* CO-FOUNDER PROFILE */}
          <motion.div variants={fadeUp} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="h-32 bg-gray-200 dark:bg-gray-700 w-full relative">
               {/* Placeholder for Firebase Storage URL background */}
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
            </div>
            <div className="px-8 pb-8 relative">
              <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center -mt-12 mb-4 shadow-lg border-4 border-white dark:border-gray-800">
                {/* Fallback avatar icon until Firebase images are uploaded */}
                <UserCircle2 className="w-20 h-20 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Akshit Chandrashekhar Ammisetty</h2>
              <h3 className="text-primary dark:text-secondary font-semibold mb-4">Co-Founder & Director of Operations</h3>
              
              <div className="prose dark:prose-invert text-gray-600 dark:text-gray-400 text-sm mb-6">
                <p>
                  Proving that raw, hands-on industrial experience often outpaces formal academic theory, Akshit Ammisetty drives the daily operational and strategic execution at Naidu Solutions. What he lacks in traditional high-level education, he makes up for with exceptional, gritty field experience and an unparalleled intuitive understanding of mechanical systems and crane automation.
                </p>
                <p className="mt-2">
                  He spearheads the breakdown response protocols and oversees the fabrication floor, ensuring his father's legacy of uncompromising quality is built into every unit.
                </p>
              </div>

              <div className="flex space-x-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                <button className="text-gray-400 hover:text-primary transition-colors"><Mail className="w-5 h-5" /></button>
                <button className="text-gray-400 hover:text-blue-600 transition-colors"><Linkedin className="w-5 h-5" /></button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. TECHNICAL DIVISIONS */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">The Engineering Backbone</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
            <HardHat className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Mechanical Division</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Specialists in structural load calculations, girder fabrication, and advanced mechanical assembly of EOT and Gantry cranes.</p>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
            <Cog className="w-12 h-12 text-secondary mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Automation Division</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Experts in Siemens and Allen-Bradley PLC programming, VFD integrations, and intelligent control panel design.</p>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
            <Award className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Quality & Safety</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">IS-certified inspectors ensuring 100% compliance with load testing and electrical safety protocols before any handover.</p>
          </motion.div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="px-4">
        <div className="max-w-4xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Consult With Our Leadership</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Discuss your custom engineering requirements directly with the team that builds them.</p>
          <Link to="/consult" className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors">
            Book a Technical Consultation
          </Link>
        </div>
      </section>

    </div>
  );
}