import { useState } from "react";
import type { Belt, GoCard } from "../data/types";
import { cards } from "../data/cards";
import { BELTS, getCurrentBelt } from "../data/belts";
import { getAllRecords, getMasteredCount } from "../store/progress";
import { isMastered } from "../srs/sm2";
import { Gopher } from "../components/Gopher";
import { CodeBlock } from "../components/CodeBlock";
import { colors, font, radius, spacing } from "../styles/tokens";
import { useIsMobile } from "../utils/useMediaQuery";

const BELT_TOPICS: Record<Belt, string> = {
  white: "Basics",
  yellow: "Control Flow",
  green: "Data Structures",
  blue: "Interfaces & Errors",
  brown: "Concurrency",
  black: "Advanced",
};

interface LearnPageProps {
  onNavigate: (page: string) => void;
}

export const LearnPage: React.FC<LearnPageProps> = ({ onNavigate }) => {
  const mobile = useIsMobile();
  const [selectedBelt, setSelectedBelt] = useState<Belt>("white");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const records = getAllRecords();
  const masteredCount = getMasteredCount();
  const currentBelt = getCurrentBelt(masteredCount);

  const beltCards = cards.filter((c) => c.belt === selectedBelt);

  return (
    <div
      style={{
        maxWidth: 860,
        margin: "0 auto",
        padding: mobile
          ? `${spacing.md}px ${spacing.sm}px`
          : `${spacing.xl}px ${spacing.md}px`,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: spacing.lg,
          marginBottom: spacing.xl,
        }}
      >
        <Gopher mood="thinking" size={mobile ? 100 : 130} />
        <div>
          <h1
            style={{
              fontFamily: font.mono,
              fontSize: mobile ? 28 : 36,
              fontWeight: font.weightBold,
              color: colors.text,
              marginBottom: spacing.xs,
            }}
          >
            Learn Go
          </h1>
          <p
            style={{
              fontFamily: font.body,
              fontSize: 18,
              color: colors.textMuted,
              lineHeight: 1.5,
            }}
          >
            Study concepts before you quiz. Tap a card to read the explanation
            and see example code.
          </p>
        </div>
      </div>

      {/* Belt selector */}
      <div
        style={{
          display: "flex",
          gap: mobile ? spacing.xs : spacing.sm,
          marginBottom: spacing.xl,
          flexWrap: "wrap",
        }}
      >
        {BELTS.map((b) => {
          const isSelected = b.id === selectedBelt;
          const isUnlocked = true; // all belts browsable
          return (
            <button
              key={b.id}
              onClick={() => isUnlocked && setSelectedBelt(b.id)}
              style={{
                fontFamily: font.mono,
                fontSize: 16,
                fontWeight: isSelected ? font.weightBold : font.weightRegular,
                color: isSelected ? colors.bg : colors.text,
                background: isSelected ? b.color : colors.bgCard,
                border: isSelected
                  ? `2px solid ${b.color}`
                  : `2px solid ${colors.notStarted}`,
                borderRadius: 24,
                padding: "10px 20px",
                cursor: isUnlocked ? "pointer" : "default",
                opacity: isUnlocked ? 1 : 0.35,
                transition: "all 0.2s",
              }}
            >
              {BELT_TOPICS[b.id]}
            </button>
          );
        })}
      </div>

      {/* Belt description */}
      <div
        style={{
          fontFamily: font.body,
          fontSize: 16,
          color: colors.textMuted,
          marginBottom: spacing.lg,
        }}
      >
        {beltCards.length} concepts &middot;{" "}
        {
          beltCards.filter((c) => records[c.id] && isMastered(records[c.id]))
            .length
        }{" "}
        mastered
      </div>

      {/* Card list */}
      <div
        style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}
      >
        {beltCards.map((card) => {
          const isExpanded = expandedCard === card.id;
          const rec = records[card.id];
          const cardMastered = rec && isMastered(rec);
          const seen = !!rec;

          return (
            <div key={card.id}>
              {/* Card header (clickable) */}
              <button
                onClick={() => setExpandedCard(isExpanded ? null : card.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: spacing.md,
                  padding: `${spacing.md}px ${spacing.lg}px`,
                  background: isExpanded ? colors.bgCard : colors.bg,
                  border: `1px solid ${isExpanded ? colors.accent : colors.notStarted}`,
                  borderRadius: isExpanded
                    ? `${radius.md}px ${radius.md}px 0 0`
                    : `${radius.md}px`,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s",
                }}
              >
                {/* Status dot */}
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: cardMastered
                      ? colors.mastered
                      : seen
                        ? colors.learning
                        : colors.notStarted,
                    flexShrink: 0,
                  }}
                />

                {/* Type badge */}
                <span
                  style={{
                    fontFamily: font.mono,
                    fontSize: 13,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    color: colors.accent,
                    background: `${colors.accent}15`,
                    padding: "4px 10px",
                    borderRadius: 4,
                    flexShrink: 0,
                  }}
                >
                  {card.type}
                </span>

                {/* Question */}
                <span
                  style={{
                    fontFamily: font.body,
                    fontSize: 19,
                    color: colors.text,
                    flex: 1,
                  }}
                >
                  {card.question}
                </span>

                {/* Expand arrow */}
                <span
                  style={{
                    fontFamily: font.mono,
                    fontSize: 16,
                    color: colors.textMuted,
                    transform: isExpanded ? "rotate(180deg)" : "none",
                    transition: "transform 0.2s",
                  }}
                >
                  v
                </span>
              </button>

              {/* Expanded content */}
              {isExpanded && <CardDetail card={card} mobile={mobile} />}
            </div>
          );
        })}
      </div>

      {/* Quiz CTA */}
      <div
        style={{
          marginTop: spacing.xxl,
          padding: spacing.xl,
          background: colors.bgCard,
          borderRadius: radius.lg,
          display: "flex",
          alignItems: "center",
          gap: spacing.lg,
          flexDirection: mobile ? "column" : "row",
        }}
      >
        <Gopher mood="idle" size={100} />
        <div style={{ flex: 1, textAlign: mobile ? "center" : "left" }}>
          <div
            style={{
              fontFamily: font.mono,
              fontSize: 22,
              fontWeight: font.weightBold,
              color: colors.text,
              marginBottom: spacing.xs,
            }}
          >
            Ready to test yourself?
          </div>
          <div
            style={{
              fontFamily: font.body,
              fontSize: 16,
              color: colors.textMuted,
            }}
          >
            The quiz uses spaced repetition to help you remember what you
            studied.
          </div>
        </div>
        <button
          onClick={() => onNavigate("quiz")}
          style={{
            fontFamily: font.mono,
            fontSize: 16,
            fontWeight: font.weightMedium,
            color: colors.bg,
            background: colors.accent,
            border: "none",
            borderRadius: radius.md,
            padding: "12px 32px",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

const CardDetail: React.FC<{ card: GoCard; mobile: boolean }> = ({
  card,
  mobile,
}) => {
  return (
    <div
      style={{
        background: colors.bgCard,
        border: `1px solid ${colors.accent}`,
        borderTop: "none",
        borderRadius: `0 0 ${radius.md}px ${radius.md}px`,
        padding: mobile ? spacing.md : spacing.xl,
      }}
    >
      {/* Concept illustration */}
      {card.conceptImage && (
        <div
          style={{
            marginBottom: spacing.lg,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={card.conceptImage}
            alt={`Visual metaphor: ${card.question}`}
            style={{
              maxWidth: mobile ? 220 : 300,
              height: "auto",
              borderRadius: radius.md,
            }}
          />
        </div>
      )}

      {/* Code example */}
      {card.code && (
        <div style={{ marginBottom: spacing.lg }}>
          <div
            style={{
              fontFamily: font.mono,
              fontSize: 14,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              color: colors.textMuted,
              marginBottom: spacing.sm,
            }}
          >
            Example
          </div>
          <CodeBlock code={card.code} />
        </div>
      )}

      {/* Explanation */}
      <div style={{ marginBottom: spacing.lg }}>
        <div
          style={{
            fontFamily: font.mono,
            fontSize: 14,
            textTransform: "uppercase",
            letterSpacing: 1.5,
            color: colors.textMuted,
            marginBottom: spacing.sm,
          }}
        >
          Explanation
        </div>
        <p
          style={{
            fontFamily: font.body,
            fontSize: 19,
            color: colors.text,
            lineHeight: 1.7,
          }}
        >
          {card.explanation}
        </p>
      </div>

      {/* Answer reveal */}
      <div
        style={{
          background: `${colors.mastered}15`,
          border: `1px solid ${colors.mastered}40`,
          borderRadius: radius.sm,
          padding: `${spacing.sm}px ${spacing.md}px`,
        }}
      >
        <span
          style={{
            fontFamily: font.mono,
            fontSize: 14,
            textTransform: "uppercase",
            letterSpacing: 1,
            color: colors.mastered,
            marginRight: spacing.sm,
          }}
        >
          Answer:
        </span>
        <span
          style={{
            fontFamily: font.body,
            fontSize: 17,
            color: colors.text,
          }}
        >
          {card.options[card.correct]}
        </span>
      </div>

      {/* Playground link */}
      {card.playgroundUrl && (
        <a
          href={card.playgroundUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            marginTop: spacing.md,
            fontFamily: font.mono,
            fontSize: 15,
            color: colors.accent,
          }}
        >
          Try it in Go Playground
        </a>
      )}
    </div>
  );
};
