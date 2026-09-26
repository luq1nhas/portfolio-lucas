import { getTranslations } from "next-intl/server";
import { projectsIn, showPlaceholders } from "@content/index";
import { upcomingProject } from "@content/projects";
import type { Project } from "@content/types";
import { FeaturedProjectCard } from "@/components/project/FeaturedProjectCard";
import { FilterableGrid } from "@/components/project/FilterableGrid";
import { ProjectCard } from "@/components/project/ProjectCard";
import { WakeDemo } from "@/components/project/WakeDemo";
import { Placeholder } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";

const gridClassName = "grid gap-5 md:grid-cols-2 lg:grid-cols-3";

/** Tags usadas por pelo menos 2 projetos da seção viram opções de filtro. */
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
  const tProject = await getTranslations("Project");

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
            {p.demo?.coldStart && <WakeDemo url={p.demo.url} />}
          </div>
        ))}
        <ProjectGrid projects={rest} />
        {/* Espaço reservado: só aparece em desenvolvimento. */}
        {showPlaceholders && (
          <div className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted">
            <p className="mb-2 font-mono text-xs uppercase">
              {tProject("upcoming")}
            </p>
            <Placeholder value={upcomingProject} />
          </div>
        )}
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
