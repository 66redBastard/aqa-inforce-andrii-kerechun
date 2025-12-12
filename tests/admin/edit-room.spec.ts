import { test, expect } from "@playwright/test";
import { AdminLoginPage } from "../../pages/admin/AdminLoginPage";
import { AdminRoomsPage } from "../../pages/admin/AdminRoomsPage";
import { AdminEditRoomPage } from "../../pages/admin/AdminEditRoomPage";
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
  const userResponse = await request.get(`${BASE_URL}/api/room`);
  expect(userResponse.ok()).toBeTruthy();
  const userData = await userResponse.json();
  const room = userData.rooms.find((r: any) => r.roomName === roomName);
  expect(room).toBeDefined();
  expect(room.type).toBe("Single");
  expect(room.roomPrice).toBe(888);
});

test("Edit room via admin UI and verify on user API", async ({
  page,
  request,
}) => {
  const loginPage = new AdminLoginPage(page);
  const adminRoomsPage = new AdminRoomsPage(page);
  const adminEditRoomPage = new AdminEditRoomPage(page);

  // Login to admin
  await loginPage.navigate();
  await loginPage.login();
  await page.waitForURL(/\/admin\/rooms/);
  await page.waitForLoadState("networkidle"); // Ensure page is fully loaded

  // Get initial room details
  const rooms = await adminRoomsPage.getRoomRows();
  console.log("Number of rooms found:", rooms.length);
  const roomId = await rooms[0].getRoomId();
  console.log("Editing room with ID:", roomId);
  const originalPrice = await rooms[0].getPrice();
  const originalFeatures = await rooms[0].getDetails();
  console.log("Original features:", originalFeatures);

  // Click on the first room row to navigate to edit page
  await adminRoomsPage.clickRoomRow(0);

  // Edit the room via UI (change price and features)
  const newPrice = originalPrice + 50;
  const newFeatures = ["WiFi", "Safe"];
  await adminEditRoomPage.editRoom(newPrice, newFeatures);

  // Wait for the edit to process
  await page.waitForTimeout(2000);

  // Check that the room was edited on the User API
  const userResponse = await request.get(`${BASE_URL}/api/room`);
  expect(userResponse.ok()).toBeTruthy();
  const userData = await userResponse.json();
  const room = userData.rooms.find((r: any) => r.roomid === roomId);
  console.log("USER DATA ROOMS:", userData.rooms);
  expect(room.roomPrice).toBe(newPrice);
  expect(room.features).toContain("WiFi");
});
