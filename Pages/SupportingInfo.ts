import { expect } from "@playwright/test";
import { Page, BrowserContext } from "playwright";

class SupportingInfo{
  constructor(public page: Page) {
  }



async goToSupportingInfo(){
   await this.page.goto("https://test.jobtrain.co.uk/ybscareers/Application/SupportingInformation?Jobid=20311&section=4&returnUrl=8&Stage=0")
}
async verifyTheSupportingInfoPageHeadings(){
await expect(this.page.getByText('References', { exact: true })).toBeVisible();
await expect(this.page.getByText('Multi Uploads')).toBeVisible();
await expect(this.page.getByRole('heading', { name: 'Upload Documents check_circle' })).toBeVisible();
await expect(this.page.getByRole('heading', { name: 'Cover letter to upload' })).toBeVisible();
await expect(this.page.getByText('Additional Info', { exact: true })).toBeVisible();
await expect(this.page.getByText('CRB')).toBeVisible();
}

async fillReferenceForm(){
    //check the form is exist or not
  
const verifyTheReference = (await this.page.getByText('/ 1 References').innerText()).split(' ')
if(verifyTheReference[0] !== verifyTheReference[2]){
await this.page.locator('#employment').getByRole('button', { name: 'add_circle Add' }).click();
await this.page.getByLabel('Reference Type').selectOption('Professional');
await this.page.getByPlaceholder('Employment Referee').fill('refree nanncy');
await this.page.getByPlaceholder('Employer').fill('employer paul');
await this.page.getByPlaceholder('Referee family name').fill('referee family navin');
await this.page.getByPlaceholder('Position').fill('SQA');
await this.page.getByPlaceholder('Address', { exact: true }).fill('LA, WASH');
await this.page.getByPlaceholder('City/Town').fill('Birmingham');
await this.page.getByPlaceholder('County').fill('UK');
await this.page.getByPlaceholder('Postcode').fill('22AA30');
await this.page.getByPlaceholder('Telephone').fill('443213213221');
await this.page.getByPlaceholder('Email').fill('nanncykevin@gmail.com');
await this.page.locator('#AppSection-9 label').filter({ hasText: 'Letter' }).click();
await this.page.locator('#saveReferenceFormTab').click();}
}

async uploadDocument(){
await this.page.getByRole('button', { name: 'add_circle Add' }).nth(1).click();
await this.page.setInputFiles('#additionalFileUploadOptions-passport-1 label', 'D:/PlaywrightAutomation/JTAutomation/testingcv.pdf')
    
}
async uploadCoverLetter(){
        await this.page.setInputFiles('#uploadDocs', 'D:/PlaywrightAutomation/JTAutomation/testingcv.pdf');
        await expect (this.page.getByLabel('View Cover Letter (Click here')).toBeVisible();
    }
    
   async verifyTheAddionalInfo(){
await this.page.getByLabel('Influencing, communication').fill('its a dummy text for field verification');
await this.page.getByLabel('Analysis, problem solving and').fill('its a dummy text for field verification');
await this.page.getByLabel('Career Choice').fill('its a dummy text for field verification');
await this.page.getByLabel('Specific Skills').fill('its a dummy text for field verification');
await this.page.getByLabel('Additional Information').fill('its a dummy text for field verification');
await this.page.getByLabel('Interests').fill('its a dummy text for field verification');
   }
 
    async verifyTheCrbFrom(){
await this.page.getByLabel('Disclosure', { exact: true }).selectOption('Yes');
await this.page.getByLabel('CONVICTED').selectOption('Yes');
await this.page.getByLabel('COURT APPEARANCE').selectOption('Yes');
await this.page.getByPlaceholder('VETTING BANKRUPTCY').fill('vetting bankrupt')
await this.page.getByRole('button', { name: 'Continue' }).click();
await this.page.waitForTimeout(7000);
    }


async completeAssessmentFromA(){
this.page.locator('label').filter({ hasText: 'YEs' }).check();
this.page.locator('label').filter({ hasText: 'Morning' }).check();
//getByRole('group', { name: '3) Rearrange the following' }).locator('label').nth(1)
this.page.getByPlaceholder('Answer here...').fill('testing the question');
this.page.locator('.custom-control-label').first().check();
//this.page.getByRole('button', { name: 'Save and Continue' }).click();
}

async goToEqualOppsForm(){
    await this.page.goto("https://test.jobtrain.co.uk/ybscareers/Application/EqualOpportunities?Jobid=20311&section=5&Stage=0")
 }



async completeEqualOppsForm(){
await this.page.getByLabel('What is your ethnicity?').selectOption('Asian / Asian British')
await this.page.getByLabel('Gender').selectOption('Male');
await this.page.getByPlaceholder('National Insurance Number (‘').fill('AA2345234A');
await this.page.locator('form div').filter({ hasText: 'Gender for HMRC Please Select' }).getByRole('combobox').selectOption('M');
await this.page.getByRole('button', { name: 'Continue' }).click();
}






}
export { SupportingInfo };

//save register in the excel and get and cross check with from the profiles
//how to get date from date picker
//issues in Assessment form a/b
//how to connect the test cases with others
// create the flow and then check with login and without login etc all flows