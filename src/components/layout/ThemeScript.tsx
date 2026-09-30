"use client";

import { useLayoutEffect } from "react";
import {
  applyStoredTheme,
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
} from "@/lib/theme";

const isServer = typeof window === "undefined";

const scriptArguments = [THEME_STORAGE_KEY, DEFAULT_THEME]
  .map((value) => JSON.stringify(value))
  .join(", ");

const applyThemeBeforeFirstPaint = `(${applyStoredTheme})(${scriptArguments})`;

export function ThemeScript() {
  useLayoutEffect(() => applyStoredTheme(THEME_STORAGE_KEY, DEFAULT_THEME), []);

  return (
    <script
      type={isServer ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: applyThemeBeforeFirstPaint }}
    />
  );
}
