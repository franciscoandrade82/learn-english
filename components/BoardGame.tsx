"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import ScoreScreen from "./ScoreScreen";
import { VocabularyItem } from "@/data/types";

type Space = {
  index: number;
  type: "question" | "miss" | "again" | "back2";
  word?: VocabularyItem;
};

type Props = { words: VocabularyItem[]; color?: string };

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildBoard(words: VocabularyItem[]): Space[] {
  const totalSpaces = 16;
  const shuffled = shuffleArray(words);
  const spaces: Space[] = [];
  for (let i = 0; i < totalSpaces; i++) {
    if (i === 4) spaces.push({ index: i, type: "miss" });
    else if (i === 8) spaces.push({ index: i, type: "again" });
    else if (i === 12) spaces.push({ index: i, type: "back2" });
    else spaces.push({ index: i, type: "question", word: shuffled[i % shuffled.length] });
  }
  return spaces;
}

export default function BoardGame({ words, color = "#45B7D1" }: Props) {
  const [board] = useState(() => buildBoard(words));
  const [position, setPosition] = useState(-1);
  const [dice, setDice] = useState(0);
  const [rolling, setRolling] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentWord, setCurrentWord] = useState<VocabularyItem | null>(null);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [message, setMessage] = useState("Roll the dice to start!");
  const [finished, setFinished] = useState(false);

  const init = useCallback(() => {
    setPosition(-1); setDice(0); setRolling(false); setShowQuestion(false);
    setCurrentWord(null); setInput(""); setScore(0); setAnswered(0);
    setMessage("Roll the dice to start!"); setFinished(false);
  }, []);

  function rollDice() {
    if (rolling || showQuestion) return;
    setRolling(true);
    const result = Math.floor(Math.random() * 6) + 1;
    setDice(result);

    setTimeout(() => {
      setRolling(false);
      const newPos = Math.min(position + result, board.length - 1);
      setPosition(newPos);

      if (newPos >= board.length - 1) { setFinished(true); return; }

      const space = board[newPos];
      if (space.type === "miss") setMessage("Miss a turn! 😅 Roll again next time.");
      else if (space.type === "again") setMessage("Play again! 🎉 Roll the dice!");
      else if (space.type === "back2") { setPosition(Math.max(0, newPos - 2)); setMessage("Go back 2 spaces! 😬"); }
      else if (space.word) { setCurrentWord(space.word); setShowQuestion(true); setMessage("What is this? Type the answer!"); }
    }, 800);
  }

  function checkAnswer() {
    if (!currentWord) return;
    setAnswered((a) => a + 1);
    if (input.trim().toLowerCase() === currentWord.word.toLowerCase()) {
      setScore((s) => s + 1); setMessage("Correct! 🎉 Roll again!");
    } else setMessage(`It was "${currentWord.word}"! Roll again!`);
    setShowQuestion(false); setCurrentWord(null); setInput("");
  }

  if (finished) return <ScoreScreen score={score} total={answered || 1} color={color} onPlayAgain={init} />;

  return (
    <div>
      <div className="grid grid-cols-4 gap-2 mb-6">
        {board.map((space, i) => {
          const isHere = i === position;
          const isPast = i < position;
          let bg = "bg-gray-100";
          let label = `${i + 1}`;
          if (space.type === "miss") { bg = "bg-orange-100"; label = "Miss!"; }
          else if (space.type === "again") { bg = "bg-green-100"; label = "Again!"; }
          else if (space.type === "back2") { bg = "bg-red-100"; label = "Back 2"; }
          return (
            <div key={i} className={`aspect-square rounded-xl flex items-center justify-center text-xs font-bold border-2 transition-all ${
              isHere ? "border-yellow-400 shadow-lg scale-110 bg-yellow-50"
              : isPast ? "border-gray-200 opacity-40 " + bg : "border-gray-200 " + bg
            }`}>{isHere ? "📍" : label}</div>
          );
        })}
      </div>
      <p className="text-center text-lg font-bold text-gray-700 mb-4">{message}</p>
      {showQuestion && currentWord && (
        <div className="bg-white rounded-2xl shadow-md p-6 mb-4 text-center">
          <Image src={currentWord.image} alt="" width={120} height={120} className="object-contain mx-auto mb-3" />
          <div className="flex gap-3">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && input.trim() && checkAnswer()}
              placeholder="Type the word..." autoFocus
              className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 font-semibold text-[16px]" />
            <button onClick={checkAnswer} disabled={!input.trim()}
              className="px-5 py-3 rounded-xl text-white font-bold active:scale-95 disabled:opacity-40"
              style={{ backgroundColor: color }}>OK</button>
          </div>
        </div>
      )}
      {!showQuestion && (
        <div className="text-center">
          <div className={`text-6xl mb-4 inline-block ${rolling ? "animate-bounce" : ""}`}>
            {dice === 0 ? "🎲" : ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"][dice - 1]}
          </div>
          <br />
          <button onClick={rollDice} disabled={rolling}
            className="px-8 py-4 rounded-2xl text-white font-extrabold text-xl active:scale-95 transition-transform disabled:opacity-50"
            style={{ backgroundColor: color }}>
            {rolling ? "Rolling..." : "Roll Dice!"}
          </button>
        </div>
      )}
    </div>
  );
}
