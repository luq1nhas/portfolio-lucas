import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import type { Project } from "@content/types";
import { Link } from "@/i18n/navigation";
import { external } from "@/lib/links";

/**
 * Botões do rodapé do card: "Ver demo" (quando houver) e "Ver detalhes".
 * `demoOnly` é usado dentro do próprio estudo de caso.
 */
export async function ProjectActions({
  project,
  demoOnly = false,
}: {
  project: Project;
  demoOnly?: boolean;
}) {
  const t = await getTranslations("Project");
  const locale = await getLocale();
  const title = project.title[locale];
  const hintId = `demo-hint-${project.slug}${demoOnly ? "-case" : ""}`;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {project.demo && (
        <a
          href={project.demo.url}
          {...external}
          aria-describedby={project.demo.coldStart ? hintId : undefined}
          className="inline-flex items-center gap-1.5 rounded-full bg-signal px-4 py-2 text-sm font-semibold text-on-signal transition-transform hover:-translate-y-0.5"
        >
          {t("viewDemo")}
          <ArrowUpRight className="size-4" aria-hidden />
        </a>
      )}
      {!demoOnly && (
        <Link
          href={`/cases/${project.slug}`}
          scroll={false}
          aria-label={t("viewDetailsOf", { project: title })}
          className="group/btn inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors hover:border-fg"
        >
          {t("viewDetails")}
          <ArrowRight
            className="size-4 transition-transform group-hover/btn:translate-x-0.5"
            aria-hidden
          />
        </Link>
      )}
      {project.demo?.coldStart && (
        <p id={hintId} className="w-full text-xs text-muted">
          {t("coldStart")}
        </p>
      )}
    </div>
  );
}
