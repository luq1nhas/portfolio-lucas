import { describe, expect, it } from "vitest";
import { diagrams } from "./diagrams";
import { experience, projects, skillTiers } from "./index";
import { experienceIds, isPending, projectSlugs } from "./types";

// Regras do brief verificadas automaticamente sobre os dados de content/.

const evidenceIds = new Set<string>([...projectSlugs, ...experienceIds]);

/** Percorre um objeto e devolve todo valor no formato { pt, en }. */
function collectLocalized(
  value: unknown,
  path = "",
  out: [string, unknown][] = [],
) {
  if (Array.isArray(value))
    value.forEach((v, i) => collectLocalized(v, `${path}[${i}]`, out));
  else if (value && typeof value === "object") {
    const keys = Object.keys(value);
    if (keys.length === 2 && keys.includes("pt") && keys.includes("en"))
      out.push([path, value]);
    else
      for (const [k, v] of Object.entries(value))
        collectLocalized(v, `${path}.${k}`, out);
  }
  return out;
}

describe("projetos", () => {
  it("cada slug declarado tem exatamente um projeto", () => {
    expect(projects.map((p) => p.slug).sort()).toEqual(
      [...projectSlugs].sort(),
    );
  });

  it.each(projects.map((p) => [p.slug, p] as const))(
    "%s: o card tem de 3 a 5 tópicos (contando o resultado em destaque)",
    (_, project) => {
      for (const locale of ["pt", "en"] as const) {
        const count =
          project.responsibilities[locale].length + (project.result ? 1 : 0);
        expect(count).toBeGreaterThanOrEqual(3);
        expect(count).toBeLessThanOrEqual(5);
      }
    },
  );

  it("projetos corporativos nunca linkam repositório", () => {
    for (const p of projects.filter((p) => p.section === "contribution")) {
      expect(p.source.kind, p.slug).toBe("corporate");
    }
  });

  it("listas traduzidas têm o mesmo número de itens", () => {
    for (const [path, value] of collectLocalized(projects)) {
      const { pt, en } = value as { pt: unknown; en: unknown };
      if (Array.isArray(pt))
        expect((en as unknown[]).length, path).toBe(pt.length);
    }
  });
});

describe("conteúdo bilíngue", () => {
  it("todo texto { pt, en } está preenchido nas duas línguas", () => {
    const all = collectLocalized({
      projects,
      experience,
      skillTiers,
      diagrams,
    });
    expect(all.length).toBeGreaterThan(100);
    for (const [path, value] of all) {
      if (isPending(value)) continue;
      for (const text of Object.values(value as Record<string, unknown>)) {
        const items = Array.isArray(text) ? text : [text];
        for (const item of items)
          expect(String(item).trim(), path).not.toBe("");
      }
    }
  });
});

describe("stack e evidências", () => {
  it("toda evidência aponta para um projeto ou experiência existente", () => {
    for (const tier of skillTiers)
      for (const skill of tier.skills)
        for (const id of skill.evidence)
          expect(evidenceIds.has(id), `${id}`).toBe(true);
  });

  it("só a categoria 'Em aprendizado' pode ter skills sem evidência visíveis", () => {
    const hidden = skillTiers
      .filter((t) => t.level !== "learning")
      .flatMap((t) =>
        t.skills.filter((s) => s.evidence.length === 0).map((s) => s.label),
      );
    // Skills sem evidência não são renderizadas; esta lista documenta quais são.
    expect(hidden).toEqual(["Nginx"]);
  });

  it("projetos citados na linha do tempo existem", () => {
    for (const e of experience)
      for (const slug of e.projects ?? []) expect(projectSlugs).toContain(slug);
  });
});

describe("diagramas", () => {
  it.each(Object.entries(diagrams))(
    "%s: arestas ligam nós existentes e cabem no quadro",
    (_, d) => {
      const ids = new Set(d.nodes.map((n) => n.id));
      for (const e of d.edges) {
        expect(ids.has(e.from), e.from).toBe(true);
        expect(ids.has(e.to), e.to).toBe(true);
      }
      for (const n of d.nodes) {
        const half = (n.w ?? 170) / 2;
        expect(n.x - half, n.id).toBeGreaterThanOrEqual(0);
        expect(n.x + half, n.id).toBeLessThanOrEqual(d.width);
        expect(n.y + 27, n.id).toBeLessThanOrEqual(d.height);
      }
    },
  );
});
