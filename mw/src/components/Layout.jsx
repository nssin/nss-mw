import { Link, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';

export default function Layout() {
  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary dark:text-secondary">Naidu Solutions</Link>
          
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/about" className="hover:text-primary transition">About</Link>
            <Link to="/services" className="hover:text-primary transition">{t('services')}</Link>
            <Link to="/quote" className="hover:text-primary transition">{t('get_quote')}</Link>
            <Link to="/dashboard" className="hover:text-primary transition">{t('dashboard')}</Link>
            <Link to="/login" className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700">Login</Link>
            
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="flex space-x-2">
              <button onClick={() => changeLanguage('en')} className="text-sm">EN</button>
              <button onClick={() => changeLanguage('hi')} className="text-sm">HI</button>
              <button onClick={() => changeLanguage('mr')} className="text-sm">MR</button>
            </div>
          </nav>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 p-4 flex flex-col space-y-4">
            <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-dark text-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Naidu Solutions</h3>
            <p className="text-gray-400">Industrial Engineering Excellence</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">All Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/sitemap">Sitemap</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="text-gray-400">Email: sales@naidusolutions.com</p>
            <p className="text-gray-400">Phone: +91 XXXXXXXXXX</p>
          </div>
        </div>
      </footer>
    </div>
  );
}