import { expect } from "@playwright/test";
import { Page, BrowserContext } from "playwright";

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

  

  
  async clickOnApplyforJobBtn(){
    await this.page.goto('http://live.jobtrain.com:2022/Job/JobDetail?JobId=100541')
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
    //verify content     getByText('Great - you\'re applying for')
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
