export const colors = {
  bg: "#0b1622",
  bgCard: "#141f2e",
  bgCode: "#0d1926",
  accent: "#00ADD8", // Go blue
  accentHover: "#33c4e4",
  warm: "#f0c040", // gold for correct/mastered - brighter
  wrong: "#ef6461", // coral for errors - brighter
  text: "#f0f4f8", // near-white for high contrast
  textMuted: "#8da4b8", // lighter muted for readability
  textCode: "#dce6f0",
  belt: {
    white: "#f0ece4",
    yellow: "#eab308",
    green: "#22c55e",
    blue: "#00ADD8",
    brown: "#a0714f",
    black: "#1a1a1a",
  },
  mastered: "#22c55e",
  learning: "#f0c040",
  notStarted: "#1c2d3f",
} as const;

export const font = {
  body: "'Inter', system-ui, -apple-system, sans-serif",
  mono: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
  weightBold: 700,
  weightMedium: 500,
  weightRegular: 400,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  round: "50%",
} as const;
