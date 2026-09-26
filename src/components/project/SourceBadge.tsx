import { Code2, Lock } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Source } from "@content/types";
import { isPending } from "@content/types";
import { Placeholder } from "@/components/ui/Placeholder";
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

  if (source.kind === "open") {
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

  // Repositório privado de organização: convida para a entrevista técnica.
  return (
    <p className={`${base} flex-wrap`}>
      <Lock className="size-3.5 shrink-0" aria-hidden />
      {t("sourceInterview")}
      <span aria-hidden>·</span>
      <a
        href="#contact"
        className="text-signal underline-offset-4 hover:underline"
      >
        {t("sourceInterviewCta")}
      </a>
      {isPending(source.showcaseUrl) ? (
        <Placeholder value={source.showcaseUrl} />
      ) : (
        <a
          href={source.showcaseUrl}
          {...external}
          className="text-signal hover:underline"
        >
          {t("viewRepo")}
        </a>
      )}
    </p>
  );
}
