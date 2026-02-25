import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

const CheckoutOverviewLocators = {
  finishButton: '[data-test="finish"], #finish',
  cancelButton: '[data-test="cancel"], #cancel',
  summarySubtotal: '.summary_subtotal_label',
  summaryTax: '.summary_tax_label',
  summaryTotal: '.summary_total_label',
} as const;

export class CheckoutOverviewPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get finishButton(): Locator {
    return this.page.locator(CheckoutOverviewLocators.finishButton);
  }

  private get cancelButton(): Locator {
    return this.page.locator(CheckoutOverviewLocators.cancelButton);
  }

  private get subtotalLabel(): Locator {
    return this.page.locator(CheckoutOverviewLocators.summarySubtotal);
  }

  private get taxLabel(): Locator {
    return this.page.locator(CheckoutOverviewLocators.summaryTax);
  }

  private get totalLabel(): Locator {
    return this.page.locator(CheckoutOverviewLocators.summaryTotal);
  }

  async expectTotalsVisible(): Promise<void> {
    await expect(this.subtotalLabel).toBeVisible();
    await expect(this.taxLabel).toBeVisible();
    await expect(this.totalLabel).toBeVisible();
  }

  private async parseMoneyFromLabel(label: Locator): Promise<number> {
    const text = (await label.textContent())?.trim() ?? '';
    const match = text.match(/\$([0-9]+(?:\.[0-9]{1,2})?)/);
    if (!match) return NaN;
    return Number(match[1]);
  }

  async getSubtotal(): Promise<number> {
    return this.parseMoneyFromLabel(this.subtotalLabel);
  }

  async getTax(): Promise<number> {
    return this.parseMoneyFromLabel(this.taxLabel);
  }

  async getTotal(): Promise<number> {
    return this.parseMoneyFromLabel(this.totalLabel);
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }
}
