import { test, expect } from "@playwright/test";
import { AdminLoginPage } from "../../pages/admin/AdminLoginPage";
import { AdminRoomsPage } from "../../pages/admin/AdminRoomsPage";

test("Login to admin panel and access rooms", async ({ page }) => {
  const loginPage = new AdminLoginPage(page);
  const adminRoomsPage = new AdminRoomsPage(page);

  await loginPage.navigate();
  await loginPage.login();

  await page.waitForURL(/\/admin\/rooms/);

  await expect(page).toHaveURL(/\/admin\/rooms/);
  // Additional assertions can be added here, e.g., check if rooms are listed
});
