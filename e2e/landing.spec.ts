import { expect, test } from "@playwright/test";

test.describe("landing", () => {
  test("detecta o idioma do navegador em /", async ({ browser }) => {
    for (const [locale, path] of [
      ["en-US", "/en"],
      ["pt-BR", "/pt"],
    ]) {
      const context = await browser.newContext({ locale });
      const page = await context.newPage();
      await page.goto("/");
      await expect(page).toHaveURL(new RegExp(`${path}$`));
      await context.close();
    }
  });

  test("o essencial do hero aparece sem depender de animação", async ({
    page,
  }) => {
    await page.goto("/pt");
    await expect(
      page.getByRole("heading", { level: 1, name: "Lucas Vieira" }),
    ).toBeVisible();
    const hero = page.locator("#top");
    await expect(
      hero.getByText("8 semanas para 1", { exact: true }),
    ).toBeVisible();
    await expect(hero.getByText("Disponível para oportunidades")).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Ver projetos" }),
    ).toHaveAttribute("href", "#projects");
  });

  test("todas as seções da estrutura existem, na ordem", async ({ page }) => {
    await page.goto("/pt");
    const ids = await page
      .locator("main > section")
      .evaluateAll((sections) => sections.map((s) => s.id));
    expect(ids).toEqual([
      "top",
      "about",
      "projects",
      "contributions",
      "experience",
      "stack",
      "testimonial",
      "contact",
    ]);
  });

  test("links externos abrem em nova aba com rel seguro", async ({ page }) => {
    await page.goto("/en");
    const external = page.locator('a[href^="http"]');
    const count = await external.count();
    expect(count).toBeGreaterThan(5);
    for (let i = 0; i < count; i++) {
      await expect(external.nth(i)).toHaveAttribute("target", "_blank");
      await expect(external.nth(i)).toHaveAttribute(
        "rel",
        "noopener noreferrer",
      );
    }
  });

  test("nenhum placeholder {{…}} no HTML de produção", async ({ page }) => {
    for (const path of [
      "/pt",
      "/en",
      "/pt/cases/nexus",
      "/en/cases/cnpj-alfanumerico",
    ]) {
      await page.goto(path);
      expect(await page.content()).not.toMatch(/\{\{[^}]+\}\}/);
    }
  });

  test("a versão em inglês não tem textos de interface em português", async ({
    page,
  }) => {
    await page.goto("/en");
    const text = await page.locator("body").innerText();
    for (const word of [
      "Ver detalhes",
      "Responsabilidades",
      "Projeto corporativo",
      "Disponível",
    ]) {
      expect(text).not.toContain(word);
    }
  });

  test("troca de idioma sem recarregar e lembrada na próxima visita", async ({
    page,
  }) => {
    await page.goto("/pt");
    await page.evaluate(
      () => ((window as unknown as { marker: string }).marker = "same"),
    );
    await page.locator('header a[hreflang="en"]').click();
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    expect(
      await page.evaluate(
        () => (window as unknown as { marker?: string }).marker,
      ),
    ).toBe("same");
    await page.goto("/");
    await expect(page).toHaveURL(/\/en$/);
  });
});
