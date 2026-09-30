import { defineConfig, devices } from "@playwright/test";

// Testes e2e contra o build de produção (`npm run build` antes), numa porta
// própria (3100) para nunca reaproveitar um `next dev` na 3000 por engano.
//
// O projeto "hydration" é a exceção: roda contra `next dev`, único modo em que o
// React reporta divergências de hidratação. Use o seu servidor de dev
// (E2E_DEV_URL, padrão http://localhost:3000); na CI ele sobe na porta 3200.

const PORT = 3100;
const DEV_URL = process.env.E2E_DEV_URL ?? "http://localhost:3000";

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "on-first-retry",
  },
  webServer: {
    command: `npm run start -- -p ${PORT}`,
    url: `http://localhost:${PORT}/pt`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"] },
      testIgnore: /hydration\.spec\.ts/,
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"] },
      testMatch: /(landing|a11y)\.spec\.ts/,
    },
    {
      name: "hydration",
      use: { ...devices["Desktop Chrome"], baseURL: DEV_URL },
      testMatch: /hydration\.spec\.ts/,
      // A primeira compilação de cada rota em dev é lenta.
      timeout: 120_000,
    },
  ],
});
