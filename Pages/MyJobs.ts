import { expect } from "@playwright/test";
import { Page, BrowserContext } from "playwright";

class MyJobs {
  constructor(public page: Page) {
  }

  async myJobsSection(){
    await this.page.goto('/Job/JobDetail?JobId=100541')
    
  }

}
export { MyJobs };

