import type { ReviewRecord } from "../data/types";
import { createRecord, isMastered, isDue } from "../srs/sm2";

const STORAGE_KEY = "godojo_progress";
const STREAK_KEY = "godojo_streak";

interface StreakData {
  count: number;
  lastDate: string;
}

// --- Records ---

export function getAllRecords(): Record<string, ReviewRecord> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getRecord(cardId: string): ReviewRecord {
  const all = getAllRecords();
  return all[cardId] ?? createRecord(cardId);
}

export function saveRecord(record: ReviewRecord): void {
  const all = getAllRecords();
  all[record.cardId] = record;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

// --- Counts ---

export function getMasteredCount(): number {
  return Object.values(getAllRecords()).filter(isMastered).length;
}

export function getDueCount(): number {
  return Object.values(getAllRecords()).filter(isDue).length;
}

export function getSeenCount(): number {
  return Object.keys(getAllRecords()).length;
}

// --- Streak ---

export function getStreak(): StreakData {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    return raw ? JSON.parse(raw) : { count: 0, lastDate: "" };
  } catch {
    return { count: 0, lastDate: "" };
  }
}

export function updateStreak(): void {
  const streak = getStreak();
  const todayStr = new Date().toISOString().slice(0, 10);

  if (streak.lastDate === todayStr) return; // already counted today

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  const newStreak: StreakData =
    streak.lastDate === yesterdayStr
      ? { count: streak.count + 1, lastDate: todayStr }
      : { count: 1, lastDate: todayStr };

  localStorage.setItem(STREAK_KEY, JSON.stringify(newStreak));
}

// --- Reset ---

export function resetAll(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STREAK_KEY);
}
