import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/hero/Hero";
import { Section } from "@/components/ui/Section";
import type { Locale } from "@/i18n/routing";
import { sectionIds } from "@/lib/site";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  // O layout já validou o idioma (notFound para valores fora de routing.locales).
  setRequestLocale(locale as Locale);
  const t = await getTranslations("Sections");

  return (
    <>
      <Hero />
      {/* Etapa 1: esqueleto das seções. O conteúdo entra na etapa 2. */}
      {sectionIds.map((id) => (
        <Section key={id} id={id} title={t(id)} />
      ))}
    </>
  );
}
