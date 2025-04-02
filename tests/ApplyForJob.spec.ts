
import { test, expect } from "@playwright/test";
import { ApplyForJob } from "../Pages/ApplyForJob";
import { SupportingInfo } from "../Pages/SupportingInfo";
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


test("About You - Upload the CV", async ({ page }) => {
  // Step 3: Perform the application process
  const applyApplicationAboutYouTab = new ApplyApplicationAboutYouTab(page);
 await applyApplicationAboutYouTab.goToAboutYou();
 await applyApplicationAboutYouTab.verifyThePrePopulatedFiledData();
 await applyApplicationAboutYouTab.fillTheBasicForm();
 await page.waitForLoadState('networkidle');
 await applyApplicationAboutYouTab.uploadCV();
 });

 test("Fulfill the supporting info form", async ({ page }) => {
  const supportingInfo = new SupportingInfo(page);
  await supportingInfo.goToSupportingInfo();
  await supportingInfo.verifyTheSupportingInfoPageHeadings();
  await supportingInfo.fillReferenceForm();
  await supportingInfo.uploadDocument();
  await page.waitForLoadState('networkidle');
 await supportingInfo.uploadCoverLetter();
 await page.waitForLoadState('networkidle');
 await supportingInfo.verifyTheAddionalInfo();
 await page.waitForLoadState('networkidle');
 await supportingInfo.verifyTheCrbFrom();
//fulfill the equal ops form
//await supportingInfo.completeAssessmentFromA(); //there is an issue
//await supportingInfo.completeEqualOppsForm();
});


});








//this one is ook now add further education xp and other in it
//others tab created one, like first complete this one about you
//then move to next tab using the url with session storage like that
//how to use tags in playwright for smoke/regression/others
//login common helper or utils 
//tagging how to use it
//hopw to use the different tabs like channing or linking