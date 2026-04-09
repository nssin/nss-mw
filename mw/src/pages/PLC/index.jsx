import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, 
  Binary, 
  Network, 
  Terminal, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Settings, 
  Database, 
  MonitorPlay,
  CheckCircle2,
  Code2
} from 'lucide-react';

/**
 * PLC Programming & Systems Engineering Module
 * Real Content: Technical support for Siemens (S7), Rockwell (Logix), and Delta (DVP/AS).
 * Real Logic: State-driven platform specifications and protocol mapping.
 */

const TechBadge = ({ children }) => (
  <span className="px-3 py-1 bg-primary/10 text-primary dark:text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-md border border-primary/20">
    {children}
  </span>
);

export default function PLC() {
  const [activeBrand, setActiveBrand] = useState('siemens');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const brands = {
    siemens: {
      name: "Siemens Automation",
      series: "S7-1200, S7-1500, S7-300/400",
      software: "TIA Portal V14 - V19, Step 7 Classic",
      protocols: ["Profinet", "Profibus", "OPC-UA", "S7-Comm"],
      capabilities: [
        "Distributed I/O configuration (ET200SP)",
        "Fail-safe (F-CPU) safety programming",
        "SCL (Structured Control Language) optimization",
        "Motion control via Technology Objects"
      ],
      color: "text-[#009999]"
    },
    rockwell: {
      name: "Rockwell / Allen-Bradley",
      series: "ControlLogix, CompactLogix, Micro800",
      software: "Studio 5000, RSLogix 500/5000",
      protocols: ["EtherNet/IP", "DeviceNet", "ControlNet"],
      capabilities: [
        "Add-On Instructions (AOI) development",
        "Producer/Consumer tag synchronization",
        "PlantPAx DCS library integration",
        "Stratix switch network management"
      ],
      color: "text-[#E31E24]"
    },
    delta: {
      name: "Delta Electronics",
      series: "DVP-ES/EX, AS-Series, AH-Series",
      software: "ISPSoft, WPLSoft, DIADesigner",
      protocols: ["Modbus TCP/RTU", "EtherCAT", "CANopen"],
      capabilities: [
        "Cost-effective logic sequencing",
        "High-speed pulse output for servo control",
        "Built-in communication port optimization",
        "Ladder Logic (LD) & Instruction List (IL)"
      ],
      color: "text-[#005596]"
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Header */}
      <section className="bg-primary py-20 px-4 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6 backdrop-blur-sm border border-white/20">
            <Binary size={16} className="text-secondary" />
            <span className="text-xs font-bold uppercase tracking-widest">Industrial Logic Design</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none">
            PLC Systems & <br />Automation Logic
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl leading-relaxed">
            Developing deterministic control systems for 2026 industrial requirements. We specialize in multi-vendor PLC programming, HMI/SCADA integration, and IIoT data bridging.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4">
          <Cpu size={500} />
        </div>
      </section>

      <div className="max-w-7xl mx-auto py-20 px-4">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Vendor Selection Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-2xl font-black mb-6 text-gray-900 dark:text-white flex items-center gap-2">
              <Terminal size={24} className="text-primary" />
              Vendor Support
            </h2>
            {Object.keys(brands).map((key) => (
              <button
                key={key}
                onClick={() => setActiveBrand(key)}
                className={`w-full p-6 rounded-2xl text-left transition-all duration-300 border-2 flex items-center justify-between ${
                  activeBrand === key 
                  ? 'border-primary bg-primary/5 shadow-lg scale-105 z-10' 
                  : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 hover:border-gray-200'
                }`}
              >
                <div>
                  <h3 className={`text-lg font-black ${activeBrand === key ? 'text-primary' : 'text-gray-400'}`}>
                    {brands[key].name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{brands[key].series.split(',')[0]} Support</p>
                </div>
                <ArrowRight size={20} className={activeBrand === key ? 'text-primary' : 'text-gray-300'} />
              </button>
            ))}

            <div className="mt-8 p-8 bg-gray-900 rounded-[2rem] text-white relative overflow-hidden">
              <h4 className="font-bold mb-4 flex items-center gap-2 relative z-10">
                <ShieldCheck className="text-secondary" size={20} />
                Safety Standards
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed relative z-10">
                Our code complies with IEC 61131-3 standards, ensuring modularity, portability, and readability for long-term plant maintenance.
              </p>
              <Zap className="absolute -right-4 -bottom-4 text-white/5" size={120} />
            </div>
          </div>

          {/* Technical Implementation Area */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
              <div className="p-10 md:p-14 flex-grow">
                <div className="flex flex-wrap gap-2 mb-6">
                  {brands[activeBrand].protocols.map(p => <TechBadge key={p}>{p}</TechBadge>)}
                </div>

                <h2 className={`text-4xl font-black mb-2 ${brands[activeBrand].color}`}>
                  {brands[activeBrand].name}
                </h2>
                <p className="text-lg font-bold text-gray-500 mb-10">
                  Development Software: {brands[activeBrand].software}
                </p>

                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <Code2 size={16} className="text-primary" />
                      Programming Scope
                    </h4>
                    <ul className="space-y-4">
                      {brands[activeBrand].capabilities.map((cap, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 size={18} className="text-green-500 mt-0.5 shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-3 mb-3">
                        <Network className="text-primary" size={20} />
                        <h5 className="font-bold dark:text-white">Network Architecture</h5>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Full configuration of industrial networks including topology mapping, IP management, and cyclic/acyclic communication setup.
                      </p>
                    </div>
                    <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-3 mb-3">
                        <Database className="text-primary" size={20} />
                        <h5 className="font-bold dark:text-white">Data Management</h5>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Structure Tagging, User Defined Types (UDT), and Global Data Blocks (DB) for efficient SCADA/MES interfacing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-10 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl">
                    <MonitorPlay size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold dark:text-white">HMI Synchronization</p>
                    <p className="text-xs text-gray-500">Auto-tagging for WinCC, FactoryTalk, and DOP-Soft.</p>
                  </div>
                </div>
                <Link to="/quote" className="bg-primary text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all flex items-center group shadow-xl shadow-primary/20">
                  Request Logic Design <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Bar */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {[
            { icon: Settings, title: "Logic Migration", desc: "Upgrading legacy S5/SLC500 systems to modern TIA/Logix platforms." },
            { icon: Zap, title: "Servo Integration", desc: "Synchronized multi-axis motion control via EtherCAT or Profinet IRT." },
            { icon: Network, title: "IIoT Bridging", desc: "Connecting floor-level PLC data to cloud dashboards via MQTT/OPC-UA." }
          ].map((item, i) => (
            <div key={i} className="p-8 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all">
              <item.icon className="text-primary mb-4" size={32} />
              <h4 className="font-bold mb-2 dark:text-white">{item.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}