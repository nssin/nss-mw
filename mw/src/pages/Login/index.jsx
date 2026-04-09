import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Lock, 
  Mail, 
  AlertCircle, 
  Loader2, 
  ShieldCheck, 
  ArrowRight,
  ChevronLeft
} from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      // Clean up Firebase error message for professional display
      const cleanError = err.message.replace('Firebase: ', '').replace('auth/', '');
      setError(cleanError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center px-6 bg-white font-sans animate-in fade-in duration-700">
      
      {/* Back to Home Link */}
      <Link 
        to="/" 
        className="absolute top-10 left-6 lg:left-12 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
      >
        <ChevronLeft size={16} />
        Exit to Public
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[400px]"
      >
        <div className="text-left mb-12 space-y-4">
          <div className="w-12 h-12 bg-black rounded-sm flex items-center justify-center text-white mb-8 shadow-xl shadow-black/10">
            <ShieldCheck size={24} strokeWidth={2.5} />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-black tracking-tighter leading-none">
            Operator <br/> Access
          </h2>
          <p className="text-gray-400 text-sm font-medium tracking-tight">
            NSS-MW Heavy Engineering • Node Authentication Required
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 border-l-4 border-red-500 flex items-start text-red-700 text-xs font-bold uppercase tracking-wider"
            >
              <AlertCircle className="w-4 h-4 mr-3 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <div className="space-y-6">
            {/* Email Field */}
            <div className="group border-b-2 border-gray-100 focus-within:border-black transition-all duration-300">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 group-focus-within:text-black transition-colors">
                Operator_ID
              </label>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-gray-200 group-focus-within:text-black mr-4 transition-colors" />
                <input
                  type="email"
                  required
                  className="w-full py-5 bg-transparent text-black font-medium outline-none placeholder-gray-200"
                  placeholder="name@nss-mw.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="group border-b-2 border-gray-100 focus-within:border-black transition-all duration-300">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 group-focus-within:text-black transition-colors">
                Access_Key
              </label>
              <div className="flex items-center">
                <Lock className="h-4 w-4 text-gray-200 group-focus-within:text-black mr-4 transition-colors" />
                <input
                  type="password"
                  required
                  className="w-full py-5 bg-transparent text-black font-medium outline-none placeholder-gray-200 tracking-[0.3em]"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-5 px-6 font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-zinc-800 transition-all flex justify-center items-center gap-3 disabled:opacity-50 group"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4" />
                Synchronizing...
              </>
            ) : (
              <>
                Authorize Node
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
        
        <div className="mt-12 pt-8 border-t border-gray-50 flex flex-col gap-4">
          <p className="text-[10px] text-gray-300 uppercase tracking-widest font-medium leading-relaxed">
            Unauthorized access to NSS-MW telemetry nodes is strictly prohibited. Activity logs are recorded via Lidar-certified stream.
          </p>
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <span>Server: ASIA-SOUTH-1</span>
            <span>v1.2.0-STABLE</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}