import type { Experience } from "./types";

/** Linha do tempo, da mais recente para a mais antiga. */
export const experience: Experience[] = [
  {
    id: "new-code",
    role: { pt: "Desenvolvedor Full Stack", en: "Full Stack Developer" },
    org: "New Code",
    period: { pt: "Abr/2026 – Atual", en: "Apr 2026 – Present" },
    start: "2026-04",
    badge: { pt: "PJ", en: "Contractor" },
    bullets: {
      pt: [
        "Desenvolvimento de ponta a ponta no SGD-Municípios, plataforma GovTech de processo eletrônico para prefeituras do Tocantins.",
        "Multi-tenancy com Row-Level Security, pipeline de IA (OCR → chunking → embeddings), filas assíncronas, CI/CD e deploy com Docker Compose.",
      ],
      en: [
        "End-to-end development on SGD-Municípios, a GovTech digital case management platform for municipalities in Tocantins, Brazil.",
        "Multi-tenancy with Row-Level Security, an AI pipeline (OCR → chunking → embeddings), async queues, CI/CD and deployment with Docker Compose.",
      ],
    },
    projects: ["sgd-municipios"],
    parallelWith: "mjv",
  },
  {
    id: "mjv",
    role: { pt: "Desenvolvedor Full Stack", en: "Full Stack Developer" },
    org: "MJV Technology & Innovation",
    period: { pt: "Jul/2025 – Jul/2026", en: "Jul 2025 – Jul 2026" },
    start: "2025-07",
    end: "2026-07",
    bullets: {
      pt: [
        "Desenvolveu agentes de IA com Azure OpenAI e LangChain que reduziram o tempo de integração de software de 8 semanas para 1 semana.",
        "Alcançou 80% de precisão em análises de auditoria com agentes especializados.",
        "Engenharia de prompt: criação e otimização de system prompts.",
        "Backend com NestJS/TypeScript e frontend com React e Tailwind CSS.",
        "SOLID e design patterns; times ágeis (Scrum/Kanban); Git/GitLab.",
      ],
      en: [
        "Built AI agents with Azure OpenAI and LangChain that cut software integration time from 8 weeks to 1 week.",
        "Reached 80% accuracy in audit analyses with specialized agents.",
        "Prompt engineering: writing and optimizing system prompts.",
        "Backend with NestJS/TypeScript and frontend with React and Tailwind CSS.",
        "SOLID and design patterns; agile teams (Scrum/Kanban); Git/GitLab.",
      ],
    },
    projects: [
      "iron",
      "agente-suporte",
      "agente-auditoria",
      "agente-convencoes",
      "cnpj-alfanumerico",
    ],
    parallelWith: "new-code",
  },
  {
    id: "ciandt",
    role: {
      pt: "Desenvolvedor de Sistemas Interno",
      en: "Internal Systems Developer",
    },
    org: "CI&T",
    period: { pt: "Mar/2025 – Jul/2025", en: "Mar 2025 – Jul 2025" },
    start: "2025-03",
    end: "2025-07",
    bullets: {
      pt: [
        "Sistemas web com Next.js, NestJS e Spring Boot.",
        "Clean code e SOLID em uma aplicação de gestão para supervisores.",
        "Contribuiu na arquitetura de um BFF (Backend for Frontend) com Quarkus e Vue.js, focado em desacoplamento e escalabilidade.",
      ],
      en: [
        "Web systems with Next.js, NestJS and Spring Boot.",
        "Clean code and SOLID in a management application for supervisors.",
        "Contributed to the architecture of a BFF (Backend for Frontend) with Quarkus and Vue.js, focused on decoupling and scalability.",
      ],
    },
  },
  {
    id: "max-data",
    role: { pt: "Desenvolvedor Frontend", en: "Frontend Developer" },
    org: "Max Data Sistemas",
    period: { pt: "Jul/2024 – Fev/2025", en: "Jul 2024 – Feb 2025" },
    start: "2024-07",
    end: "2025-02",
    bullets: {
      pt: [
        "Telas, otimizações e correção de bugs na reescrita do Max Web V2 em Angular.",
        "Suporte crítico à automação comercial (questões financeiras e legais).",
      ],
      en: [
        "Screens, optimizations and bug fixes in the Angular rewrite of Max Web V2.",
        "Critical support for retail automation (financial and legal issues).",
      ],
    },
    projects: ["max-web-v2"],
  },
  {
    id: "campus-mobile",
    role: { pt: "Participante", en: "Participant" },
    org: "Campus Mobile Claro",
    period: { pt: "2024", en: "2024" },
    start: "2024",
    bullets: {
      pt: [
        "Desenvolveu o TEAMO, app em React Native para inclusão e segurança de crianças com TEA.",
      ],
      en: [
        "Built TEAMO, a React Native app for the inclusion and safety of children with autism spectrum disorder (ASD).",
      ],
    },
  },
  {
    id: "qative",
    role: { pt: "Desenvolvedor de Sites", en: "Website Developer" },
    org: "qAtive Tecnologia e Marketing",
    period: { pt: "Nov/2023 – Abr/2024", en: "Nov 2023 – Apr 2024" },
    start: "2023-11",
    end: "2024-04",
    bullets: {
      pt: [
        "Sites em WordPress e PHP; criou modelo de receita recorrente com contratos de manutenção e identidades visuais.",
      ],
      en: [
        "WordPress and PHP websites; created a recurring revenue model with maintenance contracts and visual identity work.",
      ],
    },
  },
];
