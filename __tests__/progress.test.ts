import { describe, it, expect, beforeEach } from "vitest";
import { saveScore, getBestScore, getAllScores, getTopicCompletion, resetProgress } from "@/lib/progress";

describe("Progress Tracking", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("saves and retrieves a score", () => {
    saveScore("clothes", "quiz", 8, 10);
    const score = getBestScore("clothes", "quiz");
    expect(score).not.toBeNull();
    expect(score!.score).toBe(8);
    expect(score!.total).toBe(10);
    expect(score!.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("returns null for non-existent score", () => {
    expect(getBestScore("clothes", "quiz")).toBeNull();
  });

  it("only saves higher scores (keeps best)", () => {
    saveScore("clothes", "quiz", 8, 10); // 80%
    saveScore("clothes", "quiz", 6, 10); // 60% — should NOT replace
    expect(getBestScore("clothes", "quiz")!.score).toBe(8);

    saveScore("clothes", "quiz", 10, 10); // 100% — should replace
    expect(getBestScore("clothes", "quiz")!.score).toBe(10);
  });

  it("tracks different topics independently", () => {
    saveScore("clothes", "quiz", 8, 10);
    saveScore("transport", "quiz", 5, 8);

    expect(getBestScore("clothes", "quiz")!.score).toBe(8);
    expect(getBestScore("transport", "quiz")!.score).toBe(5);
  });

  it("tracks different activities independently", () => {
    saveScore("clothes", "quiz", 8, 10);
    saveScore("clothes", "matching", 6, 6);

    expect(getBestScore("clothes", "quiz")!.score).toBe(8);
    expect(getBestScore("clothes", "matching")!.score).toBe(6);
  });

  it("getAllScores returns all saved scores", () => {
    saveScore("clothes", "quiz", 8, 10);
    saveScore("transport", "matching", 5, 6);

    const all = getAllScores();
    expect(Object.keys(all)).toHaveLength(2);
    expect(all["clothes:quiz"]).toBeDefined();
    expect(all["transport:matching"]).toBeDefined();
  });

  it("getTopicCompletion counts activities >= 60%", () => {
    // No scores
    expect(getTopicCompletion("clothes")).toEqual({ completed: 0, total: 3 });

    // One activity at 80%
    saveScore("clothes", "quiz", 8, 10);
    expect(getTopicCompletion("clothes")).toEqual({ completed: 1, total: 3 });

    // Another at 50% (not counted)
    saveScore("clothes", "matching", 3, 6);
    expect(getTopicCompletion("clothes")).toEqual({ completed: 1, total: 3 });

    // Another at 75% (counted)
    saveScore("clothes", "fill", 6, 8);
    expect(getTopicCompletion("clothes")).toEqual({ completed: 2, total: 3 });
  });

  it("resetProgress clears all scores", () => {
    saveScore("clothes", "quiz", 8, 10);
    saveScore("transport", "matching", 5, 6);

    resetProgress();

    expect(getBestScore("clothes", "quiz")).toBeNull();
    expect(getBestScore("transport", "matching")).toBeNull();
    expect(Object.keys(getAllScores())).toHaveLength(0);
  });

  it("resetProgress does not affect non-app localStorage items", () => {
    localStorage.setItem("other-app-key", "value");
    saveScore("clothes", "quiz", 8, 10);

    resetProgress();

    expect(localStorage.getItem("other-app-key")).toBe("value");
    expect(getBestScore("clothes", "quiz")).toBeNull();
  });
});
