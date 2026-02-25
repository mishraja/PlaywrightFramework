import fs from 'fs-extra';
import path from 'path';

export class FileUtil {
    /**
     * Read JSON file
     * @param filePath - Path to JSON file
     */
    static readJsonFile(filePath: string): any {
        try {
            return fs.readJsonSync(filePath);
        } catch (error) {
            throw new Error(`Error reading JSON file at ${filePath}: ${(error as Error).message}`);
        }
    }

    /**
     * Write data to JSON file
     * @param filePath - Path to JSON file
     * @param data - Data to write
     */
    static writeJsonFile(filePath: string, data: any): void {
        try {
            fs.outputJsonSync(filePath, data, { spaces: 2 });
        } catch (error) {
            throw new Error(`Error writing JSON file at ${filePath}: ${(error as Error).message}`);
        }
    }

    /**
     * Check if file exists
     * @param filePath - Path to file
     */
    static fileExists(filePath: string): boolean {
        return fs.existsSync(filePath);
    }

    /**
     * Delete file
     * @param filePath - Path to file
     */
    static deleteFile(filePath: string): void {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }

    /**
     * Create directory if it doesn't exist
     * @param dirPath - Path to directory
     */
    static createDir(dirPath: string): void {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }
}
