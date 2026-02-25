import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

const CartLocators = {
  cartItem: '.cart_item',
  checkoutButton: '[data-test="checkout"], #checkout',
  continueShoppingButton: '[data-test="continue-shopping"], #continue-shopping',
  removeButtonWithinItem: 'button[data-test^="remove-"]',
} as const;

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get cartItems(): Locator {
    return this.page.locator(CartLocators.cartItem);
  }

  async getItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  private get checkoutButton(): Locator {
    return this.page.locator(CartLocators.checkoutButton);
  }

  private get continueShoppingButton(): Locator {
    return this.page.locator(CartLocators.continueShoppingButton);
  }

  async expectAtLeastItems(count: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(count);
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async removeItem(index = 0): Promise<void> {
    await this.page.locator(CartLocators.removeButtonWithinItem).nth(index).click();
  }
}
