import { Page } from '@playwright/test';
import Logger from './Logger';

export class PerformanceUtil {
    /**
     * Measure performance of a specific action
     * @param actionName - Name of the action
     * @param action - Async function to measure
     */
    static async measurePerformance(actionName: string, action: () => Promise<void>): Promise<void> {
        const start = Date.now();
        await action();
        const end = Date.now();
        const duration = end - start;
        Logger.info(`Performance: [${actionName}] took ${duration}ms`);
    }

    /**
     * Get Navigation Timing API metrics
     * @param page - Playwright Page
     */
    static async getNavigationTiming(page: Page): Promise<any> {
        const timing = await page.evaluate(() => {
            return JSON.stringify(window.performance.timing);
        });
        Logger.info(`Navigation Timing: ${timing}`);
        return JSON.parse(timing);
    }
}
