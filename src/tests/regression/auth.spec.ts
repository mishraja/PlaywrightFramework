import { test, expect } from '../../fixtures/page-fixtures';
import { testData } from '../../fixtures/test-data.fixture';

test('regression - login fails with empty fields', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.submit();
  const errorText = await loginPage.getErrorText();
  expect(errorText.toLowerCase()).toContain('username');
});

test('regression - login fails with missing password', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.fillUsername(testData.usernames.standard_user);
  await loginPage.submit();
  const errorText = await loginPage.getErrorText();
  expect(errorText.toLowerCase()).toContain('password');
});

test('regression - locked out user cannot login', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(testData.usernames.locked_out_user, testData.password);
  const errorText = await loginPage.getErrorText();
  expect(errorText.toLowerCase()).toContain('locked');
});

test('regression - logout returns to login and blocks protected pages', async ({ page, loginSteps, inventoryPage, loginPage }) => {
  await loginSteps.loginAs(testData.usernames.standard_user, testData.password);

  await inventoryPage.openMenu();
  await inventoryPage.menu.clickLogout();
  await loginPage.expectAt();

  await page.goto('/inventory.html');
  await loginPage.expectAt();

  await page.goto('/cart.html');
  await loginPage.expectAt();
});
