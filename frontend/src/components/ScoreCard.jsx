export default function ScoreCard({ title, score }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg">
      <h3 className="text-gray-300 mb-2">{title}</h3>
      <p className="text-4xl font-bold text-violet-400">{score}%</p>
    </div>
  );
}