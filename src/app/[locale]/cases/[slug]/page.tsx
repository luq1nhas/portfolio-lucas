import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getProject, projects } from "@content/index";
import { CaseView } from "@/components/project/CaseView";
import { HomeSections } from "@/components/sections/HomeSections";
import type { Locale } from "@/i18n/routing";
import { baseOpenGraph } from "@/lib/site";

// Acesso direto (link compartilhado, recarregar a página): a landing inteira
// é renderizada e o estudo de caso abre por cima, como no clique.

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/cases/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const lang = locale as Locale;
  const t = await getTranslations({ locale: lang, namespace: "Metadata" });
  const title = t("caseTitle", { project: project.title[lang] });

  return {
    title,
    description: project.description[lang],
    alternates: {
      canonical: `/${lang}/cases/${slug}`,
      languages: {
        "pt-BR": `/pt/cases/${slug}`,
        en: `/en/cases/${slug}`,
        "x-default": `/pt/cases/${slug}`,
      },
    },
    openGraph: {
      ...baseOpenGraph(lang),
      title,
      description: project.description[lang],
      url: `/${lang}/cases/${slug}`,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function CasePage({
  params,
}: PageProps<"/[locale]/cases/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <HomeSections />
      <CaseView project={project} mode="page" />
    </>
  );
}
