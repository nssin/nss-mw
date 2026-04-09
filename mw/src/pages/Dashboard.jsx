import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { FileText, Tool, Clock } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) navigate('/login');
      else setUser(currentUser);
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    signOut(auth);
  };

  if (!user) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Client Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/dashboard/projects" className="p-6 bg-white dark:bg-gray-800 shadow rounded flex items-center hover:bg-gray-50 dark:hover:bg-gray-700">
          <Tool className="w-8 h-8 text-primary mr-4" />
          <div><h2 className="font-bold text-xl">My Projects</h2><p className="text-sm text-gray-500">View current crane installations</p></div>
        </Link>
        <Link to="/dashboard/invoices" className="p-6 bg-white dark:bg-gray-800 shadow rounded flex items-center hover:bg-gray-50 dark:hover:bg-gray-700">
          <FileText className="w-8 h-8 text-primary mr-4" />
          <div><h2 className="font-bold text-xl">Invoices & Docs</h2><p className="text-sm text-gray-500">Download quotations and bills</p></div>
        </Link>
        <Link to="/dashboard/amc" className="p-6 bg-white dark:bg-gray-800 shadow rounded flex items-center hover:bg-gray-50 dark:hover:bg-gray-700">
          <Clock className="w-8 h-8 text-primary mr-4" />
          <div><h2 className="font-bold text-xl">AMC Tracking</h2><p className="text-sm text-gray-500">Maintenance schedule</p></div>
        </Link>
      </div>
    </div>
  );
}