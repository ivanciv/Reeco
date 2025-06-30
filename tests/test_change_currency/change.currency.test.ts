import { test } from '@playwright/test';
import { BasePage } from '../../pages/base.page';
import { UserSettingsPage } from '../../pages/user.settings.page';

test('Change Currency Test Case', async ({ browser }) => {
    const userContext = await browser.newContext({ storageState: 'state/user.json' });
    const userPage = await userContext.newPage();
    const basePage = new BasePage(userPage);
    const userSettingsPage = new UserSettingsPage(userPage);

    await basePage.visit();
    await basePage.reloadPage();
    await basePage.clickLanguageAndCurrencySettingsLink();
    await basePage.waitForPageLoaded();
    await userSettingsPage.clickCurrencyDropdownLink();
    await userSettingsPage.selectCurrency();
    await userSettingsPage.clickSaveChangesButton();
    await userSettingsPage.assertSelectedCurrency();

    await userContext.close();
});