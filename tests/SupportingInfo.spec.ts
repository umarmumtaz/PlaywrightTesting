import { expect, test } from "@playwright/test";
import { ApplyApplicationAboutYouTab } from "../Pages/ApplyApplicationAboutYouTab";
import { SupportingInfo } from "../Pages/SupportingInfo";
import { loginWithCredentials } from "../utils/loginUtils"; // Import the login utility function

test("Fulfill the supporting info form", async ({ page }) => {
  // Step 1: Login using credentials from Excel
  await loginWithCredentials(page, "./accountData.xlsx", "Sheet1");
  const supportingInfo = new SupportingInfo(page);
  await supportingInfo.goToSupportingInfo();
  await supportingInfo.verifyTheSupportingInfoPageHeadings();
  await supportingInfo.fillReferenceForm();
  await supportingInfo.uploadDocument();
 await supportingInfo.uploadCoverLetter();
 await supportingInfo.verifyTheAddionalInfo();
 await supportingInfo.verifyTheCrbFrom();
//fulfill the equal ops form
await supportingInfo.completeAssessmentFromA(); //there is an issue
//await supportingInfo.completeEqualOppsForm();
});

test("Fulfill theEqual ops form ", async ({ page }) => {
    // Step 1: Login using credentials from Excel
    await loginWithCredentials(page, "./accountData.xlsx", "Sheet1");
    const supportingInfo = new SupportingInfo(page);
    await supportingInfo.goToEqualOppsForm();
    await supportingInfo.completeEqualOppsForm();
    
  });
  