import { test, expect } from "@playwright/test";
import { AdminLoginPage } from "../../pages/admin/AdminLoginPage";
import { AdminRoomsPage } from "../../pages/admin/AdminRoomsPage";

test("Create room via admin UI and verify API call", async ({ page }) => {
  const loginPage = new AdminLoginPage(page);
  const adminRoomsPage = new AdminRoomsPage(page);

  // Generate unique room name to avoid conflicts
  const roomName = `666-${Date.now()}`;

  // Login to admin
  await loginPage.navigate();
  await loginPage.login();
  await page.waitForURL(/\/admin\/rooms/);

  // Intercept the API call for creating a room (plus: verify backend interaction)
  let createRoomRequest: any = null;
  await page.route("**/room", async (route) => {
    if (route.request().method() === "POST") {
      createRoomRequest = route.request();
      await route.continue(); // Allow the request to proceed
    } else {
      await route.continue();
    }
  });

  // Create a new room via UI
  await adminRoomsPage.createRoom(roomName, "Single", true, 888, [
    "WiFi",
    "TV",
  ]);

  // Wait for the new room to appear in the UI
  await page
    .locator('[data-testid="roomlisting"]')
    .filter({ hasText: roomName })
    .waitFor({ state: "visible" });

  // Verify the intercepted API call (plus: ensures correct data sent)
  expect(createRoomRequest).not.toBeNull();
  const requestBody = createRoomRequest.postDataJSON();
  expect(requestBody.roomName).toBe(roomName);
  expect(requestBody.type).toBe("Single");
  expect(requestBody.accessible).toBe(true);
  expect(requestBody.roomPrice).toBe("888");
  expect(requestBody.features).toContain("WiFi");

  // Optional: Verify room appears in the UI list
  const rooms = await adminRoomsPage.getRoomRows();
  const roomNames = await Promise.all(rooms.map((room) => room.getRoomName()));
  expect(roomNames).toContain(roomName);
});
