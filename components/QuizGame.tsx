"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import ProgressBar from "./ProgressBar";
import ScoreScreen from "./ScoreScreen";
import { VocabularyItem } from "@/data/types";

type Props = { words: VocabularyItem[]; color?: string };

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Question = { correct: VocabularyItem; options: string[] };

function generateQuestions(words: VocabularyItem[]): Question[] {
  return shuffleArray(words).map((correct) => {
    const wrongs = shuffleArray(words.filter((w) => w.word !== correct.word)).slice(0, 3).map((w) => w.word);
    return { correct, options: shuffleArray([correct.word, ...wrongs]) };
  });
}

export default function QuizGame({ words, color = "#45B7D1" }: Props) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const init = useCallback(() => {
    setQuestions(generateQuestions(words));
    setCurrent(0); setScore(0); setSelected(null); setFinished(false);
  }, [words]);

  useEffect(() => { init(); }, [init]);

  if (questions.length === 0) return null;
  if (finished) return <ScoreScreen score={score} total={questions.length} color={color} onPlayAgain={init} />;

  const q = questions[current];

  function handleAnswer(option: string) {
    if (selected) return;
    setSelected(option);
    const isCorrect = option === q.correct.word;
    if (isCorrect) setScore((s) => s + 1);
    setTimeout(() => {
      if (current + 1 < questions.length) { setCurrent((c) => c + 1); setSelected(null); }
      else setFinished(true);
    }, isCorrect ? 800 : 1500);
  }

  return (
    <div>
      <ProgressBar current={current + 1} total={questions.length} color={color} />
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6 text-center">
        <p className="text-sm font-bold text-gray-400 mb-3">What is this?</p>
        <div className="flex justify-center mb-4">
          <Image src={q.correct.image} alt="" width={150} height={150} className="object-contain" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {q.options.map((option) => {
          let bg = "bg-white border-2 border-gray-200";
          let text = "text-gray-800";
          if (selected) {
            if (option === q.correct.word) { bg = "bg-green-100 border-2 border-green-500"; text = "text-green-700"; }
            else if (option === selected) { bg = "bg-red-100 border-2 border-red-400 animate-shake"; text = "text-red-600"; }
          }
          return (
            <button key={option} onClick={() => handleAnswer(option)} disabled={!!selected}
              className={`${bg} ${text} rounded-xl py-4 px-3 font-bold text-base active:scale-95 transition-all duration-200`}>
              {option}
            </button>
          );
        })}
      </div>
      {selected && (
        <div className="text-center mt-4 animate-float-up">
          <span className="text-2xl font-extrabold" style={{ color: selected === q.correct.word ? "#22C55E" : "#EF4444" }}>
            {selected === q.correct.word ? "+10 🎉" : "Try again! 💪"}
          </span>
        </div>
      )}
    </div>
  );
}
