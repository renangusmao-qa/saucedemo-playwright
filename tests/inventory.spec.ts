import { test, expect } from '@playwright/test';

test.describe('Inventário', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
  });

  test('lista os 6 produtos', async ({ page }) => {
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
  });

  test('ordena por preço do menor para o maior', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    const prices = (await page.locator('[data-test="inventory-item-price"]').allTextContents())
      .map((p) => Number(p.replace('$', '')));
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('ordena por nome de Z a A', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('za');
    const names = await page.locator('[data-test="inventory-item-name"]').allTextContents();
    expect(names).toEqual([...names].sort().reverse());
  });

  test('abre o detalhe de um produto', async ({ page }) => {
    await page.locator('[data-test="item-4-title-link"]').click();
    await expect(page).toHaveURL(/inventory-item\.html\?id=4/);
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
  });

  test('logout volta para a tela de login', async ({ page }) => {
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('[data-test="logout-sidebar-link"]').click();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });

  test('o carrinho mantém o produto depois de navegar', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="item-4-title-link"]').click();
    await page.locator('[data-test="back-to-products"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });
});
