import { cards } from "../data/cards";
import { BELTS, getCurrentBelt } from "../data/belts";
import {
  getAllRecords,
  getStreak,
  getMasteredCount,
  getDueCount,
} from "../store/progress";
import { isMastered } from "../srs/sm2";
import { Gopher } from "../components/Gopher";
import { colors, font, radius, spacing } from "../styles/tokens";
import type { Belt } from "../data/types";
import { useIsMobile } from "../utils/useMediaQuery";

const BELT_LABELS: Record<Belt, string> = {
  white: "Basics",
  yellow: "Control Flow",
  green: "Data Structures",
  blue: "Interfaces & Errors",
  brown: "Concurrency",
  black: "Advanced",
};

export const ProgressPage: React.FC = () => {
  const mobile = useIsMobile();
  const records = getAllRecords();
  const streak = getStreak();
  const masteredCount = getMasteredCount();
  const dueCount = getDueCount();
  const belt = getCurrentBelt(masteredCount);
  const totalCards = cards.length;
  const seenCount = Object.keys(records).length;

  return (
    <div
      style={{
        maxWidth: 860,
        margin: "0 auto",
        padding: `${spacing.xl}px ${spacing.md}px`,
      }}
    >
      {/* Gopher + Belt */}
      <div
        style={{
          display: "flex",
          flexDirection: mobile ? "column" : "row",
          alignItems: mobile ? "center" : "center",
          textAlign: mobile ? "center" : "left",
          gap: spacing.lg,
          marginBottom: spacing.xxl,
        }}
      >
        <Gopher mood="meditating" size={mobile ? 140 : 200} />
        <div>
          <div
            style={{
              fontFamily: font.mono,
              fontSize: 16,
              textTransform: "uppercase",
              letterSpacing: 2,
              color: colors.textMuted,
              marginBottom: spacing.xs,
            }}
          >
            Current Rank
          </div>
          <div
            style={{
              fontFamily: font.mono,
              fontSize: 34,
              fontWeight: font.weightBold,
              color: belt.color,
            }}
          >
            {belt.name}
          </div>
          <div
            style={{
              fontFamily: font.mono,
              fontSize: 16,
              color: colors.textMuted,
              marginTop: spacing.xs,
            }}
          >
            {belt.id} belt
          </div>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: mobile ? "repeat(3, 1fr)" : "repeat(5, auto)",
          gap: mobile ? spacing.md : spacing.xl,
          marginBottom: spacing.xxl,
          textAlign: mobile ? "center" : "left",
        }}
      >
        <StatBlock
          value={masteredCount}
          label="Mastered"
          color={colors.mastered}
        />
        <StatBlock value={seenCount} label="Seen" color={colors.accent} />
        <StatBlock value={dueCount} label="Due Today" color={colors.warm} />
        <StatBlock
          value={streak.count}
          label="Day Streak"
          color={colors.accent}
        />
        <StatBlock
          value={totalCards}
          label="Total Cards"
          color={colors.textMuted}
        />
      </div>

      {/* Belt progression */}
      <h2 style={sectionTitle}>Belt Progression</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: mobile
            ? "repeat(3, 1fr)"
            : "repeat(auto-fill, minmax(130px, 1fr))",
          gap: mobile ? spacing.sm : spacing.md,
          marginBottom: spacing.xxl,
        }}
      >
        {BELTS.map((b) => {
          const isCurrent = b.id === belt.id;
          const achieved = masteredCount >= b.min;
          const rangeText = b.max ? `${b.min}-${b.max}` : `${b.min}+`;
          const progress =
            isCurrent && b.max
              ? Math.min(1, (masteredCount - b.min) / (b.max - b.min + 1))
              : achieved
                ? 1
                : 0;

          return (
            <div
              key={b.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: `${spacing.lg}px ${spacing.sm}px`,
                background: isCurrent ? colors.bgCard : "transparent",
                borderRadius: radius.md,
                opacity: achieved || isCurrent ? 1 : 0.35,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 12,
                  borderRadius: 3,
                  background: b.id === "black" ? "#555" : b.color,
                  border: b.id === "white" ? "1px solid #888" : "none",
                  marginBottom: spacing.sm,
                }}
              />
              <div
                style={{
                  fontFamily: font.mono,
                  fontSize: 16,
                  fontWeight: isCurrent ? font.weightBold : font.weightRegular,
                  color: isCurrent
                    ? b.id === "black"
                      ? colors.text
                      : b.color
                    : colors.text,
                }}
              >
                {b.name}
              </div>
              <div
                style={{
                  fontFamily: font.mono,
                  fontSize: 14,
                  color: colors.textMuted,
                  marginTop: 2,
                }}
              >
                {rangeText} cards
              </div>
              {(isCurrent || achieved) && (
                <div
                  style={{
                    marginTop: spacing.sm,
                    width: "100%",
                    height: 3,
                    borderRadius: 2,
                    background: colors.notStarted,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${progress * 100}%`,
                      height: "100%",
                      background: b.color,
                      borderRadius: 2,
                      transition: "width 0.3s",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Card grid by belt */}
      <h2 style={sectionTitle}>All Cards</h2>
      {(["white", "yellow", "green", "blue", "brown", "black"] as Belt[]).map(
        (beltId) => {
          const beltCards = cards.filter((c) => c.belt === beltId);
          return (
            <div key={beltId} style={{ marginBottom: spacing.xl }}>
              <h3
                style={{
                  fontFamily: font.mono,
                  fontSize: 18,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  color:
                    beltId === "black" ? colors.textMuted : colors.belt[beltId],
                  marginBottom: spacing.sm,
                }}
              >
                {BELT_LABELS[beltId]}
              </h3>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {beltCards.map((card) => {
                  const rec = records[card.id];
                  const mastered = rec && isMastered(rec);
                  const seen = !!rec;
                  const bg = mastered
                    ? colors.mastered
                    : seen
                      ? colors.learning
                      : colors.notStarted;
                  return (
                    <div
                      key={card.id}
                      title={card.question}
                      style={{
                        width: 56,
                        height: 56,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: bg,
                        borderRadius: radius.sm,
                        fontSize: 14,
                        fontFamily: font.mono,
                        color: mastered || seen ? "#fff" : colors.textMuted,
                      }}
                    >
                      {card.id}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        },
      )}
    </div>
  );
};

const sectionTitle: React.CSSProperties = {
  fontFamily: font.mono,
  fontSize: 20,
  textTransform: "uppercase",
  letterSpacing: 2,
  color: colors.textMuted,
  marginBottom: spacing.md,
  fontWeight: font.weightRegular,
};

const StatBlock: React.FC<{
  value: string | number;
  label: string;
  color: string;
}> = ({ value, label, color }) => (
  <div>
    <div
      style={{
        fontSize: 42,
        fontFamily: font.mono,
        fontWeight: font.weightBold,
        color,
        lineHeight: 1,
      }}
    >
      {value}
    </div>
    <div
      style={{
        fontSize: 15,
        fontFamily: font.mono,
        textTransform: "uppercase",
        letterSpacing: 1.5,
        color: colors.textMuted,
        marginTop: spacing.xs,
      }}
    >
      {label}
    </div>
  </div>
);
