import type { Locale } from "@/i18n/routing";
import { experience } from "./experience";
import { projects } from "./projects";
import { skillTiers } from "./skills";
import type {
  EvidenceId,
  Localized,
  Project,
  ProjectSlug,
  Skill,
} from "./types";

export { experience, projects, skillTiers };
export { testimonial } from "./testimonial";
export { profile } from "./profile";

export function localize<T>(value: T | Localized<T>, locale: Locale): T {
  if (
    typeof value === "object" &&
    value !== null &&
    "pt" in value &&
    "en" in value
  ) {
    return (value as Localized<T>)[locale];
  }
  return value as T;
}

export function projectsIn(section: Project["section"]) {
  return projects.filter((p) => p.section === section);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

const projectSlugSet = new Set<string>(projects.map((p) => p.slug));

export type EvidenceRef = {
  id: EvidenceId;
  kind: "project" | "experience";
  label: string;
  href: string;
};

export function resolveEvidence(id: EvidenceId, locale: Locale): EvidenceRef {
  if (projectSlugSet.has(id)) {
    const project = getProject(id)!;
    return {
      id,
      kind: "project",
      label: project.title[locale],
      href: `/cases/${project.slug as ProjectSlug}`,
    };
  }
  const exp = experience.find((e) => e.id === id)!;
  return { id, kind: "experience", label: exp.org, href: `#exp-${exp.id}` };
}

export function isShowableSkill(skill: Skill, learning: boolean) {
  return learning || skill.evidence.length > 0;
}
