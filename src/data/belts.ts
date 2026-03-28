import type { BeltInfo } from "./types";
import { colors } from "../styles/tokens";

export const BELTS: BeltInfo[] = [
  {
    id: "white",
    name: "Beginner",
    emoji: "  ",
    color: colors.belt.white,
    min: 0,
    max: 9,
  },
  {
    id: "yellow",
    name: "Novice",
    emoji: "  ",
    color: colors.belt.yellow,
    min: 10,
    max: 24,
  },
  {
    id: "green",
    name: "Apprentice",
    emoji: "  ",
    color: colors.belt.green,
    min: 25,
    max: 39,
  },
  {
    id: "blue",
    name: "Adept",
    emoji: "  ",
    color: colors.belt.blue,
    min: 40,
    max: 54,
  },
  {
    id: "brown",
    name: "Advanced",
    emoji: "  ",
    color: colors.belt.brown,
    min: 55,
    max: 69,
  },
  {
    id: "black",
    name: "Master",
    emoji: "  ",
    color: colors.belt.black,
    min: 70,
  },
];

export function getCurrentBelt(masteredCount: number): BeltInfo {
  for (let i = BELTS.length - 1; i >= 0; i--) {
    if (masteredCount >= BELTS[i].min) return BELTS[i];
  }
  return BELTS[0];
}
