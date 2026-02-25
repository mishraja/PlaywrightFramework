import { test, expect } from '../../fixtures/page-fixtures';
import { testData } from '../../fixtures/test-data.fixture';

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

test('regression - checkout info requires mandatory fields', async ({ loginSteps, inventoryPage, cartPage, checkoutInfoPage }) => {
  await loginSteps.loginAs(testData.usernames.standard_user, testData.password);
  await inventoryPage.addToCartByDataTest('sauce-labs-backpack');
  await inventoryPage.openCart();
  await cartPage.checkout();

  await checkoutInfoPage.continue();
  const errorText = await checkoutInfoPage.getErrorText();
  expect(errorText.toLowerCase()).toContain('first name');
});

test('regression - cancel from checkout info returns to cart', async ({ page, loginSteps, inventoryPage, cartPage, checkoutInfoPage }) => {
  await loginSteps.loginAs(testData.usernames.standard_user, testData.password);
  await inventoryPage.addToCartByDataTest('sauce-labs-backpack');
  await inventoryPage.openCart();
  await cartPage.checkout();

  await checkoutInfoPage.cancel();
  await expect(page).toHaveURL(/cart\.html/);
});

test('regression - overview totals equal subtotal + tax', async ({
  loginSteps,
  inventoryPage,
  cartPage,
  checkoutInfoPage,
  checkoutOverviewPage,
}) => {
  await loginSteps.loginAs(testData.usernames.standard_user, testData.password);

  const item1 = 'sauce-labs-backpack';
  const item2 = 'sauce-labs-bike-light';
  const p1 = await inventoryPage.getPriceForItemDataTestSuffix(item1);
  const p2 = await inventoryPage.getPriceForItemDataTestSuffix(item2);

  await inventoryPage.addToCartByDataTest(item1);
  await inventoryPage.addToCartByDataTest(item2);
  await inventoryPage.expectCartBadgeCount(2);

  await inventoryPage.openCart();
  await cartPage.checkout();
  await checkoutInfoPage.fillCustomerInfo('Test', 'User', '12345');
  await checkoutInfoPage.continue();

  await checkoutOverviewPage.expectTotalsVisible();
  const subtotal = await checkoutOverviewPage.getSubtotal();
  const tax = await checkoutOverviewPage.getTax();
  const total = await checkoutOverviewPage.getTotal();

  expect(round2(subtotal)).toBe(round2(p1 + p2));
  expect(round2(total)).toBe(round2(subtotal + tax));
});
