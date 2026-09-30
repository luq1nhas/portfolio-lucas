import { Quote } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { testimonial } from "@content/index";
import { LinkedinIcon } from "@/components/ui/BrandIcons";
import { Section } from "@/components/ui/Section";
import { external } from "@/lib/links";

export async function Testimonial() {
  const locale = await getLocale();
  const t = await getTranslations("Testimonial");
  const tSections = await getTranslations("Sections");
  const translated = locale !== testimonial.originalLocale;

  return (
    <Section id="testimonial" title={tSections("testimonial")}>
      <figure className="max-w-4xl rounded-2xl border border-border bg-surface p-6 sm:p-10">
        <span
          aria-hidden
          className="grid size-10 place-items-center rounded-lg border border-signal/40 bg-signal-soft text-signal"
        >
          <Quote className="size-5" />
        </span>
        <blockquote className="mt-6 flex flex-col gap-4 text-lg leading-relaxed text-pretty sm:text-xl">
          {testimonial.quotes[locale].map((quote) => (
            <p key={quote}>“{quote}”</p>
          ))}
        </blockquote>
        <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-6">
          <span>
            <span className="block font-semibold">{testimonial.author}</span>
            <span className="block text-sm text-muted">
              {testimonial.role[locale]}
            </span>
          </span>
          <a
            href={testimonial.linkedin}
            {...external}
            aria-label={t("linkedin", { name: testimonial.author })}
            className="ml-auto grid size-9 place-items-center rounded-full border border-border text-muted hover:border-signal hover:text-fg"
          >
            <LinkedinIcon className="size-4" />
          </a>
          {translated && (
            <span className="w-full text-xs text-muted">{t("translated")}</span>
          )}
        </figcaption>
      </figure>
    </Section>
  );
}
