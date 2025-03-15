import { expect } from "@playwright/test";
import { Page, BrowserContext } from "playwright";

class LoginPage {
  constructor(public page: Page) {
  }

  async clickOnSignInButton() {
    await this.page.locator(".sign_in_detail").click();
  }

  async gotToHomePage() {
    await this.page.goto("");
  }
//base url
  async enterValidEmail(userName: string) {
    await this.page.getByTestId("txt-email").fill(userName);
  }
  async enterValidPassword(password: string) {
    await this.page.getByTestId("txt-password").fill(password);
  }
  async clickOnLoginButton() {
    await this.page.locator("#signIn").click();
  }

  async verifyTheJoblistingTitle() {
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

  async verifyThePlaceHolderTexts(){

    const placeHolderText = this.page.locator("#signInEmail");
    console.log(await placeHolderText.getAttribute("placeholder"));
    expect(placeHolderText).toHaveAttribute("placeholder", "Email goes here");
  }

  async logout() {
    // await this.page.locator('#navbarDropdownMenuLink2').click(); 
    await this.page.getByRole('button', { name: 'person_outline Hi paul' }).click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000) 
    await this.page.getByRole('link', { name: 'Logout' }).click();  // Use the appropriate selector for the logout button
    //await expect(this.page).toHaveURL('/login');  // Ensure the user is redirected to the login page
  }
}
export { LoginPage };

