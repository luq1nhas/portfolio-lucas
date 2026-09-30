import type { Localized, ProjectSlug } from "./types";

// Diagramas de arquitetura dos estudos de caso. Só projetos pessoais: a arquitetura
// de projetos de empresas é informação confidencial e não é publicada.
// Coordenadas são o centro de cada caixa.

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

export const diagrams: Partial<Record<ProjectSlug, Diagram>> = {
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
};
