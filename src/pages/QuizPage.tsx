import { useState, useCallback, useEffect } from "react";
import type { GoCard } from "../data/types";
import { cards } from "../data/cards";
import { getRecord, saveRecord, updateStreak } from "../store/progress";
import { calculateNextReview, isDue, isMastered } from "../srs/sm2";
import { Gopher } from "../components/Gopher";
import { CodeBlock } from "../components/CodeBlock";
import { colors, font, radius, spacing } from "../styles/tokens";
import { useIsMobile } from "../utils/useMediaQuery";
import { playCorrect, playWrong } from "../utils/sounds";

type Phase = "ready" | "question" | "feedback" | "done";

function buildQueue(): GoCard[] {
  // Priority: due cards first, then unseen cards, shuffle each group
  const due: GoCard[] = [];
  const unseen: GoCard[] = [];
  const review: GoCard[] = [];

  for (const card of cards) {
    const rec = getRecord(card.id);
    if (rec.lastQuality === -1) {
      unseen.push(card);
    } else if (isDue(rec) && !isMastered(rec)) {
      due.push(card);
    } else if (!isMastered(rec)) {
      review.push(card);
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

  // Priority: due first, then unseen, then not-yet-due non-mastered as fallback
  const queue = [...shuffle(due), ...shuffle(unseen), ...shuffle(review)];
  return queue.slice(0, 10); // session of 10
}

interface QuizPageProps {
  onNavigate: (page: string) => void;
}

function shuffleOrder(length: number): number[] {
  const order = Array.from({ length }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

function gradeQuality(isCorrect: boolean): number {
  return isCorrect ? 2 : 0;
}

interface OptionVisual {
  background: string;
  border: string;
  opacity: number;
  cursor: "pointer" | "default";
}

interface OptionContext {
  originalIdx: number;
  displayIdx: number;
  selected: number | null;
  correctIdx: number;
  isCorrect: boolean;
}

function unansweredVisual(): OptionVisual {
  return {
    background: colors.bgCode,
    border: "2px solid rgba(0, 173, 216, 0.15)",
    opacity: 1,
    cursor: "pointer",
  };
}

function optionVisual(ctx: OptionContext): OptionVisual {
  if (ctx.selected === null) return unansweredVisual();

  const isCorrectOption = ctx.originalIdx === ctx.correctIdx;
  const isSelectedWrong = ctx.displayIdx === ctx.selected && !ctx.isCorrect;
  const isIrrelevant = ctx.displayIdx !== ctx.selected && !isCorrectOption;

  let background: string = colors.bgCode;
  let border = "2px solid transparent";
  if (isCorrectOption) {
    background = "rgba(45, 134, 89, 0.25)";
    border = `2px solid ${colors.mastered}`;
  } else if (isSelectedWrong) {
    background = "rgba(224, 112, 96, 0.25)";
    border = `2px solid ${colors.wrong}`;
  }

  return {
    background,
    border,
    opacity: isIrrelevant ? 0.5 : 1,
    cursor: "default",
  };
}

const ReadyScreen: React.FC<{ mobile: boolean; onStart: () => void }> = ({
  mobile,
  onStart,
}) => (
  <div
    style={{
      ...styles.container,
      padding: mobile
        ? `${spacing.md}px ${spacing.sm}px`
        : styles.container.padding,
    }}
  >
    <Gopher mood="idle" size={mobile ? 160 : 220} />
    <h1 style={{ ...styles.title, fontSize: mobile ? 28 : 36 }}>
      Ready to train?
    </h1>
    <p style={styles.subtitle}>
      10 cards per session. Due reviews first, then new concepts.
    </p>
    <button onClick={onStart} style={styles.startButton}>
      Train
    </button>
    <span style={styles.hint}>or press Enter</span>
  </div>
);

interface ScoreSummary {
  pct: number;
  gopherMood: "celebrating" | "idle" | "encouraging";
  heading: string;
}

function summarizeScore(score: number, total: number): ScoreSummary {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  if (pct >= 80) {
    return { pct, gopherMood: "celebrating", heading: "Excellent!" };
  }
  if (pct >= 50) {
    return { pct, gopherMood: "idle", heading: "Good effort!" };
  }
  return { pct, gopherMood: "encouraging", heading: "Keep practicing!" };
}

const DoneScreen: React.FC<{
  mobile: boolean;
  score: number;
  total: number;
  onHome: () => void;
}> = ({ mobile, score, total, onHome }) => {
  const { pct, gopherMood, heading } = summarizeScore(score, total);

  return (
    <div
      style={{
        ...styles.container,
        padding: mobile
          ? `${spacing.md}px ${spacing.sm}px`
          : styles.container.padding,
      }}
    >
      <Gopher mood={gopherMood} size={mobile ? 160 : 220} />
      <h1 style={styles.title}>{heading}</h1>
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
      <button onClick={onHome} style={styles.startButton}>
        Home
      </button>
    </div>
  );
};

const OptionButton: React.FC<{
  card: GoCard;
  originalIdx: number;
  displayIdx: number;
  selected: number | null;
  isCorrect: boolean;
  onSelect: (displayIdx: number) => void;
}> = ({ card, originalIdx, displayIdx, selected, isCorrect, onSelect }) => {
  const visual = optionVisual({
    originalIdx,
    displayIdx,
    selected,
    correctIdx: card.correct,
    isCorrect,
  });
  return (
    <button
      onClick={() => onSelect(displayIdx)}
      disabled={selected !== null}
      style={{
        ...styles.option,
        background: visual.background,
        border: visual.border,
        cursor: visual.cursor,
        opacity: visual.opacity,
      }}
    >
      <span style={styles.optionNumber}>{displayIdx + 1}</span>
      <span style={styles.optionText}>{card.options[originalIdx]}</span>
    </button>
  );
};

const QuestionCard: React.FC<{
  card: GoCard;
  mobile: boolean;
  optionOrder: number[];
  selected: number | null;
  isCorrect: boolean;
  onSelect: (displayIdx: number) => void;
}> = ({ card, mobile, optionOrder, selected, isCorrect, onSelect }) => (
  <div
    style={{
      ...styles.questionCard,
      padding: mobile ? spacing.md : spacing.xl,
    }}
  >
    <div style={styles.cardTypeBadge}>{card.type}</div>
    <h2 style={styles.question}>{card.question}</h2>

    {card.code && <CodeBlock code={card.code} />}

    <div style={styles.options}>
      {optionOrder.map((originalIdx, displayIdx) => (
        <OptionButton
          key={displayIdx}
          card={card}
          originalIdx={originalIdx}
          displayIdx={displayIdx}
          selected={selected}
          isCorrect={isCorrect}
          onSelect={onSelect}
        />
      ))}
    </div>
  </div>
);

const FeedbackPanel: React.FC<{
  card: GoCard;
  mobile: boolean;
  isCorrect: boolean;
  isLast: boolean;
  onNext: () => void;
}> = ({ card, mobile, isCorrect, isLast, onNext }) => (
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
        size={mobile ? 140 : 180}
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
    <button onClick={onNext} style={styles.nextButton}>
      {isLast ? "See Results" : "Next"}
    </button>
  </div>
);

const ActiveQuiz: React.FC<{
  card: GoCard;
  mobile: boolean;
  phase: Phase;
  index: number;
  queueLength: number;
  optionOrder: number[];
  selected: number | null;
  onSelect: (displayIdx: number) => void;
  onNext: () => void;
}> = ({
  card,
  mobile,
  phase,
  index,
  queueLength,
  optionOrder,
  selected,
  onSelect,
  onNext,
}) => {
  const isCorrect = selected !== null && optionOrder[selected] === card.correct;

  return (
    <div style={styles.container}>
      <div style={styles.progressBar}>
        <div
          style={{
            ...styles.progressFill,
            width: `${((index + 1) / queueLength) * 100}%`,
          }}
        />
      </div>

      <div style={styles.counter}>
        {index + 1} / {queueLength}
      </div>

      <QuestionCard
        card={card}
        mobile={mobile}
        optionOrder={optionOrder}
        selected={selected}
        isCorrect={isCorrect}
        onSelect={onSelect}
      />

      {phase === "feedback" && (
        <FeedbackPanel
          card={card}
          mobile={mobile}
          isCorrect={isCorrect}
          isLast={index + 1 >= queueLength}
          onNext={onNext}
        />
      )}
    </div>
  );
};

interface QuizSession {
  phase: Phase;
  queue: GoCard[];
  index: number;
  selected: number | null;
  score: number;
  total: number;
  optionOrder: number[];
  card: GoCard;
  startQuiz: () => void;
  handleSelect: (displayIndex: number) => void;
  handleNext: () => void;
}

function useQuizSession(): QuizSession {
  const [phase, setPhase] = useState<Phase>("ready");
  const [queue, setQueue] = useState<GoCard[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [optionOrder, setOptionOrder] = useState<number[]>([]);

  const card = queue[index];

  const startQuiz = useCallback(() => {
    const q = buildQueue();
    setQueue(q);
    setIndex(0);
    setSelected(null);
    setScore(0);
    setTotal(0);
    if (q.length > 0) {
      setOptionOrder(shuffleOrder(q[0].options.length));
    }
    setPhase(q.length > 0 ? "question" : "done");
  }, []);

  const handleSelect = useCallback(
    (displayIndex: number) => {
      if (selected !== null) return; // already answered
      setSelected(displayIndex);

      const isCorrect = optionOrder[displayIndex] === card.correct;
      saveRecord(calculateNextReview(getRecord(card.id), gradeQuality(isCorrect)));
      updateStreak();

      setTotal((t) => t + 1);
      if (isCorrect) {
        setScore((s) => s + 1);
        playCorrect();
      } else {
        playWrong();
      }
      setPhase("feedback");
    },
    [selected, optionOrder, card],
  );

  const handleNext = useCallback(() => {
    if (index + 1 >= queue.length) {
      setPhase("done");
      return;
    }
    const nextIndex = index + 1;
    setIndex(nextIndex);
    setSelected(null);
    setOptionOrder(shuffleOrder(queue[nextIndex].options.length));
    setPhase("question");
  }, [index, queue]);

  return {
    phase,
    queue,
    index,
    selected,
    score,
    total,
    optionOrder,
    card,
    startQuiz,
    handleSelect,
    handleNext,
  };
}

function useQuizKeyboard(session: QuizSession): void {
  const { phase, selected, handleSelect, handleNext, startQuiz } = session;
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const advance = phase === "feedback" ? handleNext : startQuiz;
      const canAdvance =
        (phase === "feedback" || phase === "ready") &&
        (e.key === "Enter" || e.key === " ");

      if (canAdvance) {
        e.preventDefault();
        advance();
        return;
      }

      if (phase === "question" && selected === null) {
        const num = parseInt(e.key);
        if (num >= 1 && num <= 4) handleSelect(num - 1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, selected, handleSelect, handleNext, startQuiz]);
}

export const QuizPage: React.FC<QuizPageProps> = ({ onNavigate }) => {
  const mobile = useIsMobile();
  const session = useQuizSession();
  useQuizKeyboard(session);

  if (session.phase === "ready") {
    return <ReadyScreen mobile={mobile} onStart={session.startQuiz} />;
  }

  if (session.phase === "done") {
    return (
      <DoneScreen
        mobile={mobile}
        score={session.score}
        total={session.total}
        onHome={() => onNavigate("home")}
      />
    );
  }

  return (
    <ActiveQuiz
      card={session.card}
      mobile={mobile}
      phase={session.phase}
      index={session.index}
      queueLength={session.queue.length}
      optionOrder={session.optionOrder}
      selected={session.selected}
      onSelect={session.handleSelect}
      onNext={session.handleNext}
    />
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
    fontSize: 36,
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
    fontSize: 18,
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
    fontSize: 28,
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
    fontSize: 18,
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
    fontSize: 18,
    color: colors.textMuted,
    lineHeight: 1.6,
  },
  nextButton: {
    fontFamily: font.mono,
    fontSize: 18,
    fontWeight: font.weightMedium,
    color: colors.bg,
    background: colors.accent,
    border: "none",
    borderRadius: radius.md,
    padding: "14px 32px",
    cursor: "pointer",
    marginTop: spacing.lg,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
