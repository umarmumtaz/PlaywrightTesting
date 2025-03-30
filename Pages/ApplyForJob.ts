import { expect } from "@playwright/test";
import { Page, BrowserContext } from "playwright";
import { readFromExcel } from "../utils/excelUtils";

class ApplyForJob {
  constructor(public page: Page) {
  }
// title: string,
// surname: string,
//mention all the list

// this.page=page;
// this.fieldSelectors ={

//     title: 'txtTITLE',
//     surname:'//*[@id="AppSection-4"]/div[1]/form/div[2]/div/input'

// };

// async loginForJobApply() {
//   // Read credentials from Excel then login and appply for a job
//   await this.page.goto("");
//   await this.page.locator(".sign_in_detail").click();
  
//   const emailPassword: any = await readFromExcel("./accountData.xlsx","Sheet1");
//   console.log(emailPassword[0].email);
//   //  console.log(emailPassword[0].password)
//   await this.page.getByTestId("txt-email").fill(emailPassword[0].email);
//   await this.page.getByTestId("txt-password").fill(emailPassword[0].password);
//   await this.page.keyboard.press("Space");
//   await this.page.waitForLoadState('networkidle');
//   await this.page.locator("#signIn").click();
// }

  
  async clickOnApplyforJobBtn(){

    await this.page.goto('Job/JobDetail?JobId=20311')
    await this.page.getByRole('link', { name: 'Apply for job' }).first().click();
    
    }

async preferenceForCohortJob(){
//2locNoPre
await this.page.locator('#specNoPre').click();
await this.page.getByText('No Preference').nth(2).click();
//verify the title    
//expect(await this.page.getByRole('heading', { name: 'Preferences' }))
await this.page.locator('#continueBtn').click()

}

async clickOnTheContinueBtn(){
    //there is an issue with this test cases
    expect(await this.page.getByText('Great - you\'re applying for')).toContainText("Bulk Recruitment Test Job");
    await this.page.locator('#showQuestions').click()
}

async selectTheQuestions(){
// getByText('Great - you\'re applying for')   verify the heading
await this.page.getByText('1').nth(1).click();  
await this.page.getByText('1').nth(2).click();  
await this.page.locator('#preAssContinueBtn').click()
}

//4th
async clickOnTheContinueBtn2(){
    await this.page.locator('label').filter({ hasText: 'Cytokines' }).click()
    await this.page.locator('#btnSaveOnboarding').click()

}


}
export { ApplyForJob};
