import { getTranslations } from "next-intl/server";
import { navSectionIds } from "@/lib/site";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { DesktopNav, MobileNav } from "./SiteNav";
import { ThemeToggle } from "./ThemeToggle";

export async function Header() {
  const t = await getTranslations("Nav");
  const tTheme = await getTranslations("Theme");
  const items = navSectionIds.map((id) => ({ id, label: t(id) }));

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-bg/75 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <a
          href="#top"
          className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight"
        >
          <span aria-hidden className="size-2.5 rounded-full bg-signal" />
          lucas.vieira
          <span className="sr-only">, {t("home")}</span>
        </a>

        <div className="ml-auto flex items-center gap-2">
          <DesktopNav items={items} label={t("label")} />
          <LocaleSwitcher />
          <ThemeToggle label={tTheme("toggle")} />
          <MobileNav
            items={items}
            labels={{
              nav: t("label"),
              open: t("openMenu"),
              close: t("closeMenu"),
            }}
          />
        </div>
      </div>
    </header>
  );
}
