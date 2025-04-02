// //this script imports the necessory modules
import { test, expect, BrowserContext, chromium } from "@playwright/test";
//import the login page class defined in the login page
import { LoginPage } from "../Pages/LoginPage.ts";
import { readFromExcel } from "../utils/excelUtils";

test.describe("Run All Login Test Cases", () => {
  //test before all pre conditions of the TCs
  test("login with valid email, and password", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotToHomePage();
    await loginPage.clickOnSignInButton();
    //await loginPage.closeCookies();
    await loginPage.verifyThePlaceHolderTexts();
               //Login wiht static data
    // await loginPage.enterValidEmail("nanncykevin+316@gmail.com");
    // await loginPage.enterValidPassword("Testing@123");
                //login with excel file
    const emailPassword: any = await readFromExcel("./accountData.xlsx","Sheet1");
    console.log(emailPassword[0].email);
    //  console.log(emailPassword[0].password)
    await page.getByTestId("txt-email").fill(emailPassword[0].email);
    await page.getByTestId("txt-password").fill(emailPassword[0].password);
    await page.waitForLoadState('networkidle');
    await loginPage.clickOnLoginButton();
    await loginPage.verifyTheJoblistingTitle();
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
  
});
//post conditions of the TCs
test.afterEach(async ({ page }) => {
  // Runs after each test
  await page.close();
});
