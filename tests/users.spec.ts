import { test, expect, PASSWORD } from './fixtures';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Imagens dos produtos', () => {
  test('standard_user vê uma imagem diferente para cada produto', async ({ inventoryPage }) => {
    await expect(inventoryPage.images).toHaveCount(6);
    const srcs = await inventoryPage.images.evaluateAll((imgs) => imgs.map((i) => i.getAttribute('src')));
    expect(new Set(srcs).size).toBe(6);
  });

  // Bug conhecido do problem_user: todos os produtos mostram a mesma imagem.
  // test.fail() faz o teste passar enquanto o bug existir e avisa quando ele for corrigido.
  test('problem_user vê uma imagem diferente para cada produto', async ({ page, loginPage }) => {
    test.fail();
    await loginPage.login('problem_user', PASSWORD);
    const inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.images).toHaveCount(6);
    const srcs = await inventoryPage.images.evaluateAll((imgs) => imgs.map((i) => i.getAttribute('src')));
    expect(new Set(srcs).size).toBe(6);
  });
});
