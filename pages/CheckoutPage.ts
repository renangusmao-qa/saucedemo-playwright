import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  readonly error: Locator;
  readonly subtotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly completeHeader: Locator;

  constructor(private readonly page: Page) {
    this.error = page.locator('[data-test="error"]');
    this.subtotal = page.locator('[data-test="subtotal-label"]');
    this.tax = page.locator('[data-test="tax-label"]');
    this.total = page.locator('[data-test="total-label"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
  }

  async fillInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
  }

  async continue() {
    await this.page.locator('[data-test="continue"]').click();
  }

  async cancel() {
    await this.page.locator('[data-test="cancel"]').click();
  }

  async finish() {
    await this.page.locator('[data-test="finish"]').click();
  }
}
