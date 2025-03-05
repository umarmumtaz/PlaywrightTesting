// //this script imports the necessory modules
import { test, expect, BrowserContext, chromium } from "@playwright/test";
//import the login page class defined in the login page
import { LoginPage } from "../Pages/LoginPage.ts";
// LambdaTest capabilities


test.describe('Run All Login Test Cases', () =>{
//test beforeall pre conditions
test("login with valid email, and password", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.gotToHomePage();
  await loginPage.clickOnSignInButton();
   //await loginPage.closeCookies();
  await loginPage.verifyThePlaceHolderTexts()
  await loginPage.enterValidEmail("nanncykevin+1120@gmail.com");
  await loginPage.enterValidPassword("Testing@123");
  await loginPage.clickOnLoginButton();
  await loginPage.verifyTheJoblistingTitle();
  await page.screenshot({
  path: "C:\\Users\\urmz\\Documents\\jobtrain documentations\\JTAutomation\\JTAutomation\\SS\\Login1.png", fullPage: true,});
});
test("login with invalid email, and password", async ({ page }) => {
  const loginPage = new LoginPage(page); //class passing the current page object
  await loginPage.gotToHomePage();
  await loginPage.clickOnSignInButton();
  await loginPage.enterValidEmail("dddddd@gmail.com");
  await loginPage.enterValidPassword("dddd@123");
  await loginPage.clickOnLoginButton();
  await loginPage.verifyInvalidLoginAssertions();
});
test("login without email, and password", async ({ page }) => {
  const loginPage = new LoginPage(page); 
  await loginPage.gotToHomePage();
  await loginPage.clickOnSignInButton();
  await loginPage.enterValidEmail("");
  await loginPage.enterValidPassword("");
  await loginPage.clickOnLoginButton();
  await loginPage.verifyInvalidLoginAssertions();
});
//post conditions of the TCs
test.afterAll(async ({ page }) => {
  await page.context().clearCookies();
  console.log('All login test cases have been executed successfully!')
});

});


