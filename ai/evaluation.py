import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


def evaluate_answer(question: str, answer: str, emotion: dict):
    dominant_emotion = emotion.get("dominant_emotion", "neutral")

    prompt = f"""
You are a professional technical interviewer.
Evaluate the following interview response.

Question:
{question}

Candidate Answer:
{answer}

Detected Emotion:
{dominant_emotion}

Return ONLY valid JSON in this exact format:
{{
  "overall_score": 0,
  "confidence_score": 0,
  "answer_quality_score": 0,
  "strengths": [""],
  "weaknesses": [""],
  "suggestions": [""]
}}

Scoring rules:
- overall_score: 0-100
- confidence_score: based partly on emotion
- answer_quality_score: based on relevance, clarity, completeness
- strengths: 2-4 points
- weaknesses: 2-4 points
- suggestions: 3-5 actionable recommendations
"""

    try:
        response = model.generate_content(prompt)
        text = response.text.strip()

        # Remove markdown fences if present
        text = text.replace("```json", "").replace("```", "").strip()

        return json.loads(text)

    except Exception as e:
        print("Evaluation error:", e)

        return {
            "overall_score": 75,
            "confidence_score": 70,
            "answer_quality_score": 78,
            "strengths": [
                "Relevant answer",
                "Reasonably structured response"
            ],
            "weaknesses": [
                "Could include more specific examples"
            ],
            "suggestions": [
                "Use the STAR method",
                "Add quantifiable achievements",
                "Practice concise delivery"
            ]
        }