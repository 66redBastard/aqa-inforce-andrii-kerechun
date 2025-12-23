import { expect } from "@playwright/test";
import { test } from "../../fixtures/adminAuth";
import { RoomApiService } from "../../services/RoomApiService";

test("Create a Room using Admin API and check on User API", async ({
  adminAuthenticatedPage,
  request,
}) => {
  const roomService = new RoomApiService(request);
  const roomName = `666-${Date.now()}`;

  // Create room via Admin API
  const createdRoom = await roomService.createRoom({
    roomName: roomName,
    type: "Suite",
    accessible: true,
    roomPrice: 200,
    features: ["WiFi", "TV", "Safe"],
  });

  expect(createdRoom.roomid).toBeDefined();

  // Check room was created on User API
  const room = await roomService.findRoomByName(roomName);
  expect(room).toBeDefined();
  expect(room?.type).toBe("Suite");
  expect(room?.roomPrice).toBe(200);
});
