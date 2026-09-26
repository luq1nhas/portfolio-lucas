import { getLocale, getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { isPending, type Project } from "@content/types";
import { CategoryTag, StackChip } from "@/components/ui/Pills";
import { Placeholder } from "@/components/ui/Placeholder";
import { ProjectActions } from "./ProjectActions";
import { SourceBadge } from "./SourceBadge";

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-border pt-8">
      <h3 className="font-mono text-xs tracking-wider text-muted uppercase">
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

/** Estudo de caso completo (método STAR), exibido no painel de detalhes. */
export async function CaseStudy({
  project,
  titleId,
}: {
  project: Project;
  titleId: string;
}) {
  const t = await getTranslations("Case");
  const tProject = await getTranslations("Project");
  const tTags = await getTranslations("Tags");
  const locale = await getLocale();

  const responsibilities = (project.fullResponsibilities ??
    project.responsibilities)[locale];
  const { star } = project;
  const steps = [
    { key: "situation", label: t("situation"), body: star.situation[locale] },
    { key: "task", label: t("task"), body: star.task[locale] },
    {
      key: "action",
      label: t("action"),
      body:
        star.action === "responsibilities"
          ? t("actionSeeBelow")
          : star.action[locale],
    },
    { key: "result", label: t("result"), body: star.result[locale] },
  ] as const;

  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <h2
          id={titleId}
          className="text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {project.title[locale]}
        </h2>
        {project.tagline && (
          <p className="font-mono text-sm text-signal">
            {project.tagline[locale]}
          </p>
        )}
        <p className="text-sm text-muted">
          {project.context === "personal"
            ? tProject("personal")
            : `${project.context.org} · ${project.context.period[locale]}`}
        </p>
        <ul aria-label={tProject("tags")} className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li key={tag}>
              <CategoryTag>{tTags(tag)}</CategoryTag>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-lg leading-relaxed text-pretty">
          {project.description[locale]}
        </p>
        <ul aria-label={tProject("stack")} className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li key={tech}>
              <StackChip>{tech}</StackChip>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex flex-col gap-3">
          <SourceBadge source={project.source} />
          {project.demo && <ProjectActions project={project} demoOnly />}
        </div>
      </header>

      <Block title={t("starLabel")}>
        <dl className="grid gap-6">
          {steps.map((step) => (
            <div
              key={step.key}
              className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-6"
            >
              <dt
                className={
                  step.key === "result"
                    ? "font-semibold text-result"
                    : "font-semibold text-signal"
                }
              >
                {step.label}
              </dt>
              <dd
                className={
                  step.key === "result"
                    ? "rounded-lg border-l-2 border-result bg-result-soft px-3 py-2 leading-relaxed"
                    : "leading-relaxed text-pretty"
                }
              >
                {step.body}
                {step.key === "result" && star.resultMetric && (
                  <>
                    {" "}
                    {isPending(star.resultMetric) ? (
                      <Placeholder value={star.resultMetric} />
                    ) : (
                      star.resultMetric[locale]
                    )}
                  </>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Block>

      <Block title={t("responsibilities")}>
        <ol className="space-y-3">
          {responsibilities.map((item, i) => (
            <li key={item} className="flex gap-3 leading-relaxed">
              <span
                aria-hidden
                className="w-6 shrink-0 pt-0.5 font-mono text-xs text-signal"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </Block>

      {project.platformHighlights && (
        <Block title={t("platformHighlights")}>
          <p className="mb-4 text-sm text-muted">{t("platformNote")}</p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {project.platformHighlights[locale].map((item) => (
              <li
                key={item}
                className="rounded-lg border border-border bg-surface px-3 py-2 text-sm leading-relaxed"
              >
                {item}
              </li>
            ))}
          </ul>
        </Block>
      )}
    </article>
  );
}
