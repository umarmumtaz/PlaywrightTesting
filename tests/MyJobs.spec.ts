import { test, expect } from "@playwright/test";
import { ApplyForJob } from "../Pages/ApplyForJob";
import { MyJobs } from "../Pages/MyJobs";
import * as xlsx from "xlsx"; // Import the xlsx library

// Function to read data from Excel
function readFromExcel(filePath: string, sheetName: string) {
  const workbook = xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(worksheet);
}

test.use({ storageState: 'state.json' });  // Reuse the saved session state

test.describe('My Job`s Section ', () => {
  
  // Test case 1: Apply for a job
  test('Apply for a Job', async ({ page }) => {
const myJobs = new MyJobs(page);
await myJobs.myJobsSection();
await expect(page.getByTestId('h1-jt-page-title')).toHaveText('**Bulk Recruitment Test Job');
await page.getByTestId('a-btn-top-job-apply-button').click();
await expect(page.getByRole('heading', { name: 'Preferences' })).toHaveText('Preferences');
await page.getByText('No Preference').nth(1).click();
await page.getByText('No Preference').nth(2).click();
await page.getByRole('button', { name: 'Continue' }).click();
await expect(page.getByText('Great - you\'re applying for')).toContainText(' **Bulk Recruitment Test Job');
await page.getByRole('button', { name: 'Continue' }).click();
await page.getByText('1').nth(1).click();
await page.getByText('1').nth(2).click();
await page.getByText('1').nth(3).click();
await page.getByRole('button', { name: 'Continue' }).click();
await page.locator('label').filter({ hasText: 'Microbial surfaces' }).click();
await page.getByRole('button', { name: 'Save and Continue' }).click();
await expect(page.getByText('**Bulk Recruitment Test Job')).toContainText(' **Bulk Recruitment Test Job');

  });


//add the test cases edit application and further



});
