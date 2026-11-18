import { test, expect, PASSWORD } from './fixtures';

test.describe('Login', () => {
  test('login válido leva à lista de produtos', async ({ page, loginPage }) => {
    await loginPage.login('standard_user', PASSWORD);
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('senha inválida mostra erro', async ({ loginPage }) => {
    await loginPage.login('standard_user', 'errada');
    await expect(loginPage.error).toContainText('do not match');
  });

  test('usuário bloqueado mostra erro', async ({ loginPage }) => {
    await loginPage.login('locked_out_user', PASSWORD);
    await expect(loginPage.error).toContainText('locked out');
  });

  test('usuário vazio mostra erro', async ({ loginPage }) => {
    await loginPage.login('', PASSWORD);
    await expect(loginPage.error).toContainText('Username is required');
  });

  test('senha vazia mostra erro', async ({ loginPage }) => {
    await loginPage.login('standard_user', '');
    await expect(loginPage.error).toContainText('Password is required');
  });

  test('acessar o inventário sem login mostra erro', async ({ page, loginPage }) => {
    await page.goto('/inventory.html');
    await expect(loginPage.error).toContainText('You can only access');
    await expect(page).not.toHaveURL(/inventory\.html/);
  });

  for (const user of ['problem_user', 'performance_glitch_user']) {
    test(`${user} consegue entrar`, async ({ page, loginPage }) => {
      await loginPage.login(user, PASSWORD);
      await expect(page).toHaveURL(/inventory\.html/);
    });
  }
});
