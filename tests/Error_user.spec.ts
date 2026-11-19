import { test, expect } from './fixtures';
import { PASSWORD, USERS, CUSTOMER, PRODUCT, SUMMARY, MESSAGES } from './data';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('error_user', () => {
  // Erro esperado (error_user): o login funciona, mas "Finish" na tela de overview não faz nada;
  // a URL continua em checkout-step-two em vez de ir para checkout-complete.
  // test.fail() passa enquanto o bug existir e avisa quando for corrigido.
  test('error_user consegue concluir uma compra', async ({ page, loginPage }) => {
    test.fail();
    await loginPage.login(USERS.error, PASSWORD);
    await expect(page).toHaveURL(/inventory\.html/);
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.add(PRODUCT.id);
    await inventoryPage.openCart();
    await new CartPage(page).checkout();
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillInfo(CUSTOMER.first, CUSTOMER.last, CUSTOMER.zip);
    await checkoutPage.continue();
    await checkoutPage.finish();
    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(checkoutPage.completeHeader).toHaveText(MESSAGES.thanks);
  });
});
