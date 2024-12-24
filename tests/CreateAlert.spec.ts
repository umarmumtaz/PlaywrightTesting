
import { test, expect } from "@playwright/test";
import { CreateAlert } from "../Pages/CreateAlert";
import { readFromExcel } from "../utils/excelUtils";


test.use({ storageState: 'state.json' });

test.beforeEach(async ({ page }) => {
    await page.goto('http://live.jobtrain.com:2022/') //,{ waitUntil: 'domcontentloaded', timeout: 650 });
});

test("Alert Create without login", async ({ page }) => {
const createAlert = new CreateAlert(page);
await createAlert.clickOnlistVacanciesBtn();
 const emailPassword : any = await readFromExcel("./accountData.xlsx", "Sheet1")
 console.log(emailPassword[0].email)
//  console.log(emailPassword[0].password)
await createAlert.clickOnCreateAlertsBtn();
await createAlert.alreadyHaveAnAccount();
await page.getByTestId('txt-email').fill(emailPassword[0].email);
await page.getByTestId('txt-password').fill(emailPassword[0].password);
await page.keyboard.press('Space');
await page.getByTestId('btn-').click();

await page.context().storageState({ path: 'state.json' });
});


test("Create a new alert", async ({ page }) => {
    const createAlert = new CreateAlert(page);
    await page.goto('http://live.jobtrain.com:2022/JobAlerts');
    await createAlert.clickOnCreateBtn();
    await createAlert.toggleBtnHeading();
    await createAlert.verifyTheModalheading();
    await createAlert.filloutTheForm();
    await createAlert.clickOnSaveAlertBtn();
    await createAlert.verifyTheAlertMessage();
 });

 test("Update a created alert", async ({ page }) => {
    const createAlert = new CreateAlert(page);
    await page.goto('http://live.jobtrain.com:2022/JobAlerts');
    await page.getByLabel('edit your alert create test').first().click();
    await page.getByRole('link', { name: 'close' }).click();
 
 });


 test("delete a created alert", async ({ page }) => {
    const createAlert = new CreateAlert(page);
    await page.goto('http://live.jobtrain.com:2022/JobAlerts');
    await page.getByLabel('delete your alert create test').first().click();
    await page.getByRole('button', { name: 'Confirm' }).click();
   const verifyTheAlertMessage = expect( await page.getByText('check_circle_outlineJob alert')).toBeVisible();
console.log(verifyTheAlertMessage)
 
 });

