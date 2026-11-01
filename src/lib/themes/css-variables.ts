// lib/theme/css-variables.ts
import { colors } from "./colors";
import { typography } from "./typography";

export const cssVariables: Record<string, string> = {
  "--color-brand-primary": colors.brand.primary,
  "--color-brand-secondary": colors.brand.secondary,
  "--color-brand-secondary-tint": colors.brand.secondaryTint,
  "--color-bg": colors.neutral.bg,
  "--color-surface": colors.neutral.surface,
  "--color-border": colors.neutral.border,
  "--color-muted": colors.neutral.muted,
  "--color-ink": colors.neutral.ink,
  "--color-success": colors.success.base,
  "--color-success-soft": colors.success.soft,
  "--color-warning": colors.warning.base,
  "--color-warning-soft": colors.warning.soft,
  "--color-destructive": colors.destructive.base,
  "--color-destructive-soft": colors.destructive.soft,
  "--font-family-base": typography.fontFamily,
};

// Generates --text-<style>-size, -line-height, and -weight for each style
for (const [name, style] of Object.entries(typography.styles)) {
  const kebab = name.replace(/([A-Z])/g, "-$1").toLowerCase();
  cssVariables[`--text-${kebab}-size`] = `${style.size}px`;
  cssVariables[`--text-${kebab}-line-height`] = `${style.lineHeight}px`;
  cssVariables[`--text-${kebab}-weight`] = String(style.weight);
}