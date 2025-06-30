import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { BasePage } from '../../pages/base.page';

test.use({ storageState: { cookies: [], origins: [] } });

test('Authenticate User By Invalid Password Test Case', async ({ page }) => {
    let loginPage = new LoginPage(page);
    let basePage = new BasePage(page);

    await basePage.visit();
    await basePage.reloadPage();
    await basePage.clickAccountAndListsLink();
    await loginPage.fillValidEmail();
    await loginPage.clickContinueButton();
    await loginPage.fillInvalidPassword();
    await loginPage.clickSignInSubmitInput();
    await loginPage.assertInvalidPasswordValidation();
  });