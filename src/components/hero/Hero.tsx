import { ArrowRight, MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { profile } from "@content/profile";

export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="flex min-h-[calc(100svh-4rem)] items-center pt-28 pb-20 sm:pt-32"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6">
        <h1
          id="hero-title"
          className="text-5xl font-semibold tracking-tight text-balance sm:text-7xl lg:text-8xl"
        >
          {profile.displayName}
        </h1>

        <p className="mt-4 text-lg text-muted sm:text-2xl">
          {t.rich("role", {
            em: (chunks) => (
              <em className="text-signal not-italic">{chunks}</em>
            ),
          })}
        </p>

        <p className="mt-10 max-w-3xl text-xl leading-snug text-balance sm:text-3xl">
          {t.rich("valueProp", {
            result: (chunks) => (
              <strong className="font-semibold text-result">{chunks}</strong>
            ),
          })}
        </p>

        <p className="mt-6 max-w-2xl leading-relaxed text-balance text-muted sm:text-lg">
          {t.rich("status", {
            strong: (chunks) => (
              <strong className="font-medium text-signal">{chunks}</strong>
            ),
          })}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3.5 text-sm font-semibold text-on-signal"
          >
            {t("ctaProjects")}
            <ArrowRight className="size-4" aria-hidden />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-full border border-border px-6 py-3.5 text-sm font-semibold hover:border-fg"
          >
            {t("ctaContact")}
          </a>
        </div>

        <p className="mt-10 flex items-center gap-1.5 font-mono text-xs text-muted">
          <MapPin className="size-3.5" aria-hidden />
          {t("location")}
        </p>
      </div>
    </section>
  );
}
