// //this script imports the necessory modules
import { test, expect, BrowserContext } from "@playwright/test";

import { JobDetails } from "../Pages/JobDetails.ts";
import { JobDetailsContent } from "../Pages/JobDetailsContent.ts";
import { readExpectedValuesFromExcel } from '../utils/excelUtils2.ts';

import * as fs from 'fs/promises';
//import { readActualValuesFromPage, readExpectedValuesFromExcel, verifyValues } from "../utils/excelUtils2.ts";
//import { readActualValuesFromPage, readExpectedValuesFromExcel } from "../utils/excelUtils2.ts";
//import * as XLSX from 'xlsx';



//this test case ll be handle later

// test("Verify the job details values", async ({ page }) => {
//   const homePage = new LoginPage(page); //class passing the current page object
//   await homePage.gotToHomePage();
//   const homePage2 = new HomePage(page);
// await page.getByRole('link', { name: 'Jobtrain Test job', exact: true }).click()
// //add the assertions for verify the job detail page
// // const expectedValues = readExpectedValuesFromExcel('expectedValues.xlsx');
// // const actualValues = readActualValuesFromPage(page)
// const  expectedValues = await readActualValuesFromPage(page);
// console.log('expected values are' , expectedValues)
//  const actualValues =readExpectedValuesFromExcel("C:\\Users\\urmz\\Documents\\jobtrain documentations\\JTAutomation\\JTAutomation\\jobdetail.xlsx")
// console.log(actualValues)
//  // // Verify the values
// // verifyValues(actualValues, expectedValues);

// });


//new code


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
