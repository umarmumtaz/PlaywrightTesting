// //this script imports the necessory modules
import { test, expect, BrowserContext } from "@playwright/test";
//import the login page class defined in the login page
import { LoginPage } from "../Pages/LoginPage";
import { ForgotPasswordPage } from "../Pages/ForgotPasswordPage.ts";
import { RegisterPage } from "../Pages/RegisterPage.ts";
import { HomePage } from "../Pages/HomePage.ts";
import * as fs from 'fs/promises';
import { readActualValuesFromPage, readExpectedValuesFromExcel, verifyValues } from "../utils/excelUtils2.ts";
//import { readActualValuesFromPage, readExpectedValuesFromExcel } from "../utils/excelUtils2.ts";
//import * as XLSX from 'xlsx';


test("login with valid email, and password", async ({ page }) => {
  const loginPage = new LoginPage(page); //class passing the current page object
  await loginPage.gotToHomePage();
  await loginPage.clickOnSignInButton();
  await loginPage.closeCookies();
  //verify the placeholder text
  const placeHolderText = page.locator("#signInEmail");
  console.log(await placeHolderText.getAttribute("placeholder"));
  expect(placeHolderText).toHaveAttribute("placeholder", "Email goes here");

  await loginPage.enterValidEmail("nanncykevin+9999@gmail.com");
  await loginPage.enterValidPassword("Testing@123");
  await loginPage.clickOnLoginButton();
  //using the assertions
  await expect(page).toHaveURL("https://test.jobtrain.co.uk/ybscareers/MyJobs");
  await loginPage.verifytheJoblistingTitle();
  await page.screenshot({
    path: "C:\\Users\\urmz\\Documents\\jobtrain documentations\\JTAutomation\\JTAutomation\\SS\\Login1.png",
    fullPage: true,
  });
});

test("login with invalid email, and password", async ({ page }) => {
  const loginPage = new LoginPage(page); //class passing the current page object
  await loginPage.gotToHomePage();
  await loginPage.clickOnSignInButton();
  await loginPage.enterValidEmail("dddddd@gmail.com");
  await loginPage.enterValidPassword("dddd@123");
  await loginPage.clickOnLoginButton();
  //using the assertions
  await loginPage.verifyInvalidLoginAssertions();
});

test("login without email, and password", async ({ page }) => {
  const loginPage = new LoginPage(page); //class passing the current page object
  await loginPage.gotToHomePage();
  await loginPage.clickOnSignInButton();
  await loginPage.enterValidEmail("");
  await loginPage.enterValidPassword("");
  await loginPage.clickOnLoginButton();
  //using the assertions
  await loginPage.verifyInvalidLoginAssertions();
});

test("Verify Forgot Password with valid email", async ({ browser }) => {
  //Creating a New Context and Page:Create a new browser context and page. This isolates the test environment.
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
  await page.locator("#signInEmail").fill("nanncy.kelly@jt.com");
  await page.locator("text=Request Password").click();
  //add assertion to verify the confirmation screen/content
  await forgotPassword.resetPasswordConfirmation();
});

test("Verify Password without email", async ({ browser }) => {
  //Creating a New Context and Page:Create a new browser context and page. This isolates the test environment.
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
  //assertions
  const resetPasswordHeading = await page.locator(".register__title");
  const getPasswordHeading = await expect(resetPasswordHeading).toContainText(
    "Reset Password"
  );
  await expect(resetPasswordHeading).toBeTruthy();
  //assertions
  await forgotPassword.resetPasswordContent();
  await forgotPassword.resetPasswordErrorMessage();
});
//await page.screenshot({ path: 'Screenshots/Login.png', fullPage: true });

//Register Page
test("Register an Account", async ({ page }) => {
  const registerFromLoginPage = new LoginPage(page); //class passing the current page object
  await registerFromLoginPage.gotToHomePage();
  await registerFromLoginPage.clickOnSignInButton();
  const registerPage = new RegisterPage(page);
  await registerPage.clickonHaveNotAccountButton();
  await registerPage.verifyTheRegister1PageTitle();
  const enterPassword = "Testing@123";
  await page.getByTestId("txtPassword").fill(enterPassword);
  await registerPage.validRegisterCredentials(enterPassword);

  await page.getByTestId("txtPassword").click();
  await page.getByTestId("txtPassword").fill("Testing@12");
  await page.locator("#register").click();
});

