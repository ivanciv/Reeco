import { expect, Locator, Page } from '@playwright/test';
import * as testData from '../resources/test_data.json';

export class UserSettingsPage {
    readonly page: Page;
    readonly languageToSelectOption: Locator;
    readonly currencyDropdownLink: Locator;
    readonly currencyToSelectOption: Locator;
    readonly saveChangesButton: Locator;
    readonly selectedCurrency: Locator;

    constructor(page: Page) {
        this.page = page;
        this.languageToSelectOption = page.locator('#icp-language-settings > div:nth-child(6) > div > label > input[type=radio]');
        this.currencyDropdownLink = page.locator('#icp-currency-dropdown');
        this.currencyToSelectOption = page.locator('#icp-currency-dropdown_19');
        this.saveChangesButton = page.locator('#icp-save-button > span > input');
        this.selectedCurrency = page.locator('#icp-currency-dropdown-selected-item-prompt > span > span > span');
    }

    // ACTION
    async selectLanguage() {
        await this.languageToSelectOption.waitFor({state: "visible"});
        await this.languageToSelectOption.click({force: true});
    }

    async clickCurrencyDropdownLink() {
        await this.currencyDropdownLink.waitFor({state: "visible"});
        await this.currencyDropdownLink.click({force: true});
    }

    async selectCurrency() {
        await this.currencyToSelectOption.waitFor({state: "visible"});
        await this.currencyToSelectOption.click({force: true});
    }

    async clickSaveChangesButton() {
        await this.saveChangesButton.waitFor({state: "visible"});
        await this.saveChangesButton.click({force: true});
    }

    // HELPER
    async getCurrencySelectedOptionText() {
        const currency = await this.selectedCurrency.innerText();
        return currency;
    }

    // ASSERT
    async assertSelectedCurrency(){
        const currency = await this.getCurrencySelectedOptionText();
        expect(currency).toContain(testData['account-currency']);
    }
}