from deepface import DeepFace
import cv2
import os
from collections import Counter


def analyze_emotion(video_path: str):
    """
    Analyze emotions from sampled frames of a video.
    Returns:
    {
        "dominant_emotion": "happy",
        "emotion_counts": {
            "happy": 4,
            "neutral": 2
        }
    }
    """

    if not os.path.exists(video_path):
        raise FileNotFoundError(f"Video not found: {video_path}")

    cap = cv2.VideoCapture(video_path)

    emotions = []
    frame_count = 0
    sample_every = 30  # analyze every 30th frame

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        if frame_count % sample_every == 0:
            try:
                result = DeepFace.analyze(
                    frame,
                    actions=["emotion"],
                    enforce_detection=False,
                    silent=True
                )

                # DeepFace may return list or dict
                if isinstance(result, list):
                    result = result[0]

                dominant = result["dominant_emotion"]
                emotions.append(dominant)

            except Exception as e:
                print("Emotion detection error:", e)

        frame_count += 1

    cap.release()

    if not emotions:
        return {
            "dominant_emotion": "neutral",
            "emotion_counts": {}
        }

    counts = Counter(emotions)
    dominant = counts.most_common(1)[0][0]

    return {
        "dominant_emotion": dominant,
        "emotion_counts": dict(counts)
    }