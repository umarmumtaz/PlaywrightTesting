
import { Page, BrowserContext } from 'playwright';
import { expect } from '@playwright/test';
class ForgotPasswordPage {
    constructor(public page: Page) {
    }

    async clickOnForgotMyPasswordButton() {
        await this.page.getByLabel('Forgot Your Password? Reset').click();
    }

    async clickOnRecoverPasswordButton() {
        await this.page.getByTestId('btn-recover-password').click();
    }

    async goToRecoverPasswordUrl() {


        await this.page.goto('http://live.jobtrain.com:2022/LostUserAccount/RecoverUserNamePassword')
    }


async resetPasswordContent(){
    const resetPasswordContent = await this.page.locator("//label[contains(text(),'Enter your username or email address and a link wi')]").textContent();
  await expect(this.page.locator("//label[contains(text(),'Enter your username or email address and a link wi')]")).toContainText(
    "Enter your username or email address and a link will be sent for you to reset your password");
  console.log(resetPasswordContent);

}

async resetPasswordConfirmation(){
    const confirmationScreenHeading = await this.page.getByTestId('h1-Confirmation Sent').textContent();
    await expect(this.page.getByTestId('h1-Confirmation Sent')).toContainText("Confirmation Sent");
    console.log(confirmationScreenHeading);
    await expect(this.page).toHaveURL(
        "http://live.jobtrain.com:2022/LostUserAccount/ResetPasswordConfirmation");
}
async resetPasswordErrorMessage(){

    const warningMesageRP = await this.page.locator(".invalid-feedback").textContent();
    await expect(this.page.locator(".invalid-feedback")).toContainText(
      "This field needs to be a valid email");
    console.log(warningMesageRP);
}

async verifyTheResetPasswordPageContent(){
    const resetPasswordHeading =  this.page.locator(".register__title");
    const getPasswordHeading =  expect(resetPasswordHeading).toHaveText("Reset Password");
    expect(resetPasswordHeading).toBeTruthy();

}

}

export { ForgotPasswordPage };
