export type Belt = "white" | "yellow" | "green" | "blue" | "brown" | "black";

export type CardType = "concept" | "output" | "fix" | "idiom" | "type";

export type GopherMood =
  | "idle"
  | "thinking"
  | "celebrating"
  | "encouraging"
  | "meditating"
  | "belt-ceremony";

export interface GoCard {
  id: string;
  belt: Belt;
  type: CardType;
  question: string;
  code?: string;
  options: string[];
  correct: number;
  explanation: string;
  gopherMood: GopherMood;
  playgroundUrl?: string;
  conceptImage?: string;
}

export interface ReviewRecord {
  cardId: string;
  easeFactor: number;
  interval: number; // days
  repetitions: number;
  nextReview: string; // ISO date
  lastQuality: number;
}

export interface BeltInfo {
  id: Belt;
  name: string;
  emoji: string;
  color: string;
  min: number;
  max?: number;
}
