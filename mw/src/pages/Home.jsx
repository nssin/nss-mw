import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Settings, Shield, Zap } from 'lucide-react';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-6">{t('welcome')}</h1>
          <p className="text-xl mb-10 max-w-3xl mx-auto">{t('tagline')}</p>
          <div className="flex justify-center space-x-4">
            <Link to="/quote" className="bg-secondary text-white px-8 py-4 rounded font-bold hover:bg-yellow-600 transition flex items-center">
              {t('get_quote')} <ArrowRight className="ml-2" />
            </Link>
            <Link to="/services" className="bg-transparent border border-white px-8 py-4 rounded font-bold hover:bg-white hover:text-primary transition">
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Industrial Excellence</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white dark:bg-gray-800 rounded shadow hover:shadow-lg transition">
            <Settings className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Custom Engineering</h3>
            <p className="text-gray-600 dark:text-gray-300">Bespoke crane configurations and automation systems.</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded shadow hover:shadow-lg transition">
            <Shield className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Safety First</h3>
            <p className="text-gray-600 dark:text-gray-300">100% compliance with international safety protocols.</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded shadow hover:shadow-lg transition">
            <Zap className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">24/7 Breakdown Support</h3>
            <p className="text-gray-600 dark:text-gray-300">Rapid response teams ready for emergency maintenance.</p>
          </div>
        </div>
      </section>
    </div>
  );
}