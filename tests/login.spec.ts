import { test, expect } from './fixtures';
import { PASSWORD, USERS, MESSAGES } from './data';

test.describe('Login', () => {
  test('login válido leva à lista de produtos', async ({ page, loginPage }) => {
    await loginPage.login(USERS.standard, PASSWORD);
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('senha inválida mostra erro', async ({ loginPage }) => {
    await loginPage.login(USERS.standard, 'errada');
    await expect(loginPage.error).toContainText(MESSAGES.wrongCredentials);
  });

  test('usuário bloqueado mostra erro', async ({ loginPage }) => {
    await loginPage.login(USERS.locked, PASSWORD);
    await expect(loginPage.error).toContainText(MESSAGES.lockedOut);
  });

  test('usuário vazio mostra erro', async ({ loginPage }) => {
    await loginPage.login('', PASSWORD);
    await expect(loginPage.error).toContainText(MESSAGES.usernameRequired);
  });

  test('senha vazia mostra erro', async ({ loginPage }) => {
    await loginPage.login(USERS.standard, '');
    await expect(loginPage.error).toContainText(MESSAGES.passwordRequired);
  });

  test('acessar o inventário sem login mostra erro', async ({ page, loginPage }) => {
    await page.goto('/inventory.html');
    await expect(loginPage.error).toContainText(MESSAGES.needLogin);
    await expect(page).not.toHaveURL(/inventory\.html/);
  });

  for (const user of [USERS.problem, USERS.glitch]) {
    test(`${user} consegue entrar`, async ({ page, loginPage }) => {
      await loginPage.login(user, PASSWORD);
      await expect(page).toHaveURL(/inventory\.html/);
    });
  }
});
