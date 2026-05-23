"use client";

import { use } from "react";
import BackButton from "@/components/BackButton";
import SpeakButton from "@/components/SpeakButton";
import { getSong } from "@/data/songs";
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

  return (
    <div>
      <BackButton />
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🎵</div>
        <h1 className="text-2xl font-extrabold text-gray-800">{song.title}</h1>
        <p className="text-gray-400">Review the lyrics and vocabulary!</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        {song.lines.map((line, i) => {
          if (line.text === "") return <div key={i} className="h-3" />;

          if (!line.answer) {
            return (
              <p
                key={i}
                className={`text-base leading-relaxed ${line.isChorus ? "italic text-gray-400" : "text-gray-600"}`}
              >
                {line.text}
              </p>
            );
          }

          // Line with vocabulary word highlighted
          const parts = line.text.split("___");
          return (
            <p key={i} className="text-base leading-relaxed text-gray-600 my-0.5">
              {parts[0]}
              <span
                className="font-extrabold px-1 rounded"
                style={{ color: song.color }}
              >
                {line.answer}
              </span>
              <SpeakButton text={line.answer} size="sm" />
              {parts[1]}
            </p>
          );
        })}
      </div>

      {/* Vocabulary summary */}
      <div className="bg-white rounded-2xl shadow-md p-5">
        <h3 className="font-extrabold text-gray-800 mb-3">Key Words</h3>
        <div className="flex flex-wrap gap-2">
          {song.lines
            .filter((l) => l.answer)
            .reduce((unique: string[], l) => {
              if (!unique.includes(l.answer!)) unique.push(l.answer!);
              return unique;
            }, [])
            .map((word) => (
              <span
                key={word}
                className="px-3 py-1.5 rounded-full font-bold text-sm text-white flex items-center gap-1"
                style={{ backgroundColor: song.color }}
              >
                {word}
                <SpeakButton text={word} size="sm" />
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
