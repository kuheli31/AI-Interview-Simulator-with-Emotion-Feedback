from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import shutil
import whisper

from transcription import transcribe_video
from emotion import analyze_emotion
from evaluation import evaluate_answer

# Add FFmpeg to PATH (required by Whisper)
os.environ["PATH"] += os.pathsep + (
    r"C:\Users\kuhel\AppData\Local\Microsoft\WinGet\Packages"
    r"\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe"
    r"\ffmpeg-8.1.1-full_build\bin"
)

app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Whisper model once when the server starts
model = whisper.load_model("base")


@app.get("/")
def home():
    return {"message": "AI service running"}


# =========================
# 1. TRANSCRIPTION ENDPOINT
# =========================
@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    temp_dir = "temp"
    os.makedirs(temp_dir, exist_ok=True)

    # Preserve extension (.webm, .mp4, etc.)
    extension = os.path.splitext(file.filename)[1] or ".webm"
    filepath = os.path.join(temp_dir, f"temp_audio{extension}")

    try:
        # Save uploaded file
        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Run Whisper transcription
        result = model.transcribe(filepath)

        return {
            "transcript": result["text"].strip()
        }

    except Exception as e:
        print("TRANSCRIPTION ERROR:", e)
        return {
            "transcript": "Transcription failed"
        }

    finally:
        # Delete temp file after processing
        if os.path.exists(filepath):
            os.remove(filepath)


# =========================
# 2. EMOTION DETECTION ENDPOINT
# =========================
@app.post("/emotion")
async def detect_emotion(file: UploadFile = File(...)):
    temp_dir = "temp"
    os.makedirs(temp_dir, exist_ok=True)

    extension = os.path.splitext(file.filename)[1] or ".webm"
    filepath = os.path.join(temp_dir, f"temp_video{extension}")

    try:
        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        emotion_result = analyze_emotion(filepath)

        return emotion_result

    except Exception as e:
        print("EMOTION ERROR:", e)
        return {
            "dominant_emotion": "unknown",
            "confidence": 0
        }

    finally:
        if os.path.exists(filepath):
            os.remove(filepath)


# =========================
# 3. LLM EVALUATION ENDPOINT
# =========================
class EvaluationRequest(BaseModel):
    question: str
    answer: str


@app.post("/evaluate")
async def evaluate(request: EvaluationRequest):
    try:
        result = evaluate_answer(
            question=request.question,
            answer=request.answer,
            emotion={"dominant_emotion": "neutral"}
        )
        return result

    except Exception as e:
        print("EVALUATION ERROR:", e)
        return {
            "overall_score": 0,
            "confidence_score": 0,
            "answer_quality_score": 0,
            "strengths": [],
            "weaknesses": ["Evaluation failed"],
            "suggestions": ["Try again later."]
        }