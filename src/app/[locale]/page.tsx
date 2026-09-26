import { setRequestLocale } from "next-intl/server";
import { HomeSections } from "@/components/sections/HomeSections";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  // O layout já validou o idioma (notFound para valores fora de routing.locales).
  setRequestLocale(locale as Locale);

  return <HomeSections />;
}
