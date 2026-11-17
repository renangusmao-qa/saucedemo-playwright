import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export const PASSWORD = 'secret_sauce';

type Fixtures = {
  loginPage: LoginPage;
  loggedInPage: Page; // página já logada como standard_user
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
  loggedInPage: async ({ page, loginPage }, use) => {
    await loginPage.login('standard_user', PASSWORD);
    await use(page);
  },
});

export { expect };
