// //this script imports the necessory modules
import { test, expect, BrowserContext } from "@playwright/test";
//import the login page class defined in the login page
import { JobDetails } from "../Pages/JobDetails.ts";
import { JobDetailsContent } from "../Pages/JobDetailsContent.ts";
import { readExpectedValuesFromExcel } from '../utils/excelUtils2.ts';

test('Compare job details from web and Excel', async ({ page }) => {
  // Navigate to the Job Details page
  await page.goto('https://test.jobtrain.co.uk/ybscareers/Job/JobDetail?JobId=20235');
  const jobDetailsPage = new JobDetails(page);
  const actualValues  = await jobDetailsPage.readActualValuesFromPage() //as JobDetailsInter;
  // Read expected values from the Excel file
  const expectedValues  = readExpectedValuesFromExcel('C:\\Users\\urmz\\Documents\\jobtrain documentations\\JTAutomation\\JTAutomation\\jobdetail.xlsx', 'Sheet1') //as JobDetailsInter;
  console.log('Actual Values:', actualValues);
  console.log('Expected Values:', expectedValues);
  // Compare actual and expected values
  // for (const key in actualValues) {
  //     if (actualValues.hasOwnProperty(key)) {
  //       expect(actualValues[key]).toBe(expectedValues[key]);
  //     }
  // }
});
test("Verify the job details page content", async ({ page }) => {
const jobDetailsContent = new JobDetailsContent(page);
await jobDetailsContent.goToJobDetailsPage();
await jobDetailsContent.verifyTheJobTitle();
await jobDetailsContent.verifytheApplyJobButton();
await jobDetailsContent.verifyTheAdvertTitle();
});
