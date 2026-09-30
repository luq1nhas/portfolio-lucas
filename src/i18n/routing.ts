import { defineRouting } from "next-intl/routing";

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "pt",
  localePrefix: "always",
  localeCookie: { maxAge: ONE_YEAR_IN_SECONDS },
});

export type Locale = (typeof routing.locales)[number];

export const htmlLang: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
};
