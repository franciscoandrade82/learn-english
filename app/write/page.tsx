"use client";

import { useState } from "react";
import BackButton from "@/components/BackButton";

const prompts = [
  {
    id: "wearing",
    emoji: "👕",
    text: "What are you wearing today?",
    hint: "Start with: Hi! Today I'm wearing...",
  },
  {
    id: "school",
    emoji: "🚌",
    text: "How do you go to school?",
    hint: "Start with: I go to school by...",
  },
  {
    id: "sports",
    emoji: "⚽",
    text: "What sports do you like?",
    hint: "Start with: I like playing... / I love playing...",
  },
  {
    id: "playground",
    emoji: "🤸",
    text: "What do you do at the playground?",
    hint: "Start with: At the playground, I like...",
  },
  {
    id: "favourite",
    emoji: "🌟",
    text: "Describe your favourite clothes",
    hint: "Start with: My favourite clothes are...",
  },
  {
    id: "seasons",
    emoji: "🌸",
    text: "What is your favourite season? Why?",
    hint: "Start with: My favourite season is...",
  },
];

export default function WritePage() {
  const [selectedPrompt, setSelectedPrompt] = useState<
    (typeof prompts)[0] | null
  >(null);
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!selectedPrompt || text.trim().length < 5) return;
    setLoading(true);
    setError(null);
    setFeedback(null);

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, prompt: selectedPrompt.text }),
      });

      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setFeedback(data.feedback);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setSelectedPrompt(null);
    setText("");
    setFeedback(null);
    setError(null);
  }

  function handleTryAgain() {
    setText("");
    setFeedback(null);
    setError(null);
  }

  // Prompt selection
  if (!selectedPrompt) {
    return (
      <div>
        <BackButton />
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">✍️</div>
          <h1 className="text-3xl font-extrabold text-gray-800">
            Writing Practice
          </h1>
          <p className="text-lg text-gray-400">Pick a topic and write!</p>
        </div>
        <div className="grid gap-3">
          {prompts.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPrompt(p)}
              className="bg-white rounded-2xl shadow-md p-5 text-left active:scale-[0.97] transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{p.emoji}</span>
                <div>
                  <h3 className="font-bold text-gray-800">{p.text}</h3>
                  <p className="text-sm text-gray-400">{p.hint}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <BackButton />
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">✍️</div>
        <h1 className="text-2xl font-extrabold text-gray-800">
          {selectedPrompt.text}
        </h1>
        <p className="text-gray-400">{selectedPrompt.hint}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-5 mb-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your text here..."
          rows={6}
          disabled={!!feedback}
          className="w-full text-lg font-semibold text-gray-800 placeholder-gray-300 resize-none focus:outline-none text-[16px] leading-relaxed"
        />
      </div>

      {!feedback && !loading && (
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 py-4 rounded-2xl bg-gray-100 text-gray-600 font-bold text-lg active:scale-95 transition-transform"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={text.trim().length < 5}
            className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg active:scale-95 transition-transform disabled:opacity-40"
          >
            Review My Text ✨
          </button>
        </div>
      )}

      {loading && (
        <div className="text-center py-8">
          <div className="text-4xl animate-bounce mb-3">🤔</div>
          <p className="text-lg font-bold text-gray-500">
            Reading your text...
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 rounded-2xl p-5 mb-4 text-center">
          <p className="text-red-600 font-bold">{error}</p>
        </div>
      )}

      {feedback && (
        <>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-4">
            <div className="text-sm font-semibold text-purple-600 mb-2">
              Teacher&apos;s Feedback
            </div>
            <div className="text-gray-800 leading-relaxed space-y-1">
              {feedback.split("\n").map((line, i) => {
                if (!line.trim()) return <div key={i} className="h-2" />;
                // Render **bold** markers
                const parts = line.split(/\*\*(.*?)\*\*/g);
                return (
                  <p key={i}>
                    {parts.map((part, j) =>
                      j % 2 === 1 ? <strong key={j} className="text-purple-700">{part}</strong> : part
                    )}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleTryAgain}
              className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg active:scale-95 transition-transform"
            >
              Try Again
            </button>
            <button
              onClick={handleReset}
              className="flex-1 py-4 rounded-2xl bg-gray-100 text-gray-600 font-bold text-lg active:scale-95 transition-transform"
            >
              New Topic
            </button>
          </div>
        </>
      )}
    </div>
  );
}
