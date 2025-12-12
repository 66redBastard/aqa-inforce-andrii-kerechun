import { test, expect } from "@playwright/test";

test("Create room via admin API and verify on user API", async ({
  request,
}) => {
  // Create room via admin API
  const createResponse = await request.post(
    "https://automationintesting.online/room",
    {
      data: {
        roomName: "106",
        type: "Double",
        accessible: false,
        roomPrice: 150,
        features: ["WiFi"],
      },
    }
  );
  expect(createResponse.ok()).toBeTruthy();
  const createdRoom = await createResponse.json();

  // Verify room exists on user API
  const userResponse = await request.get(
    "https://automationintesting.online/room"
  );
  expect(userResponse.ok()).toBeTruthy();
  const rooms = await userResponse.json();
  const room = rooms.rooms.find((r: any) => r.roomName === "106");
  expect(room).toBeDefined();
  expect(room.type).toBe("Double");
});

test("Book room via user API and verify on admin API", async ({ request }) => {
  // Assume a room exists; book it
  const bookResponse = await request.post(
    "https://automationintesting.online/booking",
    {
      data: {
        roomid: 1, // Example room ID
        firstname: "John",
        lastname: "Doe",
        email: "john@example.com",
        phone: "1234567890",
        checkin: "2025-12-15",
        checkout: "2025-12-16",
      },
    }
  );
  expect(bookResponse.ok()).toBeTruthy();

  // Verify booking on admin API (adjust endpoint if needed)
  const adminResponse = await request.get(
    "https://automationintesting.online/admin/booking"
  );
  expect(adminResponse.ok()).toBeTruthy();
  const bookings = await adminResponse.json();
  const booking = bookings.find((b: any) => b.roomid === 1);
  expect(booking).toBeDefined();
});
