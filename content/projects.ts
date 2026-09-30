import type { Project } from "./types";

const MJV = "MJV Technology & Innovation";
const MJV_PERIOD = { pt: "2025–2026", en: "2025–2026" };

export const projects: Project[] = [
  // ── Meus projetos ─────────────────────────────────────────────────────────
  {
    slug: "nexus",
    section: "personal",
    featured: true,
    title: { pt: "Nexus", en: "Nexus" },
    tagline: { pt: "AI Study Assistant", en: "AI Study Assistant" },
    context: "personal",
    description: {
      pt: "Plataforma de estudos com agentes de IA que transforma apostilas, PDFs escaneados e imagens em planos de estudo e resumos estruturados, tudo em uma única interface de chat.",
      en: "A study platform powered by AI agents that turns course handouts, scanned PDFs and images into study plans and structured summaries, all in a single chat interface.",
    },
    stack: [
      "React 19",
      "Vite",
      "NestJS 11",
      "TypeORM",
      "PostgreSQL (Supabase)",
      "Google Gemini",
      "Tesseract.js",
      "pdfjs-dist",
      "Clerk",
      "Three.js",
    ],
    responsibilities: {
      pt: [
        "Desenvolvi o projeto completo: frontend, backend e integração com IA.",
        "Criei três agentes especializados (Plano de Estudos, Resumos e Chat Geral), com conversas por thread e contexto preservado.",
        "Construí um pipeline de ingestão que só aplica OCR quando a densidade de texto do PDF é baixa.",
        "Implementei envio multimodal (texto + imagens) ao Gemini.",
      ],
      en: [
        "Built the entire project: frontend, backend and AI integration.",
        "Created three specialized agents (Study Plan, Summaries and General Chat), with threaded conversations that preserve context.",
        "Built an ingestion pipeline that only runs OCR when a PDF's text density is low.",
        "Implemented multimodal requests (text + images) to Gemini.",
      ],
    },
    tags: ["genai", "edtech", "ocr", "fullStack"],
    flow: {
      pt: [
        "PDF, DOCX, TXT ou imagens",
        "Extração direta de texto",
        "Poucos caracteres na página? OCR com Tesseract",
        "3 agentes · Gemini multimodal",
      ],
      en: [
        "PDF, DOCX, TXT or images",
        "Direct text extraction",
        "Sparse text on the page? OCR with Tesseract",
        "3 agents · multimodal Gemini",
      ],
    },
    star: {
      situation: {
        pt: "Estudantes têm material bruto (apostilas, artigos, PDFs escaneados, prints) e precisam transformá-lo em algo estudável sem copiar texto para um chatbot genérico e reescrever o prompt toda vez.",
        en: "Students have raw material (handouts, articles, scanned PDFs, screenshots) and need to turn it into something they can study, without pasting text into a generic chatbot and rewriting the prompt every time.",
      },
      task: {
        pt: "Construir uma plataforma que gere planos de estudo e resumos a partir desse material, lidando com PDFs escaneados e imagens.",
        en: "Build a platform that generates study plans and summaries from that material, handling scanned PDFs and images.",
      },
      action: {
        pt: "Três agentes com system prompts próprios e threads com contexto; pipeline de ingestão em camadas (extração direta → avaliação de caracteres por página → OCR com pdfjs + canvas + Tesseract só quando necessário); multimodal de ponta a ponta, com as parts do Gemini na ordem correta e body de até 20 MB; NestJS modular com DTOs validados globalmente e Swagger; soft delete e índice composto (thread_id, is_active); Markdown com copiar e exportar PDF; cancelamento de geração (AbortController); login com Clerk e boas-vindas em 3D.",
        en: "Three agents with their own system prompts and context-aware threads; a layered ingestion pipeline (direct extraction → per-page character check → OCR with pdfjs + canvas + Tesseract only when needed); end-to-end multimodal support, with Gemini parts in the correct order and request bodies up to 20 MB; modular NestJS with globally validated DTOs and Swagger; soft delete and a composite index on (thread_id, is_active); Markdown output with copy and PDF export; generation cancelling (AbortController); Clerk sign-in and a 3D welcome screen.",
      },
      result: {
        pt: "Todo o fluxo de estudo em uma única interface, aceitando PDF, DOCX, TXT e imagens (até 10 arquivos de 10 MB), com OCR aplicado só quando necessário.",
        en: "The whole study workflow in a single interface, accepting PDF, DOCX, TXT and images (up to 10 files of 10 MB each), with OCR applied only when needed.",
      },
    },
    demo: { url: "https://nexus-1-yc96.onrender.com/", coldStart: true },
    source: { kind: "interview" },
  },

  // ── Contribuições ─────────────────────────────────────────────────────────
  {
    slug: "sgd-municipios",
    section: "contribution",
    title: { pt: "SGD-Municípios", en: "SGD-Municípios" },
    tagline: {
      pt: "Plataforma GovTech de Processo Eletrônico",
      en: "GovTech Digital Case Management Platform",
    },
    context: {
      org: "New Code",
      period: { pt: "Abr/2026 – Atual", en: "Apr 2026 – Present" },
    },
    description: {
      pt: "Plataforma multi-tenant de gestão eletrônica de documentos e processos para prefeituras do Tocantins, cobrindo autuação, tramitação, assinatura, busca por OCR e portal do cidadão com login gov.br.",
      en: "A multi-tenant platform for electronic document and case management used by municipalities in Tocantins, Brazil, covering case filing, routing, e-signatures, OCR-powered search and a citizen portal with gov.br sign-in.",
    },
    stack: [
      "React 19",
      "NestJS 11",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "pgvector",
      "TanStack Query",
      "Zod",
      "pg-boss",
      "Docker Compose",
      "GitHub Actions",
      "Playwright",
    ],
    responsibilities: {
      pt: [
        "Desenvolvi funcionalidades de ponta a ponta, do backend em NestJS ao frontend em React.",
        "Implementei o isolamento de dados entre municípios, com testes automatizados que o garantem.",
        "Construí a ingestão de documentos para a busca com IA, incluindo OCR e embeddings.",
        "Garanti a qualidade com testes unitários e e2e e pipelines de CI/CD.",
      ],
      en: [
        "Delivered end-to-end features, from the NestJS backend to the React frontend.",
        "Implemented data isolation between municipalities, backed by automated tests.",
        "Built document ingestion for AI-powered search, including OCR and embeddings.",
        "Ensured quality with unit and e2e tests and CI/CD pipelines.",
      ],
    },
    fullResponsibilities: {
      pt: [
        "Desenvolvi funcionalidades de ponta a ponta com NestJS, Prisma e PostgreSQL no backend e React, TanStack Query e Tailwind CSS no frontend, em TypeScript.",
        "Implementei o isolamento de dados entre municípios (multi-tenancy), com testes automatizados que o garantem.",
        "Construí a ingestão de documentos para a busca com IA, incluindo OCR e geração de embeddings.",
        "Desenvolvi as notificações, o envio de e-mails e as solicitações de assinatura de documentos.",
        "Criei relatórios operacionais com exportação CSV e controle de acesso por perfil.",
        "Implementei fluxos de autenticação e controle de acesso.",
        "Entreguei módulos centrais da gestão de processos e documentos.",
        "Melhorei a acessibilidade e a UX, com navegação por teclado e ajustes de layout responsivo.",
        "Garanti a qualidade com testes unitários e e2e (Jest, Vitest, Supertest e Playwright) e pipelines de CI/CD no GitHub Actions.",
        "Trabalhei com Scrum, Git flow, Conventional Commits e code review via Pull Requests.",
      ],
      en: [
        "Delivered end-to-end features with NestJS, Prisma and PostgreSQL on the backend and React, TanStack Query and Tailwind CSS on the frontend, in TypeScript.",
        "Implemented data isolation between municipalities (multi-tenancy), backed by automated tests.",
        "Built document ingestion for AI-powered search, including OCR and embedding generation.",
        "Developed notifications, email delivery and document signature requests.",
        "Created operational reports with CSV export and role-based access control.",
        "Implemented authentication and access control flows.",
        "Delivered core modules for case and document management.",
        "Improved accessibility and UX with keyboard navigation and responsive layout fixes.",
        "Ensured quality with unit and e2e tests (Jest, Vitest, Supertest and Playwright) and CI/CD pipelines on GitHub Actions.",
        "Worked with Scrum, Git flow, Conventional Commits and code review through pull requests.",
      ],
    },
    platformHighlights: {
      pt: [
        "Portal do cidadão com login gov.br.",
        "Busca por OCR nos documentos.",
        "Meta de acessibilidade WCAG 2.1 AA.",
        "Conformidade com a LGPD e trilha de auditoria.",
      ],
      en: [
        "Citizen portal with gov.br sign-in.",
        "OCR-powered document search.",
        "WCAG 2.1 AA accessibility target.",
        "LGPD (Brazil's data protection law) compliance and an audit trail.",
      ],
    },
    tags: [
      "govtech",
      "multiTenant",
      "aiEmbeddings",
      "fullStack",
      "accessibility",
    ],
    star: {
      situation: {
        pt: "Prefeituras do Tocantins dependiam de papel e de sistemas legados fragmentados, num contexto com exigências de LGPD e auditoria.",
        en: "Municipalities in Tocantins relied on paper and fragmented legacy systems, under data protection (LGPD) and auditing requirements.",
      },
      task: {
        pt: "Construir uma plataforma multi-tenant de processo eletrônico com isolamento total entre municípios.",
        en: "Build a multi-tenant electronic case management platform with full isolation between municipalities.",
      },
      action: "responsibilities",
      result: {
        pt: "Processo eletrônico completo para prefeituras, com isolamento de dados entre municípios coberto por testes automatizados e entregas contínuas via CI/CD.",
        en: "A complete electronic case workflow for municipalities, with data isolation between them covered by automated tests and continuous delivery through CI/CD.",
      },
    },
    source: { kind: "corporate" },
    experience: "new-code",
  },
  {
    slug: "iron",
    section: "contribution",
    title: { pt: "Iron", en: "Iron" },
    tagline: {
      pt: "Enterprise AI Agents Platform",
      en: "Enterprise AI Agents Platform",
    },
    context: { org: MJV, period: MJV_PERIOD },
    description: {
      pt: "Plataforma SaaS B2B multi-tenant que reúne agentes de IA especializados (desenvolvimento, product owner, análise de código), com chat em streaming, Kanban assistido por IA e integração com Jira, Trello, Asana e Azure DevOps.",
      en: "A multi-tenant B2B SaaS platform that brings together specialized AI agents (development, product owner, code analysis), with streaming chat, an AI-assisted Kanban board and integrations with Jira, Trello, Asana and Azure DevOps.",
    },
    stack: [
      "React 18",
      "NestJS 11",
      "TypeScript",
      "LangChain",
      "LangGraph",
      "AWS Bedrock",
      "MySQL",
      "DynamoDB",
      "Socket.IO",
      "AWS (Cognito, SQS, S3, SAM)",
      "Docker",
    ],
    responsibilities: {
      pt: [
        "Desenvolvi novas funcionalidades na plataforma como Desenvolvedor Full Stack.",
        "Investiguei e corrigi bugs.",
        "Implementei melhorias contínuas no produto.",
      ],
      en: [
        "Developed new platform features as a Full Stack Developer.",
        "Investigated and fixed bugs.",
        "Shipped continuous product improvements.",
      ],
    },
    platformHighlights: {
      pt: [
        "Respostas dos agentes em streaming, com opção de cancelar.",
        "Agentes com ferramentas: busca web, leitura de PDF, transcrição de áudio, análise de imagem e geração de documentos.",
        "Integração com Jira, Trello, Asana e Azure DevOps.",
        "Interface em 4 idiomas.",
      ],
      en: [
        "Streamed agent responses, with the option to cancel.",
        "Agents with tools: web search, PDF reading, audio transcription, image analysis and document generation.",
        "Integrations with Jira, Trello, Asana and Azure DevOps.",
        "Interface available in 4 languages.",
      ],
    },
    tags: ["genai", "aiAgents", "saasB2b", "multiTenant", "microservices"],
    star: {
      situation: {
        pt: "Empresas usavam IA “solta”, fora do fluxo de trabalho, sem controle de acesso, auditoria ou integração com as ferramentas do time.",
        en: "Companies were using AI ad hoc, outside their workflow, with no access control, auditing or integration with their team's tools.",
      },
      task: {
        pt: "Evoluir uma plataforma que coloca agentes de IA dentro do fluxo de trabalho das empresas.",
        en: "Evolve a platform that brings AI agents into companies' day-to-day workflow.",
      },
      action: {
        pt: "Novas funcionalidades, correção de bugs e melhorias contínuas como Desenvolvedor Full Stack.",
        en: "New features, bug fixes and continuous improvements as a Full Stack Developer.",
      },
      result: {
        pt: "IA operando dentro das ferramentas que as empresas já usam, com os dados de cada empresa isolados.",
        en: "AI running inside the tools companies already use, with each company's data kept isolated.",
      },
    },
    source: { kind: "corporate" },
    experience: "mjv",
  },
  {
    slug: "agente-suporte",
    section: "contribution",
    title: { pt: "Agente de Suporte Técnico", en: "Technical Support Agent" },
    context: { org: MJV, period: MJV_PERIOD },
    description: {
      pt: "Agente de IA que usa manuais e PDFs como base de conhecimento e se integra a máquinas de pagamento para acelerar integrações de software.",
      en: "An AI agent that uses manuals and PDFs as its knowledge base and connects to payment terminals to speed up software integrations.",
    },
    stack: ["NestJS", "Azure AI", "RAG", "React"],
    responsibilities: {
      pt: [
        "Desenhei e testei os system prompts do agente.",
        "Validei a base de conhecimento (manuais e PDFs).",
      ],
      en: [
        "Designed and tested the agent's system prompts.",
        "Validated the knowledge base (manuals and PDFs).",
      ],
    },
    result: {
      pt: "Integrações reduzidas de 8 semanas para 1.",
      en: "Integrations cut from 8 weeks to 1.",
    },
    tags: ["genai", "rag", "promptEngineering"],
    star: {
      situation: {
        pt: "Integrações de software com máquinas de pagamento levavam 8 semanas.",
        en: "Software integrations with payment terminals took 8 weeks.",
      },
      task: {
        pt: "Criar um agente que acelerasse essas integrações usando a documentação técnica como base de conhecimento.",
        en: "Build an agent that would speed up those integrations, using the technical documentation as its knowledge base.",
      },
      action: {
        pt: "Desenho e testes de system prompts; validação da base de conhecimento.",
        en: "Designed and tested system prompts; validated the knowledge base.",
      },
      result: {
        pt: "Integrações aceleradas de 8 semanas para 1 semana.",
        en: "Integrations sped up from 8 weeks to 1 week.",
      },
    },
    source: { kind: "corporate" },
    experience: "mjv",
  },
  {
    slug: "agente-auditoria",
    section: "contribution",
    title: { pt: "Agente de Auditoria Interna", en: "Internal Audit Agent" },
    context: { org: MJV, period: MJV_PERIOD },
    description: {
      pt: "Agente de IA que analisa documentos, reuniões e apresentações e gera Planos de Ação, Riscos e Gaps para acelerar a auditoria interna.",
      en: "An AI agent that analyzes documents, meetings and presentations and produces Action Plans, Risks and Gaps to speed up internal audits.",
    },
    stack: ["NestJS", "Azure AI", "RAG", "React"],
    responsibilities: {
      pt: [
        "Fui responsável pelo desenho e pela implementação do agente.",
        "Construí o pipeline de RAG sobre documentos, reuniões e apresentações.",
      ],
      en: [
        "Owned the design and implementation of the agent.",
        "Built the RAG pipeline over documents, meetings and presentations.",
      ],
    },
    result: {
      pt: "80% de precisão nas análises, segundo os critérios de áreas e riscos definidos em reuniões.",
      en: "80% accuracy in its analyses, measured against the area and risk criteria agreed in meetings.",
    },
    tags: ["genai", "rag", "audit"],
    star: {
      situation: {
        pt: "A auditoria interna exigia análise manual de muitos documentos, reuniões e apresentações.",
        en: "Internal audits required manually analyzing a large volume of documents, meetings and presentations.",
      },
      task: {
        pt: "Construir um agente que gerasse Planos de Ação, Riscos e Gaps a partir desses materiais.",
        en: "Build an agent that would produce Action Plans, Risks and Gaps from those materials.",
      },
      action: {
        pt: "Desenho e implementação do agente e do pipeline de RAG.",
        en: "Designed and implemented the agent and its RAG pipeline.",
      },
      result: {
        pt: "80% de precisão nas análises, de acordo com as diretrizes e os critérios de áreas e riscos definidos em reuniões.",
        en: "80% accuracy in its analyses, according to the guidelines and the area and risk criteria agreed in meetings.",
      },
    },
    source: { kind: "corporate" },
    experience: "mjv",
  },
  {
    slug: "agente-convencoes",
    section: "contribution",
    title: {
      pt: "Agente de Convenções Coletivas",
      en: "Labor Agreements Agent",
    },
    context: { org: MJV, period: MJV_PERIOD },
    description: {
      pt: "Agente de IA para consulta de leis e convenções coletivas de diferentes áreas, usando um crawler e busca semântica.",
      en: "An AI agent for looking up laws and collective bargaining agreements across different sectors, using a crawler and semantic search.",
    },
    stack: ["NestJS", "Azure AI", "RAG", "React"],
    responsibilities: {
      pt: [
        "Construí as telas da aplicação.",
        "Fiz o design da interface.",
        "Integrei o frontend à API do agente.",
      ],
      en: [
        "Built the application's screens.",
        "Designed the interface.",
        "Integrated the frontend with the agent's API.",
      ],
    },
    tags: ["genai", "semanticSearch", "frontend"],
    star: {
      situation: {
        pt: "Consultar leis e convenções coletivas de diferentes áreas era lento e disperso.",
        en: "Looking up laws and collective bargaining agreements across different sectors was slow and scattered.",
      },
      task: {
        pt: "Oferecer consulta centralizada via crawler e busca semântica.",
        en: "Provide centralized lookup through a crawler and semantic search.",
      },
      action: {
        pt: "Telas, design da interface e integração com a API.",
        en: "Screens, interface design and API integration.",
      },
      result: {
        pt: "Consulta de convenções centralizada em uma interface de busca semântica.",
        en: "Labor agreement lookup centralized in a semantic search interface.",
      },
    },
    source: { kind: "corporate" },
    experience: "mjv",
  },
  {
    slug: "cnpj-alfanumerico",
    section: "contribution",
    title: { pt: "CNPJ Alfanumérico", en: "Alphanumeric CNPJ" },
    context: { org: MJV, period: MJV_PERIOD },
    description: {
      pt: "Adaptação de sistemas ao novo CNPJ alfanumérico da Receita Federal, em vigor desde julho de 2026, com foco em performance e processamento em lote.",
      en: "Adapting systems to the new alphanumeric CNPJ (Brazil's company tax ID), issued by the Federal Revenue Service since July 2026, with a focus on performance and batch processing.",
    },
    stack: [
      "Node.js",
      "Express",
      "TypeScript",
      "MySQL",
      "Knex.js",
      "JWT",
      "Swagger",
      "Socket.IO",
    ],
    responsibilities: {
      pt: [
        "Implementei processamento em lote com filas e melhorias de performance.",
        "Desenvolvi relatórios e a integração entre frontend e backend.",
        "Tratei os estados da interface (loading, sucesso e erro) com feedback visual claro.",
        "Integrei APIs REST com foco em desempenho e segurança.",
      ],
      en: [
        "Implemented queue-based batch processing and performance improvements.",
        "Developed reports and the frontend–backend integration.",
        "Handled interface states (loading, success and error) with clear visual feedback.",
        "Integrated REST APIs with a focus on performance and security.",
      ],
    },
    tags: ["fullStack", "performance", "batchProcessing"],
    star: {
      situation: {
        pt: "A Receita Federal passou a emitir CNPJs alfanuméricos a partir de julho de 2026, exigindo adaptação dos sistemas.",
        en: "Brazil's Federal Revenue Service started issuing alphanumeric CNPJs in July 2026, requiring systems to be adapted.",
      },
      task: {
        pt: "Adaptar o sistema com foco em performance e confiabilidade.",
        en: "Adapt the system with a focus on performance and reliability.",
      },
      action: {
        pt: "Processamento em lote com filas, relatórios, integração front-back e estados de interface.",
        en: "Queue-based batch processing, reports, frontend–backend integration and interface states.",
      },
      result: {
        pt: "Sistema preparado para o novo formato, com processamento em lote.",
        en: "System ready for the new format, with batch processing.",
      },
    },
    source: { kind: "corporate" },
    experience: "mjv",
  },
  {
    slug: "max-web-v2",
    section: "contribution",
    title: { pt: "Max Web V2", en: "Max Web V2" },
    context: { org: "Max Data Sistemas", period: { pt: "2024", en: "2024" } },
    description: {
      pt: "Reescrita completa, em Angular, de um sistema corporativo de gestão empresarial, com foco em performance e interface totalmente redesenhada.",
      en: "A full Angular rewrite of a corporate business management system, focused on performance and a completely redesigned interface.",
    },
    stack: ["Angular", "TypeScript", "Bootstrap"],
    responsibilities: {
      pt: [
        "Desenvolvi telas da nova versão do sistema.",
        "Implementei otimizações de performance no frontend.",
        "Investiguei e corrigi bugs.",
      ],
      en: [
        "Built screens for the new version of the system.",
        "Implemented frontend performance optimizations.",
        "Investigated and fixed bugs.",
      ],
    },
    tags: ["frontend", "enterpriseSystem", "rewrite"],
    star: {
      situation: {
        pt: "O sistema de gestão precisava de mais performance e de uma interface atualizada.",
        en: "The management system needed better performance and an updated interface.",
      },
      task: {
        pt: "Reescrever o frontend por completo.",
        en: "Rewrite the frontend from scratch.",
      },
      action: {
        pt: "Telas, otimizações e correção de bugs como Desenvolvedor Frontend.",
        en: "Screens, optimizations and bug fixes as a Frontend Developer.",
      },
      result: {
        pt: "Nova versão em Angular, com performance otimizada e UI totalmente redesenhada.",
        en: "A new Angular version with optimized performance and a fully redesigned UI.",
      },
    },
    source: { kind: "corporate" },
    experience: "max-data",
  },
];
