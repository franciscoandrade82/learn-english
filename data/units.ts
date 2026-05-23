import { Unit, Topic } from "./types";
import { unit5Topics } from "./unit5";
import { unit6Topics } from "./unit6";

export const units: Unit[] = [
  {
    id: "unit5",
    name: "Unit 5",
    subtitle: "My Clothes",
    emoji: "👕",
    color: "#45B7D1",
    colorDark: "#2d9ab3",
    topicIds: ["clothes", "footwear", "accessories", "shapes"],
  },
  {
    id: "unit6",
    name: "Unit 6",
    subtitle: "The Name of the Game",
    emoji: "⚽",
    color: "#44D492",
    colorDark: "#2db876",
    topicIds: ["transport", "playground", "sports", "seasons"],
  },
];

export const allTopics: Topic[] = [...unit5Topics, ...unit6Topics];

export function getUnit(id: string): Unit | undefined {
  return units.find((u) => u.id === id);
}

export function getTopic(id: string): Topic | undefined {
  return allTopics.find((t) => t.id === id);
}

export function getTopicsForUnit(unitId: string): Topic[] {
  return allTopics.filter((t) => t.unitId === unitId);
}
