import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { ThemeScript } from "@/components/layout/ThemeScript";
import { htmlLang, routing } from "@/i18n/routing";
import { baseOpenGraph, siteUrl } from "@/lib/site";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(siteUrl),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "pt-BR": "/pt",
        en: "/en",
        "x-default": "/pt",
      },
    },
    openGraph: {
      ...baseOpenGraph(locale),
      title: t("title"),
      description: t("description"),
      url: `/${locale}`,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LocaleLayout({
  children,
  modal,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Nav");

  return (
    <html
      lang={htmlLang[locale]}
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-dvh flex-col">
        <NextIntlClientProvider>
          <MotionProvider>
            <a
              href="#main"
              className="sr-only z-[60] rounded-full bg-signal px-4 py-2 text-sm font-semibold text-on-signal focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
            >
              {t("skip")}
            </a>
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
            {/* Painel do estudo de caso (rota interceptada), por cima da landing. */}
            {modal}
            <RevealObserver />
          </MotionProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
