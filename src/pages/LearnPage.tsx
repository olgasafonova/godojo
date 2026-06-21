import { useState } from "react";
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

type Lesson = ReturnType<typeof getLessonByBelt>;
type LessonSection = Lesson["sections"][number];

const IntroCard: React.FC<{ mobile: boolean; lesson: Lesson }> = ({
  mobile,
  lesson,
}) => (
  <div>
    <div
      style={{
        width: mobile ? 200 : 260,
        height: mobile ? 200 : 260,
        marginBottom: spacing.lg,
        flexShrink: 0,
      }}
    >
      <img
        src={asset(lesson.conceptImage)}
        alt={lesson.title}
        width={mobile ? 200 : 260}
        height={mobile ? 200 : 260}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </div>
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

const SectionInsight: React.FC<{ insight: string }> = ({ insight }) => (
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
        {insight}
      </p>
    </div>
  </div>
);

const SectionCard: React.FC<{ mobile: boolean; section: LessonSection }> = ({
  mobile,
  section,
}) => (
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
      {section.image && (
        <div
          style={{
            width: mobile ? 160 : 180,
            height: mobile ? 160 : 180,
            flexShrink: 0,
          }}
        >
          <img
            src={asset(section.image)}
            alt={section.title}
            width={mobile ? 160 : 180}
            height={mobile ? 160 : 180}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
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

    {section.insight && <SectionInsight insight={section.insight} />}
  </div>
);

const GotchasCard: React.FC<{
  mobile: boolean;
  lesson: Lesson;
  topic: string;
}> = ({ mobile, lesson, topic }) => (
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
      <p style={{ fontFamily: font.body, fontSize: 18, color: colors.textMuted }}>
        Common mistakes to avoid with {topic.toLowerCase()}.
      </p>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: spacing.lg }}>
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

const SummaryCard: React.FC<{
  mobile: boolean;
  lesson: Lesson;
  selectedBelt: Belt;
  onChangeBelt: (belt: Belt) => void;
  onNavigate: (page: string) => void;
}> = ({ mobile, lesson, selectedBelt, onChangeBelt, onNavigate }) => {
  const beltIndex = BELTS.findIndex((b) => b.id === selectedBelt);
  const nextBelt = beltIndex < BELTS.length - 1 ? BELTS[beltIndex + 1] : null;

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
      <div style={{ display: "flex", gap: spacing.md, flexWrap: "wrap" }}>
        {nextBelt && (
          <button
            onClick={() => onChangeBelt(nextBelt.id)}
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

interface LessonCardProps {
  step: number;
  mobile: boolean;
  lesson: Lesson;
  selectedBelt: Belt;
  onChangeBelt: (belt: Belt) => void;
  onNavigate: (page: string) => void;
}

const LessonCard: React.FC<LessonCardProps> = ({
  step,
  mobile,
  lesson,
  selectedBelt,
  onChangeBelt,
  onNavigate,
}) => {
  if (step === 0) {
    return <IntroCard mobile={mobile} lesson={lesson} />;
  }

  const sectionIndex = step - 1;
  if (sectionIndex < lesson.sections.length) {
    return (
      <SectionCard mobile={mobile} section={lesson.sections[sectionIndex]} />
    );
  }

  if (sectionIndex === lesson.sections.length) {
    return (
      <GotchasCard
        mobile={mobile}
        lesson={lesson}
        topic={BELT_TOPICS[selectedBelt]}
      />
    );
  }

  return (
    <SummaryCard
      mobile={mobile}
      lesson={lesson}
      selectedBelt={selectedBelt}
      onChangeBelt={onChangeBelt}
      onNavigate={onNavigate}
    />
  );
};

const BeltSelector: React.FC<{
  mobile: boolean;
  selectedBelt: Belt;
  onChangeBelt: (belt: Belt) => void;
}> = ({ mobile, selectedBelt, onChangeBelt }) => (
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
          onClick={() => onChangeBelt(b.id)}
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
);

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
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
);

const LessonNav: React.FC<{
  step: number;
  totalSteps: number;
  isFirst: boolean;
  isLast: boolean;
  onBack: () => void;
  onNext: () => void;
}> = ({ step, totalSteps, isFirst, isLast, onBack, onNext }) => (
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
      onClick={onBack}
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

    <span style={{ fontFamily: font.mono, fontSize: 14, color: colors.textMuted }}>
      {step + 1} / {totalSteps}
    </span>

    {!isLast ? (
      <button
        onClick={onNext}
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
);

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

  const changeBelt = (belt: Belt) => {
    setSelectedBelt(belt);
    setStep(0);
  };

  return (
    <>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
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
        <BeltSelector
          mobile={mobile}
          selectedBelt={selectedBelt}
          onChangeBelt={changeBelt}
        />

        <ProgressBar progress={progress} />

        {/* Card content */}
        <div
          style={{
            background: colors.bgCard,
            borderRadius: radius.lg,
            padding: mobile ? spacing.lg : spacing.xl,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            key={`${selectedBelt}-${step}`}
            style={{
              minHeight: mobile ? 400 : 460,
              animation: "fadeIn 0.3s ease",
            }}
          >
            <LessonCard
              step={step}
              mobile={mobile}
              lesson={lesson}
              selectedBelt={selectedBelt}
              onChangeBelt={changeBelt}
              onNavigate={onNavigate}
            />
          </div>

          <LessonNav
            step={step}
            totalSteps={totalSteps}
            isFirst={step === 0}
            isLast={step === totalSteps - 1}
            onBack={goBack}
            onNext={goNext}
          />
        </div>
      </div>
    </>
  );
};
