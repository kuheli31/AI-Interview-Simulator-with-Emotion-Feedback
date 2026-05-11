import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Welcome Clara 👋</h1>
        <p className="text-gray-400 mb-8">Practice interviews and improve with AI feedback.</p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-semibold mb-2">Start Interview</h3>
            <p className="text-gray-400 mb-4">Choose a role and begin.</p>
            <Link to="/setup" className="inline-block px-4 py-2 bg-violet-600 rounded-lg">Start</Link>
          </div>
        </div>
      </div>
    </div>
  );
}