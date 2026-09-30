# lucas.vieira: portfolio

**English** · [Português](README.pt-BR.md)

Single-page portfolio for **Lucas Vieira**, a Full Stack Developer specialized in applied AI (agents, RAG and LLMs in production), available in Portuguese and English.

<!-- Live: add the production URL here after the first deploy. -->

| Lighthouse (mobile, simulated 4G) | Lighthouse (desktop)  | Accessibility (axe-core) |
| --------------------------------- | --------------------- | ------------------------ |
| 94 · 100 · 100 · 100              | 100 · 100 · 100 · 100 | 0 WCAG 2.2 AA violations |

<sub>Performance · Accessibility · Best Practices · SEO, measured on the production build for `/pt` and `/en`. CI fails below 90 in any category.</sub>

## Stack

| Layer       | Choice                                                                          |
| ----------- | ------------------------------------------------------------------------------- |
| Framework   | Next.js 16 (App Router, Turbopack), React 19, strict TypeScript                 |
| Styling     | Tailwind CSS v4 with design tokens as CSS custom properties (light/dark themes) |
| i18n        | next-intl: `/pt` and `/en` routes, hreflang, type-checked message keys          |
| Motion & 3D | Motion (formerly Framer Motion) and React Three Fiber in the hero               |
| Analytics   | Vercel Analytics (cookie-free)                                                  |
| Quality     | ESLint, Prettier, Vitest, Playwright + axe-core, Lighthouse CI, lychee          |

## Architecture

```
content/               typed data: projects, experience, skills (with evidence map),
                       architecture diagrams and testimonial, in both languages
messages/              UI strings per language (pt.json, en.json)
e2e/                   Playwright tests: flows, i18n, links and accessibility
scripts/               build checks (placeholders, translation parity)
src/
├─ proxy.ts            language detection and "/" redirect (formerly middleware)
├─ i18n/               routing, navigation and message loading
├─ app/[locale]/       per-language root layout and the landing page (SSG)
│  ├─ cases/[slug]/            case study by direct URL (landing + open panel)
│  ├─ @modal/(.)cases/[slug]/  the same case study intercepted as an overlay
│  └─ opengraph-image.tsx      share image per language (and per case study)
├─ components/
│  ├─ layout/          header, anchor navigation, theme, language, footer
│  ├─ hero/            hero and the "agent network" (SVG + lazy 3D scene)
│  ├─ project/         cards, category filter, case study panel, diagrams
│  ├─ sections/        landing sections (about, projects, experience, stack…)
│  └─ ui/              primitives (Section, pills, icons, placeholder)
└─ lib/                helpers (links, site URL, Open Graph rendering)
```

### Key decisions

- **One page, deep-linkable details.** The header scrolls to anchors. "View details" opens the case study as an overlay using parallel + intercepting routes, so each case has its own URL (`/en/cases/nexus`) that can be shared and is counted as a page view by Vercel Analytics, with no paid custom events. Opening that URL directly renders the landing page with the panel already open.
- **Evidence map.** Every skill in `content/skills.ts` points to the projects and roles where it was used; clicking a technology shows that proof. Skills without evidence are not rendered (except "Currently learning").
- **Explicit placeholders.** Missing information is marked with `pending("NAME")`: shown as `{{NAME}}` in development, omitted in production. `check:placeholders` and an e2e test fail CI if one reaches the final HTML.
- **Content separate from UI.** Projects, roles and skills live in `content/` as typed data; UI strings live in `messages/`. A missing translation key is a compile error, `Localized<T>` forces both languages in content, and `check:i18n` catches key or variable drift between `pt.json` and `en.json`.
- **Interactivity that costs nothing to those who don't need it.** The 3D hero only loads on desktop with WebGL, no reduced-motion preference, no data saver and at least 4 CPU cores. three.js ships in a separate chunk downloaded after load (≈238 KB gzipped, 0 KB on mobile). Everywhere else, the same network is rendered as SVG, which is also the first frame. The scene pauses when off screen.
- **Animations never hide content.** Section reveals use CSS + IntersectionObserver and only hide anything when JS is present (a `js` class set before first paint); the hero is never animated. Motion is loaded through `LazyMotion`, so the animation features arrive after the page is interactive. Everything respects `prefers-reduced-motion`.
- **Architecture diagrams as data.** `content/diagrams.ts` describes components and flows at a high level (no sensitive details). The SVG animates the main flow and highlights connections on hover; where my role was partial, the parts I built are marked.
- **Fast first paint.** Both languages are statically prerendered, CSS is inlined (no render-blocking request), only the main font is preloaded, and only the translation namespaces used by client components are sent to the browser.
- **Share images.** One Open Graph image per language and per case study, generated at build time with `next/og`, using Geist and the same network as the hero.

## Running locally

Requires Node.js 20.9+ (the project pins its version in `.nvmrc`).

```bash
npm install
npm run dev            # http://localhost:3000 → redirects to /pt or /en
```

| Script                       | What it does                                           |
| ---------------------------- | ------------------------------------------------------ |
| `npm run build`              | production build                                       |
| `npm run lint`               | ESLint                                                 |
| `npm run typecheck`          | generates route types and runs `tsc --noEmit`          |
| `npm run format:check`       | Prettier                                               |
| `npm test`                   | Vitest: brief rules checked against `content/`         |
| `npm run test:e2e`           | Playwright + axe-core against the production build     |
| `npm run check:i18n`         | fails if `pt.json` and `en.json` diverge               |
| `npm run check:placeholders` | fails if a `{{placeholder}}` is in the production HTML |

`npm run test:e2e` expects a prior `npm run build`; it starts its own server on port 3100.

### Environment variables

| Variable               | Purpose                                                                    |
| ---------------------- | -------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL (metadata, sitemap, Open Graph). Defaults to the Vercel URL. |

## CI

Every push and pull request runs, in order: formatting, lint, type check, translation parity, unit tests, build, placeholder check, broken-link check (lychee), end-to-end and accessibility tests (Playwright + axe-core, desktop and mobile) and Lighthouse CI (minimum 90 in every category). Pull requests also validate [Conventional Commits](https://www.conventionalcommits.org/).

## Deploy

Ready for Vercel with zero configuration: import the repository and, once a custom domain is set, add `NEXT_PUBLIC_SITE_URL`.
