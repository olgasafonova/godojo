import { useState, useCallback, useEffect } from "react";
import type { GoCard } from "../data/types";
import { cards } from "../data/cards";
import { getRecord, saveRecord, updateStreak } from "../store/progress";
import { calculateNextReview, isDue, isMastered } from "../srs/sm2";
import { Gopher } from "../components/Gopher";
import { CodeBlock } from "../components/CodeBlock";
import { getCurrentBelt } from "../data/belts";
import { getMasteredCount } from "../store/progress";
import { colors, font, radius, spacing } from "../styles/tokens";
import { useIsMobile } from "../utils/useMediaQuery";

type Phase = "ready" | "question" | "feedback" | "done";

function buildQueue(): GoCard[] {
  // Priority: due cards first, then unseen cards, shuffle each group
  const due: GoCard[] = [];
  const unseen: GoCard[] = [];

  for (const card of cards) {
    const rec = getRecord(card.id);
    if (rec.lastQuality === -1) {
      unseen.push(card);
    } else if (isDue(rec) && !isMastered(rec)) {
      due.push(card);
    }
  }

  const shuffle = <T,>(arr: T[]): T[] => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const queue = [...shuffle(due), ...shuffle(unseen)];
  return queue.slice(0, 10); // session of 10
}

export const QuizPage: React.FC = () => {
  const [phase, setPhase] = useState<Phase>("ready");
  const [queue, setQueue] = useState<GoCard[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const card = queue[index];
  const belt = getCurrentBelt(getMasteredCount());
  const mobile = useIsMobile();

  const startQuiz = useCallback(() => {
    const q = buildQueue();
    setQueue(q);
    setIndex(0);
    setSelected(null);
    setScore(0);
    setTotal(0);
    setPhase(q.length > 0 ? "question" : "done");
  }, []);

  const handleSelect = (optionIndex: number) => {
    if (selected !== null) return; // already answered
    setSelected(optionIndex);

    const isCorrect = optionIndex === card.correct;
    const quality = isCorrect ? 2 : 0;

    // Update SRS
    const rec = getRecord(card.id);
    const updated = calculateNextReview(rec, quality);
    saveRecord(updated);
    updateStreak();

    setTotal((t) => t + 1);
    if (isCorrect) setScore((s) => s + 1);

    setPhase("feedback");
  };

  const handleNext = () => {
    if (index + 1 >= queue.length) {
      setPhase("done");
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
      setPhase("question");
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (phase === "question" && selected === null) {
        const num = parseInt(e.key);
        if (num >= 1 && num <= 4) {
          handleSelect(num - 1);
        }
      }
      if (phase === "feedback" && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        handleNext();
      }
      if (phase === "ready" && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        startQuiz();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  // Ready screen
  if (phase === "ready") {
    return (
      <div
        style={{
          ...styles.container,
          padding: mobile
            ? `${spacing.md}px ${spacing.sm}px`
            : styles.container.padding,
        }}
      >
        <Gopher mood="idle" size={mobile ? 120 : 180} />
        <h1 style={{ ...styles.title, fontSize: mobile ? 22 : 28 }}>
          Ready to train?
        </h1>
        <p style={styles.subtitle}>
          10 cards per session. Due reviews first, then new concepts.
        </p>
        <button onClick={startQuiz} style={styles.startButton}>
          Start Quiz
        </button>
        <span style={styles.hint}>or press Enter</span>
      </div>
    );
  }

  // Done screen
  if (phase === "done") {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    const gopherMood =
      pct >= 80 ? "celebrating" : pct >= 50 ? "idle" : "encouraging";

    return (
      <div
        style={{
          ...styles.container,
          padding: mobile
            ? `${spacing.md}px ${spacing.sm}px`
            : styles.container.padding,
        }}
      >
        <Gopher mood={gopherMood} size={mobile ? 120 : 180} />
        <h1 style={styles.title}>
          {pct >= 80
            ? "Excellent!"
            : pct >= 50
              ? "Good effort!"
              : "Keep practicing!"}
        </h1>
        <div
          style={{ ...styles.scoreRow, gap: mobile ? spacing.lg : spacing.xxl }}
        >
          <div style={styles.scoreStat}>
            <span
              style={{
                ...styles.scoreNumber,
                fontSize: mobile ? 32 : 44,
                color: colors.warm,
              }}
            >
              {score}
            </span>
            <span style={styles.scoreLabel}>Correct</span>
          </div>
          <div style={styles.scoreStat}>
            <span style={{ ...styles.scoreNumber, color: colors.accent }}>
              {total}
            </span>
            <span style={styles.scoreLabel}>Total</span>
          </div>
          <div style={styles.scoreStat}>
            <span
              style={{
                ...styles.scoreNumber,
                color: pct >= 80 ? colors.mastered : colors.wrong,
              }}
            >
              {pct}%
            </span>
            <span style={styles.scoreLabel}>Accuracy</span>
          </div>
        </div>
        <button onClick={startQuiz} style={styles.startButton}>
          Train Again
        </button>
      </div>
    );
  }

  // Question / Feedback
  const isCorrect = selected === card.correct;

  return (
    <div style={styles.container}>
      {/* Progress bar */}
      <div style={styles.progressBar}>
        <div
          style={{
            ...styles.progressFill,
            width: `${((index + 1) / queue.length) * 100}%`,
          }}
        />
      </div>

      {/* Card counter */}
      <div style={styles.counter}>
        {index + 1} / {queue.length}
      </div>

      {/* Question */}
      <div
        style={{
          ...styles.questionCard,
          padding: mobile ? spacing.md : spacing.xl,
        }}
      >
        <div style={styles.cardTypeBadge}>{card.type}</div>
        <h2 style={styles.question}>{card.question}</h2>

        {card.code && <CodeBlock code={card.code} />}

        {/* Options */}
        <div style={styles.options}>
          {card.options.map((opt, i) => {
            let bg = colors.bgCode;
            let border = "2px solid transparent";

            if (selected !== null) {
              if (i === card.correct) {
                bg = "rgba(45, 134, 89, 0.25)";
                border = `2px solid ${colors.mastered}`;
              } else if (i === selected && !isCorrect) {
                bg = "rgba(224, 112, 96, 0.25)";
                border = `2px solid ${colors.wrong}`;
              }
            } else {
              border = "2px solid rgba(0, 173, 216, 0.15)";
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={selected !== null}
                style={{
                  ...styles.option,
                  background: bg,
                  border,
                  cursor: selected !== null ? "default" : "pointer",
                  opacity:
                    selected !== null && i !== selected && i !== card.correct
                      ? 0.5
                      : 1,
                }}
              >
                <span style={styles.optionNumber}>{i + 1}</span>
                <span style={styles.optionText}>{opt}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback panel */}
      {phase === "feedback" && (
        <div
          style={{
            ...styles.feedbackPanel,
            padding: mobile ? spacing.md : spacing.xl,
          }}
        >
          <div
            style={{
              ...styles.feedbackRow,
              flexDirection: mobile ? "column" : "row",
              alignItems: mobile ? "center" : "flex-start",
            }}
          >
            <Gopher
              mood={isCorrect ? "celebrating" : "encouraging"}
              size={mobile ? 120 : 150}
            />
            <div style={styles.feedbackText}>
              <div
                style={{
                  ...styles.feedbackVerdict,
                  color: isCorrect ? colors.mastered : colors.wrong,
                }}
              >
                {isCorrect ? "Correct!" : "Not quite"}
              </div>
              <p style={styles.explanation}>{card.explanation}</p>
            </div>
          </div>
          <button onClick={handleNext} style={styles.nextButton}>
            {index + 1 < queue.length ? "Next" : "See Results"}
          </button>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 720,
    margin: "0 auto",
    padding: `${spacing.xl}px ${spacing.md}px`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "80vh",
  },
  title: {
    fontFamily: font.mono,
    fontSize: 28,
    fontWeight: font.weightBold,
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: font.body,
    fontSize: 18,
    color: colors.textMuted,
    marginBottom: spacing.xl,
    textAlign: "center",
  },
  startButton: {
    fontFamily: font.mono,
    fontSize: 22,
    fontWeight: font.weightMedium,
    color: colors.bg,
    background: colors.accent,
    border: "none",
    borderRadius: radius.md,
    padding: "16px 48px",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  hint: {
    fontFamily: font.mono,
    fontSize: 13,
    color: colors.textMuted,
    marginTop: spacing.sm,
    display: "block",
    textAlign: "center",
  },
  progressBar: {
    width: "100%",
    height: 4,
    background: colors.notStarted,
    borderRadius: 2,
    marginBottom: spacing.md,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: colors.accent,
    borderRadius: 2,
    transition: "width 0.3s ease",
  },
  counter: {
    fontFamily: font.mono,
    fontSize: 14,
    color: colors.textMuted,
    alignSelf: "flex-end",
    marginBottom: spacing.md,
  },
  questionCard: {
    width: "100%",
    background: colors.bgCard,
    borderRadius: radius.lg,
    padding: spacing.xl,
  },
  cardTypeBadge: {
    fontFamily: font.mono,
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: colors.accent,
    marginBottom: spacing.md,
  },
  question: {
    fontFamily: font.body,
    fontSize: 24,
    fontWeight: font.weightMedium,
    color: colors.text,
    marginBottom: spacing.lg,
    lineHeight: 1.4,
  },
  options: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  option: {
    display: "flex",
    alignItems: "center",
    gap: spacing.md,
    padding: "14px 16px",
    borderRadius: radius.md,
    fontFamily: font.mono,
    fontSize: 17,
    color: colors.text,
    textAlign: "left",
    transition: "all 0.2s",
  },
  optionNumber: {
    fontFamily: font.mono,
    fontSize: 13,
    color: colors.textMuted,
    minWidth: 20,
  },
  optionText: {
    flex: 1,
  },
  feedbackPanel: {
    width: "100%",
    marginTop: spacing.lg,
    background: colors.bgCard,
    borderRadius: radius.lg,
    padding: spacing.xl,
  },
  feedbackRow: {
    display: "flex",
    gap: spacing.lg,
    alignItems: "flex-start",
  },
  feedbackText: {
    flex: 1,
  },
  feedbackVerdict: {
    fontFamily: font.mono,
    fontSize: 26,
    fontWeight: font.weightBold,
    marginBottom: spacing.sm,
  },
  explanation: {
    fontFamily: font.body,
    fontSize: 17,
    color: colors.textMuted,
    lineHeight: 1.6,
  },
  nextButton: {
    fontFamily: font.mono,
    fontSize: 20,
    fontWeight: font.weightMedium,
    color: colors.bg,
    background: colors.accent,
    border: "none",
    borderRadius: radius.md,
    padding: "12px 32px",
    cursor: "pointer",
    marginTop: spacing.lg,
    display: "flex",
    alignItems: "center",
    gap: spacing.sm,
  },
  scoreRow: {
    display: "flex",
    gap: spacing.xxl,
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  scoreStat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  scoreNumber: {
    fontFamily: font.mono,
    fontSize: 44,
    fontWeight: font.weightBold,
    lineHeight: 1,
  },
  scoreLabel: {
    fontFamily: font.mono,
    fontSize: 14,
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginTop: spacing.sm,
  },
};
