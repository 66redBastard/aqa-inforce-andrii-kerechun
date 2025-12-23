import { expect } from "@playwright/test";
import { test } from "../../fixtures/adminAuth";
import { AdminRoomsPage } from "../../pages/admin/AdminRoomsPage";
import { AdminEditRoomPage } from "../../pages/admin/AdminEditRoomPage";
import { RoomApiService } from "../../services/RoomApiService";
import { SELECTORS } from "../../constants/selectors";

test("Create room via admin UI and verify on user API", async ({
  adminAuthenticatedPage,
  request,
}) => {
  const page = adminAuthenticatedPage;
  const adminRoomsPage = new AdminRoomsPage(page);
  const roomService = new RoomApiService(request);

  // Generate unique room name to avoid conflicts
  const roomName = `666-${Date.now()}`;

  // Intercept the API call for creating a room (plus: verify backend interaction)
  let createRoomRequestBody: any = null;
  await page.route("**/room", async (route) => {
    if (route.request().method() === "POST") {
      createRoomRequestBody = route.request().postDataJSON();
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
    .locator(SELECTORS.ADMIN.ROOM_LISTING)
    .filter({ hasText: roomName })
    .waitFor({ state: "visible" });

  // Verify the intercepted API call (plus: ensures correct data sent)
  expect(createRoomRequestBody).not.toBeNull();
  expect(createRoomRequestBody.roomName).toBe(roomName);
  expect(createRoomRequestBody.type).toBe("Single");
  expect(createRoomRequestBody.accessible).toBe(true);
  expect(createRoomRequestBody.roomPrice).toBe("888");
  expect(createRoomRequestBody.features).toContain("WiFi");

  // Check that the room was created on the User API
  const room = await roomService.findRoomByName(roomName);
  expect(room).toBeDefined();
  expect(room?.type).toBe("Single");
  expect(room?.roomPrice).toBe(888);
});

test("Edit room via admin UI and verify on user API", async ({
  adminAuthenticatedPage,
  request,
}) => {
  const page = adminAuthenticatedPage;
  const adminRoomsPage = new AdminRoomsPage(page);
  const adminEditRoomPage = new AdminEditRoomPage(page);
  const roomService = new RoomApiService(request);

  await page.waitForLoadState("networkidle");

  // Get initial room details
  const rooms = await adminRoomsPage.getRoomRows();
  const roomId = await rooms[0].getRoomId();
  const originalPrice = await rooms[0].getPrice();

  // Click on the first room row to navigate to edit page
  await adminRoomsPage.clickRoomRow(0);

  // Edit the room via UI (change price and features)
  const newPrice = originalPrice + 50;
  const newFeatures = ["WiFi", "Safe"];
  await adminEditRoomPage.editRoom(newPrice, newFeatures);

  // Wait for network activity to complete
  await page.waitForLoadState("networkidle");

  // Check that the room was edited on the User API
  const allRooms = await roomService.getRooms();
  const room = allRooms.find((r) => r.roomid === roomId);
  
  expect(room).toBeDefined();
  expect(room?.roomPrice).toBe(newPrice);
  expect(room?.features).toContain("WiFi");
  expect(room?.features).toContain("Safe");
});
