"use client";

export type ActivityScore = {
  score: number;
  total: number;
  date: string;
};

const PREFIX = "learn-english:";

export function saveScore(topicId: string, activity: string, score: number, total: number): void {
  if (typeof window === "undefined") return;
  const key = `${PREFIX}${topicId}:${activity}`;
  const existing = getBestScore(topicId, activity);
  const percent = Math.round((score / total) * 100);
  const existingPercent = existing ? Math.round((existing.score / existing.total) * 100) : 0;
  if (percent >= existingPercent) {
    localStorage.setItem(key, JSON.stringify({ score, total, date: new Date().toISOString().split("T")[0] }));
  }
}

export function getBestScore(topicId: string, activity: string): ActivityScore | null {
  if (typeof window === "undefined") return null;
  const key = `${PREFIX}${topicId}:${activity}`;
  const val = localStorage.getItem(key);
  return val ? JSON.parse(val) : null;
}

export function getAllScores(): Record<string, ActivityScore> {
  if (typeof window === "undefined") return {};
  const scores: Record<string, ActivityScore> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(PREFIX)) {
      const val = localStorage.getItem(key);
      if (val) scores[key.slice(PREFIX.length)] = JSON.parse(val);
    }
  }
  return scores;
}

export function getTopicCompletion(topicId: string): { completed: number; total: number } {
  const activities = ["matching", "quiz", "fill", "spelling"];
  let completed = 0;
  for (const act of activities) {
    const score = getBestScore(topicId, act);
    if (score && Math.round((score.score / score.total) * 100) >= 60) completed++;
  }
  return { completed, total: activities.length };
}

export function resetProgress(): void {
  if (typeof window === "undefined") return;
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(PREFIX)) keysToRemove.push(key);
  }
  keysToRemove.forEach((k) => localStorage.removeItem(k));
}
