

// /*import { test } from "@playwright/test";
// import { ApplyForJob } from "../Pages/ApplyForJob";
// import * as xlsx from "xlsx"; // Import the xlsx library

// // Define an interface for the expected data structure in the Excel file
// interface AccountData {
//     email: string;
//     password: string;
//   }
// // Function to read data from Excel
// function readFromExcel(filePath: string, sheetName: string): AccountData[] {
//     const workbook = xlsx.readFile(filePath);  // Read the Excel file
//     const worksheet = workbook.Sheets[sheetName];  // Get the sheet
//     return xlsx.utils.sheet_to_json<AccountData>(worksheet);  // Return typed data
//   }
//   test("Apply for a Job using data from Excel", async ({ page }) => {
//     // Read stored registration data from Excel
//     const data: AccountData[] = readFromExcel("./accountData.xlsx", "Sheet1");
    
//     if (!data || data.length === 0) {
//       throw new Error("No data found in the Excel file.");
//     }
//     // Assume data is in the first row
//     const { email, password } = data[0];
//     // Perform login using the retrieved credentials
//     await page.goto("https://test.jobtrain.co.uk/ybscareers/Account/LogIn");
//     await page.locator("#signInEmail").fill(email);
//     await page.locator("#inputPassword").fill(password +" ");
//    // await page.keyboard.press('Space');
//     await page.locator("#signIn").click();  // Click on sign-in button
//     await page.waitForLoadState('networkidle');  // Wait for the page to fully load, with no pending requests
 
//     const applyForJob = new ApplyForJob(page);
//     // Now proceed with the job application after logging in
//     await applyForJob.clickOnApplyforJobBtn();
//     await page.waitForLoadState('networkidle');  // Wait for the page to fully load, with no pending requests
//     await applyForJob.preferenceForCohortJob();
//     await applyForJob.clickOnTheContinueBtn();
//     await applyForJob.selectTheQuestions();
//     await applyForJob.clickOnTheContinueBtn2();

//   });


// */



// import { test } from "@playwright/test";
// import { ApplyForJob } from "../Pages/ApplyForJob";
// import { ApplyApplicationAboutYouTab } from "../Pages/ApplyApplicationAboutYouTab";
// import * as xlsx from "xlsx"; // Import the xlsx library


// // Define an interface for the expected data structure in the Excel file
// interface AccountData {
//   email: string;
//   password: string;
// }

// // Function to read data from Excel
// function readFromExcel(filePath: string, sheetName: string): AccountData[] {
//   const workbook = xlsx.readFile(filePath);  // Read the Excel file
//   const worksheet = workbook.Sheets[sheetName];  // Get the sheet
//   return xlsx.utils.sheet_to_json<AccountData>(worksheet);  // Return typed data
// }

// test.describe('Job Application Suite', () => {
  
//   // Hook to read data from Excel and perform login for each test
//   let accountData: AccountData;

//   // Use beforeEach to login before each test
//   test.beforeEach(async ({ page }) => {
//     // Read stored registration data from Excel
//     const data: AccountData[] = readFromExcel("./accountData.xlsx", "Sheet1");
    
//     if (!data || data.length === 0) {
//       throw new Error("No data found in the Excel file.");
//     }

//     // Assume data is in the first row
//     accountData = data[0];

//     // Perform login using the retrieved credentials
//     await page.goto("https://test.jobtrain.co.uk/ybscareers/Account/LogIn");
//     await page.locator("#signInEmail").fill(accountData.email);
//     await page.locator("#inputPassword").fill(accountData.password);
//     await page.keyboard.press('Space');
//     await page.locator("#signIn").click();  // Click on sign-in button
//     await page.waitForLoadState('networkidle');  // Wait for the page to fully load

    
//   });

//   // Test case 1: Apply for a job
//   test('Apply for a Job', async ({ page }) => {
//     const applyForJob = new ApplyForJob(page);

//     // Now proceed with the job application after logging in
//     await applyForJob.clickOnApplyforJobBtn();
//     await page.waitForLoadState('networkidle');  // Wait for the page to fully load
//     await applyForJob.preferenceForCohortJob();
//     await applyForJob.clickOnTheContinueBtn();
//     await applyForJob.selectTheQuestions();
//     await applyForJob.clickOnTheContinueBtn2();
//   });


// test("move to about you Tab", async ({ page }) => {
//   // Step 1: Login using credentials from Excel
 
