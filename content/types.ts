import type { Locale } from "@/i18n/routing";

export type Localized<T = string> = Record<Locale, T>;

export const projectSlugs = [
  "nexus",
  "sgd-municipios",
  "iron",
  "agente-suporte",
  "agente-auditoria",
  "agente-convencoes",
  "cnpj-alfanumerico",
  "max-web-v2",
] as const;
export type ProjectSlug = (typeof projectSlugs)[number];

export const experienceIds = [
  "new-code",
  "mjv",
  "ciandt",
  "max-data",
  "campus-mobile",
  "qative",
] as const;
type ExperienceId = (typeof experienceIds)[number];

export type EvidenceId = ProjectSlug | ExperienceId;

type TagId =
  | "genai"
  | "aiAgents"
  | "rag"
  | "promptEngineering"
  | "semanticSearch"
  | "aiEmbeddings"
  | "ocr"
  | "edtech"
  | "govtech"
  | "saasB2b"
  | "multiTenant"
  | "microservices"
  | "fullStack"
  | "frontend"
  | "accessibility"
  | "audit"
  | "performance"
  | "batchProcessing"
  | "enterpriseSystem"
  | "rewrite";

export type Source =
  | { kind: "corporate" }
  | { kind: "privateOrganization"; showcaseUrl?: string }
  | { kind: "openSource"; repoUrl: string };

export type Project = {
  slug: ProjectSlug;
  section: "personal" | "contribution";
  featured?: boolean;
  title: Localized;
  tagline?: Localized;
  context: { org: string; period: Localized } | "personal";
  description: Localized;
  stack: string[];
  cardResponsibilities: Localized<string[]>;
  fullResponsibilities?: Localized<string[]>;
  highlightedResult?: Localized;
  tags: TagId[];
  platformHighlights?: Localized<string[]>;
  star: {
    situation: Localized;
    task: Localized;
    action: Localized | "sameAsFullResponsibilities";
    result: Localized;
  };
  flow?: Localized<string[]>;
  demo?: { url: string; hasColdStart?: boolean };
  source: Source;
  experience?: ExperienceId;
};

export type Experience = {
  id: ExperienceId;
  role: Localized;
  org: string;
  period: Localized;
  startMonth: string;
  employmentType?: Localized;
  bullets: Localized<string[]>;
  projects?: ProjectSlug[];
  parallelWith?: ExperienceId;
};

export type Skill = {
  label: string | Localized;
  evidence: EvidenceId[];
};

export type SkillTier = {
  id: "ai" | "base" | "devops" | "architecture" | "also" | "learning";
  level: 1 | 2 | 3 | "learning";
  skills: Skill[];
};

export type Testimonial = {
  author: string;
  role: Localized;
  linkedin: string;
  originalLocale: Locale;
  quotes: Localized<string[]>;
};
