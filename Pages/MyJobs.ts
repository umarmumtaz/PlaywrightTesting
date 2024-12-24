import { expect } from "@playwright/test";
import { Page, BrowserContext } from "playwright";

class MyJobs {
  constructor(public page: Page) {
  }

  async myJobsSection(){
    await this.page.goto('http://live.jobtrain.com:2022/Job/JobDetail?JobId=100541')
    await this.page.getByRole('link', { name: 'Apply for job' }).first().click();
    
  }

}
export { MyJobs };

