/*
import { Page } from "@playwright/test";
import { readFromExcel } from "./excelUtils"; // Your read from Excel function

// Define the structure of the account data
type AccountData = {
  email: string;
  password: string;
};

export async function loginWithCredentials(page: Page, filePath: string, sheetName: string) {
  // Read credentials from Excel file
  //
  const accountData: AccountData[] = readFromExcel<AccountData>(filePath, sheetName);
  // Use the first row of the data (you can adjust this if needed)
  const { email, password } = accountData[0];
  // Go to the login page and login with credentials
  await page.goto("https://test.jobtrain.co.uk/ybscareers/Account/LogIn");
  await page.locator("#signInEmail").fill(email);
  await page.locator("#inputPassword").fill(password + ' ');
  await page.locator("#signIn").click();
}
*/


import { Page } from "@playwright/test"; 
import { readFromExcel } from "./excelUtils"; // Your read from Excel function

// Define the structure of the account data
type AccountData = {
  email: string;
  password: string;
};

export async function loginWithCredentials(page: Page, filePath: string, sheetName: string) {
  // Read credentials from Excel file
  const accountData: AccountData[] = readFromExcel<AccountData>(filePath, sheetName);
  
  // Use the first row of the data (you can adjust this if needed)
  const { email, password } = accountData[0];

  // Trim any leading or trailing spaces from the password
  const trimmedPassword = password.trim();

  // Go to the login page and login with credentials
 // await page.goto("https://test.jobtrain.co.uk/ybscareers/Account/LogIn");
  await page.locator("#signInEmail").fill(email);
  await page.locator("#inputPassword").fill(trimmedPassword); // Use the trimmed password
  await page.locator("#signIn").click();
}
