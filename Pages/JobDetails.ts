import { expect } from "@playwright/test";
import { Page, BrowserContext } from "playwright";

// interface JobDetailsInter {
//     'Job Reference': string;
//     'Salary £': string;
//     'Closing Date': string;
//     'Division': string;
//     'Hours Per Week': string;
//     'Vacancy Start Date': string;
// }

class JobDetails {
  constructor(public page: Page) {}

  async readActualValuesFromPage() {
    const jobReference = await this.page.textContent('text=218');
    const salary = await this.page.textContent('text=000');
    const closingDate = await this.page.textContent('text=2025');
    const division = await this.page.textContent('text=Agency');
    const hoursPerWeek = await this.page.textContent('text=Not Specified');
    const vacancyStartDate = await this.page.textContent('text=');

    return {
        'Job Reference': jobReference?.trim() || '',
        'Salary £': salary?.trim() || '',
        'Closing Date': closingDate?.trim() || '',
        'Division': division?.trim() || '',
        'Hours Per Week': hoursPerWeek?.trim() || '',
        'Vacancy Start Date': vacancyStartDate?.trim() || '',
        
    };
 
   
  }}
export { JobDetails};
