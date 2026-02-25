import { test, expect } from '../../fixtures/page-fixtures';
import { testData } from '../../fixtures/test-data.fixture';

function isSortedAscending(values: string[]): boolean {
  const sorted = [...values].sort((a, b) => a.localeCompare(b));
  return values.every((v, i) => v === sorted[i]);
}

function isSortedDescending(values: string[]): boolean {
  const sorted = [...values].sort((a, b) => b.localeCompare(a));
  return values.every((v, i) => v === sorted[i]);
}

function isSortedAscendingNumbers(values: number[]): boolean {
  return values.every((v, i) => i === 0 || values[i - 1] <= v);
}

function isSortedDescendingNumbers(values: number[]): boolean {
  return values.every((v, i) => i === 0 || values[i - 1] >= v);
}

test('regression - inventory shows products with names and prices', async ({ loginSteps, inventoryPage }) => {
  await loginSteps.loginAs(testData.usernames.standard_user, testData.password);

  const names = await inventoryPage.getDisplayedItemNames();
  const prices = await inventoryPage.getDisplayedItemPrices();

  expect(names.length).toBeGreaterThan(0);
  expect(prices.length).toBeGreaterThan(0);
  expect(names.length).toBe(prices.length);
  expect(prices.every((p) => Number.isFinite(p) && p > 0)).toBe(true);
});

test('regression - sorting by name A to Z orders items correctly', async ({ loginSteps, inventoryPage }) => {
  await loginSteps.loginAs(testData.usernames.standard_user, testData.password);
  await inventoryPage.selectSort('az');
  const names = await inventoryPage.getDisplayedItemNames();
  expect(isSortedAscending(names)).toBe(true);
});

test('regression - sorting by name Z to A orders items correctly', async ({ loginSteps, inventoryPage }) => {
  await loginSteps.loginAs(testData.usernames.standard_user, testData.password);
  await inventoryPage.selectSort('za');
  const names = await inventoryPage.getDisplayedItemNames();
  expect(isSortedDescending(names)).toBe(true);
});

test('regression - sorting by price low to high orders items correctly', async ({ loginSteps, inventoryPage }) => {
  await loginSteps.loginAs(testData.usernames.standard_user, testData.password);
  await inventoryPage.selectSort('lohi');
  const prices = await inventoryPage.getDisplayedItemPrices();
  expect(isSortedAscendingNumbers(prices)).toBe(true);
});

test('regression - sorting by price high to low orders items correctly', async ({ loginSteps, inventoryPage }) => {
  await loginSteps.loginAs(testData.usernames.standard_user, testData.password);
  await inventoryPage.selectSort('hilo');
  const prices = await inventoryPage.getDisplayedItemPrices();
  expect(isSortedDescendingNumbers(prices)).toBe(true);
});
