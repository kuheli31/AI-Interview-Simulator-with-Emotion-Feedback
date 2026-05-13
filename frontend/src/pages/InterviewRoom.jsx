import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function InterviewRoom() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [processing, setProcessing] = useState(false);

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const hasMovedRef = useRef(false);

  // Load questions and start camera
  useEffect(() => {
    const storedQuestions = JSON.parse(
      localStorage.getItem("interviewQuestions") || "[]"
    );

    const storedIndex = Number(
      localStorage.getItem("currentQuestionIndex") || "0"
    );

    setQuestions(storedQuestions);
    setCurrentIndex(storedIndex);

    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  // Start webcam + mic
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Camera access denied:", error);
      alert("Please allow camera and microphone access.");
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  // Start recording
  const startRecording = () => {
    if (!streamRef.current || processing) return;

    chunksRef.current = [];
    hasMovedRef.current = false;

    const mediaRecorder = new MediaRecorder(streamRef.current);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = async () => {
      setIsRecording(false);
      setProcessing(true);

      const blob = new Blob(chunksRef.current, {
        type: "video/webm",
      });

      // Save recording file names
      const recordings = JSON.parse(
        localStorage.getItem("recordings") || "[]"
      );
      recordings[currentIndex] = `answer-${currentIndex}.webm`;
      localStorage.setItem(
        "recordings",
        JSON.stringify(recordings)
      );

      // Send to FastAPI
      const formData = new FormData();
      formData.append(
        "file",
        blob,
        `answer-${currentIndex}.webm`
      );

      try {
        const response = await fetch(
          "http://localhost:8000/transcribe",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();

        const transcripts = JSON.parse(
          localStorage.getItem("transcripts") || "[]"
        );

        transcripts[currentIndex] =
          data.transcript || "No transcript available";

        localStorage.setItem(
          "transcripts",
          JSON.stringify(transcripts)
        );
      } catch (error) {
        console.error("Transcription failed:", error);

        const transcripts = JSON.parse(
          localStorage.getItem("transcripts") || "[]"
        );

        transcripts[currentIndex] = "Transcription failed";

        localStorage.setItem(
          "transcripts",
          JSON.stringify(transcripts)
        );
      } finally {
        setProcessing(false);
        moveToNextQuestion();
      }
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  // Stop recording
  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;

    if (!recorder) return;

    if (recorder.state !== "inactive") {
      recorder.stop();
    }
  };

  // Move to next question exactly once
  const moveToNextQuestion = () => {
    if (hasMovedRef.current) return;
    hasMovedRef.current = true;

    const nextIndex = currentIndex + 1;

    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
      localStorage.setItem(
        "currentQuestionIndex",
        nextIndex.toString()
      );
    } else {
      localStorage.removeItem("currentQuestionIndex");
      navigate("/report");
    }
  };

  // No questions
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />
        <div className="p-8">No questions found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto p-8">
        <p className="text-gray-400 mb-2">
          Question {currentIndex + 1} of {questions.length}
        </p>

        <h1 className="text-3xl font-bold mb-6">
          {questions[currentIndex]}
        </h1>

        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full aspect-video bg-slate-800 rounded-3xl mb-6"
        />

        <div className="flex gap-4">
          {!isRecording ? (
            <button
              onClick={startRecording}
              disabled={processing}
              className="px-6 py-3 bg-red-500 rounded-xl hover:bg-red-600 disabled:opacity-50"
            >
              Start Recording
            </button>
          ) : (
            <button
              onClick={stopRecording}
              disabled={processing}
              className="px-6 py-3 bg-emerald-600 rounded-xl hover:bg-emerald-700 disabled:opacity-50"
            >
              Stop Recording
            </button>
          )}
        </div>

        {processing && (
          <p className="mt-4 text-yellow-400">
            Processing your answer...
          </p>
        )}
      </div>
    </div>
  );
}