
import { test, expect } from "@playwright/test";
import { CreateAlert } from "../Pages/CreateAlert";
import { readFromExcel } from "../utils/excelUtils";


test.use({ storageState: 'state.json' });

test.beforeEach(async ({ page }) => {
    await page.goto('') //,{ waitUntil: 'domcontentloaded', timeout: 650 });
});

test("Alert Create without login", async ({ page }) => {
const createAlert = new CreateAlert(page);
await createAlert.clickOnCreateAlertsBtn();
await createAlert.alreadyHaveAnAccount();
 const emailPassword : any = await readFromExcel("./accountData.xlsx", "Sheet1")
 console.log(emailPassword[0].email)
//  console.log(emailPassword[0].password)
await page.getByTestId('txt-email').fill(emailPassword[0].email);
await page.getByTestId('txt-password').fill(emailPassword[0].password);
await page.keyboard.press('Space');
await page.locator('#signIn').click();
await page.context().storageState({ path: 'state.json' });
});


test("Create a new alert", async ({ page }) => {
    const createAlert = new CreateAlert(page);
    await page.goto('JobAlerts');
    await createAlert.clickOnCreateBtn();
    await createAlert.toggleBtnHeading();
    await createAlert.verifyTheModalheading();
    await createAlert.filloutTheForm();
    await createAlert.clickOnSaveAlertBtn();
    await createAlert.verifyTheAlertMessage();
 });

 test("Update a created alert", async ({ page }) => {
    const createAlert = new CreateAlert(page);
    await page.goto('JobAlerts');
    await page.getByTestId('a-job-alert-title').first().click();
    await page.getByTestId('btn-update-alert').click();
 
 });


 test("delete a created alert", async ({ page }) => {
    const createAlert = new CreateAlert(page);
    await page.goto('JobAlerts');
    //await page.getByTestId('a-delete-alert-60251').click();
    // await page.getByTestId('.delete-alert').nth(1).click();
    const firstAlertDeleteButton = await page.$('.delete-alert'); // Select the first delete button
    if (firstAlertDeleteButton) {
        await firstAlertDeleteButton.click(); // Click to delete the first alert
    } 
    else {
      console.log('No alerts found to delete.');
  }

    await expect( await page.locator('#exampleModalLabel')).toBeVisible();
   await page.getByTestId("btn-confirm-delete-alert").click();
 




 });

