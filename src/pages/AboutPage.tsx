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
          A flashcard dojo for Go, powered by spaced repetition and small
          determined gophers
        </p>
      </div>

      {/* Feature cards */}
      <div style={styles.grid}>
        {[
          {
            img: "k05",
            alt: "Gopher with timer",
            title: "Spaced repetition",
            text: "The SM-2 algorithm decides when you see each card again. Get it right and it recedes into the distance. Get it wrong and it reappears the next morning like a cat you forgot to feed.",
          },
          {
            img: "g07",
            alt: "Gopher chef",
            title: "Visual metaphors",
            text: "Every concept gets a gopher doing something concrete. Slices become sushi rolls. Channels become copper pipes. The brain is a deeply visual organ; it will hold onto a picture of a gopher holding a jar long after a paragraph of documentation has evaporated.",
          },
          {
            img: "br10",
            alt: "Three gophers numbered 1-2-3",
            title: "Six belts, 60 cards",
            text: "White belt starts with variables and for-loops. Black belt ends with reflection, unsafe pointers, and build tags. The progression is steep on purpose. Comfortable learning is an oxymoron.",
          },
          {
            img: "b08",
            alt: "Gopher with formula",
            title: "10 cards per session",
            text: "Short enough to fit between meetings. Due reviews come first, then new material. Press 1-4 to answer, Enter to continue. No mouse required.",
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
                style={{
                  ...styles.cardImg,
                  width: mobile ? 100 : 140,
                  height: mobile ? 100 : 140,
                }}
              />
            </div>
            <div style={{ minWidth: 0 }}>
              <h3 style={styles.cardTitle}>{c.title}</h3>
              <p style={styles.cardText}>{c.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Illustration showcase */}
      <div style={styles.showcase}>
        <h2 style={styles.sectionTitle}>Why the illustrations?</h2>
        <div style={styles.illustrationGrid}>
          {["w01", "br07", "g07", "k09", "y06", "b06"].map((id) => (
            <img
              key={id}
              src={asset(`concepts/${id}.png`)}
              alt={`Concept illustration ${id}`}
              style={styles.gridImg}
            />
          ))}
        </div>
        <p style={styles.text}>
          Programming concepts are abstract by nature. A goroutine is not a
          thing you can point at. An interface has no shape. The illustrations
          give each idea a physical form, something the spaced repetition
          algorithm can actually sink its teeth into. A gopher passing a message
          through a pipe is harder to forget than "channels provide a mechanism
          for concurrently executing functions to communicate."
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
          A fair question. The answer is that this is a learning tool, not a Go
          program, and React happens to be good at the kind of interactive
          card-flipping UI this requires. The irony is not lost on us. Olga also
          built{" "}
          <a
            href="https://getskillcheck.com"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.inlineLink}
          >
            SkillCheck
          </a>
          , an agentic skill whose sole purpose is to validate other agentic
          skills. Meta is the house style at this point.
        </p>
      </div>

      {/* Credits */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Who made this?</h2>
        <p style={styles.text}>
          Built by Olga Safonova while learning Go. The concept illustrations
          were generated with AI and cleaned up for transparent backgrounds. The
          gopher mascot follows the tradition established by Renee French, who
          deserves credit for making a rodent the most recognizable thing in
          systems programming.
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
    fontSize: 18,
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
    objectFit: "contain",
    maxWidth: "100%",
  },
  cardTitle: {
    fontFamily: font.mono,
    fontSize: 19,
    fontWeight: font.weightBold,
    color: colors.accent,
    marginBottom: spacing.sm,
  },
  cardText: {
    fontFamily: font.body,
    fontSize: 18,
    color: colors.textMuted,
    lineHeight: 1.6,
  },
  showcase: {
    marginBottom: spacing.xxl,
  },
  sectionTitle: {
    fontFamily: font.mono,
    fontSize: 24,
    fontWeight: font.weightBold,
    color: colors.accent,
    marginBottom: spacing.lg,
    textAlign: "left",
    wordBreak: "break-word",
  },
  illustrationGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  gridImg: {
    width: "100%",
    aspectRatio: "1",
    objectFit: "contain",
    borderRadius: radius.lg,
    background: colors.bgCard,
    padding: spacing.sm,
  },
  text: {
    fontFamily: font.body,
    fontSize: 18,
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
    fontSize: 16,
    color: colors.textMuted,
    background: colors.bgCard,
    padding: "10px 18px",
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
    fontSize: 16,
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
    fontSize: 24,
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
    fontSize: 18,
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
    fontSize: 18,
    fontWeight: font.weightMedium,
    color: colors.accent,
    background: "transparent",
    border: `2px solid ${colors.accent}`,
    borderRadius: radius.md,
    padding: "12px 28px",
    cursor: "pointer",
  },
};
