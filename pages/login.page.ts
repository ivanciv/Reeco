import { expect, Locator, Page } from '@playwright/test';
import * as testData from '../resources/test_data.json';

const credentials = {
    username: testData['valid-email-value'],
    password: process.env.PASSWORD,
};

export class LoginPage {
    readonly page: Page;
    readonly emailLoginInput: Locator;
    readonly continueButton: Locator;
    readonly passwordInput: Locator;
    readonly signInSubmitInput: Locator;
    readonly emailAlert: Locator;
    readonly mobileAlert: Locator;
    readonly passwordAlert: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailLoginInput = page.locator('#ap_email_login');
        this.continueButton = page.locator('#continue > span > input');
        this.passwordInput = page.locator('#ap_password');
        this.signInSubmitInput = page.locator('#signInSubmit')
        this.emailAlert = page.locator('#invalid-email-alert > div > div');
        this.mobileAlert = page.locator('#invalid-phone-alert > div > div');
        this.passwordAlert = page.locator('#auth-error-message-box > div > div');
    }

    // ACTION
    async fillValidEmail() {
        await this.emailLoginInput.waitFor({state: "visible"});
        await this.emailLoginInput.type(String(credentials.username), { delay: 100 });
    }

    async fillInvalidEmail() {
        await this.emailLoginInput.waitFor({state: "visible"});
        await this.emailLoginInput.type(testData['invalid-email-value'], { delay: 100 });
    }

    async fillInvalidMobileNumber() {
        await this.emailLoginInput.waitFor({state: "visible"});
        await this.emailLoginInput.type(testData['invalid-mobile-number-value'], { delay: 100 });
    }
    
    async fillValidPassword() {
        await this.passwordInput.waitFor({state: "visible"});
        await this.passwordInput.type(String(credentials.password), { delay: 100 });
    }

    async fillInvalidPassword() {
        await this.passwordInput.waitFor({state: "visible"});
        await this.passwordInput.type(testData['invalid-password-value'], { delay: 100 });
    }

    async clickContinueButton() {
        await this.continueButton.waitFor({state: "visible"});
        await this.continueButton.click({force: true});
    }

      
    async clickSignInSubmitInput() {
        await this.signInSubmitInput.waitFor({state: "visible"});
        await this.signInSubmitInput.click({force: true});
        await this.page.waitForLoadState('domcontentloaded');
    }

    // ASSERT
    async assertInvalidEmailValidation(){
        const message = await this.emailAlert.innerText();
        expect(message).toContain(testData['invalid-email-message']);
    }

    async assertInvalidMobileNumberValidation(){
        const message = await this.mobileAlert.innerText();
        expect(message).toContain(testData['invalid-mobile-number-message']);
    }

    async assertInvalidPasswordValidation(){
        const message = await this.passwordAlert.innerText();
        expect(message).toContain(testData['invalid-password-message']);
    }
}