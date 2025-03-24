import { expect } from "@playwright/test";
import { Page, BrowserContext } from "playwright";

class HomePage {
  constructor(public page: Page) {
this.page=page;
  }


  async clickOnListOfVacanicies(){
await this.page.getByTestId('a-home-link').click();


  }

  async verifyTheHomePageTitle() {
    const HomePageTitle = this.page.getByTestId('h1-jt-page-title');
    await expect(HomePageTitle).toContainText("Jobs for you");
  
  }
//   async liveJobsCount(){
//     const list = await this.page.locator('#searchResults');
//     const records = await list.getByTitle('Click here to view Job detail for');
//     return await records.count();

// }

async liveJobsCount() {
  // Define the 'Load More' button locator
  const loadMoreButton = this.page.getByTestId('div-btn-load-more');
  
  // Keep clicking "Load More" until the button is no longer visible
  while (await loadMoreButton.isVisible()) {
    await loadMoreButton.click();
    await this.page.waitForTimeout(1000); // Wait for jobs to load, adjust timeout as necessary
  }

  // Locate all job entries once all jobs are loaded
  const records = await this.page.locator('#searchResults').getByTitle('Click here to view Job detail for');
  const jobCount = await records.count();
  
  console.log(`Total Jobs: ${jobCount}`);
  return jobCount;
}








async clearAllSearch(){
await this.page.getByTestId('div-filter-clear-all').click();

}
async searchPanelHeadings(){
  const searchPanelHeading = this.page.getByText('Filter your search');
  await expect(searchPanelHeading).toHaveText('Filter your search');

}

async gotToTheHomePage() {
  await this.page.goto("http://live.jobtrain.com:2022/Home/Job");
}

async searchPanelFieldsTexts(){
//search section headings and placeholders
const searchByWhat = this.page.getByTestId('div-job-search-filters').getByText('What');
await expect(searchByWhat).toHaveText('What')
const searchByWhatText = await searchByWhat.textContent();
console.log("Heading text:", searchByWhatText);

const searchByWhere = this.page.getByText('Where');
await expect(searchByWhere).toHaveText('Where');
const searchByWhereText = await searchByWhere.textContent();
console.log("Heading text:", searchByWhereText);

const searchByistance= this.page.getByText('Distance');
await expect(searchByistance).toHaveText('Distance')
const searchByistanceText = await searchByistance.textContent();
console.log("Heading text:", searchByistanceText);

/*
these for other servers
const searchBySalary = this.page.getByText('Salary');
await expect(searchBySalary).toHaveText('Salary')
const searchBySalaryText = await searchBySalary.textContent();
console.log("Heading text:", searchBySalaryText);

const searchByRegions = this.page.getByText('Regions')
await expect(searchByRegions).toHaveText('Regions')
const searchByRegionsText = await searchByRegions.textContent();
console.log("Heading text:", searchByRegionsText);

const searchByDataPosted = this.page.getByText('Date Posted');
await expect(searchByDataPosted).toHaveText('Date Posted')
const searchByDatePostedText = await searchByDataPosted.textContent();
console.log("Heading text:", searchByDatePostedText);
*/

const searchByCategories = this.page.getByText('Job Categories')
await expect(searchByCategories).toHaveText('Job Categories')
const searchByCategoriesText = await searchByCategories.textContent();
console.log("Heading text:", searchByCategoriesText);






}

async getJobAlertsFooter(){
  const getAlertsButton = this.page.getByTestId('a-joinour-talent-network');
  await expect(getAlertsButton).toBeVisible();
  const getJobAlertsTextHeading = this.page.locator('.call-to-action__title');
  await expect(getJobAlertsTextHeading).toHaveText('Join our Talent Network!')
  const getJobAlertsTextSubHeading = this.page.locator('.intro.call-to-action__sub-title')
  await expect(getJobAlertsTextSubHeading).toHaveText('Submit your contact details and CV to be considered for relevant future opportunities.')
}

async verifyContentIfNoJobsFound(entervalue: string){
  await this.page.locator('#searchFilterWhat').fill('enterinvalidvalue')
}
async clickonApplyFilters(){
await this.page.locator('#searchFiltersApplyButton').click();
}



async verifyNoJobsFoundContent() {
  const expectedContent = [
    'We couldn’t find any jobs that match your search.',
    'Search tips:',
    'Try searching by job title',
    'Check your spelling',
    'If you still haven’t found what you are looking for:',
   
  ];

  const elements = await this.page.locator('body *').all();
  const actualContent = await Promise.all(elements.map(el => el.textContent()));
  const filteredContent = actualContent
    .map(text => text?.trim())
    .filter(text => text);

  // Verify all expected content is present
  expectedContent.forEach(content => {
    expect(filteredContent).toContain(content);
    console.log(`Verified: "${content}"`);



  });
}


async verifyTheJobsTitles(){

  const jobTitles = await this.page.$$eval("#searchResultsItems", (titles) =>
    titles
      .filter((title): title is HTMLElement => title instanceof HTMLElement)
      .map((title) => title.innerText)
  );
  console.log("Job Titles:", jobTitles);
  // Example expected job titles
  const expectedJobTitles = ["Jobtrain Test job"];
  // Verify the job titles
  const allTitlesMatch = expectedJobTitles.every((expectedTitle) =>
    jobTitles.includes(expectedTitle)
  );
  if (allTitlesMatch) {
    console.log("All expected job titles are present.");
  } else {
    console.log("Some expected job titles are missing.");
  }


}

async verifyTheFilterWithRandomValues(){

//distance
    await this.page.getByLabel('Please Select').click();
    const distanceFirstOption =  await this.page.locator('#select2-searchFilterDistance-results li').first();
    await distanceFirstOption.click();
//locations

    await this.page.getByRole('searchbox', { name: 'Filter the list of jobs by location' }).click();
    const locationsFirstOption =  await this.page.locator('#select2-searchFilterLocations-results li').first();
    await locationsFirstOption.click();
    /*
//Job categories
await this.page.getByRole('searchbox', { name: 'Filter the list of jobs by job category' }).click();
await this.page.locator('#select2-searchFilterJobcategories-result-rkm6-36').click();

//departments

await this.page.getByRole('searchbox', { name: 'Filter the list of jobs by department' }).click();
await this.page.locator('#select2-searchFilterDepartment-result-5pg1-437').click();
*/
    await this.page.getByTestId('btn-apply-filters').click();
  
}


async verifyTheSiteLogo(){
const siteLogo = this.page.getByTestId('a-header-logo');
 expect(siteLogo).toBeVisible();
//await expect(siteLogo).toHaveAttribute("alt","Carnival");
}

async verifyTheCreateAlertButton(){
  const createAlertButton = this.page.getByTestId('a-btn-create-alerts');
  await expect(createAlertButton).toBeVisible();
}
async verifyTheJobsCount(){
  const totalLiveJobsCount = await this.liveJobsCount();
  console.log("Total live jobs are:", totalLiveJobsCount);

}

}
export { HomePage };
