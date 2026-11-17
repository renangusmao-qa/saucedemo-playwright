import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  // Roda os testes de cada arquivo em paralelo
  fullyParallel: true,
  // Falha o build no CI se um test.only for esquecido no código
  forbidOnly: !!process.env.CI,
  // Tenta de novo só no CI
  retries: process.env.CI ? 2 : 0,
  // No CI roda com um worker só, sem paralelismo
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://www.saucedemo.com',
    // Guarda o trace só quando um teste falha e roda de novo
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