//Home Page verification without login
test("Home Page without Login", async ({ page }) => {
  const homePage = new LoginPage(page); //class passing the current page object
  await homePage.gotToHomePage();
  const homePage2 = new HomePage(page);
  await homePage2.verifyTheHomePageTitle();
  //verify the logo
  const siteLogo = page
    .locator(".register__image.register__image--margin")
    .first();
  await expect(siteLogo).toBeVisible();
  await expect(siteLogo).toHaveAttribute(
    "alt",
    "Yorkshire Building Society logo"
  );
  //verify the create alert button
  const createAlertButton = page.locator(".btn.btn-primary.btn-wide");
  await expect(createAlertButton).toBeVisible();
  //verify the no. of jobs
  const totalLiveJobsCount = await homePage2.liveJobsCount();
  console.log("Total live jobs are:", totalLiveJobsCount);
  //Verify the search panel heading
  await homePage2.searchPanelHeadings();
  //clear all-method
  await homePage2.clearAllSearch();
  //Verify the footer alerts section using method
  await homePage2.getJobAlertsFooter();
  //saearch panel fields texts and placeholder
  await homePage2.searchPanelFieldsTexts();
});

test("Home Page Jobs Verification", async ({ page }) => {
  const homePage = new LoginPage(page); //class passing the current page object
  await homePage.gotToHomePage();
  const homePage2 = new HomePage(page);
  await homePage2.verifyTheHomePageTitle();
  await page.waitForSelector("#searchResultsItems");
  //retrive the job titles
  const jobTitles = await page.$$eval("#searchResultsItems", (titles) =>
    titles
      .filter((title): title is HTMLElement => title instanceof HTMLElement)
      .map((title) => title.innerText)
  );
  console.log("Job Titles:", jobTitles);
  // Example expected job titles
  const expectedJobTitles = ["Jobtrain Test job"];
  // Verify the job titles
  const allTitlesMatch = expectedJobTitles.every((expectedTitle) =>
    jobTitles.includes(expectedTitle)
  );
  if (allTitlesMatch) {
    console.log("All expected job titles are present.");
  } else {
    console.log("Some expected job titles are missing.");
  }
});
//
test("Verify all the  the content if no jobs found", async ({ page }) => {
  const homePage = new LoginPage(page); //class passing the current page object
  await homePage.gotToHomePage();
  const homePage2 = new HomePage(page);
  await homePage2.verifyTheHomePageTitle();
  await homePage2.verifyContentIfNoJobsFound("tttttttttttttt");
  await homePage2.clickonApplyFilters();
  await homePage2.verifyTextsifNoJobFound();
});
test("Verify the content if no jobs found", async ({ page }) => {
  const homePage = new LoginPage(page); //class passing the current page object
  await homePage.gotToHomePage();
  const homePage2 = new HomePage(page);
  await homePage2.verifyTheHomePageTitle();
  await homePage2.verifyContentIfNoJobsFound("tttttttttttttt");
  await homePage2.clickonApplyFilters();
await homePage2.verifyTextsifNoJobFound();
});
test("Verify the list of the dropdowns", async ({ page }) => {
  const homePage = new LoginPage(page); //class passing the current page object
  await homePage.gotToHomePage();
  const homePage2 = new HomePage(page);
//verify the department dropdown value
await page.locator("#search-filters div").filter({ hasText: "Departments Aberdeen Accord" }).getByPlaceholder("Please Select").click();
await homePage2.commonValue("#select2-searchFilterDepartment-results");
//verify the job categories values
await page.getByRole('searchbox', { name: 'Filter the list of jobs by' }).click()
await homePage2.commonValue("#select2-searchFilterJobcategories-results");
//verify the location list
await page.locator('#search-filters div').filter({ hasText: 'Location Aberdeen1 Alloa' }).getByPlaceholder('Please Select').click();
await homePage2.commonValue("#select2-searchFilterLocations-results")
//verify the distance dropdown list
await page.getByLabel('Please Select').getByText('Please Select').click();
await homePage2.commonValue('#select2-searchFilterDistance-results')
//verify the date posted
await page.getByRole('textbox', { name: 'Anytime' }).click();
const dateListing = await homePage2.commonValue('#select2-searchFilterDate-results')
});

test.only("Verify the job details values", async ({ page }) => {
  const homePage = new LoginPage(page); //class passing the current page object
  await homePage.gotToHomePage();
  const homePage2 = new HomePage(page);
await page.getByRole('link', { name: 'Jobtrain Test job', exact: true }).click()
//add the assertions for verify the job detail page
// const expectedValues = readExpectedValuesFromExcel('expectedValues.xlsx');
// const actualValues = readActualValuesFromPage(page)
const  expectedValues = await readActualValuesFromPage(page);
console.log('expected values are' , expectedValues)
 const actualValues =readExpectedValuesFromExcel("C:\\Users\\urmz\\Documents\\jobtrain documentations\\JTAutomation\\JTAutomation\\jobdetail.xlsx")
console.log(actualValues)
 // // Verify the values
// verifyValues(actualValues, expectedValues);

});
