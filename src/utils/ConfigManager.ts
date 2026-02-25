import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export class ConfigManager {
    static getEnv(key: string, defaultValue: string = ''): string {
        return process.env[key] || defaultValue;
    }

    static getNumberEnv(key: string, defaultValue: number = 0): number {
        const value = process.env[key];
        return value ? parseInt(value, 10) : defaultValue;
    }

    static getBooleanEnv(key: string, defaultValue: boolean = false): boolean {
        const value = process.env[key];
        return value ? value.toLowerCase() === 'true' : defaultValue;
    }

    static isCI(): boolean {
        return this.getBooleanEnv('CI', false);
    }
}
