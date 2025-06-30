import { test } from '@playwright/test';
import { BasePage } from '../../pages/base.page';
import { ProductsSearchPage } from '../../pages/products.search.page';

test('Product Search Test Case', async ({ browser }) => {
    const userContext = await browser.newContext({ storageState: 'state/user.json' });
    const userPage = await userContext.newPage();
    const basePage = new BasePage(userPage);
    const productsSearchPage = new ProductsSearchPage(userPage);

    await basePage.visit();
    await basePage.fillSearchQuery();
    await basePage.clickSearchSubmitButton();
    await basePage.waitForPageLoaded();
    await productsSearchPage.assertSearchPageTitle();
    
    await userContext.close();
  });