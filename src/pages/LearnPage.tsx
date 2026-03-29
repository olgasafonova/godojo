import { useState, useEffect } from "react";
import type { Belt } from "../data/types";
import { BELTS } from "../data/belts";
import { getLessonByBelt } from "../data/lessons";
import { Gopher } from "../components/Gopher";
import { CodeBlock } from "../components/CodeBlock";
import { colors, font, radius, spacing } from "../styles/tokens";
import { useIsMobile } from "../utils/useMediaQuery";
import { asset } from "../utils/basePath";

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
  const [step, setStep] = useState(0);

  const lesson = getLessonByBelt(selectedBelt);

  // Total steps: intro + sections + gotchas + summary
  const totalSteps = 1 + lesson.sections.length + 1 + 1;
  const progress = ((step + 1) / totalSteps) * 100;

  const goNext = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));
  const isFirst = step === 0;
  const isLast = step === totalSteps - 1;

  // Scroll to top of card on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, selectedBelt]);

  const changeBelt = (belt: Belt) => {
    setSelectedBelt(belt);
    setStep(0);
  };

  // Map step index to content
  const renderCard = () => {
    // Step 0: Intro
    if (step === 0) {
      return (
        <div>
          <img
            src={asset(lesson.conceptImage)}
            alt={lesson.title}
            style={{
              width: mobile ? 200 : 260,
              height: mobile ? 200 : 260,
              objectFit: "contain",
              marginBottom: spacing.lg,
            }}
          />
          <h1
            style={{
              fontFamily: font.mono,
              fontSize: mobile ? 28 : 36,
              fontWeight: font.weightBold,
              color: colors.text,
              marginBottom: spacing.md,
            }}
          >
            {lesson.title}
          </h1>
          <p
            style={{
              fontFamily: font.body,
              fontSize: 18,
              color: colors.textMuted,
              lineHeight: 1.7,
            }}
          >
            {lesson.intro}
          </p>
        </div>
      );
    }

    // Steps 1..N: Sections
    const sectionIndex = step - 1;
    if (sectionIndex < lesson.sections.length) {
      const section = lesson.sections[sectionIndex];
      const cardImage = section.image;

      return (
        <div>
          {/* Illustration + title */}
          <div
            style={{
              display: "flex",
              flexDirection: mobile ? "column" : "row",
              alignItems: "flex-start",
              gap: spacing.lg,
              marginBottom: spacing.xl,
            }}
          >
            {cardImage && (
              <img
                src={asset(cardImage)}
                alt={section.title}
                style={{
                  width: mobile ? 160 : 180,
                  height: mobile ? 160 : 180,
                  objectFit: "contain",
                  flexShrink: 0,
                }}
              />
            )}
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontFamily: font.mono,
                  fontSize: mobile ? 24 : 30,
                  fontWeight: font.weightBold,
                  color: colors.text,
                  marginBottom: spacing.md,
                }}
              >
                {section.title}
              </h2>
              <p
                style={{
                  fontFamily: font.body,
                  fontSize: 18,
                  color: colors.textMuted,
                  lineHeight: 1.7,
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
              <p
                style={{
                  fontFamily: font.mono,
                  fontSize: 14,
                  color: colors.textMuted,
                  marginTop: spacing.sm,
                }}
              >
                {ex.caption}
              </p>
            </div>
          ))}

          {/* Insight */}
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
                    fontSize: 14,
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
                    fontSize: 18,
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
    }

    // Gotchas step
    if (sectionIndex === lesson.sections.length) {
      return (
        <div>
          <div style={{ marginBottom: spacing.xl }}>
            <Gopher mood="encouraging" size={mobile ? 160 : 200} />
            <h2
              style={{
                fontFamily: font.mono,
                fontSize: mobile ? 24 : 30,
                fontWeight: font.weightBold,
                color: colors.wrong,
                marginTop: spacing.md,
                marginBottom: spacing.sm,
              }}
            >
              Watch out!
            </h2>
            <p
              style={{
                fontFamily: font.body,
                fontSize: 18,
                color: colors.textMuted,
              }}
            >
              Common mistakes to avoid with{" "}
              {BELT_TOPICS[selectedBelt].toLowerCase()}.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: spacing.lg,
            }}
          >
            {lesson.gotchas.map((g, i) => (
              <p
                key={i}
                style={{
                  fontFamily: font.body,
                  fontSize: 18,
                  color: colors.text,
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {g}
              </p>
            ))}
          </div>
        </div>
      );
    }

    // Summary / CTA (last step)
    const beltIndex = BELTS.findIndex((b) => b.id === selectedBelt);
    const hasNextBelt = beltIndex < BELTS.length - 1;
    const nextBelt = hasNextBelt ? BELTS[beltIndex + 1] : null;

    return (
      <div>
        <Gopher mood="celebrating" size={mobile ? 180 : 240} />
        <h2
          style={{
            fontFamily: font.mono,
            fontSize: mobile ? 24 : 30,
            fontWeight: font.weightBold,
            color: colors.mastered,
            marginTop: spacing.lg,
            marginBottom: spacing.md,
          }}
        >
          Lesson complete!
        </h2>
        <p
          style={{
            fontFamily: font.body,
            fontSize: 18,
            color: colors.textMuted,
            lineHeight: 1.7,
            marginBottom: spacing.xl,
          }}
        >
          {lesson.summary}
        </p>
        <div
          style={{
            display: "flex",
            gap: spacing.md,
            flexWrap: "wrap",
          }}
        >
          {nextBelt && (
            <button
              onClick={() => changeBelt(nextBelt.id)}
              style={{
                fontFamily: font.mono,
                fontSize: 18,
                fontWeight: font.weightMedium,
                color: colors.bg,
                background: colors.accent,
                border: "none",
                borderRadius: radius.md,
                padding: "14px 36px",
                cursor: "pointer",
              }}
            >
              Next: {BELT_TOPICS[nextBelt.id]}
            </button>
          )}
          <button
            onClick={() => onNavigate("quiz")}
            style={{
              fontFamily: font.mono,
              fontSize: 18,
              fontWeight: font.weightMedium,
              color: colors.accent,
              background: "transparent",
              border: `2px solid ${colors.accent}`,
              borderRadius: radius.md,
              padding: "12px 36px",
              cursor: "pointer",
            }}
          >
            Train
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: mobile
          ? `${spacing.md}px ${spacing.sm}px`
          : `${spacing.xl}px ${spacing.md}px`,
        display: "flex",
        flexDirection: "column",
        minHeight: "85vh",
      }}
    >
      {/* Belt selector */}
      <div
        style={{
          display: "flex",
          gap: mobile ? spacing.xs : spacing.sm,
          marginBottom: spacing.lg,
          flexWrap: "wrap",
        }}
      >
        {BELTS.map((b) => {
          const isSelected = b.id === selectedBelt;
          return (
            <button
              key={b.id}
              onClick={() => changeBelt(b.id)}
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

      {/* Progress bar */}
      <div
        style={{
          width: "100%",
          height: 6,
          background: colors.notStarted,
          borderRadius: 3,
          marginBottom: spacing.xl,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: colors.accent,
            borderRadius: 3,
            transition: "width 0.3s ease",
          }}
        />
      </div>

      {/* Card content */}
      <div
        style={{
          background: colors.bgCard,
          borderRadius: radius.lg,
          padding: mobile ? spacing.lg : spacing.xl,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ flex: 1 }}>{renderCard()}</div>

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: spacing.xl,
            gap: spacing.md,
          }}
        >
          <button
            onClick={goBack}
            disabled={isFirst}
            style={{
              fontFamily: font.mono,
              fontSize: 16,
              color: isFirst ? colors.notStarted : colors.accent,
              background: "transparent",
              border: `2px solid ${isFirst ? colors.notStarted : colors.accent}`,
              borderRadius: radius.md,
              padding: "12px 28px",
              cursor: isFirst ? "default" : "pointer",
              transition: "all 0.2s",
            }}
          >
            Back
          </button>

          <span
            style={{
              fontFamily: font.mono,
              fontSize: 14,
              color: colors.textMuted,
            }}
          >
            {step + 1} / {totalSteps}
          </span>

          {!isLast ? (
            <button
              onClick={goNext}
              style={{
                fontFamily: font.mono,
                fontSize: 16,
                fontWeight: font.weightMedium,
                color: colors.bg,
                background: colors.accent,
                border: "none",
                borderRadius: radius.md,
                padding: "12px 28px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              Next
            </button>
          ) : (
            <div style={{ width: 90 }} />
          )}
        </div>
      </div>
    </div>
  );
};
