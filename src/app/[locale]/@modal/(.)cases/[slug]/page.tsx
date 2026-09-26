import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getProject, projects } from "@content/index";
import { CaseView } from "@/components/project/CaseView";
import type { Locale } from "@/i18n/routing";

// Clique em "Ver detalhes" na landing: a rota /cases/[slug] é interceptada e o
// estudo de caso abre como painel, sem sair da página.

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function InterceptedCase({
  params,
}: PageProps<"/[locale]/cases/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);
  const project = getProject(slug);
  if (!project) notFound();

  return <CaseView project={project} mode="intercepted" />;
}
