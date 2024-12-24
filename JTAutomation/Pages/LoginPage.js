exports.LoginPage = class LoginPage {
    //in constructor intilializing the diff page elements using locators
    constructor(page) {
        this.page = page;
        this.signIn = page.locator('.sign_in_detail');
        this.userName = page.getByTestId('signInEmail');
        this.password = page.getByTestId('inputPassword');
        this.signInbutton = page.locator('#signIn');

    }
    //create a method to land on this page with using the method
    async goToHome() {
        await this.page.goto('https://test.jobtrain.co.uk/ybscareers/')
    }
    //it performs a valid login operations
    async validLogin(userName, password) {
        await this.signIn.click();
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.signInbutton.click();
    }
    async invalidEmailPassword(userName, password) {
        await this.signIn.click();
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.signInbutton.click();
    }
    async loginWithoutEmailPassword() {
        await this.signIn.click();
        await this.signInbutton.click();
    }



};



//npx playwright test Candidate.spec.ts