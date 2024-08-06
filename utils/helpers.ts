/**
 * File: helpers.ts
 * Author: Shabbir Minhas
 * Date: 
 * 
 * Description:
 * This file contains helper functions that can be used across the project.
 * 
 * Classes/Functions:
 *   takeScreenshot:
 *     Description: Takes a screenshot of the current page.
 *     Author: Shabbir
 * 
 * Usage:
 * import { takeScreenshot } from "../utils/helpers";
 * await takeScreenshot(page, 'example-page');
 */

import * as fs from 'fs';
import * as path from 'path';
import { Page } from 'playwright';
import { fileURLToPath } from 'url';
// Recreate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/**
 * Helpers class containing utility functions for the project.
 */
export class Helpers {
    

    /**
 * Takes a screenshot and saves it in a dated folder.
 * @param {Page} page - The Playwright page object.
 * @param {string} screenshotName - The name for the screenshot file.
 */
static async takeScreenshot(page: Page, screenshotName: string,baseDir: string = __dirname): Promise<void> {
    // Get the current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split('T')[0];

    // Create the folder path
    const folderPath = path.join(__dirname, 'Screenshots', currentDate);

    // Check if the folder exists, if not, create it
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    // Get the current time in HH-MM-SS format
    const currentTime = new Date().toISOString().split('T')[1].split('.')[0].replace(/:/g, '-');

    // Create the full file path
    const filePath = path.join(folderPath, `${screenshotName}-${currentTime}.png`);

    // Take the screenshot
    await page.screenshot({ path: filePath, fullPage: true });

    console.log(`Screenshot saved at ${filePath}`);
}

    // Other helper functions can be added here...
}