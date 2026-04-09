import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, 
  Radio, 
  Zap, 
  Settings, 
  ShieldCheck, 
  ArrowRight, 
  Activity, 
  Maximize2, 
  Gauge, 
  BarChart3 
} from 'lucide-react';

/**
 * Crane Modernization & Upgrades Component
 * Focus: VFD Upgrades and Remote System Conversions.
 * Features: Performance comparison logic, industrial specs, and entry animations.
 */

const FeatureCard = ({ icon: Icon, title, points }) => (
  <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all group">
    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h3>
    <ul className="space-y-3">
      {points.map((point, i) => (
        <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
          <ShieldCheck size={16} className="text-green-500 mr-2 mt-0.5 shrink-0" />
          {point}
        </li>
      ))}
    </ul>
  </div>
);

export default function Modernization() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeMetric, setActiveMetric] = useState('vfd');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const metrics = {
    vfd: {
      title: "VFD Drive Performance",
      improvement: "+45% Control Precision",
      stats: [
        { label: "Energy Consumption", old: "100%", new: "72%", color: "text-green-500" },
        { label: "Mechanical Stress", old: "High", new: "Near-Zero", color: "text-blue-500" },
        { label: "Positioning Accuracy", old: "±50mm", new: "±2mm", color: "text-primary" }
      ]
    },
    remote: {
      title: "Remote System Conversion",
      improvement: "+60% Operator Safety",
      stats: [
        { label: "Operational Range", old: "5m (Pendant)", new: "100m (Radio)", color: "text-green-500" },
        { label: "Visibility", old: "Fixed", new: "360° Freedom", color: "text-blue-500" },
        { label: "Response Lag", old: "80ms", new: "<15ms", color: "text-primary" }
      ]
    }
  };

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="bg-dark text-white py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 border border-primary/30 rounded-full mb-6">
            <Zap size={14} className="text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Retrofitting Excellence</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
            Modernize or <br />Risk Downtime.
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
            Convert your legacy contactor-based cranes to high-performance VFD systems. Naidu Solutions specializes in 2026-Ready industrial automation upgrades.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 -translate-x-12 translate-y-12">
          <Cpu size={500} />
        </div>
      </section>

      <div className="max-w-7xl mx-auto py-20 px-4">
        {/* Core Upgrades Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <FeatureCard 
            icon={Cpu}
            title="VFD Stepless Upgrades"
            points={[
              "Elimination of contactor arcing and frequent maintenance.",
              "Smooth acceleration/deceleration reducing load swing.",
              "Micro-speed functionality for precision placement.",
              "Regenerative braking options for energy recovery."
            ]}
          />
          <FeatureCard 
            icon={Radio}
            title="Wireless Remote Conversion"
            points={[
              "Dual-frequency 2.4GHz / 868MHz anti-interference systems.",
              "IP65 rated ergonomic transmitters with emergency stop.",
              "Removal of hazardous pendant cables and trailing wires.",
              "Simultaneous control of multiple hoists/trolleys."
            ]}
          />
        </div>

        {/* Technical Impact Comparison */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-16 border border-gray-100 dark:border-gray-800 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Modernization ROI</h2>
              <p className="text-gray-500 mb-10">Select a component to see the technical impact of upgrading your existing crane infrastructure.</p>
              
              <div className="space-y-4">
                <button 
                  onClick={() => setActiveMetric('vfd')}
                  className={`w-full flex items-center justify-between p-6 rounded-2xl border-2 transition-all ${activeMetric === 'vfd' ? 'border-primary bg-primary/5' : 'border-transparent bg-gray-50 dark:bg-gray-800'}`}
                >
                  <div className="flex items-center gap-4">
                    <Gauge className={activeMetric === 'vfd' ? 'text-primary' : 'text-gray-400'} />
                    <span className="font-bold dark:text-white">Drive System Upgrade</span>
                  </div>
                  <ArrowRight className={activeMetric === 'vfd' ? 'text-primary translate-x-0' : 'text-gray-300 -translate-x-4 opacity-0'} />
                </button>
                <button 
                  onClick={() => setActiveMetric('remote')}
                  className={`w-full flex items-center justify-between p-6 rounded-2xl border-2 transition-all ${activeMetric === 'remote' ? 'border-primary bg-primary/5' : 'border-transparent bg-gray-50 dark:bg-gray-800'}`}
                >
                  <div className="flex items-center gap-4">
                    <Maximize2 className={activeMetric === 'remote' ? 'text-primary' : 'text-gray-400'} />
                    <span className="font-bold dark:text-white">Control System Conversion</span>
                  </div>
                  <ArrowRight className={activeMetric === 'remote' ? 'text-primary translate-x-0' : 'text-gray-300 -translate-x-4 opacity-0'} />
                </button>
              </div>
            </div>

            <div className="lg:w-1/2 bg-gray-50 dark:bg-gray-800/50 rounded-[2rem] p-8 flex flex-col justify-center">
              <div className="mb-8">
                <div className="flex items-center gap-2 text-primary font-black text-xs uppercase mb-2">
                  <Activity size={16} />
                  Performance Metric
                </div>
                <h3 className="text-4xl font-black text-gray-900 dark:text-white">{metrics[activeMetric].improvement}</h3>
              </div>

              <div className="space-y-6">
                {metrics[activeMetric].stats.map((stat, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-bold text-gray-500">{stat.label}</span>
                      <div className="flex gap-4">
                        <span className="text-xs text-gray-400 line-through">{stat.old}</span>
                        <span className={`text-sm font-black ${stat.color}`}>{stat.new}</span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className={`h-full bg-primary transition-all duration-700 w-[90%]`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Support Actions */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-gray-100 dark:border-gray-800 pt-12">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-green-500/10 text-green-500 rounded-2xl">
              <BarChart3 size={32} />
            </div>
            <div>
              <h4 className="text-xl font-bold dark:text-white">Custom Energy Audit</h4>
              <p className="text-sm text-gray-500 italic">Get a detailed report on energy savings before you upgrade.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link to="/quote" className="bg-primary text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-primary/20">
              Get Upgrade Quote
            </Link>
            <Link to="/contact" className="bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 px-10 py-4 rounded-2xl font-black hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
              Technical Consult
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}