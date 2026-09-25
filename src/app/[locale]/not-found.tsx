import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 pt-40 pb-24 sm:px-6">
      <p className="font-mono text-sm text-signal">404</p>
      <h1 className="text-4xl font-semibold tracking-tight">{t("title")}</h1>
      <Link
        href="/"
        className="rounded-full border border-border px-5 py-3 text-sm font-semibold hover:border-fg"
      >
        {t("back")}
      </Link>
    </div>
  );
}
