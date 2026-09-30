import { getTranslations } from "next-intl/server";
import { projectsIn } from "@content/index";
import type { Project } from "@content/types";
import { FeaturedProjectCard } from "@/components/project/FeaturedProjectCard";
import { FilterableGrid } from "@/components/project/FilterableGrid";
import { ProjectCard } from "@/components/project/ProjectCard";
import { DemoWarmUp } from "@/components/project/DemoWarmUp";
import { Section } from "@/components/ui/Section";

const gridClassName = "grid gap-5 md:grid-cols-2 lg:grid-cols-3";

async function filterTags(projects: Project[]) {
  const tTags = await getTranslations("Tags");
  const counts = new Map<Project["tags"][number], number>();
  for (const p of projects)
    for (const tag of p.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  return [...counts]
    .filter(([, n]) => n >= 2)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => ({ id, label: tTags(id) }));
}

async function ProjectGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;
  return (
    <FilterableGrid
      param="tag"
      gridClassName={gridClassName}
      tags={await filterTags(projects)}
      items={projects.map((p) => ({
        id: p.slug,
        tags: p.tags,
        node: <ProjectCard project={p} />,
      }))}
    />
  );
}

export async function Projects() {
  const tSections = await getTranslations("Sections");
  const tIntros = await getTranslations("Intros");

  const personal = projectsIn("personal");
  const featured = personal.filter((p) => p.featured);
  const rest = personal.filter((p) => !p.featured);

  return (
    <Section
      id="projects"
      title={tSections("projects")}
      intro={tIntros("projects")}
    >
      <div className="flex flex-col gap-5">
        {featured.map((p) => (
          <div key={p.slug}>
            <FeaturedProjectCard project={p} />
            {p.demo?.hasColdStart && <DemoWarmUp url={p.demo.url} />}
          </div>
        ))}
        <ProjectGrid projects={rest} />
      </div>
    </Section>
  );
}

export async function Contributions() {
  const tSections = await getTranslations("Sections");
  const tIntros = await getTranslations("Intros");

  return (
    <Section
      id="contributions"
      title={tSections("contributions")}
      intro={tIntros("contributions")}
    >
      <ProjectGrid projects={projectsIn("contribution")} />
    </Section>
  );
}
