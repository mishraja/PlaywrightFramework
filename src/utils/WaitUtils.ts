import { Page, Locator, Frame } from '@playwright/test';

export class WaitUtils {
    /**
     * Wait for an element to be visible
     * @param page - Playwright Page or Frame
     * @param selector - CSS/XPath selector
     * @param timeout - Timeout in milliseconds (default: 10000)
     */
    static async waitForVisible(page: Page | Frame, selector: string, timeout: number = 10000): Promise<void> {
        await page.waitForSelector(selector, { state: 'visible', timeout });
    }

    /**
     * Wait for an element to be hidden
     * @param page - Playwright Page or Frame
     * @param selector - CSS/XPath selector
     * @param timeout - Timeout in milliseconds (default: 10000)
     */
    static async waitForHidden(page: Page | Frame, selector: string, timeout: number = 10000): Promise<void> {
        await page.waitForSelector(selector, { state: 'hidden', timeout });
    }

    /**
     * Wait for an element to be attached to the DOM
     * @param page - Playwright Page or Frame
     * @param selector - CSS/XPath selector
     * @param timeout - Timeout in milliseconds (default: 10000)
     */
    static async waitForAttached(page: Page | Frame, selector: string, timeout: number = 10000): Promise<void> {
        await page.waitForSelector(selector, { state: 'attached', timeout });
    }

    /**
     * Wait for an element to be detached from the DOM
     * @param page - Playwright Page or Frame
     * @param selector - CSS/XPath selector
     * @param timeout - Timeout in milliseconds (default: 10000)
     */
    static async waitForDetached(page: Page | Frame, selector: string, timeout: number = 10000): Promise<void> {
        await page.waitForSelector(selector, { state: 'detached', timeout });
    }

    /**
     * Wait for URL to contain specific text
     * @param page - Playwright Page
     * @param urlPart - Substring of the URL
     * @param timeout - Timeout in milliseconds (default: 10000)
     */
    static async waitForUrlToContain(page: Page, urlPart: string, timeout: number = 10000): Promise<void> {
        await page.waitForURL((url) => url.toString().includes(urlPart), { timeout });
    }

    /**
     * Hard wait (Use sparingly)
     * @param ms - Time in milliseconds
     */
    static async hardWait(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
