import { test } from '../../fixtures/page-fixtures';
import { testData } from '../../fixtures/test-data.fixture';

test('login with standard_user @smoke', async ({ loginSteps }) => {
  await loginSteps.loginAs(testData.usernames.standard_user, testData.password);
});
