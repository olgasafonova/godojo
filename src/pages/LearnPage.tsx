import { useState } from "react";
import type { Belt } from "../data/types";
import { BELTS } from "../data/belts";
import { getLessonByBelt } from "../data/lessons";
import type { LessonSection } from "../data/lessons";
import { cards } from "../data/cards";
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
  const lesson = getLessonByBelt(selectedBelt);

  // Get concept images for this belt's cards to sprinkle throughout sections
  const beltCards = cards.filter((c) => c.belt === selectedBelt);

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: mobile
          ? `${spacing.md}px ${spacing.sm}px`
          : `${spacing.xl}px ${spacing.md}px`,
      }}
    >
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
          return (
            <button
              key={b.id}
              onClick={() => setSelectedBelt(b.id)}
              style={{
                fontFamily: font.mono,
                fontSize: mobile ? 14 : 16,
                fontWeight: isSelected ? font.weightBold : font.weightRegular,
                color: isSelected ? colors.bg : colors.text,
                background: isSelected ? b.color : colors.bgCard,
                border: isSelected
                  ? `2px solid ${b.color}`
                  : `2px solid ${colors.notStarted}`,
                borderRadius: 24,
                padding: mobile ? "8px 14px" : "10px 20px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {BELT_TOPICS[b.id]}
            </button>
          );
        })}
      </div>

      {/* Lesson hero */}
      <div
        style={{
          background: colors.bgCard,
          borderRadius: radius.lg,
          padding: mobile ? spacing.lg : spacing.xl,
          marginBottom: spacing.xl,
          display: "flex",
          flexDirection: mobile ? "column" : "row",
          alignItems: "center",
          gap: spacing.lg,
        }}
      >
        <img
          src={lesson.conceptImage}
          alt={lesson.title}
          style={{
            width: mobile ? 160 : 200,
            height: mobile ? 160 : 200,
            objectFit: "contain",
            flexShrink: 0,
          }}
        />
        <div style={{ textAlign: mobile ? "center" : "left" }}>
          <h1
            style={{
              fontFamily: font.mono,
              fontSize: mobile ? 26 : 34,
              fontWeight: font.weightBold,
              color: colors.text,
              marginBottom: spacing.sm,
            }}
          >
            {lesson.title}
          </h1>
          <p
            style={{
              fontFamily: font.body,
              fontSize: 18,
              color: colors.textMuted,
              lineHeight: 1.6,
            }}
          >
            {lesson.intro}
          </p>
          <div
            style={{
              display: "flex",
              gap: spacing.sm,
              marginTop: spacing.md,
              justifyContent: mobile ? "center" : "flex-start",
            }}
          >
            {lesson.sections.map((_, i) => (
              <div
                key={i}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: colors.accent,
                  opacity: 0.3 + (i / lesson.sections.length) * 0.7,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lesson sections as visual cards */}
      {lesson.sections.map((section, i) => (
        <SectionCard
          key={i}
          section={section}
          index={i}
          mobile={mobile}
          image={beltCards[i]?.conceptImage ?? beltCards[0]?.conceptImage ?? ""}
          secondaryImage={beltCards[i + lesson.sections.length]?.conceptImage}
        />
      ))}

      {/* Gotchas card */}
      <div
        style={{
          background: colors.bgCard,
          borderRadius: radius.lg,
          padding: mobile ? spacing.lg : spacing.xl,
          marginBottom: spacing.lg,
          borderLeft: `4px solid ${colors.wrong}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: spacing.md,
            marginBottom: spacing.lg,
          }}
        >
          <Gopher mood="encouraging" size={mobile ? 80 : 100} />
          <h3
            style={{
              fontFamily: font.mono,
              fontSize: mobile ? 20 : 24,
              color: colors.wrong,
            }}
          >
            Watch out!
          </h3>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: spacing.md,
          }}
        >
          {lesson.gotchas.map((g, i) => (
            <div
              key={i}
              style={{
                background: `${colors.wrong}08`,
                border: `1px solid ${colors.wrong}20`,
                borderRadius: radius.md,
                padding: `${spacing.md}px ${spacing.lg}px`,
                fontFamily: font.body,
                fontSize: 17,
                color: colors.text,
                lineHeight: 1.6,
              }}
            >
              {g}
            </div>
          ))}
        </div>
      </div>

      {/* Summary card */}
      <div
        style={{
          background: colors.bgCard,
          borderRadius: radius.lg,
          padding: mobile ? spacing.lg : spacing.xl,
          marginBottom: spacing.lg,
          borderLeft: `4px solid ${colors.accent}`,
        }}
      >
        <div
          style={{
            fontFamily: font.mono,
            fontSize: 14,
            color: colors.accent,
            textTransform: "uppercase",
            letterSpacing: 1.5,
            marginBottom: spacing.sm,
          }}
        >
          Key Takeaway
        </div>
        <p
          style={{
            fontFamily: font.body,
            fontSize: 19,
            color: colors.text,
            lineHeight: 1.7,
          }}
        >
          {lesson.summary}
        </p>
      </div>

      {/* Quiz CTA */}
      <div
        style={{
          padding: mobile ? spacing.lg : spacing.xl,
          background: `${colors.mastered}10`,
          border: `1px solid ${colors.mastered}30`,
          borderRadius: radius.lg,
          display: "flex",
          alignItems: "center",
          gap: spacing.lg,
          flexDirection: mobile ? "column" : "row",
          marginBottom: spacing.xxl,
        }}
      >
        <Gopher mood="celebrating" size={mobile ? 100 : 130} />
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
            Quiz time! Lock in what you just learned with spaced repetition.
          </div>
        </div>
        <button
          onClick={() => onNavigate("quiz")}
          style={{
            fontFamily: font.mono,
            fontSize: 16,
            fontWeight: font.weightMedium,
            color: colors.bg,
            background: colors.mastered,
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

const SectionCard: React.FC<{
  section: LessonSection;
  index: number;
  mobile: boolean;
  image: string;
  secondaryImage?: string;
}> = ({ section, index, mobile, image, secondaryImage }) => {
  const imageOnLeft = index % 2 === 0;

  return (
    <div
      style={{
        background: colors.bgCard,
        borderRadius: radius.lg,
        padding: mobile ? spacing.lg : spacing.xl,
        marginBottom: spacing.lg,
      }}
    >
      {/* Header with image */}
      <div
        style={{
          display: "flex",
          flexDirection: mobile
            ? "column"
            : imageOnLeft
              ? "row"
              : "row-reverse",
          alignItems: mobile ? "center" : "flex-start",
          gap: spacing.lg,
          marginBottom: spacing.lg,
        }}
      >
        <img
          src={image}
          alt={section.title}
          style={{
            width: mobile ? 140 : 160,
            height: mobile ? 140 : 160,
            objectFit: "contain",
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1, textAlign: mobile ? "center" : "left" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: spacing.sm,
              marginBottom: spacing.sm,
              justifyContent: mobile ? "center" : "flex-start",
            }}
          >
            <span
              style={{
                fontFamily: font.mono,
                fontSize: 13,
                color: colors.accent,
                background: `${colors.accent}15`,
                padding: "3px 10px",
                borderRadius: 12,
              }}
            >
              {index + 1}
            </span>
          </div>
          <h2
            style={{
              fontFamily: font.mono,
              fontSize: mobile ? 22 : 26,
              fontWeight: font.weightBold,
              color: colors.text,
              marginBottom: spacing.sm,
            }}
          >
            {section.title}
          </h2>
          <p
            style={{
              fontFamily: font.body,
              fontSize: 17,
              color: colors.textMuted,
              lineHeight: 1.6,
            }}
          >
            {section.body}
          </p>
        </div>
      </div>

      {/* Code examples */}
      {section.examples.map((ex, i) => (
        <div key={i} style={{ marginBottom: spacing.lg }}>
          <CodeBlock code={ex.code} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: spacing.sm,
              marginTop: spacing.sm,
            }}
          >
            {secondaryImage && i === 0 && (
              <img
                src={secondaryImage}
                alt=""
                style={{
                  width: 48,
                  height: 48,
                  objectFit: "contain",
                  flexShrink: 0,
                  opacity: 0.8,
                }}
              />
            )}
            <p
              style={{
                fontFamily: font.body,
                fontSize: 15,
                fontStyle: "italic",
                color: colors.textMuted,
                flex: 1,
              }}
            >
              {ex.caption}
            </p>
          </div>
        </div>
      ))}

      {/* Insight callout */}
      {section.insight && (
        <div
          style={{
            background: `${colors.accent}08`,
            border: `1px solid ${colors.accent}20`,
            borderRadius: radius.md,
            padding: `${spacing.md}px ${spacing.lg}px`,
            display: "flex",
            alignItems: "flex-start",
            gap: spacing.md,
          }}
        >
          <Gopher mood="thinking" size={56} />
          <div>
            <span
              style={{
                fontFamily: font.mono,
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                color: colors.accent,
                display: "block",
                marginBottom: spacing.xs,
              }}
            >
              Good to know
            </span>
            <p
              style={{
                fontFamily: font.body,
                fontSize: 16,
                color: colors.text,
                lineHeight: 1.6,
              }}
            >
              {section.insight}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
