// import { chromium } from 'playwright';
// import * as XLSX from 'xlsx';
// import * as fs from 'fs';

// // Function to read expected values from an Excel file
// export const readExpectedValuesFromExcel = (filePath: string) => {
//   const workbook = XLSX.readFile(filePath);
//   const sheetName = workbook.SheetNames[0];
//   const sheet = workbook.Sheets[sheetName];

//   const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
//   const expectedValues: { [key: string]: string } = {};

//   jsonData.forEach((row: string[]) => {
//     if (row[0] && row[1]) {
//       expectedValues[row[0].toString()] = row[1].toString();
//     }
//   });

//   return expectedValues;
// };

// //functions to write to Excel file





// // Function to read values from the web page

// export const readActualValuesFromPage = async (page: any) => {
//   const jobReference = await page.textContent('#job-ref');
//   const salary = await page.textContent('#salary');
//   const closingDate = await page.textContent('#closing-date');
//   const division = await page.textContent('#division');
//   const hoursPerWeek = await page.textContent('#hours-per-week');
//   const vacancyStartDate = await page.textContent('#vacancy-start-date');

//   return {
//     'Job Reference': jobReference?.trim() || '',
//     'Salary £': salary?.trim() || '',
//     'Closing Date': closingDate?.trim() || '',
//     'Division': division?.trim() || '',
//     'Hours Per Week': hoursPerWeek?.trim() || '',
//     'Vacancy Start Date': vacancyStartDate?.trim() || '',
//   };
// };

// // Function to verify the values
//  export const verifyValues = (actualValues: { [key: string]: string }, expectedValues: { [key: string]: string }) => {
//   for (const key in expectedValues) {
//     if (expectedValues[key] !== actualValues[key]) {
//       console.log(`Mismatch found for ${key}: expected "${expectedValues[key]}", but got "${actualValues[key]}"`);
//     } else {
//       console.log(`${key} matches: "${expectedValues[key]}"`);
//     }
//   }
// };

import { chromium, Page } from 'playwright';
import * as XLSX from 'xlsx';
import * as fs from 'fs';

// Function to read expected values from an Excel file
export const readExpectedValuesFromExcel = (filePath: string) => {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const jsonData: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  const expectedValues: { [key: string]: string } = {};

  jsonData.forEach((row: string[]) => {
    if (row[0] && row[1]) {
      expectedValues[row[0]] = row[1];
    }
  });

  return expectedValues;
};
// Function to read values from the web page
export const  readActualValuesFromPage = async (page: Page) => {
    const jobReference = await page.textContent('text=218');
    const salary = await page.textContent('text=000');
    const closingDate = await page.textContent('text=2025');
    const division = await page.getByText('Division:');
    const hoursPerWeek = await page.getByText('Hours Per Week:');
    const vacancyStartDate = await page.getByText('Vacancy Start Date:');
  
    return {
      'Job Reference': jobReference,//.trim() || '',
      'Salary £': salary,//.trim() || '',
      'Closing Date': closingDate,//.trim() || '',
      'Division': division,//.trim() || '',
      'Hours Per Week': hoursPerWeek,//.trim() || '',
      'Vacancy Start Date': vacancyStartDate//.trim() || '',
    
    };
  };
  
  // Function to verify the values
  export const verifyValues = (actualValues: { [key: string]: string }, expectedValues: { [key: string]: string }) => {
    for (const key in expectedValues) {
      if (expectedValues[key] !== actualValues[key]) {
        console.log(`Mismatch found for ${key}: expected "${expectedValues[key]}", but got "${actualValues[key]}"`);
      } else {
        console.log(`${key} matches: "${expectedValues[key]}"`);
      }
    }
  };


  //compare values are pending
  //any other logic on reading the texts on the job details