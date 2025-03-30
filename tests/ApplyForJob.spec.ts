
import { test, expect } from "@playwright/test";
import { ApplyForJob } from "../Pages/ApplyForJob";
import { ApplyApplicationAboutYouTab } from "../Pages/ApplyApplicationAboutYouTab";
import * as xlsx from "xlsx"; // Import the xlsx library
import { LoginPage } from "../Pages/LoginPage";
// Function to read data from Excel
function readFromExcel(filePath: string, sheetName: string) {
  const workbook = xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(worksheet);
}

// Read credentials before tests run
const credentials: any = readFromExcel("./accountData.xlsx", "Sheet1")[0]; 
test.describe('Job Application Suite', () => {
  test.use({ storageState: "state.json" });
  // Test case 1: Apply for a job
  test('Apply for a Job', async ({ page }) => {
    const applyForJob = new ApplyForJob(page);
    // Now proceed with the job application after logging in (session reused)
    //await applyForJob.loginForJobApply();
    await page.goto("");
    await page.locator(".sign_in_detail").click();
    
    const emailPassword: any = await readFromExcel("./accountData.xlsx","Sheet1");
    console.log(emailPassword[0].email);
    //  console.log(emailPassword[0].password)
    await page.getByTestId("txt-email").fill(emailPassword[0].email);
    await page.getByTestId("txt-password").fill(emailPassword[0].password);
    await page.waitForLoadState('networkidle');
    await page.locator("#signIn").click();
    await applyForJob.clickOnApplyforJobBtn();
    await page.waitForLoadState('networkidle');  // Wait for the page to fully load
    await applyForJob.preferenceForCohortJob();
    await page.waitForLoadState('networkidle');
    await applyForJob.clickOnTheContinueBtn();
    await applyForJob.selectTheQuestions();
    await applyForJob.clickOnTheContinueBtn2();
    await page.context().storageState({ path: "state.json" });
  });

 
  test("move to about you Tab", async ({ page }) => {
    const applyApplicationAboutYouTab = new ApplyApplicationAboutYouTab(page);
    const loginPage= new LoginPage(page);
    await loginPage.gotToHomePage();
    await applyApplicationAboutYouTab.verifyTheJobTitle();
   // await applyApplicationAboutYouTab.verifyTheFormHeading();
   await page.getByTestId('div-my-applications').locator('div').filter({ hasText: 'Edit' }).nth(2).click();
   await page.getByRole('link', { name: 'Finish application' }).click();
   await applyApplicationAboutYouTab.verifyTheAboutYouTabHeadings();
    await applyApplicationAboutYouTab.verifyTheParaghraphAboutYoutTab();
  });


});








//this one is ook now add further education xp and other in it
//others tab created one, like first complete this one about you
//then move to next tab using the url with session storage like that
//how to use tags in playwright for smoke/regression/others
//