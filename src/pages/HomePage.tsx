import { Gopher } from "../components/Gopher";
import { getCurrentBelt } from "../data/belts";
import { getMasteredCount, getDueCount, getStreak } from "../store/progress";
import { cards } from "../data/cards";
import { colors, font, radius, spacing } from "../styles/tokens";
import { useIsMobile } from "../utils/useMediaQuery";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const mobile = useIsMobile();
  const masteredCount = getMasteredCount();
  const dueCount = getDueCount();
  const streak = getStreak();
  const belt = getCurrentBelt(masteredCount);
  const totalCards = cards.length;

  return (
    <div
      style={{ ...styles.container, padding: mobile ? spacing.md : spacing.xl }}
    >
      <Gopher mood="idle" size={mobile ? 220 : 320} />

      <h1 style={{ ...styles.title, fontSize: mobile ? 32 : 42 }}>Go Dojo</h1>
      <p style={styles.subtitle}>Master Go through spaced repetition</p>

      {/* Quick stats */}
      <div style={styles.statsRow}>
        <div style={styles.statPill}>
          <span style={{ color: belt.color }}>{belt.name}</span>
        </div>
        <div style={styles.statPill}>
          {masteredCount}/{totalCards} mastered
        </div>
        {streak.count > 0 && (
          <div style={styles.statPill}>{streak.count} day streak</div>
        )}
      </div>

      {/* Action buttons */}
      <div
        style={{
          ...styles.actions,
          flexDirection: mobile ? "column" : "row",
          width: mobile ? "100%" : "auto",
        }}
      >
        <button
          onClick={() => onNavigate("learn")}
          style={{ ...styles.primaryButton, width: mobile ? "100%" : "auto" }}
        >
          Learn Go
        </button>
        <button
          onClick={() => onNavigate("quiz")}
          style={{ ...styles.secondaryButton, width: mobile ? "100%" : "auto" }}
        >
          {dueCount > 0 ? `Train (${dueCount} due)` : "Start Quiz"}
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "85vh",
    padding: spacing.xl,
    textAlign: "center",
  },
  title: {
    fontFamily: font.mono,
    fontSize: 42,
    fontWeight: font.weightBold,
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: 0,
    letterSpacing: -1,
  },
  subtitle: {
    fontFamily: font.body,
    fontSize: 18,
    color: colors.textMuted,
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  statsRow: {
    display: "flex",
    gap: spacing.sm,
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: spacing.xl,
  },
  statPill: {
    fontFamily: font.mono,
    fontSize: 15,
    color: colors.textMuted,
    background: colors.bgCard,
    padding: "8px 16px",
    borderRadius: 20,
  },
  actions: {
    display: "flex",
    gap: spacing.md,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  primaryButton: {
    fontFamily: font.mono,
    fontSize: 18,
    fontWeight: font.weightMedium,
    color: colors.bg,
    background: colors.accent,
    border: "none",
    borderRadius: radius.md,
    padding: "16px 40px",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  secondaryButton: {
    fontFamily: font.mono,
    fontSize: 18,
    fontWeight: font.weightMedium,
    color: colors.accent,
    background: "transparent",
    border: `2px solid ${colors.accent}`,
    borderRadius: radius.md,
    padding: "14px 32px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
};
