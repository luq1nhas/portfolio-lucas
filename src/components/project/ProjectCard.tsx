import { getLocale, getTranslations } from "next-intl/server";
import type { Project } from "@content/types";
import { CategoryTag, StackChip } from "@/components/ui/Pills";
import { cn } from "@/lib/cn";
import { ProjectActions } from "./ProjectActions";
import { SourceBadge } from "./SourceBadge";

const MAX_CHIPS = 6;

export async function getProjectCardParts({ project }: { project: Project }) {
  const t = await getTranslations("Project");
  const tTags = await getTranslations("Tags");
  const locale = await getLocale();

  const chips = project.stack.slice(0, MAX_CHIPS);
  const hidden = project.stack.length - chips.length;

  return {
    title: (
      <div className="pr-6">
        <h3 className="text-xl font-semibold tracking-tight">
          {project.title[locale]}
        </h3>
        {project.tagline && (
          <p className="mt-0.5 font-mono text-xs text-signal">
            {project.tagline[locale]}
          </p>
        )}
      </div>
    ),
    subtitle: (
      <p className="text-sm text-muted">
        {project.context === "personal"
          ? t("personal")
          : `${project.context.org} · ${project.context.period[locale]}`}
      </p>
    ),
    description: (
      <p className="text-sm leading-relaxed text-pretty">
        {project.description[locale]}
      </p>
    ),
    stack: (
      <ul
        aria-label={t("stack")}
        className="flex flex-wrap content-start gap-1.5"
      >
        {chips.map((tech) => (
          <li key={tech}>
            <StackChip>{tech}</StackChip>
          </li>
        ))}
        {hidden > 0 && (
          <li>
            <StackChip className="text-fg">
              <span aria-hidden>{t("moreStack", { count: hidden })}</span>
              <span className="sr-only">
                {t("moreStackLabel", { count: hidden })}
              </span>
            </StackChip>
          </li>
        )}
      </ul>
    ),
    responsibilities: (
      <div>
        <h4 className="sr-only">{t("responsibilities")}</h4>
        <ul className="space-y-1.5 text-sm text-muted">
          {project.cardResponsibilities[locale].map((item) => (
            <li key={item} className="flex gap-2">
              <span
                aria-hidden
                className="mt-[0.55em] size-1 shrink-0 rounded-full bg-signal"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {project.highlightedResult && (
          <p className="mt-3 rounded-lg border-l-2 border-result bg-result-soft px-3 py-2 text-sm font-medium text-result">
            <span className="sr-only">{t("result")}: </span>
            {project.highlightedResult[locale]}
          </p>
        )}
      </div>
    ),
    tags: (
      <ul
        aria-label={t("tags")}
        className="flex flex-wrap content-start gap-1.5"
      >
        {project.tags.map((tag) => (
          <li key={tag}>
            <CategoryTag>{tTags(tag)}</CategoryTag>
          </li>
        ))}
      </ul>
    ),
    footer: (
      <footer className="flex flex-col gap-3 border-t border-border pt-4">
        <SourceBadge source={project.source} />
        <ProjectActions project={project} />
      </footer>
    ),
  };
}

export const cardShell =
  "group relative rounded-2xl border border-border bg-surface p-6 hover:border-signal/50";

export function CardNode() {
  return (
    <span
      aria-hidden
      className="absolute top-6 right-6 size-2 rounded-full bg-edge group-hover:bg-signal"
    />
  );
}

export async function ProjectCard({ project }: { project: Project }) {
  const parts = await getProjectCardParts({ project });

  return (
    <article
      id={`card-${project.slug}`}
      className={cn(cardShell, "row-span-7 grid grid-rows-subgrid gap-y-4")}
    >
      <CardNode />
      {parts.title}
      {parts.subtitle}
      {parts.description}
      {parts.stack}
      {parts.responsibilities}
      {parts.tags}
      {parts.footer}
    </article>
  );
}
