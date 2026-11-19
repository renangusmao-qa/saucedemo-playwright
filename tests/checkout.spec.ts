import { test, expect } from './fixtures';
import { PASSWORD, USERS, CUSTOMER, PRODUCT, SUMMARY, MESSAGES } from './data';

test.describe('Carrinho e checkout', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.add(PRODUCT.id);
  });

  test('adicionar produto atualiza o contador do carrinho', async ({ inventoryPage }) => {
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('remover produto esvazia o carrinho', async ({ inventoryPage }) => {
    await inventoryPage.remove(PRODUCT.id);
    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });

  test('checkout completo finaliza o pedido', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.openCart();
    await expect(cartPage.itemNames).toHaveText(PRODUCT.name);
    await cartPage.checkout();
    await checkoutPage.fillInfo(CUSTOMER.first, CUSTOMER.last, CUSTOMER.zip);
    await checkoutPage.continue();
    await checkoutPage.finish();
    await expect(checkoutPage.completeHeader).toHaveText(MESSAGES.thanks);
  });

  test('checkout sem dados obrigatórios mostra erro', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.continue();
    await expect(checkoutPage.error).toContainText(MESSAGES.firstNameRequired);
  });

  test('resumo do pedido mostra o total com imposto', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInfo(CUSTOMER.first, CUSTOMER.last, CUSTOMER.zip);
    await checkoutPage.continue();
    await expect(checkoutPage.subtotal).toHaveText(SUMMARY.subtotal);
    await expect(checkoutPage.tax).toHaveText(SUMMARY.tax);
    await expect(checkoutPage.total).toHaveText(SUMMARY.total);
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
    await checkoutPage.fillInfo(CUSTOMER.first, CUSTOMER.last, CUSTOMER.zip);
    await checkoutPage.continue();
    await expect(checkoutPage.subtotal).toHaveText(SUMMARY.twoItemsSubtotal);
  });

  test('continuar comprando volta para a lista de produtos', async ({ page, inventoryPage, cartPage }) => {
    await inventoryPage.openCart();
    await cartPage.continueShopping();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('checkout sem sobrenome mostra erro', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInfo(CUSTOMER.first, '', CUSTOMER.zip);
    await checkoutPage.continue();
    await expect(checkoutPage.error).toContainText(MESSAGES.lastNameRequired);
  });

  test('checkout sem CEP mostra erro', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInfo(CUSTOMER.first, CUSTOMER.last, '');
    await checkoutPage.continue();
    await expect(checkoutPage.error).toContainText(MESSAGES.zipRequired);
  });
});
