import { test, expect } from "@playwright/test";
import { AdminLoginPage } from "../../pages/admin/AdminLoginPage";
import { AdminRoomsPage } from "../../pages/admin/AdminRoomsPage";
import { BASE_URL } from "../../config/env";

test("Create room via admin UI and verify on user API", async ({
  page,
  request,
}) => {
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

  // Check that the room was created on the User API
  const userResponse = await request.get(`${BASE_URL}/api/room`, {
    headers: {
      Accept: "application/json",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      Referer: `${BASE_URL}/admin/rooms`,
    },
  });
  console.log("User API response status:", await userResponse.status());
  console.log("User API response text:", await userResponse.text());
  expect(userResponse.ok()).toBeTruthy();
  const userData = await userResponse.json();
  const room = userData.rooms.find((r: any) => r.roomName === roomName);
  expect(room).toBeDefined();
  expect(room.type).toBe("Single");
  expect(room.roomPrice).toBe(888);
});
