import { Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly items: Locator;
  readonly names: Locator;
  readonly prices: Locator;
  readonly cartBadge: Locator;
  readonly loginButton: Locator;

  constructor(private readonly page: Page) {
    this.items = page.locator('[data-test="inventory-item"]');
    this.names = page.locator('[data-test="inventory-item-name"]');
    this.prices = page.locator('[data-test="inventory-item-price"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  // slug é o nome do produto no data-test, por exemplo: sauce-labs-backpack
  async add(slug: string) {
    await this.page.locator(`[data-test="add-to-cart-${slug}"]`).click();
  }

  async remove(slug: string) {
    await this.page.locator(`[data-test="remove-${slug}"]`).click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.page.locator('[data-test="product-sort-container"]').selectOption(option);
  }

  async openItem(id: number) {
    await this.page.locator(`[data-test="item-${id}-title-link"]`).click();
  }

  async backToProducts() {
    await this.page.locator('[data-test="back-to-products"]').click();
  }

  async openCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }

  async logout() {
    await this.page.locator('#react-burger-menu-btn').click();
    await this.page.locator('[data-test="logout-sidebar-link"]').click();
  }
}
