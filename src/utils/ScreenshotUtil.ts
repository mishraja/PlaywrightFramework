import { Page } from '@playwright/test';
import path from 'path';

export class ScreenshotUtil {
    /**
     * Take a full page screenshot
     * @param page - Playwright Page
     * @param name - Name of the screenshot file
     */
    static async takeFullPageScreenshot(page: Page, name: string): Promise<void> {
        const screenshotPath = path.join('screenshots', `${name}_${Date.now()}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true });
    }

    /**
     * Take a screenshot of a specific element
     * @param page - Playwright Page
     * @param selector - Selector of the element
     * @param name - Name of the screenshot file
     */
    static async takeElementScreenshot(page: Page, selector: string, name: string): Promise<void> {
        const element = page.locator(selector);
        const screenshotPath = path.join('screenshots', `${name}_element_${Date.now()}.png`);
        await element.screenshot({ path: screenshotPath });
    }
}
