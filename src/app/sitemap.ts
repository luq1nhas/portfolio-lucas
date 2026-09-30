import type { MetadataRoute } from "next";
import { projects } from "@content/index";
import { htmlLang, routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...projects.map((p) => `/cases/${p.slug}`)];

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [htmlLang[l], `${siteUrl}/${l}${path}`]),
        ),
      },
    })),
  );
}
