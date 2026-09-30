import type { Localized, ProjectSlug } from "./types";

// Diagramas de arquitetura dos estudos de caso. Nível alto, só com componentes
// citados no brief, sem dados sensíveis. Coordenadas são o centro de cada caixa.

export type DiagramNode = {
  id: string;
  label: string | Localized;
  sub?: string | Localized;
  x: number;
  y: number;
  /** Largura da caixa (padrão 170). */
  w?: number;
  kind: "client" | "service" | "ai" | "data" | "external";
  /** Parte em que o Lucas atuou (usado quando a atuação foi parcial). */
  mine?: boolean;
};

export type DiagramEdge = {
  from: string;
  to: string;
  label?: string | Localized;
  /** Fluxo principal: exibe sinal animado percorrendo a aresta. */
  flow?: boolean;
  /** Relação opcional ou condicional (tracejada). */
  optional?: boolean;
};

export type Diagram = {
  width: number;
  height: number;
  caption: Localized;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
};

export const diagrams: Record<ProjectSlug, Diagram> = {
  nexus: {
    width: 720,
    height: 400,
    caption: {
      pt: "O upload passa por extração direta; só páginas com pouco texto vão para OCR. O conteúdo chega aos três agentes, que chamam o Gemini com texto e imagens.",
      en: "Uploads go through direct extraction; only pages with little text are sent to OCR. The content reaches the three agents, which call Gemini with text and images.",
    },
    nodes: [
      {
        id: "web",
        label: "React 19 + Vite",
        sub: "chat · Clerk · Three.js",
        x: 110,
        y: 60,
        kind: "client",
      },
      {
        id: "api",
        label: "NestJS 11",
        sub: "DTOs · Swagger",
        x: 360,
        y: 60,
        kind: "service",
      },
      {
        id: "db",
        label: "PostgreSQL",
        sub: "Supabase · TypeORM",
        x: 610,
        y: 60,
        kind: "data",
      },
      {
        id: "extract",
        label: { pt: "Extração direta", en: "Direct extraction" },
        sub: "pdfjs-dist",
        x: 110,
        y: 200,
        kind: "service",
      },
      {
        id: "density",
        label: { pt: "Densidade de texto", en: "Text density" },
        sub: { pt: "por página", en: "per page" },
        x: 360,
        y: 200,
        kind: "service",
      },
      {
        id: "ocr",
        label: "OCR",
        sub: "canvas + Tesseract.js",
        x: 610,
        y: 200,
        kind: "service",
      },
      {
        id: "agents",
        label: { pt: "3 agentes", en: "3 agents" },
        sub: { pt: "plano · resumos · chat", en: "plan · summaries · chat" },
        x: 360,
        y: 340,
        kind: "ai",
      },
      {
        id: "gemini",
        label: "Google Gemini",
        sub: { pt: "multimodal", en: "multimodal" },
        x: 610,
        y: 340,
        kind: "external",
      },
    ],
    edges: [
      { from: "web", to: "api", flow: true },
      { from: "api", to: "db" },
      { from: "api", to: "extract", flow: true },
      { from: "extract", to: "density", flow: true },
      {
        from: "density",
        to: "ocr",
        optional: true,
        label: { pt: "pouco texto", en: "sparse text" },
      },
      { from: "density", to: "agents", flow: true },
      { from: "ocr", to: "agents", optional: true },
      {
        from: "agents",
        to: "gemini",
        flow: true,
        label: { pt: "texto + imagens", en: "text + images" },
      },
    ],
  },

  "sgd-municipios": {
    width: 720,
    height: 450,
    caption: {
      pt: "SPA e portal do cidadão consomem um monólito modular em NestJS. O PostgreSQL isola cada município com Row-Level Security. Filas no pg-boss processam a ingestão para IA (OCR → chunking → embeddings locais), e-mails e assinaturas. O deploy sai do GitHub Actions para uma VPS com Docker Compose.",
      en: "The SPA and the citizen portal talk to a modular NestJS monolith. PostgreSQL isolates each municipality with Row-Level Security. pg-boss queues handle AI ingestion (OCR → chunking → local embeddings), emails and signatures. Deployment goes from GitHub Actions to a VPS running Docker Compose.",
    },
    nodes: [
      {
        id: "citizen",
        label: { pt: "Portal do cidadão", en: "Citizen portal" },
        sub: { pt: "login gov.br", en: "gov.br sign-in" },
        x: 110,
        y: 60,
        kind: "client",
      },
      {
        id: "spa",
        label: "React 19 SPA",
        sub: "TanStack Query · Zod",
        x: 360,
        y: 60,
        kind: "client",
      },
      {
        id: "ci",
        label: "GitHub Actions",
        sub: "CI/CD",
        x: 610,
        y: 60,
        kind: "external",
      },
      {
        id: "api",
        label: "NestJS",
        sub: { pt: "monólito modular", en: "modular monolith" },
        x: 360,
        y: 185,
        kind: "service",
      },
      {
        id: "vps",
        label: "VPS",
        sub: "Docker Compose",
        x: 610,
        y: 185,
        kind: "external",
      },
      {
        id: "db",
        label: "PostgreSQL",
        sub: { pt: "RLS por município", en: "RLS per municipality" },
        x: 110,
        y: 310,
        kind: "data",
      },
      {
        id: "queue",
        label: "pg-boss",
        sub: { pt: "filas com retry", en: "queues with retry" },
        x: 360,
        y: 310,
        kind: "service",
      },
      {
        id: "ingest",
        label: { pt: "Ingestão para IA", en: "AI ingestion" },
        sub: "OCR → chunking → embeddings",
        x: 600,
        y: 310,
        w: 222,
        kind: "ai",
      },
      {
        id: "mail",
        label: { pt: "E-mail · assinaturas", en: "Email · signatures" },
        sub: "SMTP",
        x: 360,
        y: 410,
        kind: "service",
      },
      {
        id: "vector",
        label: "pgvector",
        sub: { pt: "embeddings locais", en: "local embeddings" },
        x: 610,
        y: 410,
        kind: "data",
      },
    ],
    edges: [
      { from: "citizen", to: "api", flow: true },
      { from: "spa", to: "api", flow: true },
      { from: "api", to: "db", flow: true, label: "RLS" },
      { from: "api", to: "queue", flow: true },
      { from: "queue", to: "ingest", flow: true },
      { from: "queue", to: "mail" },
      { from: "ingest", to: "vector", flow: true },
      { from: "ci", to: "vps", optional: true, label: "deploy" },
      { from: "vps", to: "api", optional: true },
    ],
  },

  iron: {
    width: 720,
    height: 450,
    caption: {
      pt: "O frontend recebe respostas em streaming da API NestJS, que aplica guards multi-tenant. Um microsserviço de IA em Clean Architecture orquestra os agentes com LangChain/LangGraph sobre o AWS Bedrock e aciona tools.",
      en: "The frontend receives streamed responses from the NestJS API, which enforces multi-tenant guards. An AI microservice built with Clean Architecture orchestrates agents with LangChain/LangGraph on AWS Bedrock and calls tools.",
    },
    nodes: [
      {
        id: "web",
        label: "React 18",
        sub: { pt: "chat · Kanban com IA", en: "chat · AI Kanban" },
        x: 110,
        y: 60,
        kind: "client",
      },
      {
        id: "auth",
        label: "AWS Cognito",
        sub: { pt: "autenticação", en: "authentication" },
        x: 610,
        y: 60,
        kind: "external",
      },
      {
        id: "api",
        label: "NestJS 11",
        sub: { pt: "guards multi-tenant", en: "multi-tenant guards" },
        x: 360,
        y: 185,
        kind: "service",
      },
      {
        id: "integrations",
        label: "Jira · Trello · Asana",
        sub: "Azure DevOps",
        x: 610,
        y: 185,
        kind: "external",
      },
      { id: "data", label: "MySQL · DynamoDB", x: 110, y: 310, kind: "data" },
      {
        id: "ai",
        label: { pt: "Microsserviço de IA", en: "AI microservice" },
        sub: "LangChain · LangGraph",
        x: 360,
        y: 310,
        kind: "ai",
      },
      {
        id: "bedrock",
        label: "AWS Bedrock",
        sub: "LLMs",
        x: 610,
        y: 310,
        kind: "external",
      },
      {
        id: "infra",
        label: "SQS · S3",
        sub: "AWS SAM",
        x: 110,
        y: 410,
        kind: "external",
      },
      {
        id: "tools",
        label: "Tools",
        sub: {
          pt: "web · PDF · áudio · imagem",
          en: "web · PDF · audio · image",
        },
        x: 360,
        y: 410,
        w: 200,
        kind: "ai",
      },
    ],
    edges: [
      { from: "web", to: "api", flow: true, label: "SSE · Socket.IO" },
      { from: "web", to: "auth", optional: true },
      { from: "api", to: "integrations" },
      { from: "api", to: "data" },
      { from: "api", to: "ai", flow: true },
      { from: "ai", to: "bedrock", flow: true },
      { from: "ai", to: "tools", flow: true },
      { from: "api", to: "infra", optional: true },
    ],
  },

  "agente-suporte": {
    width: 720,
    height: 270,
    caption: {
      pt: "O agente responde com RAG sobre manuais e PDFs, guiado por system prompts, e se integra às máquinas de pagamento. Destacados: a base de conhecimento que validei e os prompts que desenhei e testei.",
      en: "The agent answers with RAG over manuals and PDFs, guided by system prompts, and connects to payment terminals. Highlighted: the knowledge base I validated and the prompts I designed and tested.",
    },
    nodes: [
      { id: "web", label: "React", x: 110, y: 60, kind: "client" },
      { id: "api", label: "NestJS", x: 360, y: 60, kind: "service" },
      {
        id: "pos",
        label: { pt: "Máquinas de pagamento", en: "Payment terminals" },
        x: 610,
        y: 60,
        w: 190,
        kind: "external",
      },
      {
        id: "kb",
        label: { pt: "Base de conhecimento", en: "Knowledge base" },
        sub: { pt: "manuais e PDFs", en: "manuals and PDFs" },
        x: 110,
        y: 200,
        w: 180,
        kind: "data",
        mine: true,
      },
      { id: "rag", label: "RAG", sub: "Azure AI", x: 360, y: 200, kind: "ai" },
      {
        id: "prompts",
        label: "System prompts",
        x: 610,
        y: 200,
        kind: "ai",
        mine: true,
      },
    ],
    edges: [
      { from: "web", to: "api", flow: true },
      { from: "api", to: "rag", flow: true },
      { from: "kb", to: "rag", flow: true },
      { from: "prompts", to: "rag" },
      { from: "api", to: "pos" },
    ],
  },

  "agente-auditoria": {
    width: 720,
    height: 270,
    caption: {
      pt: "Documentos, reuniões e apresentações alimentam o pipeline de RAG, que gera Planos de Ação, Riscos e Gaps. Destacado: o agente e o pipeline, que desenhei e implementei.",
      en: "Documents, meetings and presentations feed the RAG pipeline, which produces Action Plans, Risks and Gaps. Highlighted: the agent and pipeline I designed and implemented.",
    },
    nodes: [
      {
        id: "docs",
        label: { pt: "Documentos", en: "Documents" },
        x: 110,
        y: 50,
        kind: "data",
      },
      {
        id: "meetings",
        label: { pt: "Reuniões", en: "Meetings" },
        x: 110,
        y: 135,
        kind: "data",
      },
      {
        id: "slides",
        label: { pt: "Apresentações", en: "Presentations" },
        x: 110,
        y: 220,
        kind: "data",
      },
      {
        id: "rag",
        label: { pt: "Agente + RAG", en: "Agent + RAG" },
        sub: "Azure AI · NestJS",
        x: 360,
        y: 135,
        w: 180,
        kind: "ai",
        mine: true,
      },
      {
        id: "plans",
        label: { pt: "Planos de Ação", en: "Action Plans" },
        x: 610,
        y: 50,
        kind: "client",
      },
      {
        id: "risks",
        label: { pt: "Riscos", en: "Risks" },
        x: 610,
        y: 135,
        kind: "client",
      },
      { id: "gaps", label: "Gaps", x: 610, y: 220, kind: "client" },
    ],
    edges: [
      { from: "docs", to: "rag", flow: true },
      { from: "meetings", to: "rag", flow: true },
      { from: "slides", to: "rag", flow: true },
      { from: "rag", to: "plans", flow: true },
      { from: "rag", to: "risks", flow: true },
      { from: "rag", to: "gaps", flow: true },
    ],
  },

  "agente-convencoes": {
    width: 720,
    height: 270,
    caption: {
      pt: "Um crawler coleta leis e convenções coletivas, consultadas por busca semântica. Destacada: a interface em React, que desenhei, construí e integrei à API do agente.",
      en: "A crawler collects laws and collective bargaining agreements, which are queried through semantic search. Highlighted: the React interface I designed, built and integrated with the agent's API.",
    },
    nodes: [
      {
        id: "ui",
        label: "React",
        sub: { pt: "telas e interface", en: "screens and UI" },
        x: 110,
        y: 60,
        kind: "client",
        mine: true,
      },
      {
        id: "api",
        label: "NestJS",
        sub: { pt: "API do agente", en: "agent API" },
        x: 360,
        y: 60,
        kind: "service",
      },
      {
        id: "search",
        label: { pt: "Busca semântica", en: "Semantic search" },
        sub: "Azure AI · RAG",
        x: 610,
        y: 60,
        kind: "ai",
      },
      { id: "crawler", label: "Crawler", x: 360, y: 200, kind: "service" },
      {
        id: "corpus",
        label: { pt: "Leis e convenções", en: "Laws and agreements" },
        x: 610,
        y: 200,
        w: 180,
        kind: "data",
      },
    ],
    edges: [
      { from: "ui", to: "api", flow: true },
      { from: "api", to: "search", flow: true },
      { from: "crawler", to: "corpus", flow: true },
      { from: "corpus", to: "search" },
    ],
  },

  "cnpj-alfanumerico": {
    width: 720,
    height: 270,
    caption: {
      pt: "O frontend consome uma API Express com JWT e Swagger. O processamento em lote roda em filas e grava no MySQL via Knex.js.",
      en: "The frontend consumes an Express API with JWT and Swagger. Batch processing runs on queues and writes to MySQL through Knex.js.",
    },
    nodes: [
      {
        id: "ui",
        label: "Frontend",
        sub: {
          pt: "loading · sucesso · erro",
          en: "loading · success · error",
        },
        x: 110,
        y: 60,
        w: 190,
        kind: "client",
      },
      {
        id: "api",
        label: "Express + TypeScript",
        sub: "JWT · Swagger",
        x: 360,
        y: 60,
        w: 190,
        kind: "service",
      },
      {
        id: "reports",
        label: { pt: "Relatórios", en: "Reports" },
        x: 610,
        y: 60,
        kind: "client",
      },
      {
        id: "batch",
        label: { pt: "Processamento em lote", en: "Batch processing" },
        sub: { pt: "filas", en: "queues" },
        x: 360,
        y: 200,
        w: 190,
        kind: "service",
      },
      {
        id: "db",
        label: "MySQL",
        sub: "Knex.js",
        x: 610,
        y: 200,
        kind: "data",
      },
    ],
    edges: [
      { from: "ui", to: "api", flow: true, label: "REST · Socket.IO" },
      { from: "api", to: "reports" },
      { from: "api", to: "batch", flow: true },
      { from: "batch", to: "db", flow: true },
    ],
  },

  "max-web-v2": {
    width: 720,
    height: 270,
    caption: {
      pt: "Reescrita do frontend em Angular, com a aplicação dividida em módulos independentes.",
      en: "Frontend rewrite in Angular, with the application split into independent modules.",
    },
    nodes: [
      {
        id: "shell",
        label: "Angular",
        sub: { pt: "nova arquitetura", en: "new architecture" },
        x: 360,
        y: 60,
        kind: "client",
      },
      {
        id: "m1",
        label: { pt: "Módulo", en: "Module" },
        sub: { pt: "independente", en: "independent" },
        x: 150,
        y: 200,
        kind: "service",
      },
      {
        id: "m2",
        label: { pt: "Módulo", en: "Module" },
        sub: { pt: "independente", en: "independent" },
        x: 360,
        y: 200,
        kind: "service",
      },
      {
        id: "m3",
        label: { pt: "Módulo", en: "Module" },
        sub: { pt: "independente", en: "independent" },
        x: 570,
        y: 200,
        kind: "service",
      },
    ],
    edges: [
      { from: "shell", to: "m1", flow: true },
      { from: "shell", to: "m2", flow: true },
      { from: "shell", to: "m3", flow: true },
    ],
  },
};
