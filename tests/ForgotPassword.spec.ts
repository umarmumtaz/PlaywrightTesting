// //this script imports the necessory modules
import { test, expect, Page, BrowserContext,} from "@playwright/test";
//import the login page class defined in the login page
import { ForgotPasswordPage } from "../Pages/ForgotPasswordPage.ts";


test.describe("Run All Forgot Test Cases", () => {

test("Verify Forgot Password with valid email", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const forgotPassword = new ForgotPasswordPage(page);
  const page2Promise = page.waitForEvent("load");
  await forgotPassword.goToRecoverPasswordUrl();
  const page2 = await page2Promise;
  await page2.waitForLoadState("load");
  const forgotPassword2 = new ForgotPasswordPage(page2);
  await forgotPassword.clickOnRecoverPasswordButton();
  await forgotPassword.resetPasswordContent();
  await page.getByTestId('txt-email-address').fill("nanncy.kelly@jt.com");
  await page.getByTestId('btn-request-password').click();
  await forgotPassword.resetPasswordConfirmation();
});

test("Verify the forgot Password without email", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  // Navigate to the initial page Create an instance of ForgotPasswordPage and navigate to the recover password UR
  const forgotPassword = new ForgotPasswordPage(page);
  const page2Promise = page.waitForEvent("load");
  await forgotPassword.goToRecoverPasswordUrl();
  // await forgotPassword.clickOnRecoverPasswordButton();
  const page2 = await page2Promise;
  await page2.waitForLoadState("load");
  const forgotPassword2 = new ForgotPasswordPage(page2);
  await forgotPassword.clickOnRecoverPasswordButton();
  await forgotPassword.verifyTheResetPasswordPageContent();
  await forgotPassword.resetPasswordContent();
  await forgotPassword.resetPasswordErrorMessage();
});


test("Verify the recover username with valid mobile number from reset password page", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  // Navigate to the initial page Create an instance of ForgotPasswordPage and navigate to the recover password UR
  const forgotPassword = new ForgotPasswordPage(page);
  const page2Promise = page.waitForEvent("load");
  await forgotPassword.goToRecoverPasswordUrl();
  // await forgotPassword.clickOnRecoverPasswordButton();
  const page2 = await page2Promise;
  await page2.waitForLoadState("load");
  const forgotPassword2 = new ForgotPasswordPage(page2);
  await forgotPassword.clickOnRecoverPasswordButton();
  await forgotPassword.verifyTheResetPasswordPageContent();
  await page.getByRole('link', { name: 'No longer have access to your' }).click();
  await expect (page.locator('.text-primary.px-5.h4')).toHaveText('Enter Mobile Number');
  await page.locator('#txtPhoneNumber').fill('+447463634040');
  await page.locator('#btnSubmit').click();
 // await expect (page.locator('.h4.text-primary.px-5')).toHaveText('Access Code');  //dependent on the scenario
});

test("Verify the recover username without an mobile number from reset password page", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  // Navigate to the initial page Create an instance of ForgotPasswordPage and navigate to the recover password UR
  const forgotPassword = new ForgotPasswordPage(page);
  const page2Promise = page.waitForEvent("load");
  await forgotPassword.goToRecoverPasswordUrl();
  // await forgotPassword.clickOnRecoverPasswordButton();
  const page2 = await page2Promise;
  await page2.waitForLoadState("load");
  const forgotPassword2 = new ForgotPasswordPage(page2);
  await forgotPassword.clickOnRecoverPasswordButton();
  await forgotPassword.verifyTheResetPasswordPageContent();
  await page.getByRole('link', { name: 'No longer have access to your' }).click();
  await expect (page.locator('.text-primary.px-5.h4')).toHaveText('Enter Mobile Number');
  await page.locator('#txtPhoneNumber').fill('463634040');
  await page.locator('#btnSubmit').click();
  await expect(page.getByText('Please check your phone')).toHaveText('Please check your phone number is entered correctly');
  
});
});
//Recovery with this mobile number has been attempted recently, please try again later.
