"use client";

import { useState, use } from "react";
import BackButton from "@/components/BackButton";
import ProgressBar from "@/components/ProgressBar";
import ScoreScreen from "@/components/ScoreScreen";
import { getReading } from "@/data/reading";
import { notFound } from "next/navigation";

export default function ReadingPage({
  params,
}: {
  params: Promise<{ readingId: string }>;
}) {
  const { readingId } = use(params);
  const reading = getReading(readingId);
  if (!reading) notFound();
  const questions = reading.questions;

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [showText, setShowText] = useState(true);

  function init() {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
    setShowText(true);
  }

  if (finished) {
    return (
      <div>
        <BackButton />
        <ScoreScreen
          score={score}
          total={questions.length}
          color={reading.color}
          onPlayAgain={init}
        />
      </div>
    );
  }

  const q = questions[current];

  function handleAnswer(option: string) {
    if (selected) return;
    setSelected(option);
    if (option === q.answer) setScore((s) => s + 1);
    setTimeout(
      () => {
        if (current + 1 < questions.length) {
          setCurrent((c) => c + 1);
          setSelected(null);
        } else {
          setFinished(true);
        }
      },
      option === q.answer ? 800 : 1500,
    );
  }

  return (
    <div>
      <BackButton />
      <div className="text-center mb-4">
        <h1 className="text-2xl font-extrabold text-gray-800">
          {reading.emoji} {reading.title}
        </h1>
      </div>

      {/* Collapsible text */}
      <div className="bg-white rounded-2xl shadow-md p-5 mb-4">
        <button
          onClick={() => setShowText(!showText)}
          className="w-full flex justify-between items-center text-left"
        >
          <span className="font-bold text-gray-600">📖 Read the text</span>
          <span className="text-gray-400">{showText ? "▲" : "▼"}</span>
        </button>
        {showText && (
          <p className="mt-3 text-gray-800 leading-relaxed text-base">
            {reading.text}
          </p>
        )}
      </div>

      <ProgressBar
        current={current + 1}
        total={questions.length}
        color={reading.color}
      />

      <div className="bg-white rounded-2xl shadow-md p-5 mb-4">
        <p className="text-lg font-bold text-gray-800 mb-4">{q.question}</p>
        <div className="grid gap-3">
          {q.options.map((option) => {
            let bg = "bg-gray-50 border-2 border-gray-200";
            let textColor = "text-gray-800";
            if (selected) {
              if (option === q.answer) {
                bg = "bg-green-100 border-2 border-green-500";
                textColor = "text-green-700";
              } else if (option === selected) {
                bg = "bg-red-100 border-2 border-red-400 animate-shake";
                textColor = "text-red-600";
              }
            }
            return (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={!!selected}
                className={`${bg} ${textColor} rounded-xl py-3 px-4 font-bold text-left text-base active:scale-95 transition-all duration-200`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
