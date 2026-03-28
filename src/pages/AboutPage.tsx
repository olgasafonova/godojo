import { Gopher } from "../components/Gopher";
import { colors, font, radius, spacing } from "../styles/tokens";
import { useIsMobile } from "../utils/useMediaQuery";
import { asset } from "../utils/basePath";

export const AboutPage: React.FC = () => {
  const mobile = useIsMobile();

  return (
    <div
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: mobile
          ? `${spacing.lg}px ${spacing.md}px`
          : `${spacing.xl}px ${spacing.md}px`,
      }}
    >
      <div style={styles.hero}>
        <Gopher mood="meditating" size={mobile ? 160 : 200} />
        <h1 style={{ ...styles.title, fontSize: mobile ? 28 : 36 }}>
          About Go Dojo
        </h1>
      </div>

      <section style={styles.section}>
        <h2 style={styles.heading}>What is this?</h2>
        <p style={styles.text}>
          Go Dojo teaches the Go programming language through spaced repetition.
          Instead of reading documentation front to back and forgetting it a
          week later, you learn concepts in small cards and review them at
          increasing intervals. The system tracks what you know and what needs
          practice, so every session focuses on where you need it most.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading}>How it works</h2>
        <p style={styles.text}>
          Each concept is a card with a question and four answers. The app uses
          a spaced repetition algorithm (SM-2) to schedule reviews. Get a card
          right and you won't see it again for a while. Get it wrong and it
          comes back sooner. Over time, knowledge moves from short-term memory
          to long-term retention.
        </p>
        <p style={styles.text}>
          Cards are organized into six belts, from white (basics like variables
          and loops) to black (advanced topics like reflection and unsafe). Your
          belt advances as you master more cards.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading}>Why the illustrations?</h2>
        <div style={styles.illustrationRow}>
          <img
            src={asset("concepts/w01.png")}
            alt="Gopher with receipt and calculator"
            style={styles.illustrationImg}
          />
          <img
            src={asset("concepts/br07.png")}
            alt="Two gophers connected by pipes"
            style={styles.illustrationImg}
          />
          <img
            src={asset("concepts/g07.png")}
            alt="Gopher chef making sushi"
            style={styles.illustrationImg}
          />
        </div>
        <p style={styles.text}>
          Every concept has a visual metaphor. A gopher juggling orbs for
          variables. Two gophers passing messages through pipes for channels. A
          chef slicing sushi for working with slices.
        </p>
        <p style={styles.text}>
          Visual metaphors work because they give abstract programming concepts
          a physical shape your brain can hold onto. When you see a gopher
          holding a jar with a label on it, "typed container for a value" clicks
          faster than a paragraph of text. The images act as memory anchors;
          they give the spaced repetition algorithm something richer to
          reinforce than dry definitions.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading}>Built with</h2>
        <div style={styles.techGrid}>
          {[
            ["React 19", "UI framework"],
            ["TypeScript", "Type safety"],
            ["Vite", "Build tooling"],
            ["Shiki", "Syntax highlighting"],
            ["SM-2", "Spaced repetition algorithm"],
            ["Web Audio API", "Sound effects"],
            ["GitHub Pages", "Hosting"],
          ].map(([name, desc]) => (
            <div key={name} style={styles.techCard}>
              <span style={styles.techName}>{name}</span>
              <span style={styles.techDesc}>{desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading}>Who made this?</h2>
        <p style={styles.text}>
          Built by Olga Safonova as a learning project while picking up Go. The
          concept illustrations were generated with AI and cleaned up to have
          transparent backgrounds. The gopher mascot follows the tradition of
          the Go gopher created by Renee French.
        </p>
        <p style={styles.textMuted}>
          Source code on{" "}
          <a
            href="https://github.com/olgasafonova/godojo"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >
            GitHub
          </a>
        </p>
      </section>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  hero: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  title: {
    fontFamily: font.mono,
    fontSize: 36,
    fontWeight: font.weightBold,
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: 0,
  },
  section: {
    marginBottom: spacing.xxl,
  },
  heading: {
    fontFamily: font.mono,
    fontSize: 20,
    fontWeight: font.weightBold,
    color: colors.accent,
    marginBottom: spacing.md,
  },
  text: {
    fontFamily: font.body,
    fontSize: 17,
    color: colors.text,
    lineHeight: 1.7,
    marginBottom: spacing.md,
  },
  textMuted: {
    fontFamily: font.body,
    fontSize: 15,
    color: colors.textMuted,
    lineHeight: 1.6,
  },
  link: {
    color: colors.accent,
    textDecoration: "none",
  },
  illustrationRow: {
    display: "flex",
    gap: spacing.md,
    justifyContent: "center",
    marginBottom: spacing.lg,
    flexWrap: "wrap",
  },
  illustrationImg: {
    width: 140,
    height: 140,
    objectFit: "contain",
    borderRadius: radius.lg,
    background: colors.bgCard,
    padding: spacing.sm,
  },
  techGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: spacing.sm,
  },
  techCard: {
    display: "flex",
    flexDirection: "column",
    background: colors.bgCard,
    borderRadius: radius.md,
    padding: `${spacing.md}px ${spacing.md}px`,
  },
  techName: {
    fontFamily: font.mono,
    fontSize: 15,
    fontWeight: font.weightMedium,
    color: colors.text,
    marginBottom: 4,
  },
  techDesc: {
    fontFamily: font.body,
    fontSize: 13,
    color: colors.textMuted,
  },
};
