import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

const CheckoutInfoLocators = {
  firstNameInput: '[data-test="firstName"], #first-name',
  lastNameInput: '[data-test="lastName"], #last-name',
  postalCodeInput: '[data-test="postalCode"], #postal-code',
  continueButton: '[data-test="continue"], #continue',
  cancelButton: '[data-test="cancel"], #cancel',
  errorContainer: 'h3[data-test="error"]',
} as const;

export class CheckoutInfoPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get firstNameInput(): Locator {
    return this.page.locator(CheckoutInfoLocators.firstNameInput);
  }

  private get lastNameInput(): Locator {
    return this.page.locator(CheckoutInfoLocators.lastNameInput);
  }

  private get postalCodeInput(): Locator {
    return this.page.locator(CheckoutInfoLocators.postalCodeInput);
  }

  private get continueButton(): Locator {
    return this.page.locator(CheckoutInfoLocators.continueButton);
  }

  private get cancelButton(): Locator {
    return this.page.locator(CheckoutInfoLocators.cancelButton);
  }

  private get errorContainer(): Locator {
    return this.page.locator(CheckoutInfoLocators.errorContainer);
  }

  async fillCustomerInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async expectErrorVisible(): Promise<void> {
    await expect(this.errorContainer).toBeVisible();
  }

  async getErrorText(): Promise<string> {
    await this.expectErrorVisible();
    return (await this.errorContainer.textContent())?.trim() ?? '';
  }
}
