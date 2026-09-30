"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { htmlLang, routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LocaleSwitcher() {
  const t = useTranslations("Locale");
  const current = useLocale();
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label={t("label")}
      className="flex items-center rounded-full border border-border p-0.5 font-mono text-xs"
    >
      {routing.locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            scroll={false}
            hrefLang={htmlLang[locale]}
            lang={htmlLang[locale]}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1 uppercase transition-colors",
              active ? "bg-fg text-bg" : "text-muted hover:text-fg",
            )}
          >
            {locale}
            <span className="sr-only"> ({t(locale)})</span>
          </Link>
        );
      })}
    </div>
  );
}
