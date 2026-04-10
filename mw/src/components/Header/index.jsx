import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { 
  Menu, 
  X, 
  User, 
  ArrowUpRight, 
  Zap,
  LogOut as LogOutIcon
} from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Global Industrial Header Component
 * Implements the HEIGL-style transparent-to-dark transition
 * and manages global navigation for all 44+ public routes.
 */
const Header = () => {
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Listen for authentication changes
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    
    // Listen for scroll events to trigger header background transition
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Automatically close mobile menu when a navigation link is clicked
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Services', to: '/services' },
    { label: 'Projects', to: '/case-studies' },
    { label: 'About Us', to: '/about' },
    { label: 'Careers', to: '/careers' },
    { label: 'Contact', to: '/contact' }
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 flex items-center px-6 lg:px-16",
      isScrolled 
        ? "h-20 bg-dark/95 backdrop-blur-xl border-b border-white/5 shadow-2xl" 
        : "h-28 bg-transparent"
    )}>
      <div className="max-w-[1400px] mx-auto w-full flex items-center justify-between">
        
        {/* 1. BRAND IDENTITY NODE */}
        <Link to="/" className="flex flex-col group">
          <span className="text-2xl font-black tracking-widest uppercase text-white">NSS-MW</span>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_#1e40af]"></div>
            <span className="text-[8px] font-bold tracking-[0.3em] text-white/50 uppercase group-hover:text-white transition-colors">
              Heavy Engineering
            </span>
          </div>
        </Link>

        {/* 2. DESKTOP NAVIGATION (HEIGL STYLE) */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.to} 
              to={link.to} 
              className={cn(
                "text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:text-primary",
                location.pathname === link.to ? "text-primary" : "text-white/80"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* 3. ACTION & AUTH NODE */}
        <div className="flex items-center gap-6">
          <Link 
            to="/quote" 
            className="hidden lg:flex items-center gap-2 bg-white text-dark px-7 py-3.5 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all shadow-xl shadow-black/20"
          >
            Get a quote <ArrowUpRight size={14} strokeWidth={3} />
          </Link>
          
          <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
          
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Operator</span>
                <span className="text-[10px] font-bold text-white font-mono">{user.email.split('@')[0]}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="w-11 h-11 rounded-sm bg-white/5 hover:bg-red-500/20 border border-white/10 flex items-center justify-center transition-all group"
                title="Terminate Session"
              >
                <LogOutIcon size={18} className="text-white/40 group-hover:text-red-400 transition-colors" />
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="w-11 h-11 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all group"
              title="Operator Access"
            >
              <User size={18} className="text-white/40 group-hover:text-white transition-colors" />
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-white hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* 4. MOBILE DRAWER OVERLAY */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-dark border-b border-white/10 shadow-2xl lg:hidden animate-in slide-in-from-top duration-300">
           <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.to} 
                  to={link.to} 
                  className="text-2xl font-black uppercase tracking-tighter text-white hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-white/5 my-4"></div>
              <Link 
                to="/quote" 
                className="bg-primary text-white py-5 text-center font-black text-xs uppercase tracking-[0.3em] shadow-2xl"
              >
                Request Quote
              </Link>
              {!user && (
                <Link to="/login" className="text-center text-[10px] font-bold uppercase tracking-widest text-white/30 py-2">
                  Node Authentication Required
                </Link>
              )}
           </div>
        </div>
      )}
    </header>
  );
};

export default Header;