import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function InterviewSetup() {
  const navigate = useNavigate();

  const [role, setRole] = useState("Software Engineer");
  const [difficulty, setDifficulty] = useState("Medium");
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    try {
      setLoading(true);

      const response = await api.post("/questions/generate", {
        role,
        difficulty,
        count,
      });
      const questions = response.data.questions;

      localStorage.setItem(
        "interviewQuestions",
        JSON.stringify(questions)
      );

      localStorage.setItem("currentQuestionIndex", "0");

      navigate("/interview");
    } catch (error) {
      console.error("Failed to generate questions", error);
      alert("Failed to generate questions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Interview Setup</h1>
        <label className="block mb-2">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-800 mb-4"
        >
          <option>Software Engineer</option>
          <option>Frontend Developer</option>
          <option>Data Scientist</option>
        </select>

        <label className="block mb-2">Difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-800 mb-4"
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <label className="block mb-2">Number of Questions</label>
        <input
        type="number"
          min="1"
          max="10"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-full p-4 rounded-xl bg-slate-800 mb-6"
        />

        <button
          onClick={handleStart}
          disabled={loading}
          className="px-6 py-3 bg-violet-600 rounded-xl hover:bg-violet-700"
        >
          {loading ? "Generating..." : "Start Interview"}
        </button>
      </div>
    </div>
  );
}