import { Gopher } from "../components/Gopher";
import { colors, font, radius, spacing } from "../styles/tokens";
import { useIsMobile } from "../utils/useMediaQuery";
import { asset } from "../utils/basePath";

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const mobile = useIsMobile();
  return (
    <div
      style={{
        maxWidth: 860,
        margin: "0 auto",
        padding: mobile
          ? `${spacing.lg}px ${spacing.md}px`
          : `${spacing.xl}px ${spacing.md}px`,
      }}
    >
      {/* Hero */}
      <div style={styles.hero}>
        <Gopher mood="celebrating" size={mobile ? 140 : 180} />
        <h1 style={{ ...styles.title, fontSize: mobile ? 28 : 36 }}>
          About Go Dojo
        </h1>
        <p style={styles.tagline}>
          A flashcard dojo for Go, powered by spaced repetition and tiny gophers
        </p>
      </div>

      {/* Feature cards grid */}
      <div style={styles.grid}>
        {[
          {
            img: "k05",
            alt: "Gopher with timer",
            title: "Spaced repetition",
            text: "The SM-2 algorithm schedules each card at the optimal moment. Get it right and the interval grows. Get it wrong and it bounces back. You spend time on what you don't know yet.",
          },
          {
            img: "g07",
            alt: "Gopher chef",
            title: "Visual metaphors",
            text: "Every concept gets a gopher illustration. Slices become sushi rolls. Channels become pipes. Your brain remembers images better than definitions, so the pictures act as memory anchors.",
          },
          {
            img: "br10",
            alt: "Three gophers numbered 1-2-3",
            title: "Six belts, 60 cards",
            text: 'From "Hello World" to reflection and unsafe. White belt covers variables and loops. Black belt covers generics, context cancellation, and build tags. Progress is saved in your browser.',
          },
          {
            img: "b08",
            alt: "Gopher with formula",
            title: "10 cards per session",
            text: "Short sessions that fit between meetings. Due reviews come first, then new concepts. Keyboard shortcuts (1-4 to answer, Enter to continue) keep things fast.",
          },
        ].map((c) => (
          <div
            key={c.img}
            style={{
              ...styles.card,
              flexDirection: mobile ? "column" : "row",
            }}
          >
            <div style={styles.cardIcon}>
              <img
                src={asset(`concepts/${c.img}.png`)}
                alt={c.alt}
                style={styles.cardImg}
              />
            </div>
            <div>
              <h3 style={styles.cardTitle}>{c.title}</h3>
              <p style={styles.cardText}>{c.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Illustration showcase */}
      <div style={styles.showcase}>
        <h2 style={styles.sectionTitle}>Why the illustrations?</h2>
        <div style={styles.illustrationStrip}>
          {["w01", "br07", "g07", "k09", "y06", "b06"].map((id) => (
            <img
              key={id}
              src={asset(`concepts/${id}.png`)}
              alt={`Concept illustration ${id}`}
              style={styles.stripImg}
            />
          ))}
        </div>
        <p style={styles.text}>
          Abstract programming concepts are hard to remember from text alone.
          When you see a gopher holding a jar with a label, "typed container for
          a value" sticks. When two gophers pass things through copper pipes,
          channels make sense. The illustrations give the spaced repetition
          algorithm something richer to reinforce than dry quiz answers.
        </p>
      </div>

      {/* Tech stack */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Built with</h2>
        <div style={styles.techRow}>
          {[
            "React 19",
            "TypeScript",
            "Vite",
            "Shiki",
            "SM-2",
            "Web Audio API",
            "Claude Code",
            "GitHub Pages",
          ].map((t) => (
            <span key={t} style={styles.techPill}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Wait, why TypeScript? */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          Wait, why is a Go app built in TypeScript?
        </h2>
        <p style={styles.text}>
          Yes, we built a Go learning tool in TypeScript. We are aware of the
          irony. In our defense, this fits a pattern: Olga also built{" "}
          <a
            href="https://getskillcheck.com"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.inlineLink}
          >
            SkillCheck
          </a>
          , an agentic skill that checks agentic skills. Meta is the brand at
          this point.
        </p>
      </div>

      {/* Credits */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Who made this?</h2>
        <p style={styles.text}>
          Built by Olga Safonova as a learning project while picking up Go.
          Concept illustrations generated with AI and cleaned up for transparent
          backgrounds. The gopher mascot follows the tradition of the Go gopher
          by Renee French.
        </p>
        <div style={styles.linkRow}>
          <a
            href="https://github.com/olgasafonova/godojo"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.extLink}
          >
            Source on GitHub
          </a>
        </div>
      </div>

      {/* CTA */}
      <div style={styles.cta}>
        <p style={styles.ctaText}>Ready to train?</p>
        <div style={styles.ctaButtons}>
          <button onClick={() => onNavigate("learn")} style={styles.ctaPrimary}>
            Start learning
          </button>
          <button
            onClick={() => onNavigate("quiz")}
            style={styles.ctaSecondary}
          >
            Jump to quiz
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  hero: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: spacing.xxl,
  },
  title: {
    fontFamily: font.mono,
    fontSize: 36,
    fontWeight: font.weightBold,
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  tagline: {
    fontFamily: font.body,
    fontSize: 19,
    color: colors.textMuted,
    lineHeight: 1.5,
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  card: {
    background: colors.bgCard,
    borderRadius: radius.lg,
    padding: spacing.lg,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.lg,
    textAlign: "left",
    minWidth: 0,
  },
  cardIcon: {
    flexShrink: 0,
  },
  cardImg: {
    width: 120,
    height: 120,
    objectFit: "contain",
    maxWidth: "100%",
  },
  cardTitle: {
    fontFamily: font.mono,
    fontSize: 18,
    fontWeight: font.weightBold,
    color: colors.accent,
    marginBottom: spacing.sm,
  },
  cardText: {
    fontFamily: font.body,
    fontSize: 17,
    color: colors.textMuted,
    lineHeight: 1.6,
  },
  showcase: {
    marginBottom: spacing.xxl,
  },
  sectionTitle: {
    fontFamily: font.mono,
    fontSize: 22,
    fontWeight: font.weightBold,
    color: colors.accent,
    marginBottom: spacing.lg,
    textAlign: "left",
    wordBreak: "break-word",
  },
  illustrationStrip: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  stripImg: {
    width: "100%",
    aspectRatio: "1",
    objectFit: "contain",
    borderRadius: radius.lg,
    background: colors.bgCard,
    padding: spacing.sm,
  },
  text: {
    fontFamily: font.body,
    fontSize: 19,
    color: colors.text,
    lineHeight: 1.7,
    marginBottom: spacing.md,
    textAlign: "left",
  },
  section: {
    marginBottom: spacing.xxl,
  },
  techRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  techPill: {
    fontFamily: font.mono,
    fontSize: 14,
    color: colors.textMuted,
    background: colors.bgCard,
    padding: "8px 16px",
    borderRadius: 20,
  },
  linkRow: {
    marginTop: spacing.md,
  },
  inlineLink: {
    color: colors.accent,
    textDecoration: "none",
    borderBottom: `1px solid ${colors.accent}`,
    paddingBottom: 1,
  },
  extLink: {
    fontFamily: font.mono,
    fontSize: 15,
    color: colors.accent,
    textDecoration: "none",
    borderBottom: `1px solid ${colors.accent}`,
    paddingBottom: 2,
  },
  cta: {
    padding: `${spacing.xl}px 0`,
    marginBottom: spacing.xl,
    borderTop: `1px solid ${colors.notStarted}`,
  },
  ctaText: {
    fontFamily: font.mono,
    fontSize: 22,
    fontWeight: font.weightBold,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  ctaButtons: {
    display: "flex",
    gap: spacing.md,
    flexWrap: "wrap",
  },
  ctaPrimary: {
    fontFamily: font.mono,
    fontSize: 16,
    fontWeight: font.weightMedium,
    color: colors.bg,
    background: colors.accent,
    border: "none",
    borderRadius: radius.md,
    padding: "14px 32px",
    cursor: "pointer",
  },
  ctaSecondary: {
    fontFamily: font.mono,
    fontSize: 16,
    fontWeight: font.weightMedium,
    color: colors.accent,
    background: "transparent",
    border: `2px solid ${colors.accent}`,
    borderRadius: radius.md,
    padding: "12px 28px",
    cursor: "pointer",
  },
};
