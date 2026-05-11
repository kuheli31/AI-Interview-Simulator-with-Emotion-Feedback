import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function InterviewRoom() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Tell me about yourself.</h1>
        <div className="aspect-video bg-slate-800 rounded-3xl mb-6 flex items-center justify-center text-gray-400">
          Webcam Preview
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-red-500 rounded-xl">Start Recording</button>
          <button
            onClick={() => navigate('/report')}
            className="px-6 py-3 bg-emerald-600 rounded-xl"
          >
            Submit Answer
          </button>
        </div>
      </div>
    </div>
  );
}