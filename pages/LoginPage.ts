import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly error: Locator;
  readonly loginButton: Locator;

  constructor(private readonly page: Page) {
    this.error = page.locator('[data-test="error"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.page.locator('[data-test="username"]').fill(username);
    await this.page.locator('[data-test="password"]').fill(password);
    await this.loginButton.click();
  }
}
