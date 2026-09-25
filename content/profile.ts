import type { Locale } from "@/i18n/routing";

export const profile = {
  displayName: "Lucas Vieira",
  fullName: "Lucas Vieira Bueno e Silva",
  email: "lucasvbs12@gmail.com",
  /** Formato E.164 sem "+", usado em https://wa.me/ */
  whatsapp: "5563992766284",
  linkedin: "https://www.linkedin.com/in/lucas-vieira-bueno-e-silva-b1a8a4208/",
  github: "https://github.com/luq1nhas",
  resume: {
    pt: "/curriculo-lucas-vieira-pt.pdf",
    en: "/curriculo-lucas-vieira-en.pdf",
  } satisfies Record<Locale, string>,
} as const;
