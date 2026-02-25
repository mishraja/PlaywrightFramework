import { test, expect } from '../../fixtures/page-fixtures';
import { testData } from '../../fixtures/test-data.fixture';

const allProductSuffixes = [
  'sauce-labs-backpack',
  'sauce-labs-bike-light',
  'sauce-labs-bolt-t-shirt',
  'sauce-labs-fleece-jacket',
  'sauce-labs-onesie',
  'test.allthethings()-t-shirt-(red)',
];

test('regression - add all products and verify cart count', async ({ loginSteps, inventoryPage, cartPage }) => {
  await loginSteps.loginAs(testData.usernames.standard_user, testData.password);

  for (const suffix of allProductSuffixes) {
    await inventoryPage.addToCartByDataTest(suffix);
  }

  await inventoryPage.expectCartBadgeCount(allProductSuffixes.length);
  await inventoryPage.openCart();
  expect(await cartPage.getItemCount()).toBe(allProductSuffixes.length);
});

test('regression - remove items until cart is empty', async ({ loginSteps, inventoryPage, cartPage }) => {
  await loginSteps.loginAs(testData.usernames.standard_user, testData.password);
  await inventoryPage.addToCartByDataTest('sauce-labs-backpack');
  await inventoryPage.expectCartBadgeCount(1);

  await inventoryPage.openCart();
  await cartPage.expectAtLeastItems(1);
  await cartPage.removeItem(0);
  await cartPage.expectAtLeastItems(0);
});

test('regression - continue shopping from cart returns to inventory', async ({ loginSteps, inventoryPage, cartPage }) => {
  await loginSteps.loginAs(testData.usernames.standard_user, testData.password);
  await inventoryPage.addToCartByDataTest('sauce-labs-backpack');
  await inventoryPage.openCart();
  await cartPage.continueShopping();
  await inventoryPage.expectLoaded();
});
