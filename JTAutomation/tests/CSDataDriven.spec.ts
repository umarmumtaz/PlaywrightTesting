//this script imports the necessory modules
//Data driven testing using the json file
import { test, expect } from '@playwright/test';
//import the login page class defined in the login page
//import { LoginPageDD } from '../Pages/LoginPageDD';
//import {testData} from'../Pages/testData.json';
//node file data
import fs from 'fs';
const testDataPath = 'Pages/testData.json'
//read and parse the file and save in the variable, also mention the type
const testDataVar = JSON.parse(fs.readFileSync(testDataPath,'utf8'));
for(const user of testDataVar){
   
test(`login with Valid Email/PAssword using datadriven ${user.username}`, async({page}) =>{
await page.goto('https://test.jobtrain.co.uk/ybscareers/Account/LogIn')
await page.fill('#signInEmail', user.username)
await page.fill('#inputPassword', user.password)
await page.locator('#signIn').click();
await expect(page).toHaveURL('https://test.jobtrain.co.uk/ybscareers/MyJobs');
const pageHeading = await page.locator('.jt-page-title');
const getHeading = await expect(pageHeading).toContainText('My Applications');
await expect(pageHeading).toBeTruthy();
//set the timeout at the end of the TC
await page.waitForTimeout(5000);
}

)};











// //...........Login Page Test Cases......................
// for (const{username, password} of testData) {

//     test('DD Login', async ({ page }) => {
//     const loginPage = new LoginPageDD(page); //class passing the current page object

   
//     await loginPage.goToHome();  //navigate to the method
//     //apply the assertion to check the visibility of the title

//     await expect(page.locator('.jt-page-title')).toBeVisible();
// await loginPage.validLogin(username,password)
//    await expect(page).toHaveURL('https://test.jobtrain.co.uk/ybscareers/MyJobs');
//     const pageHeading = await page.locator('.jt-page-title');
//     const getHeading = await expect(pageHeading).toContainText('My Applications');
//     await expect(pageHeading).toBeTruthy();
// })}