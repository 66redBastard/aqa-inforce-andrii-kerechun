import { test, expect } from "@playwright/test";
import { BASE_URL } from "../../config/env";
import { AdminLoginPage } from "../../pages/admin/AdminLoginPage";
import { AdminRoomsPage } from "../../pages/admin/AdminRoomsPage";

// WIP: i'm on the way to implement CRUD
test("Create a Room using Admin API and check on User API", async ({
  page,
}) => {
  const loginPage = new AdminLoginPage(page);
  const adminRoomsPage = new AdminRoomsPage(page);

  const roomName = `666-${Date.now()}`;

  await loginPage.navigate();
  await loginPage.login();
  await page.waitForURL(/\/admin\/rooms/);

  // Create room via Admin API
  const createResponse = await page.request.post(`${BASE_URL}/api/room`, {
    data: {
      roomName: roomName,
      type: "Suite",
      accessible: true,
      roomPrice: 200,
      features: ["WiFi", "TV", "Safe"],
    },
  });
  console.log("Create response status:", createResponse.status());
  console.log("Create response text:", await createResponse.text());
  expect(createResponse.status()).toBe(200);
  const createdRoom = await createResponse.json();
  expect(createdRoom.success).toBe(true);

  // Check room was created on User API
  const userResponse = await page.request.get(`${BASE_URL}/api/room`);
  console.log("User response status:", userResponse.status());
  console.log("User response text:", await userResponse.text());
  expect(userResponse.ok()).toBeTruthy();
  const userRooms = await userResponse.json();
  const room = userRooms.rooms.find((r: any) => r.roomName === roomName);
  expect(room).toBeDefined();
  expect(room.type).toBe("Suite");
});
