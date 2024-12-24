exports.LoginPageDD = class LoginPageDD {
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
    async validLogin(userName, password) {
        await this.signIn.click();
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.signInbutton.click();
    }};