import { expect } from "@playwright/test";
import { Page, BrowserContext } from "playwright";

class ApplyApplicationAboutYouTab{
  constructor(public page: Page) {
  }

async clickOnEditJobBtn(){
    //assertions
await this.page.getByLabel('Click Here to Edit Your').first().click();
}
async clickOnFinishApplication(){
    //assertions
    await this.page.getByRole('link', { name: 'Finish application' }).click();
}

async verifyTheJobModalHeadings(){
const headings = [
'Things to be done',
'Almost there...',
'You haven’t finished your',
];
for (const heading of headings) {
   await expect(this.page.getByText(heading)).toBeVisible();
}
      
}

async verifyTheJobTitle(){
   expect(await this.page.getByText('**Bulk Recruitment Test Job')).toBeVisible();
}
async verifyTheFormHeading(){
    expect(await this.page.getByRole('heading', { name: 'A little bit about you' })).toBeVisible();
 }

 async verifyTheParaghraphAboutYoutTab(){
    const content = this.page.getByText('Please complete this');
    await expect(content).toBeVisible();
    await expect(content).toContainText('0044 (0)1565 818 234');
    await expect(content).toContainText('Recruitment Team on recruitment@ybs.co.uk.');
 }


 async verifyTheAboutYouTabHeadings(){
    const headingsAboutYou = [
    'A little bit about you',
    'Personal Details',
    'Home Address',
    'We need a CV to consider you for this role',
    ];
    for (const aboutYouTab of headingsAboutYou) {
       await expect(this.page.getByText(aboutYouTab)).toBeVisible();
    }

}
async goToAboutYou(){
   await this.page.goto("https://test.jobtrain.co.uk/ybscareers/Application/AboutYou?Jobid=20311&section=1&Stage=0&edit=1")
}

async verifyThePrePopulatedFiledData (){

   await expect(this.page.getByPlaceholder('Surname')).toHaveValue('walker', { timeout: 10000 }); 
   await expect(this.page.getByPlaceholder('First Name/s')).toHaveValue('paul', { timeout: 10000 });
   await expect(this.page.getByPlaceholder('Mobile Telephone')).toHaveValue('441172345678', { timeout: 10000 });
   await expect(this.page.getByPlaceholder('Email Address')).toHaveValue('yzvshsjczu@jt.com', { timeout: 10000 });
}
async addValuesInTheFields (){
   
   const inputsToFill = {
      
      'What is your current or what': '2200',
      'What salary or day rate are': '50',
      'If you are currently employed': '1 month',
      'Answer here...': 'testing',
      'NIN': 'B223300A',
      'County': 'UK',
      'Town': 'LA',
      'Postcode': 'AB1010',
      //'Address': 'Birmingham',  discuss
   };
    
    const selectsToFill = {
      'Title': 'Miss',
      'Have you have': 'Yes'
    };
    
    // Fill input fields
    for (const [placeholder, value] of Object.entries(inputsToFill)) {
      await this.page.getByPlaceholder(placeholder).fill(value);
    }
    // Select dropdown options
    for (const [label, value] of Object.entries(selectsToFill)) {
      await this.page.getByLabel(label).selectOption(value);
    }
}

async uploadCV(){
   await this.page.setInputFiles('#uploadCV', 'D:/PlaywrightAutomation/JTAutomation/testingcv.pdf');
   await expect(this.page.getByLabel('View CV (Click here to open')).toBeVisible();
}

async inputValueAdd(){
   await this.page.getByPlaceholder('Address', { exact: true }).fill('testing address');
}

async clickOnContinueBtn(){
await expect (this.page.getByRole('button', { name: 'Continue' })).toBeVisible();
await this.page.locator('#savePersnalApplicationFormBtn').click()
}

// async verifyTheTickIcon(){

// await expect(this.page.locator('a.nav-link.active.show.is-valid')).toBeVisible(); 

// }

}
export { ApplyApplicationAboutYouTab };
