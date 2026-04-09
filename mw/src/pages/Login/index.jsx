import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      alert("Login Failed: " + error.message);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <form onSubmit={handleLogin} className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Client Portal Login</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm">Email</label>
          <input type="email" required className="w-full p-2 border rounded dark:bg-gray-700" onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm">Password</label>
          <input type="password" required className="w-full p-2 border rounded dark:bg-gray-700" onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700">Login to Dashboard</button>
      </form>
    </div>
  );
}