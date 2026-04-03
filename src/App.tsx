import { useState, useCallback } from "react";
import { HomePage } from "./pages/HomePage";
import { LearnPage } from "./pages/LearnPage";
import { QuizPage } from "./pages/QuizPage";
import { ProgressPage } from "./pages/ProgressPage";
import { AboutPage } from "./pages/AboutPage";
import { colors, font, spacing } from "./styles/tokens";
import { useIsMobile } from "./utils/useMediaQuery";

type Page = "home" | "learn" | "quiz" | "progress" | "about";

function App() {
  const [page, setPage] = useState<Page>("home");

  const navigate = useCallback((p: string) => setPage(p as Page), []);
  const mobile = useIsMobile();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.bg,
        color: colors.text,
        fontFamily: font.body,
      }}
    >
      {/* Nav */}
      <header>
        <nav
          style={{
            ...styles.nav,
            padding: mobile
              ? `${spacing.sm}px ${spacing.md}px`
              : styles.nav.padding,
          }}
        >
          <button onClick={() => setPage("home")} style={styles.navBrand}>
            Go Dojo
          </button>
          <div style={styles.navLinks}>
            <button
              onClick={() => setPage("learn")}
              style={{
                ...styles.navLink,
                color: page === "learn" ? colors.accent : colors.textMuted,
              }}
            >
              Learn
            </button>
            <button
              onClick={() => setPage("quiz")}
              style={{
                ...styles.navLink,
                color: page === "quiz" ? colors.accent : colors.textMuted,
              }}
            >
              Train
            </button>
            <button
              onClick={() => setPage("progress")}
              style={{
                ...styles.navLink,
                color: page === "progress" ? colors.accent : colors.textMuted,
              }}
            >
              Progress
            </button>
            <button
              onClick={() => setPage("about")}
              style={{
                ...styles.navLink,
                color: page === "about" ? colors.accent : colors.textMuted,
              }}
            >
              About
            </button>
          </div>
        </nav>
      </header>

      {/* Pages */}
      <main>
        {page === "home" && <HomePage onNavigate={navigate} />}
        {page === "learn" && <LearnPage onNavigate={navigate} />}
        {page === "quiz" && <QuizPage onNavigate={navigate} />}
        {page === "progress" && <ProgressPage />}
        {page === "about" && <AboutPage onNavigate={navigate} />}
      </main>

      <footer
        style={{
          padding: `${spacing.md}px`,
          textAlign: "center",
          fontSize: 12,
          color: colors.textMuted,
        }}
      >
        Go Dojo - Learn Go Through Spaced Repetition
      </footer>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${spacing.md}px ${spacing.xl}px`,
    borderBottom: `1px solid ${colors.notStarted}`,
  },
  navBrand: {
    fontFamily: font.mono,
    fontSize: 20,
    fontWeight: font.weightBold,
    color: colors.accent,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    minHeight: 44,
    display: "flex",
    alignItems: "center",
  },
  navLinks: {
    display: "flex",
    gap: spacing.lg,
  },
  navLink: {
    fontFamily: font.mono,
    fontSize: 15,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: `${spacing.sm}px ${spacing.md}px`,
    minHeight: 44,
    display: "flex",
    alignItems: "center",
    transition: "color 0.2s",
  },
};

export default App;
