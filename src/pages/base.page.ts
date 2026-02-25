import { type Locator, type Page, expect } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForVisible(target: Locator, timeoutMs = 10_000): Promise<void> {
    await expect(target).toBeVisible({ timeout: timeoutMs });
  }
}

