"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { VocabularyItem } from "@/data/types";
import { speak } from "@/lib/speech";

type Props = { words: VocabularyItem[]; color?: string };

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Flashcards({ words, color = "#45B7D1" }: Props) {
  const [shuffled, setShuffled] = useState<VocabularyItem[]>([]);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const shuffle = useCallback(() => {
    setShuffled(shuffleArray(words));
    setCurrent(0);
    setFlipped(false);
  }, [words]);

  useEffect(() => { shuffle(); }, [shuffle]);

  if (shuffled.length === 0) return null;

  const word = shuffled[current];

  function goNext() {
    if (current + 1 < shuffled.length) {
      if (flipped) {
        setFlipped(false);
        setTimeout(() => setCurrent((c) => c + 1), 300);
      } else {
        setCurrent((c) => c + 1);
      }
    }
  }

  function goPrev() {
    if (current > 0) {
      if (flipped) {
        setFlipped(false);
        setTimeout(() => setCurrent((c) => c - 1), 300);
      } else {
        setCurrent((c) => c - 1);
      }
    }
  }

  return (
    <div>
      <div className="text-center text-sm font-bold text-gray-400 mb-4">
        Card {current + 1} of {shuffled.length}
      </div>

      {/* Card */}
      <div className="perspective-1000 mb-6" style={{ perspective: "1000px" }}>
        <div
          onClick={() => setFlipped(!flipped)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setFlipped(!flipped)}
          className="w-full transition-transform duration-500 active:scale-[0.97] cursor-pointer"
          style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {/* Front - Image */}
          <div
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center min-h-[300px]"
            style={{ backfaceVisibility: "hidden" }}
          >
            <Image src={word.image} alt="" width={180} height={180} className="object-contain mb-4" priority />
            <p className="text-sm text-gray-400 font-semibold">Tap to flip!</p>
          </div>

          {/* Back - Word */}
          <div
            className="rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center min-h-[300px] absolute inset-0 text-white"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", backgroundColor: color }}
          >
            <p className="text-4xl font-extrabold mb-3">{word.word}</p>
            <button
              onClick={(e) => { e.stopPropagation(); speak(word.word); }}
              className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 active:scale-90 transition-all text-xl"
            >
              🔊
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 justify-center items-center">
        <button
          onClick={goPrev}
          disabled={current === 0}
          className="w-14 h-14 rounded-full bg-white shadow-md text-2xl font-bold text-gray-600 active:scale-95 transition-transform disabled:opacity-30"
        >
          ←
        </button>
        <button
          onClick={shuffle}
          className="px-6 py-3 rounded-xl bg-white shadow-md text-sm font-bold text-gray-600 active:scale-95 transition-transform"
        >
          🔀 Shuffle
        </button>
        <button
          onClick={goNext}
          disabled={current === shuffled.length - 1}
          className="w-14 h-14 rounded-full bg-white shadow-md text-2xl font-bold text-gray-600 active:scale-95 transition-transform disabled:opacity-30"
        >
          →
        </button>
      </div>
    </div>
  );
}
