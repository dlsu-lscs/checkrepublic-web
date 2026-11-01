// lib/theme/typography.ts
export const typography = {
  fontFamily: "var(--font-outfit), system-ui, sans-serif",
  styles: {
    displayLarge: { size: 36, lineHeight: 40, weight: 700 },
    h1: { size: 30, lineHeight: 36, weight: 600 },
    h2: { size: 24, lineHeight: 32, weight: 600 },
    h3: { size: 18, lineHeight: 28, weight: 500 },
    bodyLarge: { size: 16, lineHeight: 24, weight: 400 },
    bodyDefault: { size: 14, lineHeight: 20, weight: 400 },
    labelDefault: { size: 14, lineHeight: 20, weight: 500 },
    captionSmall: { size: 12, lineHeight: 16, weight: 400 },
    buttonDefault: { size: 14, lineHeight: 20, weight: 600 },
  },
} as const;

export type ThemeTypography = typeof typography;