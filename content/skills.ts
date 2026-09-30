import type { SkillTier } from "./types";

export const skillTiers: SkillTier[] = [
  {
    id: "ai",
    level: 1,
    skills: [
      { label: "LangChain", evidence: ["iron", "mjv"] },
      { label: "LangGraph", evidence: ["iron"] },
      {
        label: "RAG",
        evidence: [
          "agente-suporte",
          "agente-auditoria",
          "agente-convencoes",
          "new-code",
        ],
      },
      { label: "Embeddings", evidence: ["new-code"] },
      { label: "Chunking", evidence: ["new-code"] },
      {
        label: {
          pt: "Busca vetorial (pgvector)",
          en: "Vector search (pgvector)",
        },
        evidence: ["new-code"],
      },
      {
        label: "Azure OpenAI",
        evidence: [
          "mjv",
          "agente-suporte",
          "agente-auditoria",
          "agente-convencoes",
        ],
      },
      { label: "AWS Bedrock", evidence: ["iron"] },
      { label: "Google Gemini", evidence: ["nexus"] },
      {
        label: { pt: "Engenharia de prompt", en: "Prompt engineering" },
        evidence: ["agente-suporte", "mjv", "nexus"],
      },
      {
        label: { pt: "Agentes com tools", en: "Tool-using agents" },
        evidence: ["iron"],
      },
      {
        label: {
          pt: "Streaming de respostas (SSE)",
          en: "Response streaming (SSE)",
        },
        evidence: ["mjv"],
      },
      {
        label: {
          pt: "Ingestão de documentos e OCR",
          en: "Document ingestion & OCR",
        },
        evidence: ["nexus", "sgd-municipios"],
      },
    ],
  },
  {
    id: "base",
    level: 2,
    skills: [
      {
        label: "TypeScript",
        evidence: [
          "sgd-municipios",
          "iron",
          "cnpj-alfanumerico",
          "max-web-v2",
          "mjv",
        ],
      },
      {
        label: "React",
        evidence: [
          "nexus",
          "sgd-municipios",
          "iron",
          "agente-suporte",
          "agente-auditoria",
          "agente-convencoes",
          "mjv",
        ],
      },
      { label: "Next.js", evidence: ["ciandt"] },
      {
        label: "NestJS",
        evidence: [
          "nexus",
          "sgd-municipios",
          "iron",
          "agente-suporte",
          "agente-auditoria",
          "agente-convencoes",
          "mjv",
          "ciandt",
        ],
      },
      { label: "Node.js", evidence: ["cnpj-alfanumerico"] },
      { label: "Express", evidence: ["cnpj-alfanumerico"] },
      { label: "PostgreSQL", evidence: ["nexus", "sgd-municipios"] },
      { label: "MySQL", evidence: ["iron", "cnpj-alfanumerico"] },
      { label: "DynamoDB", evidence: ["iron"] },
      { label: "Prisma", evidence: ["sgd-municipios"] },
      { label: "TypeORM", evidence: ["nexus"] },
      { label: "Knex", evidence: ["cnpj-alfanumerico"] },
      { label: "Zod", evidence: ["sgd-municipios"] },
      { label: "TanStack Query", evidence: ["sgd-municipios"] },
      { label: "REST", evidence: ["cnpj-alfanumerico"] },
      {
        label: "WebSockets (Socket.IO)",
        evidence: ["iron", "cnpj-alfanumerico"],
      },
      {
        label: {
          pt: "Filas assíncronas (pg-boss, SQS)",
          en: "Async queues (pg-boss, SQS)",
        },
        evidence: ["new-code", "mjv"],
      },
      { label: "Tailwind CSS", evidence: ["sgd-municipios", "mjv"] },
    ],
  },
  {
    id: "devops",
    level: 2,
    skills: [
      { label: "Docker", evidence: ["sgd-municipios", "iron"] },
      { label: "Docker Compose", evidence: ["new-code"] },
      { label: "GitHub Actions (CI/CD)", evidence: ["sgd-municipios"] },
      {
        label: { pt: "Deploy em VPS", en: "VPS deployment" },
        evidence: ["new-code"],
      },
      { label: "AWS (Cognito, SQS, S3, DynamoDB, SAM)", evidence: ["iron"] },
      { label: "Nginx", evidence: [] },
      { label: "Jest", evidence: ["sgd-municipios", "iron"] },
      { label: "Vitest", evidence: ["sgd-municipios", "iron"] },
      { label: "Supertest", evidence: ["sgd-municipios", "iron"] },
      { label: "Playwright", evidence: ["sgd-municipios", "iron"] },
      { label: "TDD", evidence: ["new-code", "mjv"] },
      { label: "Conventional Commits", evidence: ["sgd-municipios"] },
      {
        label: {
          pt: "Code review via Pull Requests",
          en: "Code review via pull requests",
        },
        evidence: ["sgd-municipios"],
      },
    ],
  },
  {
    id: "architecture",
    level: 2,
    skills: [
      { label: "Clean Architecture", evidence: ["mjv"] },
      {
        label: { pt: "Microsserviços", en: "Microservices" },
        evidence: ["mjv"],
      },
      {
        label: { pt: "Monólito modular", en: "Modular monolith" },
        evidence: ["new-code"],
      },
      { label: "Monorepo", evidence: ["new-code"] },
      {
        label: {
          pt: "Multi-tenancy com Row-Level Security",
          en: "Multi-tenancy with Row-Level Security",
        },
        evidence: ["new-code", "mjv"],
      },
      { label: "RBAC", evidence: ["new-code", "mjv"] },
      { label: "BFF", evidence: ["ciandt"] },
      { label: "SOLID", evidence: ["mjv", "ciandt"] },
      { label: "Design patterns", evidence: ["mjv"] },
    ],
  },
  {
    id: "also",
    level: 3,
    skills: [
      { label: "Angular", evidence: ["max-web-v2", "max-data"] },
      { label: "Vue.js", evidence: ["ciandt"] },
      { label: "Spring Boot", evidence: ["ciandt"] },
      { label: "Quarkus", evidence: ["ciandt"] },
      { label: "React Native", evidence: ["campus-mobile"] },
      { label: "WordPress/PHP", evidence: ["qative"] },
    ],
  },
  {
    id: "learning",
    level: "learning",
    skills: [{ label: "Kubernetes (Minikube)", evidence: [] }],
  },
];
