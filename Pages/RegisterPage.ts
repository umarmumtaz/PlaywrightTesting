
//import {  Page, BrowserContext } from 'playwright';
import { expect, Page, test } from '@playwright/test';
class RegisterPage {
    randomEmail: string;
    constructor(public page: Page)
     {
        this.randomEmail = generateRandomEmail();
    }
async clickonHaveNotAccountButton(){
this.page.locator('.register__link.mb-25').click();

}
    
async verifyTheRegister1PageTitle(){
    const RegisterPage1Title= await this.page.locator('.register__title.text-primary.h3').textContent();
    await expect(RegisterPage1Title).toContain("Now, let's  get started");
    console.log(RegisterPage1Title)
}
async validRegisterCredentials(enterPassword: string){
    
await this.page.locator('#UserName').fill(this.randomEmail);
// Use the provided password parameter
//await this. page.locator('#register').click(); 
}




}
//generateRandomEmail(): This is the name of the function. It does not take any parameter
function generateRandomEmail() {
    //characters: This is the name of the constant.
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomEmail = '';
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);//This generates a random integer
        //Math.random(): Generates a random floating-point number between 0 (inclusive) and 1 (exclusive).
        //characters.length: Multiplies the random number by the length of the characters string (which is 36).
        //Math.floor(): Rounds down to the nearest whole number, giving a random integer from 0 to 35.
        //This gets the character at the position randomIndex in the 
        //${randomEmail}@jt.com: This uses template literals to create the email address
        randomEmail += characters.charAt(randomIndex);
    }
    return `${randomEmail}@jt.com`;
}






export { RegisterPage };