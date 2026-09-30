import { getLocale, getTranslations } from "next-intl/server";
import type { Project } from "@content/types";
import { cn } from "@/lib/cn";
import { CardNode, cardShell, getProjectCardParts } from "./ProjectCard";

export async function FeaturedProjectCard({ project }: { project: Project }) {
  const parts = await getProjectCardParts({ project });
  const t = await getTranslations("Project");
  const locale = await getLocale();
  const flow = project.flow?.[locale];

  return (
    <article
      id={`card-${project.slug}`}
      className={cn(cardShell, "p-6 sm:p-8")}
    >
      <CardNode />
      <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr]">
        <div className="flex flex-col gap-4">
          <div className="[&_h3]:text-3xl sm:[&_h3]:text-4xl">
            {parts.title}
          </div>
          {parts.subtitle}
          <div className="text-base [&_p]:text-base">{parts.description}</div>
          {parts.stack}
          {parts.responsibilities}
          {parts.tags}
        </div>

        {flow && (
          <div className="self-start rounded-xl border border-border bg-bg/60 p-5">
            <p className="font-mono text-xs tracking-wider text-muted uppercase">
              {t("flow")}
            </p>
            <ol className="mt-4">
              {flow.map((step, i) => {
                const last = i === flow.length - 1;
                return (
                  <li key={step} className="relative flex gap-3 pb-5 last:pb-0">
                    {!last && (
                      <span
                        aria-hidden
                        className="absolute top-4 left-[5px] h-full w-px bg-edge"
                      />
                    )}
                    <span
                      aria-hidden
                      className={cn(
                        "relative mt-1.5 size-[11px] shrink-0 rounded-full border",
                        last
                          ? "border-signal bg-signal"
                          : "border-muted bg-surface-2",
                      )}
                    />
                    <span
                      className={cn(
                        "font-mono text-sm",
                        last ? "text-signal" : "text-fg",
                      )}
                    >
                      {step}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        )}
      </div>
      <div className="mt-8">{parts.footer}</div>
    </article>
  );
}
