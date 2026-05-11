import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';


export default function InterviewSetup() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Interview Setup</h1>
        <select className="w-full p-4 rounded-xl bg-slate-800 mb-4">
          <option>Software Engineer</option>
          <option>Data Scientist</option>
          <option>Frontend Developer</option>
        </select>
        <button
          onClick={() => navigate('/interview')}
          className="px-6 py-3 bg-violet-600 rounded-xl"
        >
          Start Interview
        </button>
      </div>
    </div>
  );
}