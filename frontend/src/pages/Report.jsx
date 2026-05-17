import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ScoreCard from "../components/ScoreCard";

export default function Report() {
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runEvaluation = async () => {
      const questions = JSON.parse(
        localStorage.getItem("interviewQuestions") || "[]"
      );

      const transcripts = JSON.parse(
        localStorage.getItem("transcripts") || "[]"
      );

      const firstQuestion = questions[0] || "Tell me about yourself.";
      const firstAnswer = transcripts[0] || "";
       const response = await fetch("http://localhost:8000/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: firstQuestion,
          answer: firstAnswer,
          emotion: {
            dominant_emotion: "neutral",
          },
        }),
      });

      const data = await response.json();

      setFeedback(data);
      setLoading(false);
    };

    runEvaluation();
  }, []);

  if (loading) {
     return (
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />
        <div className="p-8">Generating feedback...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Interview Feedback</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <ScoreCard
            title="Overall Score"
            score={feedback.overall_score}
          />
          <ScoreCard
            title="Confidence"
            score={feedback.confidence_score}
          />
          <ScoreCard
            title="Answer Quality"
            score={feedback.answer_quality_score}
          />
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Strengths</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            {feedback.strengths.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Weaknesses</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            {feedback.weaknesses.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
         <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h2 className="text-2xl font-semibold mb-4">Suggestions</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            {feedback.suggestions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}