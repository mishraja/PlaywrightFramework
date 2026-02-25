import Logger from './Logger';

export class RetryHelper {
    /**
     * Retry an async operation a specified number of times
     * @param operation - The async function to retry
     * @param retries - Number of retries (default: 3)
     * @param delay - Delay between retries in ms (default: 1000)
     */
    static async retry<T>(operation: () => Promise<T>, retries: number = 3, delay: number = 1000): Promise<T> {
        let lastError: any;

        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                return await operation();
            } catch (error) {
                lastError = error;
                Logger.warn(`Retry attempt ${attempt}/${retries} failed: ${(error as Error).message}`);
                if (attempt < retries) {
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }

        Logger.error(`Operation failed after ${retries} attempts`);
        throw lastError;
    }
}
