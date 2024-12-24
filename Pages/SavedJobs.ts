import { expect } from "@playwright/test";
import { Page, BrowserContext } from "playwright";

class SavedJobs {


  constructor( public page: Page) {

  }

  async verifyTheTitles(){

    await expect( this.page.getByTestId('h1-jt-page-title')).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Applications' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Saved' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Talent Pools' })).toBeVisible();
}

async clickOnViewSavedJob(){
await this.page.getByLabel('View').nth(1).click();
await this.page.getByTestId('a-back-to-link').click();

}

async clickOnRemoveSavedJob(){
  await this.page.getByTestId('div-favourite-jobs').locator('div').filter({ hasText: 'Remove' }).nth(2).click();


  }

  


}
export { SavedJobs };

