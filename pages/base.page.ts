import { expect, Locator, Page } from '@playwright/test';
import * as testData from '../resources/test_data.json';

// const BaseUrl = {
//     BaseUrl: process.env.BASE_URL,
// };


export class BasePage {
    readonly page: Page;
    readonly locationPopoverLink: Locator;
    readonly locationToDeliver: Locator; 
    readonly countryToDeliver: Locator; 
    readonly countryListPopoverSelect: Locator;
    readonly donePopoverButton: Locator;
    readonly countryToSelectOption: Locator;
    readonly languageAndCurrencySettingsLink: Locator;
    readonly accountAndListsLink: Locator;
    readonly accountNameText: Locator;
    readonly searchTextInput: Locator;
    readonly searchSubmitButton: Locator;
    readonly changeLanguageLink: Locator;
    readonly languageFlag: Locator;

    constructor(page: Page) {
        this.page = page;
        this.locationPopoverLink = page.locator('#nav-global-location-popover-link');
        this.locationToDeliver = page.getByLabel('España').getByText('España');
        this.countryToDeliver = page.locator('#glow-ingress-line2');
        this.countryListPopoverSelect = page.locator('#GLUXCountryList');
        this.donePopoverButton = page.getByRole('button').getByText('Listo');
        this.countryToSelectOption = page.locator('#a-popover-3 > div > div > ul > li:nth-child(211) > a');
        this.languageAndCurrencySettingsLink = page.locator('#icp-nav-flyout > a');
        this.accountAndListsLink = page.locator('#nav-link-accountList > a');
        this.accountNameText = page.locator('#nav-link-accountList-nav-line-1');
        this.searchTextInput = page.locator('#twotabsearchtextbox');
        this.searchSubmitButton = page.locator('#nav-search-submit-button');
        this.changeLanguageLink = page.locator('#icp-nav-flyout > a');
        this.languageFlag = page.locator('#icp-nav-flyout > a > span > span.nav-line-2 > div');
    }

    // ACTION
    async visit() {
        await this.page.goto('');
        await this.page.waitForSelector('body', { state: 'visible' });
    }

    async reloadPage(){
        await this.page.reload();
    }

    async waitForPageLoaded() {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickCountryListSelect() {
        await this.countryListPopoverSelect.waitFor({state: "visible"});
        await this.countryListPopoverSelect.click({force: true});
    }

    async clickLocationToDeliverOption() {
        await this.locationToDeliver.waitFor({state: "visible"});
        await this.locationToDeliver.click({force: true});
    }

    async clickDonePopoverButton() {
        await this.donePopoverButton.waitFor({state: "attached"});
        await this.donePopoverButton.click({force: true});
        await this.page.waitForLoadState("load");
    }

    async clickAccountAndListsLink() {
        await this.accountAndListsLink.waitFor({state: "visible"});
        await this.accountAndListsLink.click({force: true});
    }
    
    async clickLanguageAndCurrencySettingsLink() {
        await this.languageAndCurrencySettingsLink.waitFor({state: "visible"});
        await this.languageAndCurrencySettingsLink.click({force: true});
    }
      
    async clickLocationPopoverLink() {
        await this.locationPopoverLink.waitFor({state: "visible"});
        await this.locationPopoverLink.click({force: true});
    }

    async fillSearchQuery() {
        await this.searchTextInput.waitFor({state: "visible"});
        await this.searchTextInput.fill(testData['search-query'], { timeout: 1000 });
    }

    async clickSearchSubmitButton() {
        await this.searchSubmitButton.waitFor({state: "visible"});
        await this.searchSubmitButton.click({force: true});
    }

    // HELPER
    async getCountryToDeliverText(){
        await this.countryToDeliver.waitFor({state: "visible"});
        const country = await this.countryToDeliver.innerText();
        return country;
    }

    async getAccountNameText() {
        await this.accountNameText.waitFor({state: "visible"});
        const accountName = await this.accountNameText.innerText();
        return accountName;
    }

    async getLanguageFlagText() {
        await this.languageFlag.waitFor({state: "visible"});
        const accountName = await this.languageFlag.innerText();
        return accountName;
    }

    // ASSERT
    async assertLocationToDeliverText(){
        const country = await this.getCountryToDeliverText();
        expect(country).toContain(testData['account-location']);
    }

    async assertSignedInAccountName(){
        const name = await this.getAccountNameText();
        expect(name).toContain(testData['account-name']);
    }

    async assertLanguageFlagText(){
        const text = await this.getLanguageFlagText();
        expect(text).toContain(testData['account-language-flag']);
    }
}