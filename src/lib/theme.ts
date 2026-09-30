export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";
export const DEFAULT_THEME: Theme = "dark";

export function applyStoredTheme(storageKey: string, defaultTheme: Theme) {
  const stored = (() => {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  })();
  const isKnownTheme = stored === "light" || stored === "dark";
  document.documentElement.dataset.theme = isKnownTheme ? stored : defaultTheme;
}

export function saveTheme(theme: Theme): boolean {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    return true;
  } catch {
    return false;
  }
}
