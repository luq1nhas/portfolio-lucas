import { expect, test } from "@playwright/test";

test.describe("estudo de caso", () => {
  test("abre por cima da landing, fecha com Esc e devolve o foco", async ({
    page,
  }) => {
    await page.goto("/pt");
    const trigger = page
      .locator("#card-iron")
      .getByRole("link", { name: /Ver detalhes/ });
    await trigger.click();

    const dialog = page.getByRole("dialog", { name: "Iron" });
    await expect(dialog).toBeVisible();
    await expect(page).toHaveURL(/\/pt\/cases\/iron$/);
    await expect(dialog.getByText("Situação", { exact: true })).toBeVisible();
    await expect(dialog.getByText("Destaques da plataforma")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(page).toHaveURL(/\/pt$/);
    await expect(trigger).toBeFocused();
  });

  test("acesso direto renderiza a landing com o painel aberto", async ({
    page,
  }) => {
    await page.goto("/en/cases/sgd-municipios");
    await expect(
      page.getByRole("heading", { level: 1, name: "Lucas Vieira" }),
    ).toBeAttached();
    const dialog = page.getByRole("dialog", { name: "SGD-Municípios" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("Arquitetura")).toHaveCount(0);
    await expect(dialog.getByText("Architecture")).toHaveCount(0);
    await dialog.getByRole("button", { name: "Close" }).click();
    await expect(dialog).toBeHidden();
    await expect(page).toHaveURL(/\/en$/);
  });

  test("o botão voltar do navegador fecha o painel", async ({ page }) => {
    await page.goto("/pt");
    await page
      .locator("#card-nexus")
      .getByRole("link", { name: /Ver detalhes/ })
      .click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.goBack();
    await expect(page.getByRole("dialog")).toBeHidden();
  });
});

test.describe("contribuições e stack", () => {
  test("filtro por categoria reflete na URL e na grade", async ({ page }) => {
    await page.goto("/pt");
    const section = page.locator("#contributions");
    await section.getByRole("button", { name: "RAG" }).click();
    await expect(page).toHaveURL(/\?tag=rag/);
    await expect(section.locator("article")).toHaveCount(2);
    await section.getByRole("button", { name: "Todos" }).click();
    await expect(section.locator("article")).toHaveCount(7);
  });

  test("o filtro vindo de um link compartilhado é aplicado", async ({
    page,
  }) => {
    await page.goto("/pt?tag=frontend");
    await expect(page.locator("#contributions article")).toHaveCount(2);
  });

  test("clicar numa tecnologia mostra onde ela foi usada", async ({ page }) => {
    await page.goto("/pt");
    const stack = page.locator("#stack");
    await stack.getByRole("button", { name: "Angular", exact: true }).click();
    await expect(stack.getByRole("link", { name: /Max Web V2/ })).toBeVisible();
    await stack.getByRole("link", { name: /Max Data Sistemas/ }).click();
    await expect(page).toHaveURL(/#exp-max-data$/);
  });
});