//   // Step 3: Perform the application process
//   const applyApplicationAboutYouTab = new ApplyApplicationAboutYouTab(page);
//   await applyApplicationAboutYouTab.verifyTheJobTitle();
//   await applyApplicationAboutYouTab.verifyTheFormHeading();
//   await applyApplicationAboutYouTab.verifyTheAboutYouTabHeadings();
//   await applyApplicationAboutYouTab.verifyTheParaghraphAboutYoutTab();
// });



// });





/*


import { test } from "@playwright/test";
import { ApplyForJob } from "../Pages/ApplyForJob";
import { ApplyApplicationAboutYouTab } from "../Pages/ApplyApplicationAboutYouTab";
import * as xlsx from "xlsx"; // For Excel reading

interface AccountData {
  email: string;
  password: string;
}

// Function to read data from Excel
function readFromExcel(filePath: string, sheetName: string): AccountData[] {
  const workbook = xlsx.readFile(filePath);  // Read the Excel file
  const worksheet = workbook.Sheets[sheetName];  // Get the sheet
  return xlsx.utils.sheet_to_json<AccountData>(worksheet);  // Return typed data
}

test.describe('Job Application Suite', () => {

  let accountData: AccountData;
  const excelFilePath = "./accountData.xlsx";
  const excelSheetName = "Sheet1";

  // Read stored registration data from Excel before the test
  test.beforeEach(async ({ page }) => {
    const data: AccountData[] = readFromExcel(excelFilePath, excelSheetName);
    
    if (!data || data.length === 0) {
      throw new Error("No data found in the Excel file.");
    }

    accountData = data[0]; // Use the first row's credentials

    // Perform login using the retrieved credentials
    await page.goto("https://test.jobtrain.co.uk/ybscareers/Account/LogIn");
    await page.locator("#signInEmail").fill(accountData.email);
    await page.locator("#inputPassword").fill(accountData.password);
    await page.keyboard.press('Space');
    await page.locator("#signIn").click();
    await page.waitForLoadState('networkidle');  // Wait for the page to fully load
  });

  // **Apply for a Job**
  test('Apply for a Job', async ({ page }) => {
    const applyForJob = new ApplyForJob(page);

    // Now proceed with the job application after logging in
    await applyForJob.clickOnApplyforJobBtn();
    await page.waitForLoadState('networkidle');  // Wait for the page to fully load
    await applyForJob.preferenceForCohortJob();
    await applyForJob.clickOnTheContinueBtn();
    await applyForJob.selectTheQuestions();
    await applyForJob.clickOnTheContinueBtn2();
  });

  // **Move to About You Tab**
  test('Move to About You Tab', async ({ page }) => {
    const applyApplicationAboutYouTab = new ApplyApplicationAboutYouTab(page);

    await applyApplicationAboutYouTab.verifyTheJobTitle();
    await applyApplicationAboutYouTab.verifyTheFormHeading();
    await applyApplicationAboutYouTab.verifyTheAboutYouTabHeadings();
    await applyApplicationAboutYouTab.verifyTheParaghraphAboutYoutTab();
  });

  // **Logout after job application**
  test('Logout after job application', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'person_outline Hi paul' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
  });
});

*/





import { test } from "@playwright/test";
import { ApplyForJob } from "../Pages/ApplyForJob";
import { ApplyApplicationAboutYouTab } from "../Pages/ApplyApplicationAboutYouTab";
import * as xlsx from "xlsx"; // Import the xlsx library

// Function to read data from Excel
function readFromExcel(filePath: string, sheetName: string) {
  const workbook = xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(worksheet);
}

test.use({ storageState: 'state.json' });  // Reuse the saved session state

//use before each for logincadd the excel path for credentials
//before each add network idels/load methods
//
test.describe('Job Application Suite', () => {
  
  // Test case 1: Apply for a job
  test('Apply for a Job', async ({ page }) => {
    const applyForJob = new ApplyForJob(page);

    // Now proceed with the job application after logging in (session reused)
    await applyForJob.clickOnApplyforJobBtn();
    await page.waitForLoadState('networkidle');  // Wait for the page to fully load
    await applyForJob.preferenceForCohortJob();
    await applyForJob.clickOnTheContinueBtn();
    await applyForJob.selectTheQuestions();
    await applyForJob.clickOnTheContinueBtn2();
  });

  test("move to about you Tab", async ({ page }) => {
    const applyApplicationAboutYouTab = new ApplyApplicationAboutYouTab(page);

    await applyApplicationAboutYouTab.verifyTheJobTitle();
    await applyApplicationAboutYouTab.verifyTheFormHeading();
    await applyApplicationAboutYouTab.verifyTheAboutYouTabHeadings();
    await applyApplicationAboutYouTab.verifyTheParaghraphAboutYoutTab();
  });

});
