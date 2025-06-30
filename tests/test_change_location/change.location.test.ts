import { test } from '@playwright/test';
import { BasePage } from '../../pages/base.page';
import { UserSettingsPage } from '../../pages/user.settings.page';

test('Change Deliver to Location Test Case', async ({ browser }) => {
    const userContext = await browser.newContext({ storageState: 'state/user.json' });
    const userPage = await userContext.newPage();
    const basePage = new BasePage(userPage);
    const userSettingsPage = new UserSettingsPage(userPage);

    await basePage.visit();
    await basePage.reloadPage();

    await basePage.clickLanguageAndCurrencySettingsLink();
    await basePage.waitForPageLoaded();
    await userSettingsPage.selectLanguage();
    await userSettingsPage.clickSaveChangesButton();
    await basePage.reloadPage();

    await basePage.clickLocationPopoverLink();
    await basePage.clickCountryListSelect();
    await basePage.clickLocationToDeliverOption();
    await basePage.clickDonePopoverButton();
    await basePage.reloadPage();
    await basePage.assertLocationToDeliverText();

    await userContext.close();
});