// lib/theme/theme-provider.tsx
"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { colors, type ThemeColors } from "./colors";
import { typography, type ThemeTypography } from "./typography";
import { cssVariables } from "./css-variables";

type ThemeContextValue = {
  colors: ThemeColors;
  typography: ThemeTypography;
};

const value: ThemeContextValue = { colors, typography };
const ThemeCtx = createContext<ThemeContextValue>(value);

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(cssVariables).forEach(([name, val]) => {
      root.style.setProperty(name, val);
    });
  }, []);

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeCtx);
}