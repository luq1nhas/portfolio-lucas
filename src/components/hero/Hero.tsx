import { ArrowRight, MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { profile } from "@content/profile";
import { AgentNetworkFallback } from "./AgentNetworkFallback";
import { HeroVisual } from "./HeroVisual";

export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inset-0 rounded-full bg-signal opacity-75 motion-safe:animate-ping" />
              <span className="relative size-2 rounded-full bg-signal" />
            </span>
            {t("available")}
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-5xl font-semibold tracking-tight text-balance sm:text-7xl"
          >
            {profile.displayName}
          </h1>

          <p className="mt-3 text-lg text-muted sm:text-xl">
            {t.rich("role", {
              em: (chunks) => (
                <em className="font-serif text-[1.2em] text-signal italic">
                  {chunks}
                </em>
              ),
            })}
          </p>

          <p className="mt-8 max-w-xl text-xl leading-snug text-pretty sm:text-2xl">
            {t.rich("valueProp", {
              result: (chunks) => (
                <strong className="font-semibold text-result">{chunks}</strong>
              ),
            })}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-signal px-5 py-3 text-sm font-semibold text-on-signal transition-transform hover:-translate-y-0.5"
            >
              {t("ctaProjects")}
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-fg"
            >
              {t("ctaContact")}
            </a>
          </div>

          <p className="mt-8 flex items-center gap-1.5 font-mono text-xs text-muted">
            <MapPin className="size-3.5" aria-hidden />
            {t("location")}
          </p>
        </div>

        {/* No celular a rede fica atrás do texto; o texto vem sempre primeiro no DOM. */}
        <div className="absolute inset-0 -z-10 opacity-25 lg:static lg:z-auto lg:opacity-100">
          <HeroVisual className="mx-auto h-full w-full max-w-[480px] lg:aspect-square lg:h-auto">
            <AgentNetworkFallback className="h-full w-full" />
          </HeroVisual>
        </div>
      </div>
    </section>
  );
}
