"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import BackButton from "@/components/BackButton";
import ProgressBar from "@/components/ProgressBar";
import ScoreScreen from "@/components/ScoreScreen";
import { allTopics } from "@/data/units";
import { grammarExercises } from "@/data/grammar";
import { VocabularyItem, GrammarExercise } from "@/data/types";

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type VocabQuestion = { type: "vocab"; correct: VocabularyItem; options: string[]; topicName: string };
type GrammarQuestion = { type: "grammar"; exercise: GrammarExercise };
type Question = VocabQuestion | GrammarQuestion;

function generateMixedQuestions(): Question[] {
  const vocabQuestions: Question[] = [];
  allTopics.forEach((topic) => {
    const picked = shuffleArray(topic.words).slice(0, 2);
    picked.forEach((word) => {
      const allWords = allTopics.flatMap((t) => t.words);
      const wrongs = shuffleArray(allWords.filter((w) => w.word !== word.word)).slice(0, 3).map((w) => w.word);
      vocabQuestions.push({ type: "vocab", correct: word, options: shuffleArray([word.word, ...wrongs]), topicName: topic.name });
    });
  });
  const grammarQs: Question[] = shuffleArray(grammarExercises).slice(0, 4).map((ex) => ({ type: "grammar", exercise: ex }));
  return shuffleArray([...vocabQuestions, ...grammarQs]).slice(0, 20);
}

export default function TestMePage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const init = useCallback(() => {
    setQuestions(generateMixedQuestions());
    setCurrent(0); setScore(0); setSelected(null); setFinished(false);
  }, []);

  useEffect(() => { init(); }, [init]);

  if (questions.length === 0) return null;
  if (finished) return <div><BackButton /><ScoreScreen score={score} total={questions.length} color="#FF6B6B" onPlayAgain={init} /></div>;

  const q = questions[current];

  function handleAnswer(option: string) {
    if (selected) return;
    setSelected(option);
    const correct = q.type === "vocab" ? q.correct.word : q.exercise.answer;
    if (option === correct) setScore((s) => s + 1);
    setTimeout(() => {
      if (current + 1 < questions.length) { setCurrent((c) => c + 1); setSelected(null); }
      else setFinished(true);
    }, option === correct ? 800 : 1500);
  }

  const isVocab = q.type === "vocab";
  const correctAnswer = isVocab ? q.correct.word : q.exercise.answer;
  const options = isVocab ? q.options : q.exercise.options;

  return (
    <div>
      <BackButton />
      <div className="text-center mb-4">
        <h1 className="text-2xl font-extrabold text-gray-800">🎯 Test Me!</h1>
        <p className="text-gray-400">{isVocab ? q.topicName : "Grammar"}</p>
      </div>
      <ProgressBar current={current + 1} total={questions.length} color="#FF6B6B" />
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6 text-center">
        {isVocab ? (
          <>
            <p className="text-sm font-bold text-gray-400 mb-3">What is this?</p>
            <div className="flex justify-center"><Image src={q.correct.image} alt="" width={130} height={130} className="object-contain" /></div>
          </>
        ) : (
          <>
            <p className="text-sm font-bold text-gray-400 mb-3">Complete the sentence</p>
            <p className="text-xl font-bold text-gray-800">
              {q.exercise.sentence.split("___")[0]}
              <span className="inline-block min-w-[60px] border-b-4 mx-1 px-2 font-extrabold"
                style={{ borderColor: selected ? (selected === correctAnswer ? "#22C55E" : "#EF4444") : "#FF6B6B",
                  color: selected === correctAnswer ? "#22C55E" : selected ? "#EF4444" : "inherit" }}>
                {selected || "\u00A0"}
              </span>
              {q.exercise.sentence.split("___")[1]}
            </p>
          </>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => {
          let bg = "bg-white border-2 border-gray-200";
          let text = "text-gray-800";
          if (selected) {
            if (option === correctAnswer) { bg = "bg-green-100 border-2 border-green-500"; text = "text-green-700"; }
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
          <span className="text-2xl font-extrabold" style={{ color: selected === correctAnswer ? "#22C55E" : "#EF4444" }}>
            {selected === correctAnswer ? "+10 🎉" : "💪"}
          </span>
        </div>
      )}
    </div>
  );
}
