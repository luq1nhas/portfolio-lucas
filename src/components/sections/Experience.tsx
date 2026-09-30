import { getLocale, getTranslations } from "next-intl/server";
import { experience, getProject } from "@content/index";
import type { Experience as ExperienceItem } from "@content/types";
import { StackChip } from "@/components/ui/Pills";
import { Section } from "@/components/ui/Section";
import { Link } from "@/i18n/navigation";

function groupParallel(items: ExperienceItem[]) {
  const groups: ExperienceItem[][] = [];
  for (const item of items) {
    const last = groups.at(-1);
    if (last && last.some((e) => e.parallelWith === item.id)) last.push(item);
    else groups.push([item]);
  }
  return groups;
}

async function ExperienceCard({ item }: { item: ExperienceItem }) {
  const locale = await getLocale();
  const t = await getTranslations("Experience");

  return (
    <article
      id={`exp-${item.id}`}
      className="scroll-mt-24 rounded-2xl border border-border bg-surface p-5 sm:p-6"
    >
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-lg font-semibold tracking-tight">
          {item.role[locale]}
          <span className="text-muted"> · {item.org}</span>
        </h3>
        <p className="flex items-center gap-2 font-mono text-xs text-muted">
          {item.employmentType && (
            <StackChip className="text-fg">
              {item.employmentType[locale]}
            </StackChip>
          )}
          <time dateTime={item.startMonth}>{item.period[locale]}</time>
        </p>
      </header>
      <ul className="mt-4 space-y-1.5 text-sm text-muted">
        {item.bullets[locale].map((bullet) => (
          <li key={bullet} className="flex gap-2">
            <span
              aria-hidden
              className="mt-[0.55em] size-1 shrink-0 rounded-full bg-signal"
            />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      {item.projects && (
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
          <span className="font-mono text-xs text-muted">
            {t("relatedProjects")}:
          </span>
          {item.projects.map((slug) => (
            <Link
              key={slug}
              href={`/cases/${slug}`}
              scroll={false}
              className="rounded-full border border-border px-2.5 py-0.5 text-xs hover:border-signal hover:text-signal"
            >
              {getProject(slug)?.title[locale]}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}

export async function Experience() {
  const tSections = await getTranslations("Sections");
  const t = await getTranslations("Experience");

  return (
    <Section id="experience" title={tSections("experience")}>
      <ol className="relative ml-1.5 border-l border-border">
        {groupParallel(experience).map((group) => (
          <li
            key={group[0].id}
            className="relative pb-10 pl-6 last:pb-0 sm:pl-10"
          >
            <span
              aria-hidden
              className="absolute top-6 -left-[5px] size-[9px] rounded-full border border-signal bg-bg"
            />
            {group.length > 1 && (
              <p className="mb-3 font-mono text-xs tracking-wider text-signal uppercase">
                {t("parallel")}
              </p>
            )}
            <div
              className={
                group.length > 1 ? "grid gap-4 lg:grid-cols-2" : undefined
              }
            >
              {group.map((item) => (
                <ExperienceCard key={item.id} item={item} />
              ))}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
