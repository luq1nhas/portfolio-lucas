import { AxeBuilder } from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// Auditoria WCAG 2.2 AA com axe-core, nos dois temas e com o painel aberto.

const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function prepare(page: Page, theme: "dark" | "light") {
  await page.addInitScript((t) => localStorage.setItem("theme", t), theme);
}

for (const theme of ["dark", "light"] as const) {
  for (const path of ["/pt", "/en"]) {
    test(`landing ${path} (${theme}) sem violações`, async ({ page }) => {
      await prepare(page, theme);
      await page.goto(path);
      const { violations } = await new AxeBuilder({ page })
        .withTags(tags)
        .analyze();
      expect(violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
    });
  }

  test(`estudo de caso (${theme}) sem violações`, async ({ page }) => {
    await prepare(page, theme);
    await page.goto("/pt/cases/agente-suporte");
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.waitForTimeout(500);
    const { violations } = await new AxeBuilder({ page })
      .include("dialog[open]")
      .withTags(tags)
      .analyze();
    expect(violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
  });
}
