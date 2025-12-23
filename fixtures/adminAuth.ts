import { test as base, Page } from "@playwright/test";
import { AdminLoginPage } from "../pages/admin/AdminLoginPage";

/**
 * Fixture for admin authenticated page.
 * Automatically logs in to admin panel before each test.
 */
export const test = base.extend<{ adminAuthenticatedPage: Page }>({
  adminAuthenticatedPage: async ({ page }, use) => {
    const loginPage = new AdminLoginPage(page);
    await loginPage.navigate();
    await loginPage.login();
    await page.waitForURL(/\/admin\/rooms/);
    await use(page);
  },
});

export { expect } from "@playwright/test";
