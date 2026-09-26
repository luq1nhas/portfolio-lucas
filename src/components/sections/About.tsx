import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";

export async function About() {
  const t = await getTranslations("About");
  const tSections = await getTranslations("Sections");

  const facts = [
    {
      term: t("education"),
      value: t("educationValue"),
      detail: t("educationPeriod"),
    },
    { term: t("languages"), value: t("languagesValue") },
    { term: t("location"), value: t("locationValue") },
  ];

  return (
    <Section id="about" title={tSections("about")}>
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <p className="text-lg leading-relaxed text-pretty sm:text-xl">
          {t.rich("body", {
            strong: (chunks) => (
              <strong className="font-semibold text-signal">{chunks}</strong>
            ),
          })}
        </p>
        <dl className="grid content-start gap-5 border-t border-border pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
          {facts.map((fact) => (
            <div key={fact.term}>
              <dt className="font-mono text-xs tracking-wider text-muted uppercase">
                {fact.term}
              </dt>
              <dd className="mt-1">
                {fact.value}
                {fact.detail && (
                  <span className="block text-sm text-muted">
                    {fact.detail}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
