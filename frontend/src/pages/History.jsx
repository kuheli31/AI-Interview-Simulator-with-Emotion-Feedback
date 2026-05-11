import Navbar from '../components/Navbar';

export default function History() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6">Interview History</h1>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          Previous interview attempts will appear here.
        </div>
      </div>
    </div>
  );
}