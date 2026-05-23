"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ScoreScreen from "./ScoreScreen";
import { VocabularyItem } from "@/data/types";

type Card = {
  id: number;
  content: string;
  type: "word" | "image";
  pairId: number;
  flipped: boolean;
  matched: boolean;
};

type Props = {
  words: VocabularyItem[];
  color?: string;
};

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MatchingGame({ words, color = "#45B7D1" }: Props) {
  const [cards, setCards] = useState<Card[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);
  const [locked, setLocked] = useState(false);
  const [finished, setFinished] = useState(false);

  const totalPairs = Math.min(words.length, 6);

  function initGame() {
    const gameWords = shuffleArray(words).slice(0, totalPairs);
    const cardList: Card[] = [];
    gameWords.forEach((w, i) => {
      cardList.push({ id: i * 2, content: w.word, type: "word", pairId: i, flipped: false, matched: false });
      cardList.push({ id: i * 2 + 1, content: w.image, type: "image", pairId: i, flipped: false, matched: false });
    });
    setCards(shuffleArray(cardList));
    setSelected([]);
    setMoves(0);
    setMatchedCount(0);
    setLocked(false);
    setFinished(false);
  }

  useEffect(() => { initGame(); }, []);

  function handleCardClick(id: number) {
    if (locked) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.flipped || card.matched) return;
    if (selected.includes(id)) return;

    const newCards = cards.map((c) => (c.id === id ? { ...c, flipped: true } : c));
    setCards(newCards);
    const newSelected = [...selected, id];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setMoves((m) => m + 1);
      setLocked(true);
      const [firstId, secondId] = newSelected;
      const first = newCards.find((c) => c.id === firstId)!;
      const second = newCards.find((c) => c.id === secondId)!;

      if (first.pairId === second.pairId) {
        setTimeout(() => {
          setCards((prev) => prev.map((c) => c.pairId === first.pairId ? { ...c, matched: true } : c));
          const newMatched = matchedCount + 1;
          setMatchedCount(newMatched);
          setSelected([]);
          setLocked(false);
          if (newMatched === totalPairs) {
            setTimeout(() => setFinished(true), 500);
          }
        }, 600);
      } else {
        setTimeout(() => {
          setCards((prev) => prev.map((c) => newSelected.includes(c.id) ? { ...c, flipped: false } : c));
          setSelected([]);
          setLocked(false);
        }, 1000);
      }
    }
  }

  if (finished) {
    const perfectMoves = totalPairs;
    const maxMoves = totalPairs * 3;
    const score = Math.max(0, Math.round(((maxMoves - moves) / (maxMoves - perfectMoves)) * totalPairs));
    return <ScoreScreen score={Math.min(score, totalPairs)} total={totalPairs} color={color} onPlayAgain={initGame} />;
  }

  const cols = totalPairs <= 4 ? "grid-cols-3" : "grid-cols-3 sm:grid-cols-4";

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-bold text-gray-400">Moves: {moves}</span>
        <span className="text-sm font-bold text-gray-400">Pairs: {matchedCount}/{totalPairs}</span>
      </div>
      <div className={`grid ${cols} gap-3`}>
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square rounded-xl text-center font-bold transition-all duration-300 flex items-center justify-center p-2 ${
              card.matched ? "bg-green-100 border-2 border-green-400 scale-95 opacity-60"
              : card.flipped ? "bg-white border-2 shadow-md"
              : "border-2 text-white text-3xl active:scale-95"
            }`}
            style={!card.flipped && !card.matched ? { backgroundColor: color, borderColor: color } : card.flipped ? { borderColor: color } : undefined}
            disabled={card.matched}
          >
            {card.flipped || card.matched ? (
              card.type === "image" ? (
                <Image src={card.content} alt="" width={80} height={80} className="object-contain max-h-16 sm:max-h-20" />
              ) : (
                <span className="text-sm sm:text-base font-bold text-gray-800 break-words leading-tight">{card.content}</span>
              )
            ) : "?"}
          </button>
        ))}
      </div>
    </div>
  );
}
