"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import ProgressBar from "./ProgressBar";
import ScoreScreen from "./ScoreScreen";
import { VocabularyItem } from "@/data/types";
import { speak } from "@/lib/speech";

type Props = { words: VocabularyItem[]; color?: string; topicId?: string };

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

export default function SpellingGame({ words, color = "#45B7D1", topicId }: Props) {
  const [shuffled, setShuffled] = useState<VocabularyItem[]>([]);
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState<"typing" | "correct" | "wrong" | "hint" | "revealed">("typing");
  const [finished, setFinished] = useState(false);

  const init = useCallback(() => {
    setShuffled(shuffleArray(words));
    setCurrent(0); setInput(""); setScore(0); setAttempts(0); setStatus("typing"); setFinished(false);
  }, [words]);

  useEffect(() => { init(); }, [init]);

  if (shuffled.length === 0) return null;
  if (finished) return <ScoreScreen score={score} total={shuffled.length} color={color} onPlayAgain={init} topicId={topicId} activity="spelling" />;

  const word = shuffled[current];

  function checkAnswer() {
    const correct = input.trim().toLowerCase() === word.word.toLowerCase();
    if (correct) {
      setStatus("correct");
      setScore((s) => s + 1);
      speak(word.word);
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
    if (current + 1 < shuffled.length) {
      setCurrent((c) => c + 1); setInput(""); setAttempts(0); setStatus("typing");
    } else setFinished(true);
  }

  return (
    <div>
      <ProgressBar current={current + 1} total={shuffled.length} color={color} />
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6 text-center">
        <p className="text-sm font-bold text-gray-400 mb-3">Spell this word!</p>
        <div className="flex justify-center mb-4">
          <Image src={word.image} alt="" width={150} height={150} className="object-contain" priority />
        </div>
        {(status === "hint") && (
          <p className="text-2xl font-bold text-blue-500 tracking-widest">{buildHint(word.word)}</p>
        )}
        {status === "correct" && (
          <p className="text-2xl font-extrabold text-green-500">{word.word} ✅</p>
        )}
        {status === "revealed" && (
          <p className="text-2xl font-extrabold text-amber-500">{word.word}</p>
        )}
      </div>

      {(status === "typing" || status === "hint") && (
        <div className="flex gap-3">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && input.trim() && checkAnswer()}
            placeholder="Type the word..." autoFocus
            className="flex-1 px-4 py-4 rounded-xl border-2 border-gray-200 text-lg font-semibold focus:outline-none focus:border-blue-400 text-[16px]" />
          <button onClick={checkAnswer} disabled={!input.trim()}
            className="px-6 py-4 rounded-xl text-white font-bold text-lg active:scale-95 transition-transform disabled:opacity-40"
            style={{ backgroundColor: color }}>Check</button>
        </div>
      )}

      {status === "correct" && <p className="text-center text-xl font-extrabold text-green-500 animate-float-up mt-4">Correct! 🎉</p>}
      {status === "wrong" && <p className="text-center text-lg font-bold text-red-400 animate-shake mt-4">Not quite — try again! 💪</p>}
      {status === "hint" && <p className="text-center text-lg font-bold text-blue-500 mt-4">Here's a hint! 💡 Try one more time!</p>}
      {status === "revealed" && <p className="text-center text-lg font-bold text-amber-500 mt-4">The answer is: <strong>{word.word}</strong></p>}
    </div>
  );
}
