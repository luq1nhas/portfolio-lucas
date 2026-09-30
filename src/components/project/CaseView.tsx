import { getLocale, getTranslations } from "next-intl/server";
import type { Project } from "@content/types";
import { CaseDialog } from "./CaseDialog";
import { CaseStudy } from "./CaseStudy";

export async function CaseView({
  project,
  mode,
}: {
  project: Project;
  mode: "intercepted" | "page";
}) {
  const t = await getTranslations("Case");
  const locale = await getLocale();
  const titleId = `case-title-${project.slug}`;

  return (
    <CaseDialog
      titleId={titleId}
      mode={mode}
      slug={project.slug}
      homeHref={`/${locale}`}
      labels={{ kicker: t("label"), close: t("close") }}
    >
      <CaseStudy project={project} titleId={titleId} />
    </CaseDialog>
  );
}
