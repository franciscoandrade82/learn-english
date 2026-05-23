"use client";

import { useState, useEffect } from "react";
import BackButton from "@/components/BackButton";
import { allTopics } from "@/data/units";
import { getBestScore, resetProgress } from "@/lib/progress";

const activities = [
  { id: "matching", emoji: "🃏", name: "Matching" },
  { id: "quiz", emoji: "❓", name: "Quiz" },
  { id: "fill", emoji: "✏️", name: "Fill" },
  { id: "spelling", emoji: "🔤", name: "Spelling" },
];

export default function ProgressPage() {
  const [scores, setScores] = useState<Record<string, { score: number; total: number } | null>>({});
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const s: Record<string, { score: number; total: number } | null> = {};
    allTopics.forEach((topic) => {
      activities.forEach((act) => {
        s[`${topic.id}:${act.id}`] = getBestScore(topic.id, act.id);
      });
    });
    setScores(s);
  }, []);

  const totalActivities = allTopics.length * activities.length;
  const completedActivities = Object.values(scores).filter(
    (s) => s && Math.round((s.score / s.total) * 100) >= 60
  ).length;

  function handleReset() {
    resetProgress();
    setScores({});
    setShowConfirm(false);
  }

  return (
    <div>
      <BackButton />
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">📊</div>
        <h1 className="text-3xl font-extrabold text-gray-800">Progress</h1>
        <p className="text-lg text-gray-400">{completedActivities} of {totalActivities} activities completed</p>
      </div>

      {/* Overall progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
        <div
          className="h-4 rounded-full bg-green-500 transition-all duration-500"
          style={{ width: `${totalActivities > 0 ? (completedActivities / totalActivities) * 100 : 0}%` }}
        />
      </div>

      {/* Topics */}
      <div className="space-y-4">
        {allTopics.map((topic) => (
          <div key={topic.id} className="bg-white rounded-2xl shadow-md p-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{topic.emoji}</span>
              <h3 className="font-extrabold text-gray-800">{topic.name}</h3>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {activities.map((act) => {
                const s = scores[`${topic.id}:${act.id}`];
                const percent = s ? Math.round((s.score / s.total) * 100) : 0;
                const status = !s ? "none" : percent >= 60 ? "good" : "low";
                return (
                  <div key={act.id} className="text-center">
                    <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center text-lg ${
                      status === "good" ? "bg-green-100" : status === "low" ? "bg-yellow-100" : "bg-gray-100"
                    }`}>
                      {status === "good" ? "✅" : status === "low" ? "🟡" : "⚪"}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{act.name}</p>
                    {s && <p className="text-xs font-bold text-gray-600">{percent}%</p>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Reset button */}
      <div className="mt-8 text-center">
        {!showConfirm ? (
          <button onClick={() => setShowConfirm(true)} className="text-sm text-gray-400 underline">
            Reset all progress
          </button>
        ) : (
          <div className="bg-red-50 rounded-2xl p-4">
            <p className="text-red-600 font-bold mb-3">Are you sure? This will delete all scores.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={handleReset} className="px-6 py-2 rounded-xl bg-red-500 text-white font-bold active:scale-95">
                Yes, reset
              </button>
              <button onClick={() => setShowConfirm(false)} className="px-6 py-2 rounded-xl bg-gray-200 text-gray-600 font-bold active:scale-95">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
