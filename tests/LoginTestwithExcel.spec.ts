//test: A function used to define and run test cases.
//import: A keyword used to bring in modules, functions, or objects from other files or libraries.
//expect: An assertion library used for writing test assertions.
//Page: Represents a single tab or window in the browser.
//from "@playwright/test": Specifies the module from which to import these functions and objects.
import { test, expect, Page } from "@playwright/test";
import { LoginTestwithExcel } from "../Pages/LoginPagewithExcel";
import ExcelUtils, { ExcelRow, WriteOptions } from "../utils/excelUtils";
//ExcelUtils: A default export from the excelUtils file in the ../utils directory. It likely 
// Import necessary modules
import { log } from "console";
//log: A function from the console module, used to print messages to the console.

import * as ExcelJS from "exceljs";
//* as ExcelJS: Imports all exports from the exceljs library and aliases them under the name ExcelJS.
// Configure test mode
//test.describe.configure({ mode: 'parallel' });
// Test case to verify user can login to job train portal providing correct credentials
test("Login test with reading the data form excel", async ({ page }) => {
  // Initialize LoginPage object

  const mydata = await ExcelUtils.readData(
//Asynchronously reads data from the specified Excel file and sheet.
    "C:\\Users\\urmz\\Documents\\jobtrain documentations\\JTAutomation\\JTAutomation\\exceljs.xlsx",
    "Sheet1"
  );
  //const pass= mydata[0].Password
  const login = new LoginTestwithExcel(page);
  // Navigate to the login page
  await login.gotToHomePage();
  login.clickOnSignInButton();

  //const usrname= mydata[0].Username

  // Enters the username from the first row of the Excel data.
  await login.enterValidEmail(mydata[0].Username);
  // Enter password
  await login.enterValidPassword(mydata[0]["Password"]);
  // Click on login button
  await login.clickOnLoginButton();
});


test("Job Train Write Data to Excel ", async ({ page }) => {
  // Initialize LoginPage object
  //const usrname: string = "ybs1": Declares a constant usrname of type string with the value "ybs1".
  const usrname: string = "nanncy";
  const pass: string = "Testing@123";
//const data: ExcelRow[]: Declares a constant data as an array of ExcelRow objects.
//[ ... ]: An array containing objects representing rows to write to the Excel file

  const data: ExcelRow[] = [
    { id: 7, name: "nanncykevin", age: 32 },
    { id: 8, name: "paulwalker", age: 43 },
    //upDATE the specific values in the ROWs
    //Username: 'ybs', Password: 'def',
    //Username: usrname, Password: pass,
    // More rows..
  ];
//await ExcelUtils.writeData(...): Asynchronously writes data to the specified Excel file and sheet.
  // Writing only specific columns with custom values
  await ExcelUtils.writeData(
    "C:\\Users\\urmz\\Documents\\jobtrain documentations\\JTAutomation\\JTAutomation\\exceljs.xlsx",
    "Sheet1",
    data,
    {
      columns: ["Username", "Password", "name", "age", "NA"], // Options for writing data
      values: [
        // Specify custom values for the specified columns
        { Username: usrname, Password: pass, name: "Alice1", age: 60 },
        { Username: "abc", Password: "def", name: "Bob", age: 20 },
      ],
    }
  );
});
