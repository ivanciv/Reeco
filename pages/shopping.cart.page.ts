import { expect, Locator, Page } from '@playwright/test';

export class ShoppingCartPage {
    readonly page: Page;
    readonly subtotalPrice: Locator; 
    readonly proceedToCheckoutButton: Locator;
    readonly totalPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.subtotalPrice = page.locator('//*[@id="sw-subtotal"]/span[2]/span/span[1]');
        this.proceedToCheckoutButton = page.locator('input[name=proceedToRetailCheckout]');
        this.totalPrice = page.locator('//*[@id="subtotals-marketplace-table"]/li[4]/span/div/div[2]'); 
    }

    // ACTION
    async clickProceedToCheckoutButton() {
        await this.proceedToCheckoutButton.waitFor({state: "attached"});
        await this.proceedToCheckoutButton.click({force: true});
    }
    
    // HELPER
    async getSubtotalPriceText(){
        await this.subtotalPrice.waitFor({state: "visible"});
        const text = await this.subtotalPrice.innerText();
        return text;
    }

    async getTotalPriceText(){
        await this.totalPrice.waitFor({state: "visible"});
        const text = await this.totalPrice.innerText();
        return text;
    }
}