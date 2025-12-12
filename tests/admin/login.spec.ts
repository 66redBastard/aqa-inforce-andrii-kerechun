import { test, expect } from "@playwright/test";
import { AdminLoginPage } from "../../pages/admin/AdminLoginPage";

test("Login to admin panel", async ({ page }) => {
  const loginPage = new AdminLoginPage(page);
  await loginPage.navigate();
  await loginPage.login();

  await page.waitForURL(/\/admin\/rooms/);
  await expect(page).toHaveURL(/\/admin\/rooms/);
});
