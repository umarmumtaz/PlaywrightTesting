import { Page, BrowserContext } from "playwright";

class LoginTestwithExcel {
  constructor(public page: Page) {}

  async clickOnSignInButton() {
    await this.page.locator(".sign_in_detail").click();
  }

  async gotToHomePage() {
    await this.page.goto("https://test.jobtrain.co.uk/ybscareers/Home/Job");
  }

  async enterValidEmail(userName: string) {
    await this.page.locator('#signInEmail').fill(userName);
  }
  async enterValidPassword(password: string) {
    await this.page.locator('#inputPassword').fill(password);
  }
  async clickOnLoginButton() {
    await this.page.locator('#signIn').click();
  }
}
export { LoginTestwithExcel };
