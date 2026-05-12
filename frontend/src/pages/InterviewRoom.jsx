import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function InterviewRoom() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);

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

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  const startRecording = () => {
    if (!streamRef.current) return;

    chunksRef.current = [];

    const mediaRecorder = new MediaRecorder(streamRef.current);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, {
        type: "video/webm",
      });

      const recordings = JSON.parse(
        localStorage.getItem("recordings") || "[]"
      );

      recordings[currentIndex] = blob;
      localStorage.setItem("recordings", JSON.stringify(recordings));

      handleNextQuestion();
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
     };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      localStorage.setItem(
        "currentQuestionIndex",
        nextIndex.toString()
      );
    } else {
      navigate("/report");
    }
  };

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
              className="px-6 py-3 bg-red-500 rounded-xl hover:bg-red-600"
            >
              Start Recording
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="px-6 py-3 bg-emerald-600 rounded-xl hover:bg-emerald-700"
            >
              Stop Recording
            </button>
          )}
        </div>
      </div>
    </div>
  );
}