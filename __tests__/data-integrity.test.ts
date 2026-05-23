import { describe, it, expect } from "vitest";
import { units, allTopics, getUnit, getTopic, getTopicsForUnit } from "@/data/units";
import { grammarExercises } from "@/data/grammar";

describe("Units", () => {
  it("has exactly 2 units", () => {
    expect(units).toHaveLength(2);
  });

  it("each unit has required fields", () => {
    for (const unit of units) {
      expect(unit.id).toBeTruthy();
      expect(unit.name).toBeTruthy();
      expect(unit.subtitle).toBeTruthy();
      expect(unit.emoji).toBeTruthy();
      expect(unit.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(unit.colorDark).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(unit.topicIds.length).toBeGreaterThan(0);
    }
  });

  it("getUnit returns correct unit", () => {
    expect(getUnit("unit5")?.name).toBe("Unit 5");
    expect(getUnit("unit6")?.name).toBe("Unit 6");
    expect(getUnit("nonexistent")).toBeUndefined();
  });

  it("each unit topicId maps to an existing topic", () => {
    for (const unit of units) {
      for (const topicId of unit.topicIds) {
        const topic = getTopic(topicId);
        expect(topic, `Topic "${topicId}" not found`).toBeDefined();
        expect(topic!.unitId).toBe(unit.id);
      }
    }
  });
});

describe("Topics", () => {
  it("has 8 topics total", () => {
    expect(allTopics).toHaveLength(8);
  });

  it("each topic has required fields", () => {
    for (const topic of allTopics) {
      expect(topic.id, `Missing id`).toBeTruthy();
      expect(topic.name, `${topic.id}: missing name`).toBeTruthy();
      expect(topic.emoji, `${topic.id}: missing emoji`).toBeTruthy();
      expect(topic.unitId, `${topic.id}: missing unitId`).toBeTruthy();
      expect(topic.color, `${topic.id}: missing color`).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });

  it("has no duplicate topic IDs", () => {
    const ids = allTopics.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("getTopic returns correct topic", () => {
    expect(getTopic("clothes")?.name).toBe("Clothes");
    expect(getTopic("transport")?.name).toBe("Transport");
    expect(getTopic("nonexistent")).toBeUndefined();
  });

  it("getTopicsForUnit returns correct topics", () => {
    const unit5Topics = getTopicsForUnit("unit5");
    expect(unit5Topics).toHaveLength(4);
    expect(unit5Topics.map((t) => t.id)).toEqual(
      expect.arrayContaining(["clothes", "footwear", "accessories", "shapes"])
    );

    const unit6Topics = getTopicsForUnit("unit6");
    expect(unit6Topics).toHaveLength(4);
    expect(unit6Topics.map((t) => t.id)).toEqual(
      expect.arrayContaining(["transport", "playground", "sports", "seasons"])
    );
  });
});

describe("Vocabulary Words", () => {
  it("each topic has at least 4 words", () => {
    for (const topic of allTopics) {
      expect(
        topic.words.length,
        `${topic.id} has only ${topic.words.length} words`
      ).toBeGreaterThanOrEqual(4);
    }
  });

  it("each word has a non-empty word and image path", () => {
    for (const topic of allTopics) {
      for (const word of topic.words) {
        expect(word.word, `Empty word in ${topic.id}`).toBeTruthy();
        expect(word.image, `${word.word}: missing image`).toBeTruthy();
        expect(word.image).toMatch(/^\/images\//);
        expect(word.image).toMatch(/\.png$/);
      }
    }
  });

  it("has no duplicate words within a topic", () => {
    for (const topic of allTopics) {
      const words = topic.words.map((w) => w.word.toLowerCase());
      expect(
        new Set(words).size,
        `Duplicate words in ${topic.id}`
      ).toBe(words.length);
    }
  });

  it("image paths follow convention /images/[topic]/[word].png", () => {
    for (const topic of allTopics) {
      for (const word of topic.words) {
        expect(word.image).toContain(`/images/`);
      }
    }
  });
});

describe("Sentence Exercises", () => {
  it("each topic has at least 5 sentences", () => {
    for (const topic of allTopics) {
      expect(
        topic.sentences.length,
        `${topic.id} has only ${topic.sentences.length} sentences`
      ).toBeGreaterThanOrEqual(5);
    }
  });

  it("each sentence has a blank (___) and an answer", () => {
    for (const topic of allTopics) {
      for (const sentence of topic.sentences) {
        expect(
          sentence.sentence,
          `Empty sentence in ${topic.id}`
        ).toBeTruthy();
        expect(
          sentence.sentence,
          `Sentence missing blank in ${topic.id}: "${sentence.sentence}"`
        ).toContain("___");
        expect(
          sentence.answer,
          `Missing answer for "${sentence.sentence}" in ${topic.id}`
        ).toBeTruthy();
      }
    }
  });
});

describe("Grammar Exercises", () => {
  it("has at least 15 exercises", () => {
    expect(grammarExercises.length).toBeGreaterThanOrEqual(15);
  });

  it("each exercise has required fields", () => {
    for (const ex of grammarExercises) {
      expect(ex.sentence).toBeTruthy();
      expect(ex.sentence).toContain("___");
      expect(ex.answer).toBeTruthy();
      expect(ex.options).toHaveLength(4);
      expect(ex.explanation).toBeTruthy();
    }
  });

  it("correct answer is always in options", () => {
    for (const ex of grammarExercises) {
      expect(
        ex.options,
        `Answer "${ex.answer}" not in options for "${ex.sentence}"`
      ).toContain(ex.answer);
    }
  });

  it("has no duplicate options within an exercise", () => {
    for (const ex of grammarExercises) {
      expect(
        new Set(ex.options).size,
        `Duplicate options in "${ex.sentence}"`
      ).toBe(ex.options.length);
    }
  });
});
