import Navbar from '../components/Navbar';
import ScoreCard from '../components/ScoreCard';

export default function Report() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Interview Feedback</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <ScoreCard title="Overall Score" score={84} />
          <ScoreCard title="Confidence" score={78} />
          <ScoreCard title="Answer Quality" score={88} />
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h2 className="text-2xl font-semibold mb-4">Suggestions</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>Use the STAR method.</li>
            <li>Maintain better eye contact.</li>
            <li>Reduce filler words.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}