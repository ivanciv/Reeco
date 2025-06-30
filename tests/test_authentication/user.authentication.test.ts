import { test } from '@playwright/test';
import { BasePage } from '../../pages/base.page';
import { LoginPage } from '../../pages/login.page';

const userFile = 'state/user.json';

test('Authenticate User Test Case', async ({ page }) => {
  if (process.env.PASSWORD == undefined) {
    throw new Error('Missing environment variable PASSWORD');
  }

  let basePage = new BasePage(page);
  let loginPage = new LoginPage(page);

  await basePage.visit();
  await basePage.reloadPage();
  await basePage.clickAccountAndListsLink();
  await loginPage.fillValidEmail();
  await loginPage.clickContinueButton();
  await loginPage.fillValidPassword();
  await loginPage.clickSignInSubmitInput();
  await basePage.assertSignedInAccountName();

  await page.context().storageState({ path: userFile });
});
