import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "pt",
  localePrefix: "always",
  // Lembra a escolha de idioma do visitante por 1 ano.
  localeCookie: { maxAge: 60 * 60 * 24 * 365 },
});

export type Locale = (typeof routing.locales)[number];

/** Código BCP 47 usado em `<html lang>`, hreflang e Open Graph. */
export const htmlLang: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
};
