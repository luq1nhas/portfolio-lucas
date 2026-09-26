import type { ReactNode } from "react";
import type { SectionId } from "@/lib/site";
import { sectionIds } from "@/lib/site";
import { cn } from "@/lib/cn";

type Props = {
  id: SectionId;
  title: string;
  intro?: string;
  children?: ReactNode;
  className?: string;
};

export function Section({ id, title, intro, children, className }: Props) {
  const index = String(sectionIds.indexOf(id) + 1).padStart(2, "0");

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("border-t border-border/60 py-20 sm:py-28", className)}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2
          id={`${id}-title`}
          className="flex items-baseline gap-3 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          <span
            aria-hidden
            className="font-mono text-sm font-normal text-signal"
          >
            {index}
          </span>
          {title}
        </h2>
        {intro && (
          <p className="mt-4 max-w-2xl text-pretty text-muted">{intro}</p>
        )}
        <div className="mt-10 sm:mt-12">{children}</div>
      </div>
    </section>
  );
}
