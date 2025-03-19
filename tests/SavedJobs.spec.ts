
import { test, expect } from "@playwright/test";
import { CreateAlert } from "../Pages/CreateAlert";
import { SavedJobs } from "../Pages/SavedJobs";
import { readFromExcel } from "../utils/excelUtils";



test.use({ storageState: 'state.json' });

test.beforeEach(async ({ page }) => {
    await page.goto('') //,{ waitUntil: 'domcontentloaded', timeout: 650 });
});

test("job save without login", async ({ page }) => {
//const createAlert = new CreateAlert(page);
const savedJobs = new SavedJobs(page);
await savedJobs.clickkOnSavedJobButton();
await page.getByTestId('a-Register Account Exist').click();
 const emailPassword : any = await readFromExcel("./accountData.xlsx", "Sheet1")
 console.log(emailPassword[0].email)
 console.log(emailPassword[0].password)
await page.getByTestId('txt-email').fill(emailPassword[0].email);
await page.getByTestId('txt-password').fill(emailPassword[0].password);
await page.keyboard.press('Space');
await page.getByTestId('btn-Please enter your username and password to sign in').click();
await page.waitForLoadState('networkidle');
await savedJobs.verifyTheTitle();
await page.context().storageState({ path: 'state.json' });

});

test("Save job after login", async ({ page }) => {
    const savedJobs = new SavedJobs(page);
    await page.goto('MyJobs?FavouriteJob=1');
    await page.getByTestId('div-favourite-jobs').locator('div').filter({ hasText: 'View' }).nth(2).click();

});
//logout pending 
//browser close pending


    test("Veiw and remove the saved job", async ({ page }) => {
        const savedJobs = new SavedJobs(page);
        await page.goto('MyJobs?FavouriteJob=1');
        await page.getByRole('link', { name: 'Saved' }).click()
        await savedJobs.clickOnViewSavedJob();
        await savedJobs.clickOnRemoveSavedJob();
    
        });

   
    
    