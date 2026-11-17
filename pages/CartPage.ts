import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly itemNames: Locator;

  constructor(private readonly page: Page) {
    this.itemNames = page.locator('.cart_item [data-test="inventory-item-name"]');
  }

  async checkout() {
    await this.page.locator('[data-test="checkout"]').click();
  }

  async continueShopping() {
    await this.page.locator('[data-test="continue-shopping"]').click();
  }
}
