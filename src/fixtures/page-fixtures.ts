import { test as base } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { CheckoutCompletePage } from '../pages/checkout-complete.page';
import { CheckoutInfoPage } from '../pages/checkout-info.page';
import { CheckoutOverviewPage } from '../pages/checkout-overview.page';
import { InventoryPage } from '../pages/inventory.page';
import { LoginPage } from '../pages/login.page';

// Inline Steps classes
export class LoginSteps {
  constructor(
    private readonly loginPage: LoginPage,
    private readonly inventoryPage: InventoryPage,
  ) {}

  async loginAs(username: string, password: string): Promise<void> {
    await this.loginPage.goto();
    await this.loginPage.login(username, password);
    await this.inventoryPage.expectLoaded();
  }
}

export class CheckoutSteps {
  constructor(
    private readonly inventoryPage: InventoryPage,
    private readonly cartPage: CartPage,
    private readonly checkoutInfoPage: CheckoutInfoPage,
    private readonly checkoutOverviewPage: CheckoutOverviewPage,
    private readonly checkoutCompletePage: CheckoutCompletePage,
  ) {}

  async addItemToCart(itemDataTestSuffix: string): Promise<void> {
    await this.inventoryPage.addToCartByDataTest(itemDataTestSuffix);
    await this.inventoryPage.expectCartBadgeCount(1);
  }

  async checkoutAs(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.inventoryPage.openCart();
    await this.cartPage.checkout();

    await this.checkoutInfoPage.fillCustomerInfo(firstName, lastName, postalCode);
    await this.checkoutInfoPage.continue();

    await this.checkoutOverviewPage.expectTotalsVisible();
    await this.checkoutOverviewPage.finish();

    await this.checkoutCompletePage.expectComplete();
  }
}

type Pages = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutInfoPage: CheckoutInfoPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  checkoutCompletePage: CheckoutCompletePage;
};

type Steps = {
  loginSteps: LoginSteps;
  checkoutSteps: CheckoutSteps;
};

export const test = base.extend<Pages & Steps>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutInfoPage: async ({ page }, use) => {
    await use(new CheckoutInfoPage(page));
  },
  checkoutOverviewPage: async ({ page }, use) => {
    await use(new CheckoutOverviewPage(page));
  },
  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },
  loginSteps: async ({ loginPage, inventoryPage }, use) => {
    await use(new LoginSteps(loginPage, inventoryPage));
  },
  checkoutSteps: async (
    { inventoryPage, cartPage, checkoutInfoPage, checkoutOverviewPage, checkoutCompletePage },
    use,
  ) => {
    await use(
      new CheckoutSteps(
        inventoryPage,
        cartPage,
        checkoutInfoPage,
        checkoutOverviewPage,
        checkoutCompletePage,
      ),
    );
  },
});

export { expect } from '@playwright/test';
