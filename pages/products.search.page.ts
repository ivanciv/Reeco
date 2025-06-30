import { expect, Locator, Page } from '@playwright/test';
import * as testData from '../resources/test_data.json';

export class ProductsSearchPage {
    readonly page: Page;
    readonly searchResultsNumer: Locator; 
    readonly filterByLanguage: Locator;
    readonly productItemToBuy: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchResultsNumer = page.locator('//*[@id="search"]/span/div/h1/div/div[1]/div/h2/span[1]');
        this.filterByLanguage = page.locator('[id="p_n_feature_twenty-five_browse-bin/3291435011"]').getByRole('link');
        this.productItemToBuy = page.getByText('TypeScript Cookbook: Real World Type-Level Programming');
    }

    // ACTION
    async clickFilterSearchResultsByLanguage() {
        await this.filterByLanguage.waitFor({state: "visible"});
        await this.filterByLanguage.click({force: true});
    }
    
    async clickProductItemToBuy() {
        await this.productItemToBuy.waitFor({state: "visible"});
        await this.productItemToBuy.click({force: true});
    }

    // HELPER
    async getSearchResultsNumberText(){
        await this.searchResultsNumer.waitFor({state: "visible"});
        const text = await this.searchResultsNumer.innerText();
        return text;
    }

    // ASSERT
    async assertSearchPageTitle(){
        const title = await this.page.title();
        expect(title).toContain(testData['search-page-title']);
    }
}