import { test, expect } from "@playwright/test";
import { BASE_URL } from "../../config/env";
import { AdminLoginPage } from "../../pages/admin/AdminLoginPage";
import { AdminRoomsPage } from "../../pages/admin/AdminRoomsPage";

// WIP: i'm on the way to implement CRUD
test("Create a Room using Admin API and check on User API", async ({
  page,
  request,
}) => {
  const loginPage = new AdminLoginPage(page);
  const adminRoomsPage = new AdminRoomsPage(page);

  const roomName = `666-${Date.now()}`;

  await loginPage.navigate();
  await loginPage.login();
  await page.waitForURL(/\/admin\/rooms/);

  // Create room via Admin API
  const createResponse = await request.post(`${BASE_URL}/room`, {
    data: {
      roomName: roomName,
      type: "Suite",
      accessible: true,
      roomPrice: 200,
      features: ["WiFi", "TV", "Safe"],
    },
  });
  expect(createResponse.ok()).toBeTruthy();
  const createdRoom = await createResponse.json();
  expect(createdRoom.roomName).toBe("107");

  // Check room was created on User API
  const userResponse = await request.get(`${BASE_URL}/api/room`);
  expect(userResponse.ok()).toBeTruthy();
  const userRooms = await userResponse.json();
  const room = userRooms.rooms.find((r: any) => r.roomName === "107");
  expect(room).toBeDefined();
  expect(room.type).toBe("Suite");
});
