import { expect } from "@playwright/test";
import { Page, BrowserContext } from "playwright";

class HomePage {
  constructor(public page: Page) {

  }
  async verifyTheHomePageTitle() {
    const HomePageTitle = this.page.locator('.h3.jt-page-title');
    await expect(HomePageTitle).toContainText("Jobs for you");
    //console.log(HomePageTitle)
  }
  async liveJobsCount(){
    const list = await this.page.locator('#searchResults');
    const records = await list.getByTitle('Click here to view Job detail for');
    return await records.count();

}
async clearAllSearch(){
await this.page.locator('.jt-ce-modal__header-link ').click();

}
async searchPanelHeadings(){
  const searchPanelHeading = this.page.locator('.jt-ce-modal__header-title');
  await expect(searchPanelHeading).toHaveText('Filter your search');

}
async searchPanelFieldsTexts(){
//search section headings and placeholders
const searchByWhat = this.page.locator('#searchFilterWhatText');
const searchByWhatText =await searchByWhat.textContent()
await expect(searchByWhat).toHaveText('What')
//placeholder text verify
const placeholderWhat = this.page.locator('input[placeholder="Job Title or Keywords"]');
await expect(placeholderWhat).toHaveAttribute('placeholder', 'Job Title or Keywords');
const searchByWhere = this.page.locator('#searchFilterWhereText');
await expect(searchByWhere).toHaveText('Where')
const placeholderWhere = this.page.locator('input[placeholder="Location or Postcode"]');
await expect(placeholderWhere).toHaveAttribute('placeholder', 'Location or Postcode');
const searchByistance = this.page.locator('label:has-text("Distance")');
await expect(searchByistance).toHaveText(' Distance')
//other fields are pending
const applyfilterButton = this.page.locator('#searchFiltersApplyButton')
await expect(applyfilterButton).toBeVisible();
//heart icon
const saveIcon = this.page.locator('.material-icons-outlined.font-size-20').first();
await expect(saveIcon).toBeVisible();

}

async getJobAlertsFooter(){
  const getAlertsButton = this.page.locator('.btn.btn-white.jobAlert');
  await expect(getAlertsButton).toBeVisible();
  const getJobAlertsTextHeading = this.page.locator('.call-to-action__title');
  await expect(getJobAlertsTextHeading).toHaveText(' Get job alerts')
  const getJobAlertsTextSubHeading = this.page.locator('.intro.call-to-action__sub-title')
  await expect(getJobAlertsTextSubHeading).toHaveText('We’ll email you to let you know when there is a job that suits you!')
}

async verifyContentIfNoJobsFound(entervalue: string){
  await this.page.locator('#searchFilterWhat').fill('entervalue')
}
async clickonApplyFilters(){
await this.page.locator('#searchFiltersApplyButton').click();
}
async verifyTheContentIfNojobsFound(){
const couldNotFoundJob = this.page.locator('.text-primary-50.text-left.intro.mb-35');
await expect(couldNotFoundJob).toHaveText('We could’t find any jobs that match your search.')
}
//get element one by one and verfiy 
async verifyTextsifNoJobFound(){
  await this.page.waitForSelector('#searchNoResultsMessage', { state: 'visible' });
  // Function to safely get text content
  const getTextContent = async (selector: string, index: number): Promise<string | null> => {
    const elements = await this.page.$$(selector);
    if (elements.length > index) {
      return await elements[index].textContent();
    }
    return null;
  };
  // Verify the content of the elements with their tags
  const mainHeadingText = await getTextContent('#searchNoResultsMessage >p ', 0)
  const searchTipsText = await getTextContent('#searchNoResultsMessage > h5', 0); // First h5 element
  const firstTip = await getTextContent('#searchNoResultsMessage > ul:nth-of-type(1) > li', 0); // First li in the first ul
  const secondTip = await getTextContent('#searchNoResultsMessage > ul:nth-of-type(1) > li', 1); // Second li in the first ul
  const thirdTip = await getTextContent('#searchNoResultsMessage > ul:nth-of-type(1) > li', 2); // Third li in the first ul
  const finalTipText = await getTextContent('#searchNoResultsMessage > h5', 1); // Second h5 element
  const expectedTexts = [
    "We could’t find any jobs that match your search.",
   "Search tips:",
    "Try searching by job title",
    "Check your spelling",
    "If you still haven’t found what you are looking for:",
    "If you still haven’t found what you are looking for:"
  ];
  const actualTexts = [mainHeadingText,searchTipsText, firstTip, secondTip, thirdTip, finalTipText];
  const allTextsPresent = actualTexts.every((text, index) => text !== null && text.includes(expectedTexts[index]));
console.log(allTextsPresent)
  if (allTextsPresent) {
    console.log("All expected content is present.");
  } else {
    console.log("Some expected content is missing.");
  }
}
async commonValue(dropdownVerifications){
  const ulElement = await this.page.waitForSelector(dropdownVerifications);
  const obj = {};
  let count = 1;
  // Get all <li> elements inside the <ul>
  const liElements = await ulElement.$$("li");
  // Log the text content of each <li> element
  for (const li of liElements) {
    const textContent = await li.textContent();
    obj[count++] = textContent;
  }
  console.log(Object.keys(obj).length);
 // console.log('each element', obj)
  
}



}

export { HomePage };
