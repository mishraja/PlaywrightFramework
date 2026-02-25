export class DataFactory {
    /**
     * Generate a random string of a given length
     * @param length - Length of the string (default: 8)
     */
    static generateRandomString(length: number = 8): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    /**
     * Generate a random email address
     */
    static generateRandomEmail(): string {
        return `testuser_${Date.now()}@example.com`;
    }

    /**
     * Generate a random number within a range
     * @param min - Minimum value
     * @param max - Maximum value
     */
    static generateRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
