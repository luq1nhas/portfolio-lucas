import { routing, type Locale } from "@/i18n/routing";

/** URL canônica do site. Defina NEXT_PUBLIC_SITE_URL quando o domínio próprio existir. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/** Âncoras da landing page, na ordem em que aparecem. */
export const sectionIds = [
  "about",
  "projects",
  "contributions",
  "experience",
  "stack",
  "testimonial",
  "contact",
] as const;

export type SectionId = (typeof sectionIds)[number];

/** Seções exibidas no menu do header. */
export const navSectionIds = [
  "about",
  "projects",
  "contributions",
  "experience",
  "stack",
  "contact",
] as const satisfies readonly SectionId[];

/** Campos de Open Graph comuns a todas as páginas (o Next não mescla objetos aninhados). */
export function baseOpenGraph(locale: Locale) {
  return {
    type: "website" as const,
    siteName: "Lucas Vieira",
    locale: ogLocale[locale],
    alternateLocale: routing.locales
      .filter((l) => l !== locale)
      .map((l) => ogLocale[l]),
  };
}

const ogLocale: Record<Locale, string> = { pt: "pt_BR", en: "en_US" };
