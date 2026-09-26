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
      <figure className="relative max-w-4xl">
        <span
          aria-hidden
          className="absolute -top-10 -left-2 font-serif text-8xl leading-none text-signal/30 italic"
        >
          “
        </span>
        <blockquote className="flex flex-col gap-4 font-serif text-2xl leading-snug text-pretty italic sm:text-3xl">
          {testimonial.quotes[locale].map((quote) => (
            <p key={quote}>{quote}</p>
          ))}
        </blockquote>
        <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
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
            className="grid size-9 place-items-center rounded-full border border-border text-muted hover:border-signal hover:text-fg"
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
