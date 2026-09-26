import { Gopher } from "../components/Gopher";
import { beltAccent, getCurrentBelt } from "../data/belts";
import { getMasteredCount, getDueCount, getStreak } from "../store/progress";
import { cards } from "../data/cards";
import { colors, font, radius, spacing } from "../styles/tokens";
import { useIsMobile } from "../utils/useMediaQuery";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const StatsRow: React.FC<{
  belt: ReturnType<typeof getCurrentBelt>;
  masteredCount: number;
  streakCount: number;
}> = ({ belt, masteredCount, streakCount }) => (
  <div style={styles.statsRow}>
    <div style={styles.statPill}>
      <span style={{ color: beltAccent(belt) }}>{belt.name}</span>
    </div>
    <div style={styles.statPill}>
      {masteredCount}/{cards.length} mastered
    </div>
    {streakCount > 0 && (
      <div style={styles.statPill}>{streakCount} day streak</div>
    )}
  </div>
);

const trainLabel = (dueCount: number): string =>
  dueCount > 0 ? `Train (${dueCount} due)` : "Train";

const ActionButtons: React.FC<{
  mobile: boolean;
  dueCount: number;
  onNavigate: (page: string) => void;
}> = ({ mobile, dueCount, onNavigate }) => {
  const width = mobile ? "100%" : "auto";
  return (
    <div
      style={{
        ...styles.actions,
        flexDirection: mobile ? "column" : "row",
        width,
      }}
    >
      <button
        onClick={() => onNavigate("learn")}
        style={{ ...styles.primaryButton, width }}
      >
        Learn Go
      </button>
      <button
        onClick={() => onNavigate("quiz")}
        style={{ ...styles.secondaryButton, width }}
      >
        {trainLabel(dueCount)}
      </button>
    </div>
  );
};

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const mobile = useIsMobile();
  const masteredCount = getMasteredCount();

  return (
    <div
      style={{ ...styles.container, padding: mobile ? spacing.md : spacing.xl }}
    >
      <Gopher mood="idle" size={mobile ? 220 : 320} />

      <h1 style={{ ...styles.title, fontSize: mobile ? 28 : 36 }}>Go Dojo</h1>
      <p style={styles.subtitle}>Master Go through spaced repetition</p>

      <StatsRow
        belt={getCurrentBelt(masteredCount)}
        masteredCount={masteredCount}
        streakCount={getStreak().count}
      />

      <ActionButtons
        mobile={mobile}
        dueCount={getDueCount()}
        onNavigate={onNavigate}
      />
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
    fontSize: 36,
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
