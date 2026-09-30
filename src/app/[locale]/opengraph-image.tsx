import { profile } from "@content/index";
import { routing, type Locale } from "@/i18n/routing";
import {
  ogColors,
  ogContentType,
  ogLocale,
  ogSize,
  ogTranslator,
  renderOgImage,
  RichWords,
} from "@/lib/og";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateImageMetadata({
  params,
}: {
  params: { locale: string } | Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await ogTranslator(ogLocale(locale), "Og");
  return [
    { id: "card", alt: t("alt"), size: ogSize, contentType: ogContentType },
  ];
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await ogTranslator(locale as Locale, "Hero");

  return renderOgImage({
    kicker: t("available"),
    title: profile.displayName,
    subtitle: (
      <RichWords raw={t.raw("role")} colors={{ em: ogColors.signal }} gap={7} />
    ),
    body: (
      <RichWords
        raw={t.raw("valueProp")}
        colors={{ result: ogColors.result }}
        gap={9}
      />
    ),
    footer: `lucas.vieira  ·  ${t("location")}`,
  });
}
