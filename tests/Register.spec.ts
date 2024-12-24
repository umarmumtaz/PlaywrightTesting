
//Local Live Candidate site

import { test, expect } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";
import { RegisterPage } from "../Pages/RegisterPage";
import { writeToExcel } from "../utils/excelUtils";

let registerFromLoginPage: LoginPage; // Declare outside the test case to access it in afterAll
// test.use({ storageState: 'state.json' });


test.beforeEach(async ({ page }) => {
    await page.goto('http://live.jobtrain.com:2022/', { waitUntil: 'domcontentloaded', timeout: 65000 });
});
test("Register an Account Process final", async ({ page }) => {
  const registerFromLoginPage = new LoginPage(page); 
  // await registerFromLoginPage.gotToHomePage();
  await registerFromLoginPage.clickOnSignInButton();

  const registerPage = new RegisterPage(page);
  await registerPage.clickOnHaveNotAccountButton();
  await registerPage.verifyTheRegister1PageTitle();
  // Generate random email and register the account
  const emailForRegistration = registerPage.randomEmail;
  const passwordForRegistration = "Testing@123 ";
  await registerPage.validRegisterCredentials();
  await page.getByTestId("txt-create-a-password").fill(passwordForRegistration);
   //space for enabling the button
  await page.keyboard.press('Space'); 
  await page.waitForLoadState('networkidle'); //it alos added in the email need to fix
  await page.locator('#register').click();
  const secodPageHeading = await page.locator('.register__title.text-primary.h3');
  await expect(secodPageHeading).toHaveText('A couple more things');
  await page.getByPlaceholder('First name').fill('paul');
  await page.getByPlaceholder('Last name').fill('walker');
  await page.getByPlaceholder('Mobile number').fill('00441172345678');
  // Check if the checkbox is visible
  await expect(page.getByText('I agree to the terms and')).toBeVisible();
  // Check if the checkbox is enabled
  await page.getByText('I agree to the').click();
  await page.getByPlaceholder('Last name').press('Enter');
  await page.locator('#continue').click();
  
  //more to my account page
 //verify the page title
 //await expect(page.getByRole('heading', { name: 'My Account' })).toHaveText('My Account');
  // Store email and password in an Excel file after registration
  const accountData = [{ email: emailForRegistration, password: passwordForRegistration }];
  writeToExcel("./accountData.xlsx", "Sheet1", accountData);
  
  // Continue with the rest of the registration process...
   // Save the authenticated state
   await page.context().storageState({ path: 'state.json' });
});

 // Step 6: Use afterAll to log out after the test
 //sate svaed so no need to be login
  test.skip("logout test",async ({ page }) => {
    // Assuming the logout function is part of the LoginPage class
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000) 
    await page.getByRole('button', { name: 'person_outline Hi paul' }).click();
    await page.waitForLoadState('networkidle');
    await page.getByRole('link', { name: 'Logout' }).click();

  });