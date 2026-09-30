import { expect, test } from "@playwright/test";

// Divergências de hidratação só são reportadas pelo React em desenvolvimento,
// então este teste roda contra `next dev` (projeto "hydration" no
// playwright.config.ts). Cobre as preferências que só existem no navegador:
// movimento reduzido, tema salvo e largura da tela.

const paths = ["/pt", "/en", "/pt/cases/nexus", "/en/cases/sgd-municipios"];

for (const reducedMotion of ["reduce", "no-preference"] as const) {
  for (const theme of ["dark", "light"] as const) {
    test(`sem erros de hidratação (${reducedMotion}, ${theme})`, async ({
      browser,
    }) => {
      const context = await browser.newContext({ reducedMotion });
      await context.addInitScript(
        (t) => localStorage.setItem("theme", t),
        theme,
      );
      const page = await context.newPage();
      const errors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error" && !msg.text().includes("404"))
          errors.push(msg.text());
      });
      page.on("pageerror", (err) => errors.push(err.message));

      for (const path of paths) {
        await page.goto(path, { waitUntil: "networkidle" });
        await page.evaluate(() =>
          window.scrollTo(0, document.body.scrollHeight),
        );
        await page.waitForTimeout(500);
      }

      expect(errors).toEqual([]);
      await context.close();
    });
  }
}

// A troca de idioma recria o layout raiz no cliente: não pode gerar avisos
// (ex.: <script> renderizado por componente) nem perder o tema salvo.
test("trocar de idioma não gera erros e mantém o tema", async ({ browser }) => {
  const context = await browser.newContext();
  await context.addInitScript(() => localStorage.setItem("theme", "light"));
  const page = await context.newPage();
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error" && !msg.text().includes("404"))
      errors.push(msg.text());
  });

  await page.goto("/pt", { waitUntil: "networkidle" });
  await page.locator('header a[hreflang="en"]').click();
  await expect(page).toHaveURL(/\/en$/);
  await page
    .locator("#card-iron")
    .getByRole("link", { name: /View details/ })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();

  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(errors).toEqual([]);
  await context.close();
});
