import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

const CheckoutCompleteLocators = {
  completeHeader: '.complete-header',
  backHomeButton: '[data-test="back-to-products"], #back-to-products',
} as const;

export class CheckoutCompletePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get completeHeader(): Locator {
    return this.page.locator(CheckoutCompleteLocators.completeHeader);
  }

  private get backHomeButton(): Locator {
    return this.page.locator(CheckoutCompleteLocators.backHomeButton);
  }

  async expectComplete(): Promise<void> {
    await expect(this.completeHeader).toBeVisible();
  }

  async backHome(): Promise<void> {
    await this.backHomeButton.click();
  }
}
