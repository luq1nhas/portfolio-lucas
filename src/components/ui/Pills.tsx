import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Chip de tecnologia: neutro e monoespaçado. */
export function StackChip({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-surface-2 px-2 py-0.5 font-mono text-[11px] leading-5 text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Tag de categoria: pílula contornada em lilás, visualmente distinta do chip de stack. */
export function CategoryTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-tag/40 px-2.5 py-0.5 text-xs text-tag">
      {children}
    </span>
  );
}
