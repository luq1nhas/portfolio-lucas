# lucas.vieira: portfólio

Landing page de portfólio de **Lucas Vieira**, Desenvolvedor Full Stack especializado em IA aplicada (agentes, RAG e LLMs em produção).

> 🚧 Em construção, por etapas: **estrutura** ✅ → conteúdo → i18n → interatividade → otimização.

## Stack

| Camada    | Escolha                                                                 |
| --------- | ----------------------------------------------------------------------- |
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript strict         |
| Estilo    | Tailwind CSS v4 com tokens em CSS custom properties (tema claro/escuro) |
| i18n      | next-intl, com rotas `/pt` e `/en`, hreflang e chaves tipadas           |
| Animação  | Motion (antigo Framer Motion) e, no hero, React Three Fiber             |
| Métricas  | Vercel Analytics (sem cookies)                                          |
| Qualidade | ESLint, Prettier, `tsc`, lychee (links quebrados) no GitHub Actions     |

## Arquitetura

```
content/            dados tipados (perfil, projetos, experiências, stack)
messages/           textos de interface por idioma (pt.json, en.json)
src/
├─ proxy.ts         detecção de idioma e redirecionamento de "/" (antigo middleware)
├─ i18n/            configuração de rotas, navegação e carregamento de mensagens
├─ app/[locale]/    layout raiz por idioma e a landing page (SSG: /pt e /en)
├─ components/
│  ├─ layout/       header, navegação por âncoras, tema, idioma, rodapé
│  ├─ hero/         hero e a "rede de agentes" (SVG estático / cena 3D)
│  └─ ui/           primitivas (Section, ícones)
└─ lib/             utilitários (links, URL do site, ids das seções)
```

**Decisões**

- **Landing page de uma página só.** O header navega por âncoras e as páginas de detalhes dos projetos abrem como overlay, sem sair da página.
- **Conteúdo separado da interface.** Projetos, experiências e stack ficam em `content/` como dados tipados. Os textos de interface ficam em `messages/`. Uma chave de tradução inexistente é erro de compilação (veja `src/i18n/global.d.ts`).
- **Tema sem "piscar".** Um script inline aplica o tema salvo antes da primeira pintura. O tema padrão é o escuro.
- **Renderização estática.** As duas versões de idioma são pré-renderizadas no build.

## Como rodar

Requer Node.js 20.9 ou superior (versão do projeto em `.nvmrc`).

```bash
npm install
npm run dev          # http://localhost:3000 → redireciona para /pt ou /en
```

| Script                 | O que faz                                   |
| ---------------------- | ------------------------------------------- |
| `npm run build`        | build de produção                           |
| `npm run lint`         | ESLint                                      |
| `npm run typecheck`    | gera os tipos de rota e roda `tsc --noEmit` |
| `npm run format:check` | Prettier                                    |

### Variáveis de ambiente

| Variável               | Uso                                                                          |
| ---------------------- | ---------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | URL canônica (metadados, sitemap, Open Graph). Sem ela, usa a URL da Vercel. |

## Commits

Segue [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, `docs:`…).
