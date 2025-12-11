import { test, expect } from "@playwright/test";
import { AdminLoginPage } from "../pages/AdminLoginPage";

test("Login to admin panel", async ({ page }) => {
  const loginPage = new AdminLoginPage(page);

  // Navigate to login page
  await loginPage.navigate();

  // Perform login with default credentials
  await loginPage.login();

  // Verify login success by checking URL or visible element
  await expect(page).toHaveURL(/\/admin/); // Adjust regex if needed for exact path
  // Alternatively, check for a specific admin element if URL check isn't sufficient
  // await expect(page.locator('some-admin-element')).toBeVisible();
});
