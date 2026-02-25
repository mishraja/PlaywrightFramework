import { test } from '../../fixtures/page-fixtures';
import { testData } from '../../fixtures/test-data.fixture';

test('checkout single item @smoke', async ({ loginSteps, checkoutSteps }) => {
  await loginSteps.loginAs(testData.usernames.standard_user, testData.password);
  await checkoutSteps.addItemToCart('sauce-labs-backpack');
  await checkoutSteps.checkoutAs('Test', 'User', '12345');
});
