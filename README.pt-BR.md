# lucas.vieira: portfólio

[English](README.md) · **Português**

Landing page de portfólio de **Lucas Vieira**, Desenvolvedor Full Stack especializado em IA aplicada (agentes, RAG e LLMs em produção), em português e inglês.

<!-- No ar: adicionar a URL de produção aqui depois do primeiro deploy. -->

| Lighthouse (celular, 4G simulado) | Lighthouse (desktop)  | Acessibilidade (axe-core)  |
| --------------------------------- | --------------------- | -------------------------- |
| 94 · 100 · 100 · 100              | 100 · 100 · 100 · 100 | 0 violações de WCAG 2.2 AA |

<sub>Desempenho · Acessibilidade · Boas práticas · SEO, medidos no build de produção de `/pt` e `/en`. A CI falha abaixo de 90 em qualquer categoria.</sub>

## Stack

| Camada    | Escolha                                                                 |
| --------- | ----------------------------------------------------------------------- |
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript strict         |
| Estilo    | Tailwind CSS v4 com tokens em CSS custom properties (tema claro/escuro) |
| i18n      | next-intl: rotas `/pt` e `/en`, hreflang e chaves de tradução tipadas   |
| Métricas  | Vercel Analytics (sem cookies)                                          |
| Qualidade | ESLint, Prettier, Vitest, Playwright + axe-core, Lighthouse CI, lychee  |

## Arquitetura

```
content/               dados tipados: projetos, experiências, stack (com mapa de evidências),
                       diagramas de arquitetura e recomendação, nas duas línguas
messages/              textos de interface por idioma (pt.json, en.json)
e2e/                   testes Playwright: fluxos, i18n, links e acessibilidade
scripts/               verificações de build (placeholders, paridade das traduções)
src/
├─ proxy.ts            detecção de idioma e redirecionamento de "/" (antigo middleware)
├─ i18n/               rotas, navegação e carregamento de mensagens
├─ app/[locale]/       layout raiz por idioma e a landing page (SSG)
│  ├─ cases/[slug]/            estudo de caso por URL direta (landing + painel aberto)
│  ├─ @modal/(.)cases/[slug]/  o mesmo estudo interceptado como painel
│  └─ opengraph-image.tsx      imagem de compartilhamento por idioma (e por estudo)
├─ components/
│  ├─ layout/          header, navegação por âncoras, tema, idioma, rodapé
│  ├─ hero/            hero; network.ts guarda a "rede de agentes" das imagens de compartilhamento
│  ├─ project/         cards, filtro, painel do estudo de caso, diagramas
│  ├─ sections/        seções da landing (sobre, projetos, experiência, stack…)
│  └─ ui/              primitivas (Section, pílulas, ícones, placeholder)
└─ lib/                utilitários (links, URL do site, imagens Open Graph)
```

### Decisões

- **Uma página só, com detalhes linkáveis.** O header rola até as âncoras. "Ver detalhes" abre o estudo de caso num painel por cima da página, com rotas paralelas + interceptadas: cada estudo tem URL própria (`/pt/cases/nexus`), que pode ser compartilhada e conta como visualização no Vercel Analytics, sem eventos pagos. Abrir essa URL direto renderiza a landing com o painel aberto.
- **Mapa de evidências.** Cada skill em `content/skills.ts` aponta para os projetos e experiências em que foi usada; clicar numa tecnologia mostra essa prova. Skill sem evidência não é exibida (exceto "Em aprendizado").
- **Placeholders explícitos.** Informação pendente é marcada com `pending("NOME")`: aparece como `{{NOME}}` em desenvolvimento e some em produção. `check:placeholders` e um teste e2e falham a CI se algum chegar ao HTML final.
- **Conteúdo separado da interface.** Projetos, experiências e stack ficam em `content/` como dados tipados; os textos de interface, em `messages/`. Chave de tradução inexistente é erro de compilação, `Localized<T>` obriga as duas línguas no conteúdo e `check:i18n` detecta divergência de chaves ou variáveis entre `pt.json` e `en.json`.
- **Sem animações.** Escolha deliberada para um portfólio profissional: o conteúdo é estático e aparece de imediato, os estados de hover mudam na hora e as âncoras vão direto para a seção.
- **Diagramas de arquitetura só em projetos pessoais.** `content/diagrams.ts` descreve componentes e fluxos como dados; o SVG destaca o fluxo principal e as conexões do componente sob o cursor. Projetos de empresas nunca mostram arquitetura: o estudo de caso descreve o que eu fiz e recursos públicos do produto, sem métricas internas nem detalhes de segurança.
- **Primeira pintura rápida.** As duas línguas são pré-renderizadas no build, o CSS vai embutido no HTML (sem requisição bloqueante), só a fonte principal é pré-carregada e só os namespaces de tradução usados no cliente são enviados ao navegador.
- **Imagens de compartilhamento.** Uma imagem Open Graph por idioma e por estudo de caso, gerada no build com `next/og`, na fonte Geist e com o visual da "rede de agentes".

## Como rodar

Requer Node.js 20.9 ou superior (versão fixada em `.nvmrc`).

```bash
npm install
npm run dev            # http://localhost:3000 → redireciona para /pt ou /en
```

| Script                       | O que faz                                                 |
| ---------------------------- | --------------------------------------------------------- |
| `npm run build`              | build de produção                                         |
| `npm run lint`               | ESLint                                                    |
| `npm run typecheck`          | gera os tipos de rota e roda `tsc --noEmit`               |
| `npm run format:check`       | Prettier                                                  |
| `npm test`                   | Vitest: regras do brief verificadas sobre `content/`      |
| `npm run test:e2e`           | Playwright + axe-core contra o build de produção          |
| `npm run test:hydration`     | erros de hidratação contra o `next dev` (o seu, na :3000) |
| `npm run check:i18n`         | falha se `pt.json` e `en.json` divergirem                 |
| `npm run check:placeholders` | falha se houver `{{placeholder}}` no HTML de produção     |

`npm run test:e2e` precisa de um `npm run build` antes; ele sobe o próprio servidor na porta 3100.

### Variáveis de ambiente

| Variável               | Uso                                                                          |
| ---------------------- | ---------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | URL canônica (metadados, sitemap, Open Graph). Sem ela, usa a URL da Vercel. |

## CI

Cada push e pull request roda, em ordem: formatação, lint, tipos, paridade das traduções, testes unitários, build, verificação de placeholders, links quebrados (lychee), testes e2e e de acessibilidade (Playwright + axe-core, desktop e celular), checagem de hidratação contra o `next dev` e Lighthouse CI (mínimo de 90 em todas as categorias). Pull requests também validam [Conventional Commits](https://www.conventionalcommits.org/).

## Deploy

Pronto para a Vercel sem configuração: basta importar o repositório e, quando houver domínio próprio, definir `NEXT_PUBLIC_SITE_URL`.
