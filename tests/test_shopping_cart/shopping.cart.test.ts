import { test, expect } from '@playwright/test';
import { BasePage } from '../../pages/base.page';
import { ShoppingCartPage } from '../../pages/shopping.cart.page';
import { ProductDetailsPage } from '../../pages/product.details.page';
import { ProductsSearchPage } from '../../pages/products.search.page';

test('Shopping Cart Test Case', async ({ browser }) => {
    const userContext = await browser.newContext({ storageState: 'state/user.json' });
    const userPage = await userContext.newPage();
    const basePage = new BasePage(userPage);
    const shoppingCartPage = new ShoppingCartPage(userPage);
    const productDetailsPage = new ProductDetailsPage(userPage);
    const productsSearchPage = new ProductsSearchPage(userPage);

    await basePage.visit();
    await basePage.fillSearchQuery();
    await basePage.clickSearchSubmitButton();
    await basePage.waitForPageLoaded();
    await productsSearchPage.clickProductItemToBuy();
    await productDetailsPage.clickAddToCartButton();

    let subtotalPriceText = await shoppingCartPage.getSubtotalPriceText();
    await shoppingCartPage.clickProceedToCheckoutButton();

    let totalPriceText = await shoppingCartPage.getTotalPriceText();
    expect(subtotalPriceText).toContain(totalPriceText);
    
    await userContext.close();
  });