import { expect, test } from "@playwright/test";
import { ApplyApplicationAboutYouTab } from "../Pages/ApplyApplicationAboutYouTab";
import { loginWithCredentials } from "../utils/loginUtils"; // Import the login utility function

test("Login and move to about you Tab", async ({ page }) => {
  // Step 1: Login using credentials from Excel
  await loginWithCredentials(page, "./accountData.xlsx", "Sheet1");
  // Step 3: Perform the application process
  const applyApplicationAboutYouTab = new ApplyApplicationAboutYouTab(page);
  await applyApplicationAboutYouTab.clickOnEditJobBtn();
  await applyApplicationAboutYouTab.verifyTheJobModalHeadings();
  await applyApplicationAboutYouTab.clickOnFinishApplication();
  await applyApplicationAboutYouTab.verifyTheJobTitle();
  await applyApplicationAboutYouTab.verifyTheFormHeading();
  await applyApplicationAboutYouTab.verifyTheAboutYouTabHeadings();
  await applyApplicationAboutYouTab.verifyTheParaghraphAboutYoutTab();
});

test("Fillout the About You form", async ({ page }) => {
 // Step 1: Login using credentials from Excel
await loginWithCredentials(page, "./accountData.xlsx", "Sheet1");
 // Step 3: Perform the application process
 const applyApplicationAboutYouTab = new ApplyApplicationAboutYouTab(page);
await applyApplicationAboutYouTab.goToAboutYou();
await applyApplicationAboutYouTab.verifyThePrePopulatedFiledData();

});

test("About You - Upload the CV", async ({ page }) => {
  // Step 1: Login using credentials from Excel
 await loginWithCredentials(page, "./accountData.xlsx", "Sheet1");
  // Step 3: Perform the application process
  const applyApplicationAboutYouTab = new ApplyApplicationAboutYouTab(page);
 await applyApplicationAboutYouTab.goToAboutYou();
 await applyApplicationAboutYouTab.uploadCV();
 await applyApplicationAboutYouTab.verifyThePrePopulatedFiledData();
 await applyApplicationAboutYouTab.addValuesInTheFields();
 await applyApplicationAboutYouTab.inputValueAdd();
 await applyApplicationAboutYouTab.clickOnContinueBtn();
 //await applyApplicationAboutYouTab.verifyTheTickIcon();
 await page.pause()
 });
 