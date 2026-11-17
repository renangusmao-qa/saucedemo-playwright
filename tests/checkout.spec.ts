import { test, expect } from './fixtures';

test.describe('Carrinho e checkout', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.add('sauce-labs-backpack');
  });

  test('adicionar produto atualiza o contador do carrinho', async ({ inventoryPage }) => {
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('remover produto esvazia o carrinho', async ({ inventoryPage }) => {
    await inventoryPage.remove('sauce-labs-backpack');
    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });

  test('checkout completo finaliza o pedido', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.openCart();
    await expect(cartPage.itemNames).toHaveText('Sauce Labs Backpack');
    await cartPage.checkout();
    await checkoutPage.fillInfo('Maria', 'Silva', '01001000');
    await checkoutPage.continue();
    await checkoutPage.finish();
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('checkout sem dados obrigatórios mostra erro', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.continue();
    await expect(checkoutPage.error).toContainText('First Name is required');
  });

  test('resumo do pedido mostra o total com imposto', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInfo('Maria', 'Silva', '01001000');
    await checkoutPage.continue();
    await expect(checkoutPage.subtotal).toHaveText('Item total: $29.99');
    await expect(checkoutPage.tax).toHaveText('Tax: $2.40');
    await expect(checkoutPage.total).toHaveText('Total: $32.39');
  });

  test('cancelar o checkout volta para o carrinho', async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.cancel();
    await expect(page).toHaveURL(/cart\.html/);
  });

  test('dois produtos somam no contador e no total', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.add('sauce-labs-bike-light');
    await expect(inventoryPage.cartBadge).toHaveText('2');
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInfo('Maria', 'Silva', '01001000');
    await checkoutPage.continue();
    await expect(checkoutPage.subtotal).toHaveText('Item total: $39.98');
  });

  test('continuar comprando volta para a lista de produtos', async ({ page, inventoryPage, cartPage }) => {
    await inventoryPage.openCart();
    await cartPage.continueShopping();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('checkout sem sobrenome mostra erro', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInfo('Maria', '', '01001000');
    await checkoutPage.continue();
    await expect(checkoutPage.error).toContainText('Last Name is required');
  });

  test('checkout sem CEP mostra erro', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInfo('Maria', 'Silva', '');
    await checkoutPage.continue();
    await expect(checkoutPage.error).toContainText('Postal Code is required');
  });
});
