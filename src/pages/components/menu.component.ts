import { type Page, expect } from '@playwright/test';

const MenuLocators = {
  menuContainer: '.bm-menu-wrap',
  allItems: '#inventory_sidebar_link',
  about: '#about_sidebar_link',
  logout: '#logout_sidebar_link',
  resetAppState: '#reset_sidebar_link',
  closeButton: '#react-burger-cross-btn',
} as const;

export class MenuComponent {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private get menuContainer() {
    return this.page.locator(MenuLocators.menuContainer);
  }

  async waitForOpen(): Promise<void> {
    await expect(this.menuContainer).toBeVisible();
  }

  async clickLogout(): Promise<void> {
    await this.page.locator(MenuLocators.logout).click();
  }

  async clickResetAppState(): Promise<void> {
    await this.page.locator(MenuLocators.resetAppState).click();
  }
}
