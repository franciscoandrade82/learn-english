"use client";

import { useState, use } from "react";
import BackButton from "@/components/BackButton";
import { getSong } from "@/data/songs";
import { speakSlow, stopSpeaking } from "@/lib/speech";
import { notFound } from "next/navigation";

export default function SongPage({
  params,
}: {
  params: Promise<{ songId: string }>;
}) {
  const { songId } = use(params);
  const maybeSong = getSong(songId);
  if (!maybeSong) return notFound();
  const song = maybeSong;

  const blanks = song.lines.filter((l) => l.answer);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  function readAloud() {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }
    const fullLyrics = song.lines
      .filter((l) => l.text)
      .map((l) => {
        if (l.answer) return l.text.replace("___", l.answer);
        return l.text;
      })
      .join(".\n");
    setSpeaking(true);
    speakSlow(fullLyrics);
    // Reset speaking state when done
    const estimatedDuration = fullLyrics.length * 80;
    setTimeout(() => setSpeaking(false), estimatedDuration);
  }

  function handleChange(index: number, value: string) {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  }

  function handleCheck() {
    setChecked(true);
  }

  function handleReset() {
    setAnswers({});
    setChecked(false);
  }

  const totalBlanks = blanks.length;
  const correctCount = checked
    ? song.lines.reduce((count, line, i) => {
        if (!line.answer) return count;
        return (
          count +
          ((answers[i] || "").trim().toLowerCase() === line.answer.toLowerCase()
            ? 1
            : 0)
        );
      }, 0)
    : 0;

  let blankIndex = 0;

  return (
    <div>
      <BackButton />
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🎵</div>
        <h1 className="text-2xl font-extrabold text-gray-800">{song.title}</h1>
        <p className="text-gray-400 mb-3">Fill in the missing words!</p>
        <button
          onClick={readAloud}
          className={`px-5 py-2 rounded-full font-bold text-sm active:scale-95 transition-all ${
            speaking
              ? "bg-red-100 text-red-600"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          {speaking ? "⏹ Stop" : "🔊 Read Aloud"}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        {song.lines.map((line, i) => {
          if (line.text === "") return <div key={i} className="h-4" />;

          if (!line.answer) {
            return (
              <p
                key={i}
                className={`text-lg leading-relaxed ${line.isChorus ? "italic text-gray-400" : "text-gray-800 font-semibold"}`}
              >
                {line.text}
              </p>
            );
          }

          blankIndex++;
          const parts = line.text.split("___");
          const userAnswer = answers[i] || "";
          const isCorrect =
            checked &&
            userAnswer.trim().toLowerCase() === line.answer.toLowerCase();
          const isWrong = checked && !isCorrect;

          return (
            <p
              key={i}
              className="text-lg leading-relaxed text-gray-800 font-semibold flex flex-wrap items-center gap-1 my-1"
            >
              <span>{parts[0]}</span>
              <input
                type="text"
                value={checked && isWrong ? line.answer : userAnswer}
                onChange={(e) => handleChange(i, e.target.value)}
                disabled={checked}
                placeholder={`(${blankIndex})`}
                className={`inline-block w-28 px-2 py-1 border-b-2 text-center font-bold text-[16px] rounded-lg ${
                  checked
                    ? isCorrect
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-red-400 bg-red-50 text-red-600"
                    : "border-gray-300 bg-gray-50"
                }`}
              />
              <span>{parts[1]}</span>
            </p>
          );
        })}
      </div>

      {!checked ? (
        <button
          onClick={handleCheck}
          className="w-full py-4 rounded-2xl text-white font-bold text-lg active:scale-95 transition-transform"
          style={{ backgroundColor: song.color }}
        >
          Check Answers
        </button>
      ) : (
        <div className="text-center">
          <p
            className="text-2xl font-extrabold mb-4"
            style={{
              color: correctCount === totalBlanks ? "#22C55E" : song.color,
            }}
          >
            {correctCount} / {totalBlanks} correct{" "}
            {correctCount === totalBlanks ? "🎉" : "💪"}
          </p>
          <button
            onClick={handleReset}
            className="w-full py-4 rounded-2xl text-white font-bold text-lg active:scale-95 transition-transform"
            style={{ backgroundColor: song.color }}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
