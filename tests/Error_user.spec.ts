import { test, expect } from './fixtures';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('error_user', () => {
  // Erro esperado (error_user): o login funciona, mas "Finish" na tela de overview não faz nada;
  // a URL continua em checkout-step-two em vez de ir para checkout-complete.
  // test.fail() passa enquanto o bug existir e avisa quando for corrigido.
  test('error_user consegue concluir uma compra', async ({ page, loginPage }) => {
    test.fail();
    await loginPage.login('error_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/);
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.add('sauce-labs-backpack');
    await inventoryPage.openCart();
    await new CartPage(page).checkout();
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillInfo('Maria', 'Silva', '01001000');
    await checkoutPage.continue();
    await checkoutPage.finish();
    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(checkoutPage.completeHeader).toHaveText("Thank you for your order!");
  });
});
