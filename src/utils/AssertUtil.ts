import { expect, Page, Locator } from '@playwright/test';

export class AssertUtil {
    /**
     * Assert that an element is visible
     * @param locator - Playwright Locator
     * @param message - Custom error message
     */
    static async toBeVisible(locator: Locator, message?: string): Promise<void> {
        await expect(locator, message).toBeVisible();
    }

    /**
     * Assert that an element is hidden
     * @param locator - Playwright Locator
     * @param message - Custom error message
     */
    static async toBeHidden(locator: Locator, message?: string): Promise<void> {
        await expect(locator, message).toBeHidden();
    }

    /**
     * Assert that an element contains specific text
     * @param locator - Playwright Locator
     * @param text - Expected text
     * @param message - Custom error message
     */
    static async toContainText(locator: Locator, text: string, message?: string): Promise<void> {
        await expect(locator, message).toContainText(text);
    }

    /**
     * Assert URL contains specific text
     * @param page - Playwright Page
     * @param urlPart - Expected URL part
     * @param message - Custom error message
     */
    static async toHaveURL(page: Page, urlPart: string, message?: string): Promise<void> {
        await expect(page, message).toHaveURL(new RegExp(urlPart));
    }

    /**
     * Assert page title
     * @param page - Playwright Page
     * @param title - Expected title
     * @param message - Custom error message
     */
    static async toHaveTitle(page: Page, title: string, message?: string): Promise<void> {
        await expect(page, message).toHaveTitle(title);
    }
}
