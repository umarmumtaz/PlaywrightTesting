import { expect } from "@playwright/test";
import { Page, BrowserContext } from "playwright";

class ApplyApplicationAboutYouTab{
  constructor(public page: Page) {
  }

async clickOnEditJobBtn(){
    //assertions
await this.page.getByTestId('div-my-applications').locator('div').filter({ hasText: 'Edit' }).nth(2).click();
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
   await this.page.goto("MyJobs")
   expect(await this.page.getByText('**Bulk Recruitment Test Job')).toBeVisible();
}



 async verifyTheParaghraphAboutYoutTab(){
    const contentAboutYou = this.page.getByText('Please complete this');
    await expect(contentAboutYou).toBeVisible();
    await expect(contentAboutYou).toContainText('+44 (0)1565 818 234');
    await expect(contentAboutYou).toContainText('Recruitment Team on recruitment@ybs.co.uk.');
    const contentText = await contentAboutYou.textContent();
    console.log(contentText);
  
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
console.log(headingsAboutYou)
}

async goToAboutYou(){
   await this.page.goto("Application/AboutYou?Jobid=20311&section=1&Stage=0&edit=1")
}

async verifyThePrePopulatedFiledData (){

   await expect(this.page.getByTestId('txt-txtLASTNAME')).toHaveValue('walker', { timeout: 10000 }); 
   await expect(this.page.getByTestId('txt-txtFIRSTNAME')).toHaveValue('paul', { timeout: 10000 });
   await expect(this.page.getByTestId('txt-txtMOBILE')).toHaveValue('00441172345678', { timeout: 10000 });
   //await expect(this.page.getByTestId('email-txtEMAILADDRESS')).toHaveValue('270h9bgprv@gmail.com', { timeout: 10000 }); ll be handle dynamically
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
   //await this.page.getByText('Choose file').click();
   await this.page.getByTestId('label-choose-cv-file-1').setInputFiles('D:/PlaywrightAutomation/JTAutomationLocalCS/testingcv.pdf');
   await this.page.waitForLoadState('networkidle');
   await expect(this.page.getByLabel('View CV (Click here to open in new window')).toBeVisible();
}

async fillTheBasicForm(){
   // Define form data as an object for maintainability
const formData = {
   title: "Miss",
   currentAddress: "address test1",
   addressLine2: "address test2",
   cityTown: "Birmingham",
   postcode: "223366",
   homePhone: "789456123",
   currentSalary: "120000",
   expectedSalary: "180000",
   noticePeriod: "one month",
   workRestrictions: "24 hours",
  // dateOfBirth: { year: "2000", month: "12", day: "22" },
   nationalInsurance: "CC12345C",
   redCircle: "1",
   country: "11",
   termCounty: "UK",
   termCountry: "3",
   advertSource: "8",
   foreignCountry: "Yes",
   referredByEmployee: "Yes",
   refEmployeeName: "indeed",
 };
 
 await this.page.getByTestId("select-txtTITLE").selectOption(formData.title);
 await this.page.getByTestId("txt-txtCURRENTADDRESS").fill(formData.currentAddress);
 await this.page.getByTestId("txt-txtADDRESSLINE2").fill(formData.addressLine2);
 await this.page.getByTestId("txt-txtCITYTOWN").fill(formData.cityTown);
 await this.page.getByTestId("txt-txtPOSTCODE").fill(formData.postcode);
 await this.page.getByTestId("txt-txtHOMEPHONE").fill(formData.homePhone);
 await this.page.getByRole("textbox", { name: "What is your current or what" }).fill(formData.currentSalary);
 await this.page.getByRole("textbox", { name: "What salary or day rate are" }).fill(formData.expectedSalary);
 await this.page.getByRole("textbox", { name: "If you are currently employed" }).fill(formData.noticePeriod);
 await this.page.getByTestId("txtarea-Ifyouhaveanyrestrictionsinthehoursyoucanworkpleaseprovidedetailsbelow").fill(formData.workRestrictions);
 /*
 // Selecting Date of Birth
 await this.page.getByTestId("txt-txtDATEOFBIRTH").click();
 await this.page.getByRole("cell", { name: "«" }).dblclick();
 await this.page.getByRole("cell", { name: "2000" }).nth(1).click();
await this.page.getByText(formData.dateOfBirth.month, { exact: true }).click();
 await this.page.getByRole("cell", { name: formData.dateOfBirth.day }).click();
 */

 // Other Form Fields
 await this.page.getByTestId("txt-txtNIN").fill(formData.nationalInsurance);
 await this.page.getByTestId("select-cmbRedCircle").selectOption(formData.redCircle);
 await this.page.getByTestId("select-cmbCOUNTRY").selectOption(formData.country);
 await this.page.getByTestId("txt-txtTERMCOUNTY").fill(formData.termCounty);
 await this.page.getByTestId("select-cmbTERMCOUNTRY").selectOption(formData.termCountry);
 await this.page.getByTestId("select-txtADVERT").selectOption(formData.advertSource);
 await this.page.getByTestId("select-txtFOREIGNCOUNTRY").selectOption(formData.foreignCountry);
 await this.page.getByTestId("select-ReferredByEmployee").selectOption(formData.referredByEmployee);
 await this.page.getByTestId("txt-txtRef_EmployeeName").fill(formData.refEmployeeName);
 

}








async clickOnContinueBtn(){
await expect (this.page.getByRole('button', { name: 'Continue' })).toBeVisible();
await this.page.locator('#savePersnalApplicationFormBtn').click()
}



}
export { ApplyApplicationAboutYouTab };
