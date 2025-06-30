import { Locator, Page } from '@playwright/test';

export class ProductDetailsPage {
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly addToListButton: Locator;
    readonly goToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.locator('#add-to-cart-button');
        this.goToCartButton = page.getByText('//*[@id="sw-gtc"]/span/a');
    }

    // ACTION
    async clickAddToCartButton() {
        await this.addToCartButton.waitFor({state: "visible"});
        await this.addToCartButton.click({force: true});
    }
    
    async clickGoToCartButton() {
        await this.goToCartButton.waitFor({state: "visible"});
        await this.goToCartButton.click({force: true});
    }
}