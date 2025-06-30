import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { BasePage } from '../../pages/base.page';

test.use({ storageState: { cookies: [], origins: [] } });

test('Authenticate User By Invalid Email Test Case', async ({ page }) => {
    let loginPage = new LoginPage(page);
    let basePage = new BasePage(page);

    await basePage.visit();
    await basePage.reloadPage();
    await basePage.clickAccountAndListsLink();
    await loginPage.fillInvalidEmail();
    await loginPage.clickContinueButton();
    await loginPage.assertInvalidEmailValidation();
  });