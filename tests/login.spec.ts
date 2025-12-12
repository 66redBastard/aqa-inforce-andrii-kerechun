import { test, expect } from "@playwright/test";
import { AdminLoginPage } from "../pages/admin/AdminLoginPage";

test("Login to admin panel", async ({ page }) => {
  const loginPage = new AdminLoginPage(page);
  await loginPage.navigate();
  await loginPage.login();

  // Verify login success by checking URL or visible element
  await expect(page).toHaveURL(/\/admin\/rooms/); // Adjust regex if needed for exact path
  // Alternatively, check for a specific admin element if URL check isn't sufficient
  // await expect(page.locator('some-admin-element')).toBeVisible();
});
