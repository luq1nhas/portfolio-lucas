"use client";

import { ArrowRight, Briefcase, FolderGit2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { EvidenceRef } from "@content/index";
import type { SkillTier } from "@content/types";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

export type TierView = {
  id: SkillTier["id"];
  level: SkillTier["level"];
  label: string;
  skills: { label: string; evidence: EvidenceRef[] }[];
};

type Selected = { tier: string; label: string } | null;

function EvidencePanel({
  skill,
  evidence,
  onClear,
}: {
  skill: string;
  evidence: EvidenceRef[];
  onClear: () => void;
}) {
  const t = useTranslations("Stack");

  return (
    <div className="mt-4 rounded-xl border border-signal/40 bg-signal-soft p-4">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-medium">{t("usedIn", { skill })}</p>
        <button
          type="button"
          onClick={onClear}
          aria-label={t("clear")}
          className="grid size-7 shrink-0 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-fg"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>
      <ul className="mt-3 flex flex-wrap gap-2">
        {evidence.map((ev) => {
          const Icon = ev.kind === "project" ? FolderGit2 : Briefcase;
          const className =
            "group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm hover:border-signal";
          const content = (
            <>
              <Icon className="size-3.5 text-signal" aria-hidden />
              <span className="sr-only">
                {ev.kind === "project" ? t("project") : t("experience")}:{" "}
              </span>
              {ev.label}
              <ArrowRight
                className="size-3.5 text-muted transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </>
          );
          return (
            <li key={ev.id}>
              {ev.kind === "project" ? (
                <Link href={ev.href} scroll={false} className={className}>
                  {content}
                </Link>
              ) : (
                <a href={ev.href} className={className}>
                  {content}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const skillSize: Record<TierView["level"], string> = {
  1: "px-3.5 py-2 text-base font-medium",
  2: "px-3 py-1.5 text-sm",
  3: "px-2.5 py-1 text-xs",
  learning: "",
};

const skillTone: Record<TierView["level"], string> = {
  1: "border-signal/40 hover:border-signal",
  2: "border-border hover:border-signal/60",
  3: "border-border text-muted hover:border-signal/60 hover:text-fg",
  learning: "",
};

export function SkillExplorer({ tiers }: { tiers: TierView[] }) {
  const t = useTranslations("Stack");
  const [selected, setSelected] = useState<Selected>(null);

  const primary = tiers.filter((tier) => tier.level === 1);
  const secondary = tiers.filter((tier) => tier.level === 2);
  const tertiary = tiers.filter((tier) => tier.level === 3);
  const learning = tiers.filter((tier) => tier.level === "learning");

  function renderTier(tier: TierView, className?: string) {
    const current = selected?.tier === tier.id ? selected : null;
    const currentSkill =
      current && tier.skills.find((s) => s.label === current.label);

    return (
      <div key={tier.id} className={className}>
        <h3
          className={cn(
            "font-mono text-xs tracking-wider uppercase",
            tier.level === 1 ? "text-signal" : "text-muted",
          )}
        >
          {tier.label}
        </h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {tier.skills.map((skill) => {
            const pressed = current?.label === skill.label;
            return (
              <li key={skill.label}>
                <button
                  type="button"
                  aria-pressed={pressed}
                  onClick={() =>
                    setSelected(
                      pressed ? null : { tier: tier.id, label: skill.label },
                    )
                  }
                  className={cn(
                    "rounded-full border transition-colors",
                    skillSize[tier.level],
                    // Estilo de selecionado substitui (não soma) o do nível, para não haver conflito de cor.
                    pressed
                      ? "border-signal bg-signal text-on-signal"
                      : skillTone[tier.level],
                  )}
                >
                  {skill.label}
                </button>
              </li>
            );
          })}
        </ul>
        <div aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            {currentSkill && (
              <motion.div
                key={currentSkill.label}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
              >
                <EvidencePanel
                  skill={currentSkill.label}
                  evidence={currentSkill.evidence}
                  onClear={() => setSelected(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {primary.map((tier) =>
        renderTier(
          tier,
          "rounded-2xl border border-signal/30 bg-surface p-6 sm:p-8",
        ),
      )}
      <div className="grid gap-10 lg:grid-cols-3">
        {secondary.map((tier) => renderTier(tier))}
      </div>
      <div className="flex flex-col gap-8 border-t border-border pt-8 lg:flex-row lg:items-start lg:justify-between">
        {tertiary.map((tier) => renderTier(tier, "lg:max-w-2xl"))}
        {learning.map((tier) => (
          <div key={tier.id}>
            <h3 className="font-mono text-xs tracking-wider text-muted uppercase">
              {tier.label}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {tier.skills.map((skill) => (
                <li
                  key={skill.label}
                  className="rounded-full border border-dashed border-muted/60 px-2.5 py-1 text-xs text-muted"
                >
                  {skill.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="sr-only">{t("hint")}</p>
    </div>
  );
}
