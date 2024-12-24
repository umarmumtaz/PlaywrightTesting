import { test } from "@playwright/test";
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

  });
});
