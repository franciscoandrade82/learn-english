import { describe, it, expect } from "vitest";
import { readings, getReading } from "@/data/reading";

describe("Reading Exercises", () => {
  it("has at least 3 reading exercises", () => {
    expect(readings.length).toBeGreaterThanOrEqual(3);
  });

  it("each reading has required fields", () => {
    for (const r of readings) {
      expect(r.id).toBeTruthy();
      expect(r.title).toBeTruthy();
      expect(r.emoji).toBeTruthy();
      expect(r.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(r.text.length).toBeGreaterThan(50);
      expect(r.questions.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("has no duplicate reading IDs", () => {
    const ids = readings.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("each question has correct answer in options", () => {
    for (const r of readings) {
      for (const q of r.questions) {
        expect(q.question).toBeTruthy();
        expect(q.options.length).toBeGreaterThanOrEqual(3);
        expect(
          q.options,
          `Answer "${q.answer}" not in options for "${q.question}" in ${r.title}`
        ).toContain(q.answer);
      }
    }
  });

  it("each question has no duplicate options", () => {
    for (const r of readings) {
      for (const q of r.questions) {
        expect(
          new Set(q.options).size,
          `Duplicate options in "${q.question}" in ${r.title}`
        ).toBe(q.options.length);
      }
    }
  });

  it("getReading returns correct reading", () => {
    expect(getReading("lucy-clothes")?.title).toBe("Lucy's Clothes");
    expect(getReading("nonexistent")).toBeUndefined();
  });
});
