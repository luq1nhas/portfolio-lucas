"use client";

import {
  ArrowRight,
  BrainCircuit,
  Briefcase,
  Cloud,
  FolderGit2,
  Layers,
  Network,
  Sprout,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
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
              <ArrowRight className="size-3.5 text-muted" aria-hidden />
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
  1: "px-3.5 py-1.5 text-sm font-medium",
  2: "px-3 py-1 text-sm",
  3: "px-2.5 py-1 text-xs",
  learning: "",
};

const tierIcon: Record<TierView["id"], LucideIcon> = {
  ai: BrainCircuit,
  base: Layers,
  devops: Cloud,
  architecture: Network,
  also: Wrench,
  learning: Sprout,
};

/** Cabeçalho do card: ícone, nome da categoria e quantidade de tecnologias. */
function TierHeader({ tier, icon }: { tier: TierView; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={cn(
          "grid size-8 place-items-center rounded-lg border",
          tier.level === 1
            ? "border-signal/40 bg-signal-soft text-signal"
            : "border-border bg-surface-2 text-muted",
        )}
      >
        {icon}
      </span>
      <h3
        className={cn(
          "font-mono text-xs tracking-wider uppercase",
          tier.level === 1 ? "text-signal" : "text-fg",
        )}
      >
        {tier.label}
      </h3>
      <span className="ml-auto font-mono text-xs text-muted">
        {tier.skills.length}
      </span>
    </div>
  );
}

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
    const Icon = tierIcon[tier.id];

    return (
      <div
        key={tier.id}
        className={cn(
          "flex flex-col rounded-2xl border bg-surface p-6",
          tier.level === 1 ? "border-signal/40 sm:p-8" : "border-border",
          className,
        )}
      >
        <TierHeader
          tier={tier}
          icon={<Icon className="size-4" aria-hidden />}
        />
        <ul className="mt-5 flex flex-wrap gap-2">
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
                    "rounded-full border",
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
          {currentSkill && (
            <EvidencePanel
              skill={currentSkill.label}
              evidence={currentSkill.evidence}
              onClear={() => setSelected(null)}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {primary.map((tier) => renderTier(tier))}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {secondary.map((tier) => renderTier(tier))}
      </div>
      <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
        {tertiary.map((tier) => renderTier(tier))}
        {learning.map((tier) => {
          const Icon = tierIcon[tier.id];
          return (
            <div
              key={tier.id}
              className="flex flex-col rounded-2xl border border-dashed border-border bg-surface/50 p-6"
            >
              <TierHeader
                tier={tier}
                icon={<Icon className="size-4" aria-hidden />}
              />
              <ul className="mt-5 flex flex-wrap gap-2">
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
          );
        })}
      </div>
      <p className="sr-only">{t("hint")}</p>
    </div>
  );
}
