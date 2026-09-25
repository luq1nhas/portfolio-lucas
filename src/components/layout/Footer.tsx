import { getTranslations } from "next-intl/server";
import { ContactLinks } from "./ContactLinks";

export async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6">
        <nav aria-label={t("linksLabel")}>
          <ContactLinks />
        </nav>
        <div className="flex flex-col gap-1 font-mono text-xs text-muted sm:flex-row sm:justify-between">
          <p>{t("rights", { year: new Date().getFullYear() })}</p>
          <p>{t("builtWith")}</p>
        </div>
      </div>
    </footer>
  );
}
