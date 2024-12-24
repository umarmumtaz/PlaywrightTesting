exports.ForgotPassword = class ForgotPassword {

    constructor(page) {

        this.page = page;

        this.forgotMyPassword = page.getByLabel('Forgot Your Password? Reset');
         this.recoverPasswrod = page.getByTestId('RecoverPassword');
    

    }

    async gotoLogin() {

        await this.page.goto('https://test.jobtrain.co.uk/ybscareers/Account/LogIn')
    }

    async forgotPasswordM() {
        await this.forgotMyPassword.click();

    }
async goToRecoverPassword(){
    await this.page.goto('https://test.jobtrain.co.uk/ybscareers/LostUserAccount/RecoverUserNamePassword')

}
    async clickRecoverPassword() {
        await this.recoverPasswrod.click();

    }


    // async clickOnRecoverPassword(){


    // }
}