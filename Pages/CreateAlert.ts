import { expect } from "@playwright/test";
import { Page, BrowserContext } from "playwright";

class CreateAlert {


  constructor( public page: Page) {
``
  }


  async clickOnlistVacanciesBtn(){

    await this.page.locator("a-home-link").click()

}


async clickOnCreateAlertsBtn(){


    await this.page.getByTestId('a-btn-create-alerts').click()
}


async alreadyHaveAnAccount(){

  await this.page.locator('a.register__link.mb-25').click();
}

async clickOnCreateBtn(){

  await this.page.getByRole('button', { name: 'notifications_none Create' }).click();
}

async verifyTheModalheading(){
  expect(this.page.getByText('Create job alert')).toBeVisible();
  
  }
  
async toggleBtnHeading(){
expect(this.page.getByRole('heading', { name: 'Allow Job Alerts' })).toBeVisible();

}

async filloutTheForm(){

  
  await this.page.getByTestId('txt-alert-name').click();
  await this.page.getByTestId('txt-alert-name').fill('test');

  await this.page.getByRole('combobox').first().click();
  await this.page.getByRole('option', { name: 'East Anglia' }).click();
  await this.page.getByRole('combobox').nth(1).click();
  await this.page.getByRole('option', { name: 'Administration' }).click();
  //below locators are for local live
  // await this.page.getByRole('combobox').nth(2).click();
  // await this.page.getByRole('option', { name: 'Ship - Accommodation' }).click();
  // await this.page.getByText('Salary x mid level 20,000 -').click();
  // await this.page.getByRole('option', { name: 'x' }).click();
  // await this.page.getByRole('combobox').nth(4).click();
  // await this.page.getByRole('option', { name: 'Accommodation' }).click();
  // await this.page.getByTestId('toggle-contract-0').getByText('Apprenticeship').click();



  
  }

  async clickOnSaveAlertBtn(){
   await this.page.getByRole('button', { name: 'Save alert' }).click()
    
    }

    async verifyTheAlertMessage(){
     expect (await this.page.getByText('check_circle_outlineGreat')).toBeVisible()
       
       }




}
export { CreateAlert };

