import { Browser, BrowserContext, chromium, firefox, webkit, Page } from '@playwright/test';

export class BrowserFactory {
    private static browser: Browser;
    private static context: BrowserContext;

    /**
     * Create a browser instance
     * @param browserType - 'chromium', 'firefox', or 'webkit' (default: chromium)
     * @param headless - Run in headless mode (default: true)
     */
    static async createBrowser(browserType: 'chromium' | 'firefox' | 'webkit' = 'chromium', headless: boolean = true): Promise<Browser> {
        switch (browserType) {
            case 'firefox':
                this.browser = await firefox.launch({ headless });
                break;
            case 'webkit':
                this.browser = await webkit.launch({ headless });
                break;
            default:
                this.browser = await chromium.launch({ headless });
        }
        return this.browser;
    }

    /**
     * Create a new browser context
     */
    static async createContext(): Promise<BrowserContext> {
        if (!this.browser) {
            throw new Error('Browser not initialized. Call createBrowser first.');
        }
        this.context = await this.browser.newContext();
        return this.context;
    }

    /**
     * Create a new page
     */
    static async createPage(): Promise<Page> {
        if (!this.context) {
            await this.createContext();
        }
        return await this.context.newPage();
    }

    /**
     * Close the browser instance
     */
    static async closeBrowser(): Promise<void> {
        if (this.browser) {
            await this.browser.close();
        }
    }
}
