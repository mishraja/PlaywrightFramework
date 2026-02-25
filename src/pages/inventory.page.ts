import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { MenuComponent } from './components/menu.component';

const InventoryLocators = {
  pageTitle: '.title',
  sortSelect: '.product_sort_container',
  inventoryItem: '.inventory_item',
  itemName: '.inventory_item_name',
  itemPrice: '.inventory_item_price',
  cartLink: '.shopping_cart_link',
  cartBadge: '.shopping_cart_badge',
  menuButton: '#react-burger-menu-btn',
} as const;

export class InventoryPage extends BasePage {
  readonly menu: MenuComponent;

  constructor(page: Page) {
    super(page);
    this.menu = new MenuComponent(page);
  }

  private get pageTitle(): Locator {
    return this.page.locator(InventoryLocators.pageTitle);
  }

  private get sortSelect(): Locator {
    return this.page.locator(InventoryLocators.sortSelect);
  }

  private get itemNames(): Locator {
    return this.page.locator(InventoryLocators.itemName);
  }

  private get itemPrices(): Locator {
    return this.page.locator(InventoryLocators.itemPrice);
  }

  private get cartLink(): Locator {
    return this.page.locator(InventoryLocators.cartLink);
  }

  private get cartBadge(): Locator {
    return this.page.locator(InventoryLocators.cartBadge);
  }

  private get menuButton(): Locator {
    return this.page.locator(InventoryLocators.menuButton);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.pageTitle).toHaveText('Products');
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async openMenu(): Promise<void> {
    await this.menuButton.click();
    await this.menu.waitForOpen();
  }

  async addToCartByDataTest(dataTestSuffix: string): Promise<void> {
    await this.page.locator(`[data-test="add-to-cart-${dataTestSuffix}"]`).click();
  }

  async getPriceForItemDataTestSuffix(dataTestSuffix: string): Promise<number> {
    const addButton = this.page.locator(`[data-test="add-to-cart-${dataTestSuffix}"]`);
    const item = addButton.locator('xpath=ancestor::*[contains(@class,"inventory_item")]');
    const priceText = (await item.locator(InventoryLocators.itemPrice).first().textContent())?.trim() ?? '';
    return Number(priceText.replace('$', '').trim());
  }

  async removeFromCartByDataTest(dataTestSuffix: string): Promise<void> {
    await this.page.locator(`[data-test="remove-${dataTestSuffix}"]`).click();
  }

  async selectSort(optionValue: string): Promise<void> {
    await this.sortSelect.selectOption(optionValue);
  }

  async getDisplayedItemNames(): Promise<string[]> {
    const names = await this.itemNames.allTextContents();
    return names.map((n) => n.trim()).filter(Boolean);
  }

  async getDisplayedItemPrices(): Promise<number[]> {
    const prices = await this.itemPrices.allTextContents();
    return prices
      .map((p) => p.replace('$', '').trim())
      .filter(Boolean)
      .map((p) => Number(p));
  }

  async getDisplayedItems(): Promise<Array<{ name: string; price: number }>> {
    const names = await this.getDisplayedItemNames();
    const prices = await this.getDisplayedItemPrices();
    const items: Array<{ name: string; price: number }> = [];
    for (let i = 0; i < Math.min(names.length, prices.length); i += 1) {
      items.push({ name: names[i], price: prices[i] });
    }
    return items;
  }

  async expectCartBadgeCount(expected: number): Promise<void> {
    if (expected === 0) {
      await expect(this.cartBadge).toHaveCount(0);
      return;
    }
    await expect(this.cartBadge).toHaveText(String(expected));
  }
}
