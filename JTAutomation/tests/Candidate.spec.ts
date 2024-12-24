//this script imports the necessory modules
import { test, expect } from '@playwright/test';
//import the login page class defined in the login page
import { LoginPage } from '../Pages/LoginPage';
import { ForgotPassword } from '../Pages/ForgotPassword';

//...........Login Page Test Cases......................

test('login with valid email and password', async ({ page }) => {
    const loginPage = new LoginPage(page); //class passing the current page object
    await loginPage.goToHome();  //navigate to the method
    //apply the assertion to check the visibility of the title
    await expect(page.locator('.jt-page-title')).toBeVisible();
    //alid login using the validLogin() method with a valid username and password
    await loginPage.validLogin('nanncykevin+9999@gmail.com', 'Testing@123');
    //using the assertions
    await expect(page).toHaveURL('https://test.jobtrain.co.uk/ybscareers/MyJobs');
    const pageHeading = await page.locator('.jt-page-title');
    const getHeading = await expect(pageHeading).toContainText('My Applications');
    await expect(pageHeading).toBeTruthy();
});

test('login with invalid email and invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goToHome();
    await loginPage.invalidEmailPassword('sdfsd@gmail.com', 'Tessdfds123');
    //using the assertions
    const alerTest = await page.locator('.alert-danger').textContent();
    await expect(page.locator('.alert-danger')).toContainText('Invalid UserName Or Password.');
    console.log(alerTest)
});

test('login without email and password (apply try catch)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goToHome();

    try {
        //Login with empty fields so no need to declare  the email/password
        await loginPage.loginWithoutEmailPassword();
        //using the assertions
        const alerTest = await page.locator('.alert-danger').textContent();
        await expect(page.locator('.alert-danger')).toContainText('Invalid UserName Or Password.');
        console.log(alerTest)
        expect(alerTest).toBeTruthy();

    } catch (error) {
        console.error('An error occured', error);
        throw error;
    }


});

//---------------Forgot Password Test Cases..............

test('Forgot password', async ({ page }) => {
    const forgotPassword = new ForgotPassword(page);
    await forgotPassword.gotoLogin();
    await forgotPassword.forgotPasswordM();
    // await forgotPassword.recoverPasswrodM();
    //add assertions
    // await expect(page).toHaveURL('https://test.jobtrain.co.uk/ybscareers/LostUserAccount/RecoverUserNamePassword');
    // await expect(page.locator('.register__title.px-10.text-center')).toBeVisible();
    // await expect(page.locator('.register__title.px-10.text-center')).toBeTruthy();
    // // await expect(page).toHaveURL('https://test.jobtrain.co.uk/ybscareers/LostUserAccount/RecoverPassword_ResetPassword?RecoverPassword=1');
    // await page.waitForSelector('h4');

    await forgotPassword.goToRecoverPassword();
    //verify the heading of the page
    const resetPasswordHeading = await page.locator('.register__title');
    const getPasswordHeading = await expect(resetPasswordHeading).toContainText('Reset Password');
    await expect(resetPasswordHeading).toBeTruthy();
    const resetPasswordContent = await page.locator("//label[contains(text(),'Enter your username or email address and a link wi')]").textContent();
    await expect(page.locator("//label[contains(text(),'Enter your username or email address and a link wi')]")).toContainText('Enter your username or email address and a link will be sent for you to reset your password');
    console.log(resetPasswordContent);

});



test.only('verify the forgot password without entering data', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    // Navigate to the initial page
    const forgotPassword = new ForgotPassword(page);
    await forgotPassword.goToRecoverPassword();
    const page2Promise = page.waitForEvent('load');
    // Perform the action that opens the new page and wait for the new page event
    //define in mathod
    await forgotPassword.clickRecoverPassword();
    const page2 = await page2Promise;
    await page2.waitForLoadState('load');
    // Instantiate the PasswordResetPage with the new page
    console.log('Switched to new page:', await page2.url());
    const resetPasswordHeading = await page.locator('.register__title');
    const getPasswordHeading = await expect(resetPasswordHeading).toContainText('Reset Password');
    await expect(resetPasswordHeading).toBeTruthy();
    await page.locator('.btn.btn.btn-primary.mb-15').click();
    const resetPasswordContent = await page.locator("//label[contains(text(),'Enter your username or email address and a link wi')]").textContent();
    await expect(page.locator("//label[contains(text(),'Enter your username or email address and a link wi')]")).toContainText('Enter your username or email address and a link will be sent for you to reset your password');
    console.log(resetPasswordContent);
});




