import { expect } from "@playwright/test";
import exp from "constants";
import { Page, BrowserContext } from "playwright";

class JobDetailsContent {
  constructor(public page: Page) {}

  async goToJobDetailsPage() {
    await this.page.goto(
      "https://test.jobtrain.co.uk/ybscareers/Job/JobDetail?JobId=20235"
    );
  }
  async verifyTheJobTitle() {
    const jobTitleIs = await this.page.locator(".h3.jt-page-title");
    expect(jobTitleIs).toBeVisible;
  }
  async verifytheApplyJobButton(){
const applyJobButton = await this.page.getByText('Apply for job')
expect(applyJobButton).toBeTruthy();
  }
  async verifyTheAdvertTitle(){
const jobAdvertHeading = this.page.locator('.text-system.text-primary.job-discription-h2')
expect(jobAdvertHeading).toBeVisible();
  }
async verifyTheLookAroundTheCompany(){
const verifyTheCompanyTitle = this.page.locator('.text-primary-contrast mb-10 d-block')
expect(verifyTheCompanyTitle).toHaveText('Take a look around the company')
const verifyCompanyLink = this.page.locator('.text-primary-contrast.mb-20')
expect(verifyCompanyLink).toBeTruthy()
}

}

export { JobDetailsContent };
