import { test, expect } from './fixtures';

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
