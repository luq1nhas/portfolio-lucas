import type { Locale } from "@/i18n/routing";

/** Texto (ou lista) nas duas línguas do site. */
export type Localized<T = string> = Record<Locale, T>;

// ── Placeholders ────────────────────────────────────────────────────────────
// Informação que ainda não existe fica marcada como `pending("NOME")`.
// Em desenvolvimento aparece como {{NOME}}; em produção é omitida
// (e um item cujo campo obrigatório esteja pendente não é renderizado).

export type Pending = { readonly pending: string };
export type Maybe<T> = T | Pending;

export const pending = (name: string): Pending => ({ pending: name });

export function isPending(value: unknown): value is Pending {
  return typeof value === "object" && value !== null && "pending" in value;
}

// ── Identificadores ─────────────────────────────────────────────────────────

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
export type ExperienceId = (typeof experienceIds)[number];

/** Prova de uso de uma skill: um projeto ou uma experiência. */
export type EvidenceId = ProjectSlug | ExperienceId;

/** Tags de categoria. Os rótulos ficam em messages/*.json → Tags. */
export const tagIds = [
  "genai",
  "aiAgents",
  "rag",
  "promptEngineering",
  "semanticSearch",
  "aiEmbeddings",
  "ocr",
  "edtech",
  "govtech",
  "saasB2b",
  "multiTenant",
  "microservices",
  "fullStack",
  "frontend",
  "accessibility",
  "audit",
  "performance",
  "batchProcessing",
  "enterpriseSystem",
  "rewrite",
] as const;
export type TagId = (typeof tagIds)[number];

// ── Projetos ────────────────────────────────────────────────────────────────

export type Source =
  /** Projeto de empresa: nunca linkar repositório. */
  | { kind: "corporate" }
  /** Repositório privado de organização, mostrado na entrevista técnica. */
  | { kind: "interview"; showcaseUrl?: string }
  | { kind: "open"; repoUrl: string };

export type Project = {
  slug: ProjectSlug;
  section: "personal" | "contribution";
  /** Card em tamanho maior (destaque principal do site). */
  featured?: boolean;
  title: Localized;
  tagline?: Localized;
  /** Empresa e período, ou projeto pessoal. */
  context: { org: string; period: Localized } | "personal";
  /** 2 a 3 frases: o que é e qual problema resolve. */
  description: Localized;
  stack: string[];
  /** O que o Lucas fez. O card mostra estes (3 a 5 tópicos). */
  responsibilities: Localized<string[]>;
  /** Lista completa para a página de detalhes (quando maior que a do card). */
  fullResponsibilities?: Localized<string[]>;
  /** Resultado com métrica, exibido em destaque no card. */
  result?: Localized;
  tags: TagId[];
  /** Características da plataforma ou do time (não são responsabilidades do Lucas). */
  platformHighlights?: Localized<string[]>;
  star: {
    situation: Localized;
    task: Localized;
    /** `"responsibilities"` reaproveita a lista completa de responsabilidades. */
    action: Localized | "responsibilities";
    result: Localized;
    /** Métrica ainda não informada, exibida como placeholder em desenvolvimento. */
    resultMetric?: Maybe<Localized>;
  };
  /** Etapas do fluxo principal, mostradas no card em destaque. */
  flow?: Localized<string[]>;
  demo?: { url: string; coldStart?: boolean };
  source: Source;
  /** Experiência em que o projeto aconteceu (projetos pessoais não têm). */
  experience?: ExperienceId;
};

// ── Experiência ─────────────────────────────────────────────────────────────

export type Experience = {
  id: ExperienceId;
  role: Localized;
  org: string;
  period: Localized;
  /** AAAA-MM, para <time dateTime>. */
  start: string;
  end?: string;
  /** Rótulo do vínculo (PJ, participante…). */
  badge?: Localized;
  bullets: Localized<string[]>;
  projects?: ProjectSlug[];
  /** Experiência que aconteceu ao mesmo tempo (exibida lado a lado). */
  parallelWith?: ExperienceId;
};

// ── Stack ───────────────────────────────────────────────────────────────────

export type Skill = {
  label: string | Localized;
  /** Projetos e experiências em que a skill foi usada. Sem evidência, a skill não é exibida. */
  evidence: EvidenceId[];
};

export type SkillTier = {
  id: "ai" | "base" | "devops" | "architecture" | "also" | "learning";
  level: 1 | 2 | 3 | "learning";
  skills: Skill[];
};

// ── Depoimento ──────────────────────────────────────────────────────────────

export type Testimonial = {
  author: string;
  role: Localized;
  linkedin: string;
  /** Idioma original do texto (as outras versões são traduções). */
  originalLocale: Locale;
  quotes: Localized<string[]>;
};
