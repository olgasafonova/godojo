import type { Belt, BeltInfo } from "./types";
import { colors } from "../styles/tokens";
import { cards } from "./cards";

// Where each belt starts, as a share of the deck. Derived from the deck
// size so adding cards can never make a belt unreachable: Master means
// every card mastered. The shares keep the original 0/10/25/40/55/70 spacing.
const BELT_START_SHARE: Record<Belt, number> = {
  white: 0,
  yellow: 10 / 70,
  green: 25 / 70,
  blue: 40 / 70,
  brown: 55 / 70,
  black: 1,
};

const beltMin = (belt: Belt): number =>
  Math.round(cards.length * BELT_START_SHARE[belt]);

export const BELTS: BeltInfo[] = [
  {
    id: "white",
    name: "Beginner",
    emoji: "  ",
    color: colors.belt.white,
    min: beltMin("white"),
    max: beltMin("yellow") - 1,
  },
  {
    id: "yellow",
    name: "Novice",
    emoji: "  ",
    color: colors.belt.yellow,
    min: beltMin("yellow"),
    max: beltMin("green") - 1,
  },
  {
    id: "green",
    name: "Apprentice",
    emoji: "  ",
    color: colors.belt.green,
    min: beltMin("green"),
    max: beltMin("blue") - 1,
  },
  {
    id: "blue",
    name: "Adept",
    emoji: "  ",
    color: colors.belt.blue,
    min: beltMin("blue"),
    max: beltMin("brown") - 1,
  },
  {
    id: "brown",
    name: "Advanced",
    emoji: "  ",
    color: colors.belt.brown,
    min: beltMin("brown"),
    max: beltMin("black") - 1,
  },
  {
    id: "black",
    name: "Master",
    emoji: "  ",
    color: colors.belt.black,
    min: beltMin("black"),
  },
];

// Colour for belt-coloured text and bars. The black belt's own colour is
// near-invisible on the dark background, so it falls back to the text colour.
export const beltAccent = (belt: BeltInfo): string =>
  belt.id === "black" ? colors.text : belt.color;

export function getCurrentBelt(masteredCount: number): BeltInfo {
  for (let i = BELTS.length - 1; i >= 0; i--) {
    if (masteredCount >= BELTS[i].min) return BELTS[i];
  }
  return BELTS[0];
}
