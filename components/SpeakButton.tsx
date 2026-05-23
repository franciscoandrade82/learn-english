"use client";

import { speak } from "@/lib/speech";

type Props = {
  text: string;
  size?: "sm" | "md";
};

export default function SpeakButton({ text, size = "sm" }: Props) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        speak(text);
      }}
      className={`inline-flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 active:scale-90 transition-all ${
        size === "sm" ? "w-8 h-8 text-base" : "w-10 h-10 text-lg"
      }`}
      title="Listen"
    >
      🔊
    </button>
  );
}
