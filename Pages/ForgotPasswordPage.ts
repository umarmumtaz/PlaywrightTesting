
import { Page, BrowserContext } from 'playwright';
import { expect } from '@playwright/test';
class ForgotPasswordPage {
    constructor(public page: Page) {
    }

    async clickOnForgotMyPasswordButton() {
        await this.page.getByLabel('Forgot Your Password? Reset').click();
    }

    async clickOnRecoverPasswordButton() {
        await this.page.getByTestId('RecoverPassword').click();
    }

    async goToRecoverPasswordUrl() {


        await this.page.goto('https://test.jobtrain.co.uk/ybscareers/LostUserAccount/RecoverUserNamePassword')
    }


async resetPasswordContent(){
    const resetPasswordContent = await this.page.locator("//label[contains(text(),'Enter your username or email address and a link wi')]").textContent();
  await expect(this.page.locator("//label[contains(text(),'Enter your username or email address and a link wi')]")).toContainText(
    "Enter your username or email address and a link will be sent for you to reset your password");
  console.log(resetPasswordContent);

}

async resetPasswordConfirmation(){
    const confirmationScreenHeading = await this.page.locator(".text-primary").textContent();
    await expect(this.page.locator(".text-primary")).toContainText("Confirmation Sent");
    console.log(confirmationScreenHeading);
    await expect(this.page).toHaveURL(
        "https://test.jobtrain.co.uk/ybscareers/LostUserAccount/ResetPasswordConfirmation");
}
async resetPasswordErrorMessage(){

    const warningMesageRP = await this.page.locator(".invalid-feedback").textContent();
    await expect(this.page.locator(".invalid-feedback")).toContainText(
      "This field needs to be a valid email");
    console.log(warningMesageRP);
}



}

export { ForgotPasswordPage };
