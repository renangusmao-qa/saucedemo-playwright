import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('login válido leva à lista de produtos', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('senha inválida mostra erro', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('errada');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('do not match');
  });

  test('usuário bloqueado mostra erro', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('locked out');
  });

  test('usuário vazio mostra erro', async ({ page }) => {
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
  });

  test('senha vazia mostra erro', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Password is required');
  });

  for (const user of ['problem_user', 'performance_glitch_user']) {
    test(`${user} consegue entrar`, async ({ page }) => {
      await page.locator('[data-test="username"]').fill(user);
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      await expect(page).toHaveURL(/inventory\.html/);
    });
  }
});
