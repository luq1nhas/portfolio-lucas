import { getProject, projects } from "@content/index";
import { routing, type Locale } from "@/i18n/routing";
import {
  ogColors,
  ogContentType,
  ogLocale,
  ogSize,
  ogTranslator,
  renderOgImage,
} from "@/lib/og";

// Imagem de compartilhamento de cada estudo de caso, por idioma (gerada no build).

// A rota da imagem é irmã da página (não herda os params do layout): declara idioma e slug.
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateImageMetadata({
  params,
}: {
  params:
    | { locale: string; slug: string }
    | Promise<{ locale: string; slug: string }>;
}) {
  // params pode chegar como Promise, e vazio na verificação inicial do build.
  const { locale: rawLocale, slug } = await params;
  const locale = ogLocale(rawLocale);
  const project = getProject(slug);
  const t = await ogTranslator(locale, "Og");
  return [
    {
      id: "card",
      alt: t("caseAlt", { project: project?.title[locale] ?? "" }),
      size: ogSize,
      contentType: ogContentType,
    },
  ];
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const project = getProject(slug)!;
  const tCase = await ogTranslator(locale, "Case");
  const tProject = await ogTranslator(locale, "Project");
  const tTags = await ogTranslator(locale, "Tags");

  const context =
    project.context === "personal"
      ? tProject("personal")
      : `${project.context.org} · ${project.context.period[locale]}`;

  return renderOgImage({
    kicker: tCase("label"),
    title: project.title[locale],
    subtitle: (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {project.tagline && (
          <span
            style={{
              color: ogColors.signal,
              fontFamily: "Geist Mono",
              fontSize: 28,
            }}
          >
            {project.tagline[locale]}
          </span>
        )}
        <span>{context}</span>
      </div>
    ),
    pills: project.tags.slice(0, 4).map((tag) => tTags(tag)),
    footer: "lucas.vieira  ·  Lucas Vieira",
  });
}
