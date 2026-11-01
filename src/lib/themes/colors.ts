// lib/theme/colors.ts
export const colors = {
  brand: {
    primary: "#2563A6",
    secondary: "#173D68",
    secondaryTint: "#DCEBFA",
  },
  neutral: {
    bg: "#F5F7FA",
    surface: "#FFFFFF",
    border: "#D9E0E8",
    muted: "#667085",
    ink: "#202B38",
  },
  success: { base: "#23834A", soft: "#B3D6C4" },
  warning: { base: "#A86400", soft: "#FFD1A8" },
  destructive: { base: "#C62828", soft: "#E8B2B2" },
} as const;

export type ThemeColors = typeof colors;