import { Link, useNavigate } from 'react-router-dom';
import { Brain, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { logout } = useAuth();

 const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-xl">
      <Link to="/dashboard" className="flex items-center gap-2 text-xl font-bold">
        <Brain className="text-violet-400" /> AI Interviewer
      </Link>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600"
      >
        <LogOut size={18} /> Logout
      </button>
    </nav>
  );
}