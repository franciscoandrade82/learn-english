import { describe, it, expect } from "vitest";
import { songs, getSong } from "@/data/songs";

describe("Songs", () => {
  it("has 6 songs", () => {
    expect(songs).toHaveLength(6);
  });

  it("each song has required fields", () => {
    for (const song of songs) {
      expect(song.id).toBeTruthy();
      expect(song.title).toBeTruthy();
      expect(song.emoji).toBeTruthy();
      expect(song.unitId).toMatch(/^unit[56]$/);
      expect(song.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(song.lines.length).toBeGreaterThan(0);
    }
  });

  it("has no duplicate song IDs", () => {
    const ids = songs.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("each song has at least 3 blanks to fill", () => {
    for (const song of songs) {
      const blanks = song.lines.filter((l) => l.answer);
      expect(
        blanks.length,
        `${song.title} has only ${blanks.length} blanks`
      ).toBeGreaterThanOrEqual(3);
    }
  });

  it("lines with blanks have ___ in text and a non-empty answer", () => {
    for (const song of songs) {
      for (const line of song.lines) {
        if (line.answer) {
          expect(
            line.text,
            `${song.title}: line with answer "${line.answer}" missing ___`
          ).toContain("___");
          expect(line.answer.trim()).not.toBe("");
        }
      }
    }
  });

  it("getSong returns correct song", () => {
    expect(getSong("my-clothes")?.title).toBe("My Clothes");
    expect(getSong("go-to-school")?.title).toBe("Go To School");
    expect(getSong("nonexistent")).toBeUndefined();
  });

  it("3 songs belong to unit5 and 3 to unit6", () => {
    const unit5 = songs.filter((s) => s.unitId === "unit5");
    const unit6 = songs.filter((s) => s.unitId === "unit6");
    expect(unit5).toHaveLength(3);
    expect(unit6).toHaveLength(3);
  });
});
