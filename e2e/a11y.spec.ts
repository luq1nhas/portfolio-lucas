import { AxeBuilder } from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// Auditoria WCAG 2.2 AA com axe-core, nos dois temas e com o painel aberto.

const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function prepare(page: Page, theme: "dark" | "light") {
  await page.addInitScript((t) => localStorage.setItem("theme", t), theme);
}

/** Mostra de uma vez todos os blocos com animação de entrada. */
async function revealAll(page: Page) {
  await page.evaluate(() =>
    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => el.setAttribute("data-revealed", "")),
  );
  await page.waitForTimeout(700);
}

for (const theme of ["dark", "light"] as const) {
  for (const path of ["/pt", "/en"]) {
    test(`landing ${path} (${theme}) sem violações`, async ({ page }) => {
      await prepare(page, theme);
      await page.goto(path);
      await revealAll(page);
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

test("movimento reduzido: sem 3D e conteúdo visível sem rolar", async ({
  browser,
}) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/pt");
  await page.waitForTimeout(2000);
  await expect(page.locator("canvas")).toHaveCount(0);
  const opacity = await page
    .locator("#contact [data-reveal]")
    .first()
    .evaluate((el) => getComputedStyle(el).opacity);
  expect(opacity).toBe("1");
  await context.close();
});
