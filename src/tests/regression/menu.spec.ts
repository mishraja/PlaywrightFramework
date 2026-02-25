import { test } from '../../fixtures/page-fixtures';
import { testData } from '../../fixtures/test-data.fixture';

test('regression - reset app state clears the cart badge', async ({ loginSteps, inventoryPage }) => {
  await loginSteps.loginAs(testData.usernames.standard_user, testData.password);
  await inventoryPage.addToCartByDataTest('sauce-labs-backpack');
  await inventoryPage.expectCartBadgeCount(1);

  await inventoryPage.openMenu();
  await inventoryPage.menu.clickResetAppState();
  await inventoryPage.expectCartBadgeCount(0);
});
