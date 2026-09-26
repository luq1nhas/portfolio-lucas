import { getLocale, getTranslations } from "next-intl/server";
import {
  isShowableSkill,
  localize,
  resolveEvidence,
  skillTiers,
} from "@content/index";
import { Section } from "@/components/ui/Section";
import { SkillExplorer, type TierView } from "./SkillExplorer";

export async function Stack() {
  const locale = await getLocale();
  const t = await getTranslations("Stack");
  const tSections = await getTranslations("Sections");
  const tIntros = await getTranslations("Intros");

  const tiers: TierView[] = skillTiers.map((tier) => {
    const learning = tier.level === "learning";
    return {
      id: tier.id,
      level: tier.level,
      label: t(`tier_${tier.id}`),
      skills: tier.skills
        .filter((skill) => isShowableSkill(skill, learning))
        .map((skill) => ({
          label: localize(skill.label, locale),
          evidence: skill.evidence.map((id) => resolveEvidence(id, locale)),
        })),
    };
  });

  return (
    <Section id="stack" title={tSections("stack")} intro={tIntros("stack")}>
      <SkillExplorer tiers={tiers} />
    </Section>
  );
}
