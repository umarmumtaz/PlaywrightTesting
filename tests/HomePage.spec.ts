// //this script imports the necessory modules
import { test, expect, BrowserContext } from "@playwright/test";
//import the login page class defined in the login page
import { LoginPage } from "../Pages/LoginPage";
import { HomePage } from "../Pages/HomePage.ts";
test("Home Page Verification", async ({ page }) => {
    const homePage = new LoginPage(page); //class passing the current page object
    await homePage.gotToHomePage();
    const homePage2 = new HomePage(page);
    await homePage2.clickOnListOfVacanicies();
    await homePage2.verifyTheHomePageTitle();
    //verify the logo
    await homePage2.verifyTheSiteLogo();
    //verify the create alert button
    await homePage2.verifyTheCreateAlertButton();
    //verify the no. of jobs
    await homePage2.verifyTheJobsCount();
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
    await homePage2.clickOnListOfVacanicies();
    await homePage2.verifyTheHomePageTitle();
    await page.waitForSelector("#searchResultsItems");
    //retrive the job titles
  await homePage2.verifyTheJobsTitles();
  });
  test("Verify all the  the content if no jobs found", async ({ page }) => {
    const homePage = new LoginPage(page); //class passing the current page object
    const homePage2 = new HomePage(page);
    await homePage.gotToHomePage();
    await homePage2.clickOnListOfVacanicies();
    await homePage2.verifyTheHomePageTitle();
    await homePage2.verifyContentIfNoJobsFound('test');
    await homePage2.clickonApplyFilters();
    await homePage2.verifyNoJobsFoundContent();
  });

  test('Search filters with random values selections', async ({ page }) => {
    const homePage = new LoginPage(page); //class passing the current page object
    const homePage2 = new HomePage(page);
    await homePage.gotToHomePage();
    await homePage2.clickOnListOfVacanicies();
    await homePage2.verifyTheFilterWithRandomValues();

  });

