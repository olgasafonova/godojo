import { useState } from "react";
import { cards } from "../data/cards";
import { BELTS, getCurrentBelt } from "../data/belts";
import {
  getAllRecords,
  getStreak,
  getMasteredCount,
  getDueCount,
  resetAll,
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

const BELT_ORDER: Belt[] = [
  "white",
  "yellow",
  "green",
  "blue",
  "brown",
  "black",
];

function beltProgress(
  belt: (typeof BELTS)[number],
  isCurrent: boolean,
  achieved: boolean,
  masteredCount: number,
): number {
  if (isCurrent && belt.max) {
    return Math.min(1, (masteredCount - belt.min) / (belt.max - belt.min + 1));
  }
  return achieved ? 1 : 0;
}

const BeltCard: React.FC<{
  belt: (typeof BELTS)[number];
  currentBeltId: Belt;
  masteredCount: number;
}> = ({ belt, currentBeltId, masteredCount }) => {
  const isCurrent = belt.id === currentBeltId;
  const achieved = masteredCount >= belt.min;
  const rangeText = belt.max ? `${belt.min}-${belt.max}` : `${belt.min}+`;
  const progress = beltProgress(belt, isCurrent, achieved, masteredCount);
  const nameColor =
    isCurrent && belt.id !== "black" ? belt.color : colors.text;

  return (
    <div
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
          background: belt.id === "black" ? "#555" : belt.color,
          border: belt.id === "white" ? "1px solid #888" : "none",
          marginBottom: spacing.sm,
        }}
      />
      <div
        style={{
          fontFamily: font.mono,
          fontSize: 15,
          fontWeight: isCurrent ? font.weightBold : font.weightRegular,
          color: nameColor,
        }}
      >
        {belt.name}
      </div>
      <div
        style={{
          fontFamily: font.mono,
          fontSize: 15,
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
              background: belt.color,
              borderRadius: 2,
              transition: "width 0.3s",
            }}
          />
        </div>
      )}
    </div>
  );
};

function cardSwatchColor(
  rec: ReturnType<typeof getAllRecords>[string] | undefined,
): { bg: string; text: string } {
  const seen = !!rec;
  const mastered = !!rec && isMastered(rec);
  const bg = mastered
    ? colors.mastered
    : seen
      ? colors.learning
      : colors.notStarted;
  return { bg, text: mastered || seen ? "#fff" : colors.textMuted };
}

const BeltCardGroup: React.FC<{
  beltId: Belt;
  records: ReturnType<typeof getAllRecords>;
}> = ({ beltId, records }) => {
  const beltCards = cards.filter((c) => c.belt === beltId);
  return (
    <div style={{ marginBottom: spacing.xl }}>
      <h3
        style={{
          fontFamily: font.mono,
          fontSize: 18,
          textTransform: "uppercase",
          letterSpacing: 1.5,
          color: beltId === "black" ? colors.textMuted : colors.belt[beltId],
          marginBottom: spacing.sm,
        }}
      >
        {BELT_LABELS[beltId]}
      </h3>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {beltCards.map((card) => {
          const swatch = cardSwatchColor(records[card.id]);
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
                background: swatch.bg,
                borderRadius: radius.sm,
                fontSize: 14,
                fontFamily: font.mono,
                color: swatch.text,
              }}
            >
              {card.id}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const secondaryButton: React.CSSProperties = {
  fontFamily: font.mono,
  fontSize: 14,
  color: colors.textMuted,
  background: "transparent",
  border: `1px solid ${colors.notStarted}`,
  borderRadius: radius.md,
  padding: "10px 20px",
  cursor: "pointer",
};

const ResetSection: React.FC = () => {
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <div
      style={{
        borderTop: `1px solid ${colors.notStarted}`,
        paddingTop: spacing.xl,
        marginTop: spacing.xl,
      }}
    >
      {!confirmReset ? (
        <button onClick={() => setConfirmReset(true)} style={secondaryButton}>
          Reset all progress
        </button>
      ) : (
        <div style={{ display: "flex", gap: spacing.md, alignItems: "center" }}>
          <span
            style={{ fontFamily: font.body, fontSize: 14, color: colors.wrong }}
          >
            This will erase all progress. Are you sure?
          </span>
          <button
            onClick={() => {
              resetAll();
              setConfirmReset(false);
              window.location.reload();
            }}
            style={{
              fontFamily: font.mono,
              fontSize: 14,
              color: "#fff",
              background: colors.wrong,
              border: "none",
              borderRadius: radius.md,
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Yes, reset
          </button>
          <button onClick={() => setConfirmReset(false)} style={secondaryButton}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

const RankHeader: React.FC<{
  mobile: boolean;
  belt: ReturnType<typeof getCurrentBelt>;
}> = ({ mobile, belt }) => (
  <div
    style={{
      display: "flex",
      flexDirection: mobile ? "column" : "row",
      alignItems: "center",
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
);

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
      <RankHeader mobile={mobile} belt={belt} />

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
        {BELTS.map((b) => (
          <BeltCard
            key={b.id}
            belt={b}
            currentBeltId={belt.id}
            masteredCount={masteredCount}
          />
        ))}
      </div>

      {/* Card grid by belt */}
      <h2 style={sectionTitle}>All Cards</h2>
      {BELT_ORDER.map((beltId) => (
        <BeltCardGroup key={beltId} beltId={beltId} records={records} />
      ))}

      <ResetSection />
    </div>
  );
};

const sectionTitle: React.CSSProperties = {
  fontFamily: font.mono,
  fontSize: 28,
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
