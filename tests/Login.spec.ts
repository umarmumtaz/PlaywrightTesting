// //this script imports the necessory modules
import { test, expect, BrowserContext, chromium } from "@playwright/test";
//import the login page class defined in the login page
import { LoginPage } from "../Pages/LoginPage.ts";
// LambdaTest capabilities

const capabilities = {
  browserName: "Chrome", // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
  browserVersion: "latest",
  "LT:Options": {
    platform: "Windows 11",
    build: "Playwright  test Build",
    name: "Playwright Test",
    user: "usmiahmi",
    accessKey: "LT_Rr0lBjYJzBhAUHUQ8OXtptwgLZW9DCjau5JwZxJGYrBB2Za",
    network: true,
    video: true,
    console: true,
    tunnel: false, // Add tunnel configuration if testing locally hosted webpage
    tunnelName: "", // Optional
    geoLocation: "", // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
  },
};
test.describe('Run All Login Test Cases', () =>{
//test beforeall pre conditions
test("login with valid email, and password", async ({ page }) => {
  const browser =await chromium.connect('wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`');
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
//post conditions
test.afterAll(async ({ page }) => {
  await page.context().clearCookies();
  console.log('All login test cases have been executed successfully!')
});

});


