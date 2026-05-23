"use client";

import { useState, useEffect, useCallback } from "react";
import BackButton from "@/components/BackButton";
import ProgressBar from "@/components/ProgressBar";
import ScoreScreen from "@/components/ScoreScreen";
import { grammarExercises } from "@/data/grammar";
import { GrammarExercise } from "@/data/types";

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function GrammarQuizPage() {
  const [questions, setQuestions] = useState<GrammarExercise[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const init = useCallback(() => {
    setQuestions(shuffleArray(grammarExercises).slice(0, 10));
    setCurrent(0); setScore(0); setSelected(null); setFinished(false);
  }, []);

  useEffect(() => { init(); }, [init]);

  if (questions.length === 0) return null;
  if (finished) return (
    <div><BackButton /><ScoreScreen score={score} total={questions.length} color="#A855F7" onPlayAgain={init} /></div>
  );

  const q = questions[current];

  function handleAnswer(option: string) {
    if (selected) return;
    setSelected(option);
    if (option === q.answer) setScore((s) => s + 1);
    setTimeout(() => {
      if (current + 1 < questions.length) { setCurrent((c) => c + 1); setSelected(null); }
      else setFinished(true);
    }, option === q.answer ? 800 : 1800);
  }

  const parts = q.sentence.split("___");

  return (
    <div>
      <BackButton />
      <div className="text-center mb-6">
        <h1 className="text-2xl font-extrabold text-gray-800">📝 Grammar Quiz</h1>
        <p className="text-gray-400">Pick the right word!</p>
      </div>
      <ProgressBar current={current + 1} total={questions.length} color="#A855F7" />
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6 text-center">
        <p className="text-xl font-bold text-gray-800 leading-relaxed">
          {parts[0]}
          <span className="inline-block min-w-[60px] border-b-4 mx-1 px-2 font-extrabold"
            style={{ borderColor: selected ? (selected === q.answer ? "#22C55E" : "#EF4444") : "#A855F7",
              color: selected === q.answer ? "#22C55E" : selected ? "#EF4444" : "inherit" }}>
            {selected || "\u00A0"}
          </span>
          {parts[1]}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {q.options.map((option) => {
          let bg = "bg-white border-2 border-gray-200";
          let text = "text-gray-800";
          if (selected) {
            if (option === q.answer) { bg = "bg-green-100 border-2 border-green-500"; text = "text-green-700"; }
            else if (option === selected) { bg = "bg-red-100 border-2 border-red-400 animate-shake"; text = "text-red-600"; }
          }
          return (
            <button key={option} onClick={() => handleAnswer(option)} disabled={!!selected}
              className={`${bg} ${text} rounded-xl py-4 px-3 font-bold text-lg active:scale-95 transition-all duration-200`}>
              {option}
            </button>
          );
        })}
      </div>
      {selected && <div className="mt-4 text-center"><p className="text-sm text-gray-400 italic">{q.explanation}</p></div>}
    </div>
  );
}
