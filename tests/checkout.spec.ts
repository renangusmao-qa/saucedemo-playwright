import { test, expect } from './fixtures';

test.describe('Carrinho e checkout', () => {
  test.beforeEach(async ({ loggedInPage: page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  });

  test('adicionar produto atualiza o contador do carrinho', async ({ loggedInPage: page }) => {
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });

  test('remover produto esvazia o carrinho', async ({ loggedInPage: page }) => {
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
  });

  test('checkout completo finaliza o pedido', async ({ loggedInPage: page }) => {
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Maria');
    await page.locator('[data-test="lastName"]').fill('Silva');
    await page.locator('[data-test="postalCode"]').fill('01001000');
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
  });

  test('checkout sem dados obrigatórios mostra erro', async ({ loggedInPage: page }) => {
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
  });

  test('resumo do pedido mostra o total com imposto', async ({ loggedInPage: page }) => {
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Maria');
    await page.locator('[data-test="lastName"]').fill('Silva');
    await page.locator('[data-test="postalCode"]').fill('01001000');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="subtotal-label"]')).toHaveText('Item total: $29.99');
    await expect(page.locator('[data-test="tax-label"]')).toHaveText('Tax: $2.40');
    await expect(page.locator('[data-test="total-label"]')).toHaveText('Total: $32.39');
  });

  test('cancelar o checkout volta para o carrinho', async ({ loggedInPage: page }) => {
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="cancel"]').click();
    await expect(page).toHaveURL(/cart\.html/);
  });

  test('dois produtos somam no contador e no total', async ({ loggedInPage: page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Maria');
    await page.locator('[data-test="lastName"]').fill('Silva');
    await page.locator('[data-test="postalCode"]').fill('01001000');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="subtotal-label"]')).toHaveText('Item total: $39.98');
  });

  test('continuar comprando volta para a lista de produtos', async ({ loggedInPage: page }) => {
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="continue-shopping"]').click();
    await expect(page).toHaveURL(/inventory\.html/);
  });
});
