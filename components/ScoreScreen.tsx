"use client";

import { useRouter } from "next/navigation";
import ConfettiEffect from "./ConfettiEffect";

type Props = {
  score: number;
  total: number;
  color?: string;
  onPlayAgain: () => void;
};

export default function ScoreScreen({ score, total, color = "#45B7D1", onPlayAgain }: Props) {
  const router = useRouter();
  const percent = Math.round((score / total) * 100);
  const stars = percent >= 90 ? 3 : percent >= 60 ? 2 : percent >= 30 ? 1 : 0;
  const messages = [
    "Keep trying! You can do it! 💪",
    "Good job! Keep practising! 👍",
    "Great work! Almost perfect! 🌟",
    "Amazing! You're a star! 🏆",
  ];

  return (
    <div className="text-center py-8">
      {stars === 3 && <ConfettiEffect />}
      <div className="text-5xl mb-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <span key={i} className={i < stars ? "" : "opacity-20"}>⭐</span>
        ))}
      </div>
      <h2 className="text-3xl font-extrabold text-gray-800 mb-2">{score} / {total}</h2>
      <p className="text-xl text-gray-500 mb-2">{percent}% correct</p>
      <p className="text-lg font-semibold mb-8" style={{ color }}>{messages[stars]}</p>
      <div className="flex flex-col gap-3 max-w-xs mx-auto">
        <button onClick={onPlayAgain} className="w-full py-4 rounded-2xl text-white font-bold text-lg active:scale-95 transition-transform" style={{ backgroundColor: color }}>
          Play Again
        </button>
        <button onClick={() => router.back()} className="w-full py-4 rounded-2xl bg-gray-100 text-gray-600 font-bold text-lg active:scale-95 transition-transform">
          Back
        </button>
      </div>
    </div>
  );
}
