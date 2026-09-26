import { useState, useCallback } from "react";
import { HomePage } from "./pages/HomePage";
import { LearnPage } from "./pages/LearnPage";
import { QuizPage } from "./pages/QuizPage";
import { ProgressPage } from "./pages/ProgressPage";
import { AboutPage } from "./pages/AboutPage";
import { colors, font, spacing } from "./styles/tokens";
import { useIsMobile } from "./utils/useMediaQuery";

type Page = "home" | "learn" | "quiz" | "progress" | "about";

const NAV_LINKS: { page: Page; label: string }[] = [
  { page: "learn", label: "Learn" },
  { page: "quiz", label: "Train" },
  { page: "progress", label: "Progress" },
  { page: "about", label: "About" },
];

const PAGES: Record<Page, (onNavigate: (p: string) => void) => React.ReactNode> =
  {
    home: (onNavigate) => <HomePage onNavigate={onNavigate} />,
    learn: (onNavigate) => <LearnPage onNavigate={onNavigate} />,
    quiz: (onNavigate) => <QuizPage onNavigate={onNavigate} />,
    progress: () => <ProgressPage />,
    about: (onNavigate) => <AboutPage onNavigate={onNavigate} />,
  };

const NavLink: React.FC<{
  label: string;
  active: boolean;
  mobile: boolean;
  onClick: () => void;
}> = ({ label, active, mobile, onClick }) => (
  <button
    onClick={onClick}
    style={{
      ...styles.navLink,
      ...(mobile && styles.navLinkMobile),
      color: active ? colors.accent : colors.textMuted,
    }}
  >
    {label}
  </button>
);

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
              ? `${spacing.sm}px 12px`
              : styles.nav.padding,
          }}
        >
          <button
            onClick={() => setPage("home")}
            style={{ ...styles.navBrand, ...(mobile && styles.navBrandMobile) }}
          >
            Go Dojo
          </button>
          <div
            style={{ ...styles.navLinks, ...(mobile && styles.navLinksMobile) }}
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.page}
                label={link.label}
                active={page === link.page}
                mobile={mobile}
                onClick={() => setPage(link.page)}
              />
            ))}
          </div>
        </nav>
      </header>

      {/* Pages */}
      <main>{PAGES[page](navigate)}</main>

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
  navBrandMobile: {
    fontSize: 15,
    whiteSpace: "nowrap",
  },
  navLinks: {
    display: "flex",
    gap: spacing.lg,
  },
  navLinksMobile: {
    gap: 0,
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
  navLinkMobile: {
    fontSize: 14,
    padding: `${spacing.sm}px 6px`,
  },
};

export default App;
