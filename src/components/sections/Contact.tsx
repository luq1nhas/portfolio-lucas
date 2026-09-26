import { getTranslations } from "next-intl/server";
import { profile } from "@content/index";
import { ContactLinks } from "@/components/layout/ContactLinks";
import { Section } from "@/components/ui/Section";
import { mailtoUrl } from "@/lib/links";
import { CopyEmailButton } from "./CopyEmailButton";

export async function Contact() {
  const t = await getTranslations("Contact");
  const tSections = await getTranslations("Sections");
  const tIntros = await getTranslations("Intros");

  return (
    <Section
      id="contact"
      title={tSections("contact")}
      intro={tIntros("contact")}
    >
      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-10">
        <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {t("title")}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={mailtoUrl}
            className="text-lg break-all text-signal underline-offset-4 hover:underline sm:text-2xl"
          >
            {profile.email}
          </a>
          <CopyEmailButton email={profile.email} />
        </div>
        <ContactLinks className="mt-8" />
      </div>
    </Section>
  );
}
