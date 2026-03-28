import type { ReviewRecord } from "../data/types";

/** Create a fresh review record for a card. */
export function createRecord(cardId: string): ReviewRecord {
  return {
    cardId,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReview: today(),
    lastQuality: -1,
  };
}

/**
 * SM-2 algorithm: calculate next review based on quality.
 * quality: 0 = wrong, 1 = hard, 2 = easy
 */
export function calculateNextReview(
  record: ReviewRecord,
  quality: number,
): ReviewRecord {
  let { easeFactor, interval, repetitions } = record;

  if (quality === 0) {
    // Wrong: reset
    repetitions = 0;
    interval = 1;
  } else if (quality === 1) {
    // Hard: keep interval, slight ease decrease
    easeFactor = Math.max(1.3, easeFactor - 0.15);
  } else {
    // Easy: grow interval
    repetitions += 1;
    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 3;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    easeFactor = Math.min(2.5, easeFactor + 0.1);
  }

  const next = new Date();
  next.setDate(next.getDate() + interval);

  return {
    ...record,
    easeFactor,
    interval,
    repetitions,
    nextReview: toDateStr(next),
    lastQuality: quality,
  };
}

/** A card is mastered after 3+ reps with ease >= 2.0. */
export function isMastered(record: ReviewRecord): boolean {
  return record.repetitions >= 3 && record.easeFactor >= 2.0;
}

/** Is this card due for review today or earlier? */
export function isDue(record: ReviewRecord): boolean {
  return record.nextReview <= today();
}

function today(): string {
  return toDateStr(new Date());
}

function toDateStr(d: Date): string {
  return d.toISOString().slice(0, 10);
}
