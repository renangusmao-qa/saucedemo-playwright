import { test, expect, PASSWORD } from './fixtures';

test.describe('Inventário', () => {
  test('lista os 6 produtos', async ({ inventoryPage }) => {
    await expect(inventoryPage.items).toHaveCount(6);
  });

  test('ordena por preço do menor para o maior', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('lohi');
    const prices = (await inventoryPage.prices.allTextContents()).map((p) => Number(p.replace('$', '')));
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('ordena por nome de Z a A', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.names.allTextContents();
    expect(names).toEqual([...names].sort().reverse());
  });

  test('ordena por nome de A a Z', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('za'); // sai da ordem padrão para provar que o az reordena
    await inventoryPage.sortBy('az');
    const names = await inventoryPage.names.allTextContents();
    expect(names).toEqual([...names].sort());
  });

  test('ordena por preço do maior para o menor', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('hilo');
    const prices = (await inventoryPage.prices.allTextContents()).map((p) => Number(p.replace('$', '')));
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('o carrinho mantém o produto depois de sair e entrar de novo', async ({ inventoryPage, loginPage }) => {
    await inventoryPage.add('sauce-labs-backpack');
    await inventoryPage.logout();
    await loginPage.login('standard_user', PASSWORD);
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('em tela de celular a lista cabe sem rolagem horizontal', async ({ page, inventoryPage }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(inventoryPage.items).toHaveCount(6);
    await expect(inventoryPage.items.first()).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
  });

  test('abre o detalhe de um produto', async ({ page, inventoryPage }) => {
    await inventoryPage.openItem(4);
    await expect(page).toHaveURL(/inventory-item\.html\?id=4/);
    await expect(inventoryPage.detailName).toHaveText('Sauce Labs Backpack');
  });

  test('logout volta para a tela de login', async ({ inventoryPage }) => {
    await inventoryPage.logout();
    await expect(inventoryPage.loginButton).toBeVisible();
  });

  test('o carrinho mantém o produto depois de navegar', async ({ inventoryPage }) => {
    await inventoryPage.add('sauce-labs-backpack');
    await inventoryPage.openItem(4);
    await inventoryPage.backToProducts();
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });
});
