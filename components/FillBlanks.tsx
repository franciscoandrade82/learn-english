"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import ProgressBar from "./ProgressBar";
import ScoreScreen from "./ScoreScreen";
import { SentenceExercise } from "@/data/types";

type Props = { sentences: SentenceExercise[]; color?: string };

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildHint(word: string): string {
  if (word.length <= 2) return word[0] + " _";
  return word[0] + " _ ".repeat(word.length - 2).trim() + " " + word[word.length - 1];
}

export default function FillBlanks({ sentences, color = "#45B7D1" }: Props) {
  const [exercises, setExercises] = useState<SentenceExercise[]>([]);
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState<"typing" | "correct" | "wrong" | "hint" | "revealed">("typing");
  const [finished, setFinished] = useState(false);

  const init = useCallback(() => {
    setExercises(shuffleArray(sentences).slice(0, 8));
    setCurrent(0); setInput(""); setScore(0); setAttempts(0); setStatus("typing"); setFinished(false);
  }, [sentences]);

  useEffect(() => { init(); }, [init]);

  if (exercises.length === 0) return null;
  if (finished) return <ScoreScreen score={score} total={exercises.length} color={color} onPlayAgain={init} />;

  const ex = exercises[current];

  function checkAnswer() {
    const correct = input.trim().toLowerCase() === ex.answer.toLowerCase();
    if (correct) {
      setStatus("correct");
      setScore((s) => s + 1);
      setTimeout(goNext, 1200);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 3) {
        setStatus("revealed");
        setTimeout(goNext, 2500);
      } else if (newAttempts >= 2) {
        setStatus("hint");
        setInput("");
      } else {
        setStatus("wrong");
        setTimeout(() => { setStatus("typing"); setInput(""); }, 1000);
      }
    }
  }

  function goNext() {
    if (current + 1 < exercises.length) {
      setCurrent((c) => c + 1); setInput(""); setAttempts(0); setStatus("typing");
    } else setFinished(true);
  }

  const parts = ex.sentence.split("___");

  return (
    <div>
      <ProgressBar current={current + 1} total={exercises.length} color={color} />
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        {ex.image && (
          <div className="flex justify-center mb-4">
            <Image src={ex.image} alt="" width={120} height={120} className="object-contain" priority />
          </div>
        )}
        <p className="text-xl font-bold text-gray-800 text-center leading-relaxed">
          {parts[0]}
          <span className="inline-block min-w-[80px] border-b-4 mx-1 px-2 font-extrabold"
            style={{
              borderColor: status === "correct" ? "#22C55E" : status === "wrong" ? "#EF4444" : status === "revealed" ? "#F59E0B" : status === "hint" ? "#3B82F6" : color,
              color: status === "correct" ? "#22C55E" : status === "revealed" ? "#F59E0B" : status === "hint" ? "#3B82F6" : "inherit",
            }}>
            {status === "correct" || status === "revealed" ? ex.answer : status === "hint" ? buildHint(ex.answer) : status === "wrong" ? input : "\u00A0"}
          </span>
          {parts[1]}
        </p>
      </div>
      {(status === "typing" || status === "hint") && (
        <div className="flex gap-3">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && input.trim() && checkAnswer()}
            placeholder="Type your answer..." autoFocus
            className="flex-1 px-4 py-4 rounded-xl border-2 border-gray-200 text-lg font-semibold focus:outline-none focus:border-blue-400 text-[16px]" />
          <button onClick={checkAnswer} disabled={!input.trim()}
            className="px-6 py-4 rounded-xl text-white font-bold text-lg active:scale-95 transition-transform disabled:opacity-40"
            style={{ backgroundColor: color }}>Check</button>
        </div>
      )}
      {status === "correct" && <p className="text-center text-xl font-extrabold text-green-500 animate-float-up">Correct! 🎉</p>}
      {status === "wrong" && <p className="text-center text-lg font-bold text-red-400 animate-shake">Not quite — try again! 💪</p>}
      {status === "hint" && <p className="text-center text-lg font-bold text-blue-500">Here's a hint! 💡 Try one more time!</p>}
      {status === "revealed" && <p className="text-center text-lg font-bold text-amber-500">The answer is: <strong>{ex.answer}</strong></p>}
    </div>
  );
}
