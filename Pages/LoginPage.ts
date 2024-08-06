import { expect } from "@playwright/test";
import { Page, BrowserContext } from "playwright";

class LoginPage {
  constructor(public page: Page) {}

  async clickOnSignInButton() {
    await this.page.locator(".sign_in_detail").click();
  }

  async gotToHomePage() {
    await this.page.goto("https://test.jobtrain.co.uk/ybscareers/");
  }

  async enterValidEmail(userName: string) {
    await this.page.getByTestId("signInEmail").fill(userName);
  }
  async enterValidPassword(password: string) {
    await this.page.getByTestId("inputPassword").fill(password);
  }
  async clickOnLoginButton() {
    await this.page.locator("#signIn").click();
  }

  async verifytheJoblistingTitle() {
    const pageHeading = await this.page.locator(".jt-page-title");
    await expect(pageHeading).toContainText("My Applications");
    await expect(pageHeading).toBeTruthy();
  }
  async verifyInvalidLoginAssertions() {
    //using the assertions
    const alerTest = await this.page.locator(".alert-danger").textContent();
    await expect(alerTest).toContain("Invalid UserName Or Password.");
    console.log(alerTest);
  }

  async closeCookies() {
    await this.page.locator(".cc-btn.cc-allow").click();
  }
}
export { LoginPage };
