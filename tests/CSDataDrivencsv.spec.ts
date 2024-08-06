// //Data driven testing using the csv file
// import { test, expect } from '@playwright/test';
// //node file data
// import fs from 'fs';
// import path from 'path';
// import {parse} from 'csv-parse/sync';

// const testDataVar = parse (fs.readFileSync(path.join(__dirname, "../Pages/testData.csv")),

// {
// columns:true,
// skip_empty_lines:true
// });
// // Log the parsed data to check if it's correct
// console.log(testDataVar);
// //read and parse the file and save in the variable, also mention the type
// for(const user of testDataVar){
   
// test(`login with Valid Email/PAssword using CSVdatadriven ${user.username}`, async({page}) =>{
// await page.goto('https://test.jobtrain.co.uk/ybscareers/Account/LogIn')
// await page.fill('#signInEmail', user.username)
// await page.fill('#inputPassword', user.password)
// await page.locator('#signIn').click();
// await expect(page).toHaveURL('https://test.jobtrain.co.uk/ybscareers/MyJobs');
// const pageHeading = await page.locator('.jt-page-title');
// const getHeading = await expect(pageHeading).toContainText('My Applications');
// await expect(pageHeading).toBeTruthy();
// //set the timeout at the end of the TC
// await page.waitForTimeout(5000);
// }

// )};


//-----from GPT with password type fix
import { test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

// Read and parse CSV file
const filePath = path.join(__dirname, "../Pages/testData.csv");
const fileContent = fs.readFileSync(filePath, 'utf-8');
const testDataVar = parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
  trim: true
}).map(row => ({
  username: row.username.trim(),
  password: row.password.trim()
}));

// Log parsed data for debugging
console.log(testDataVar);

// Define tests using parsed data
for (const user of testDataVar) {
  test(`login with Valid Email/Password using CSV data driven ${user.username}`, async ({ page }) => {
    await page.goto('https://test.jobtrain.co.uk/ybscareers/Account/LogIn');
    await page.fill('#signInEmail', user.username);
    await page.fill('#inputPassword', user.password);
    await page.locator('#signIn').click();
    //await expect(page).toHaveURL('https://test.jobtrain.co.uk/ybscareers/MyJobs');
    const pageHeading = await page.locator('.jt-page-title');
    console.log(`Page heading: ${await pageHeading.textContent()}`);
  });
}
