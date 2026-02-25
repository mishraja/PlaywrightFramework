import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

const LoginLocators = {
  usernameInput: '[data-test="username"], #user-name',
  passwordInput: '[data-test="password"], #password',
  loginButton: '[data-test="login-button"], #login-button',
  errorContainer: 'h3[data-test="error"]',
} as const;

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get usernameInput(): Locator {
    return this.page.locator(LoginLocators.usernameInput);
  }

  private get passwordInput(): Locator {
    return this.page.locator(LoginLocators.passwordInput);
  }

  private get loginButton(): Locator {
    return this.page.locator(LoginLocators.loginButton);
  }

  private get errorContainer(): Locator {
    return this.page.locator(LoginLocators.errorContainer);
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async expectAt(): Promise<void> {
    await expect(this.loginButton).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async submit(): Promise<void> {
    await this.loginButton.click();
  }

  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async expectErrorVisible(): Promise<void> {
    await expect(this.errorContainer).toBeVisible();
  }

  async getErrorText(): Promise<string> {
    await this.expectErrorVisible();
    return (await this.errorContainer.textContent())?.trim() ?? '';
  }
}
