import { test, expect } from '@playwright/test';

test('login with happy scenario i.e. valid email and password', async ({ page }) => {

    await page.goto('https://test.jobtrain.co.uk/ybscareers/Account/LogIn');
    await expect(page).toHaveTitle('YBS Careers | Jobs | Search here for your perfect career - Returning candidates');
    await page.getByTestId('signInEmail').fill("nanncykevin+9999@gmail.com")
    await page.getByTestId('inputPassword').fill("Testing@123");
    await page.getByTestId('signIn').click();
    await expect(page).toHaveURL('https://test.jobtrain.co.uk/ybscareers/MyJobs')
    const pageHeading = await page.locator('.jt-page-title')
    const getHeading = await expect(pageHeading).toContainText('My Applications')
    console.log(getHeading)
    page.pause();
});

test('login with invalid Email & valid password', async ({ page }) => {
    await page.goto('https://test.jobtrain.co.uk/ybscareers/Account/LogIn');
    await page.getByTestId('signInEmail').fill("nanncykevinfgfg@gmail.com")
    await page.getByTestId('inputPassword').fill("Testing@123");
    await page.locator('#signIn').click();
    const alerTest = await page.locator('.alert-danger').textContent();
    await expect(page.locator('.alert-danger')).toContainText('Invalid UserName Or Password.');
    console.log(alerTest)
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle('YBS Careers | Jobs | Search here for your perfect career - Returning candidates');
    page.pause();
});

test("Login with valid email and invalid password", async ({ page }) => {
    await page.goto('https://test.jobtrain.co.uk/ybscareers/Account/LogIn');
    await page.getByTestId('signInEmail').fill("nanncykevin+9999@gmail.com")
    await page.getByTestId('inputPassword').fill("Testing@12sdfsd3");
    await page.locator('#signIn').click();
    const alerTest = await page.locator('.alert-danger').textContent();
    await expect(page.locator('.alert-danger')).toContainText('Invalid UserName Or Password.');
    console.log(alerTest);
});
test("Login with blank email/password", async ({ page }) => {
    await page.goto('https://test.jobtrain.co.uk/ybscareers/Account/LogIn');
    await page.getByTestId('signInEmail').fill("")
    await page.getByTestId('inputPassword').fill("");
    await page.locator('#signIn').click();
    const alerTest = await page.locator('.alert-danger').textContent();
    await expect(page.locator('.alert-danger')).toContainText('Invalid UserName Or Password.');
    console.log(alerTest);
});

















