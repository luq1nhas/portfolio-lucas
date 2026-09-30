# lucas.vieira: portfólio

Landing page de portfólio de **Lucas Vieira**, Desenvolvedor Full Stack especializado em IA aplicada (agentes, RAG e LLMs em produção).

> 🚧 Em construção, por etapas: **estrutura** ✅ → **conteúdo** ✅ → **i18n** ✅ → interatividade → otimização.

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
content/            dados tipados: projetos, experiências, stack (com mapa de evidências), depoimento
messages/           textos de interface por idioma (pt.json, en.json)
scripts/            verificações de build (placeholders)
src/
├─ proxy.ts         detecção de idioma e redirecionamento de "/" (antigo middleware)
├─ i18n/            configuração de rotas, navegação e carregamento de mensagens
├─ app/[locale]/    layout raiz por idioma e a landing page (SSG: /pt e /en)
│  ├─ cases/[slug]/          estudo de caso por URL direta (landing + painel aberto)
│  └─ @modal/(.)cases/[slug]/ o mesmo estudo interceptado como painel, sem sair da página
├─ components/
│  ├─ layout/       header, navegação por âncoras, tema, idioma, rodapé
│  ├─ hero/         hero e a "rede de agentes" (SVG estático / cena 3D)
│  ├─ project/      cards, filtro por categoria, painel e estudo de caso (STAR)
│  ├─ sections/     seções da landing (sobre, projetos, experiência, stack…)
│  └─ ui/           primitivas (Section, ícones)
└─ lib/             utilitários (links, URL do site, ids das seções)
```

**Decisões**

- **Landing page de uma página só.** O header navega por âncoras. "Ver detalhes" abre o estudo de caso num painel por cima da página, usando rotas paralelas + interceptadas: o painel tem URL própria (`/pt/cases/nexus`), que pode ser compartilhada e é contada como visualização pelo Vercel Analytics sem eventos pagos. Acesso direto pela URL renderiza a landing com o painel aberto.
- **Mapa de evidências.** Cada skill em `content/skills.ts` aponta para os projetos e experiências em que foi usada. Clicar numa tecnologia mostra essa prova de uso. Skill sem evidência não é exibida (exceto "Em aprendizado").
- **Placeholders explícitos.** Informação pendente é marcada com `pending("NOME")`: aparece como {{NOME}} em desenvolvimento e some em produção. O script `check:placeholders` falha a CI se algum chegar ao HTML final.
- **Conteúdo separado da interface.** Projetos, experiências e stack ficam em `content/` como dados tipados. Os textos de interface ficam em `messages/`. Uma chave de tradução inexistente é erro de compilação (veja `src/i18n/global.d.ts`).
- **Internacionalização.** Idioma inicial pelo navegador (`Accept-Language`), preferência lembrada em cookie por 1 ano e troca sem recarregar. Cada página tem hreflang e `x-default`, e o sitemap lista as duas versões. `check:i18n` falha a CI se `pt.json` e `en.json` divergirem em chaves ou variáveis; no conteúdo, o tipo `Localized<T>` obriga as duas línguas.
- **Imagens de compartilhamento.** Uma imagem Open Graph por idioma e por estudo de caso, gerada no build com `next/og`, na fonte Geist e com a mesma rede de agentes do hero (`src/components/hero/network.ts`).
- **Tema sem "piscar".** Um script inline aplica o tema salvo antes da primeira pintura. O tema padrão é o escuro.
- **Renderização estática.** As duas versões de idioma são pré-renderizadas no build.

## Como rodar

Requer Node.js 20.9 ou superior (versão do projeto em `.nvmrc`).

```bash
npm install
npm run dev          # http://localhost:3000 → redireciona para /pt ou /en
```

| Script                       | O que faz                                   |
| ---------------------------- | ------------------------------------------- |
| `npm run build`              | build de produção                           |
| `npm run lint`               | ESLint                                      |
| `npm run typecheck`          | gera os tipos de rota e roda `tsc --noEmit` |
| `npm run format:check`       | Prettier                                    |
| `npm run check:placeholders` | falha se houver {{placeholder}} no build    |
| `npm run check:i18n`         | falha se pt.json e en.json divergirem       |

### Variáveis de ambiente

| Variável               | Uso                                                                          |
| ---------------------- | ---------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | URL canônica (metadados, sitemap, Open Graph). Sem ela, usa a URL da Vercel. |

## Commits

Segue [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, `docs:`…).
