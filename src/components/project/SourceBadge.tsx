import { Code2, Lock } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Source } from "@content/types";
import { external } from "@/lib/links";

export async function SourceBadge({ source }: { source: Source }) {
  const t = await getTranslations("Project");
  const base = "inline-flex items-center gap-1.5 text-xs text-muted";

  if (source.kind === "corporate") {
    return (
      <p className={base}>
        <Lock className="size-3.5 shrink-0" aria-hidden />
        {t("sourceCorporate")}
      </p>
    );
  }

  if (source.kind === "openSource") {
    return (
      <a
        href={source.repoUrl}
        {...external}
        className={`${base} hover:text-fg`}
      >
        <Code2 className="size-3.5 shrink-0" aria-hidden />
        {t("sourceOpen")}
      </a>
    );
  }

  if (!source.showcaseUrl) return null;
  return (
    <a
      href={source.showcaseUrl}
      {...external}
      className={`${base} hover:text-fg`}
    >
      <Code2 className="size-3.5 shrink-0" aria-hidden />
      {t("viewRepo")}
    </a>
  );
}
