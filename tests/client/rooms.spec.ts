import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/client/HomePage";
import { ReservationPage } from "../../pages/client/ReservationPage";
import { getRandomFutureDates } from "../../utilities/dateRandorn";

test("TC_UI_001: Book room with valid data", async ({ page }) => {
  console.log("Test: Starting TC_UI_001");
  const homePage = new HomePage(page);
  const reservationPage = new ReservationPage(page);

  // Get random future dates
  const { checkinStr, checkoutStr } = getRandomFutureDates();
  console.log(`Test: Using random dates ${checkinStr} to ${checkoutStr}`);

  // Randomly select one of the three rooms
  const rooms = ["Single", "Double", "Suite"];
  const roomName = rooms[Math.floor(Math.random() * rooms.length)];
  console.log(`Test: Selected room ${roomName}`);

  // Step 1: Open webpage and scroll to #booking section
  console.log("Test: Navigating to home");
  await homePage.navigate();

  // Select dates and check availability on home page
  console.log("Test: Selecting dates on home page");
  await homePage.selectDates(checkinStr, checkoutStr);
  console.log("Test: Checking availability");
  await homePage.checkAvailability();

  // Select room
  console.log("Test: Selecting room");
  await homePage.selectRoom(roomName);

  // Wait for reservation page to load
  console.log("Test: Waiting for reservation URL");
  await page.waitForURL(/reservation/);
  console.log("Test: On reservation page");

  // On reservation page: submit full reservation
  console.log("Test: Submitting reservation");
  await reservationPage.submitReservation(
    "John",
    "Doe",
    "john.doe@example.com",
    "123456789012"
  );

  // Assert success
  console.log("Test: Asserting success");
  await expect(page.locator("text=Booking Confirmed")).toBeVisible();
  console.log("Test: Success");
});

test("TC_UI_002: Failed booking due to incorrect first name", async ({
  page,
}) => {
  console.log("Test: Starting TC_UI_002");
  const homePage = new HomePage(page);
  const reservationPage = new ReservationPage(page);

  // Get random future dates
  const { checkinStr, checkoutStr } = getRandomFutureDates();
  console.log(`Test: Using random dates ${checkinStr} to ${checkoutStr}`);

  // Randomly select one of the three rooms
  const rooms = ["Single", "Double", "Suite"];
  const roomName = rooms[Math.floor(Math.random() * rooms.length)];
  console.log(`Test: Selected room ${roomName}`);

  // Step 1: Open webpage and scroll to #booking section
  console.log("Test: Navigating to home");
  await homePage.navigate();

  // Select dates and check availability on home page
  console.log("Test: Selecting dates on home page");
  await homePage.selectDates(checkinStr, checkoutStr);
  console.log("Test: Checking availability");
  await homePage.checkAvailability();

  // Select room
  console.log("Test: Selecting room");
  await homePage.selectRoom(roomName);

  // Wait for reservation page to load
  console.log("Test: Waiting for reservation URL");
  await page.waitForURL(/reservation/);
  console.log("Test: On reservation page");

  // On reservation page: attempt to submit with invalid first name (too short)
  console.log("Test: Submitting reservation with invalid first name");
  await reservationPage.submitReservation(
    "A", // Invalid: too short (<3)
    "Doe",
    "john.doe@example.com",
    "123456789012"
  );

  // Assert failure: error message appears, form remains visible
  console.log("Test: Asserting error");
  await expect(
    page.locator("text=size must be between 3 and 18")
  ).toBeVisible();
  await expect(page.locator(".room-firstname")).toBeVisible(); // Form still visible
  console.log("Test: Error asserted successfully");
});

test("TC_UI_003: Failed booking due to incorrect last name", async ({
  page,
}) => {
  console.log("Test: Starting TC_UI_003");
  const homePage = new HomePage(page);
  const reservationPage = new ReservationPage(page);

  // Get random future dates
  const { checkinStr, checkoutStr } = getRandomFutureDates();
  console.log(`Test: Using random dates ${checkinStr} to ${checkoutStr}`);

  // Randomly select one of the three rooms
  const rooms = ["Single", "Double", "Suite"];
  const roomName = rooms[Math.floor(Math.random() * rooms.length)];
  console.log(`Test: Selected room ${roomName}`);

  // Step 1: Open webpage and scroll to #booking section
  console.log("Test: Navigating to home");
  await homePage.navigate();

  // Select dates and check availability on home page
  console.log("Test: Selecting dates on home page");
  await homePage.selectDates(checkinStr, checkoutStr);
  console.log("Test: Checking availability");
  await homePage.checkAvailability();

  // Select room
  console.log("Test: Selecting room");
  await homePage.selectRoom(roomName);

  // Wait for reservation page to load
  console.log("Test: Waiting for reservation URL");
  await page.waitForURL(/reservation/);
  console.log("Test: On reservation page");

  // On reservation page: attempt to submit with invalid last name (too short)
  console.log("Test: Submitting reservation with invalid last name");
  await reservationPage.submitReservation(
    "John",
    "D", // Invalid: too short (<3)
    "john.doe@example.com",
    "123456789012"
  );

  // Assert failure: error message appears, form remains visible
  console.log("Test: Asserting error");
  await expect(
    page.locator("text=size must be between 3 and 30")
  ).toBeVisible();
  await expect(page.locator(".room-lastname")).toBeVisible(); // Form still visible
  console.log("Test: Error asserted successfully");
});

test("TC_UI_004: Failed booking due to incorrect email", async ({ page }) => {
  console.log("Test: Starting TC_UI_004");
  const homePage = new HomePage(page);
  const reservationPage = new ReservationPage(page);

  // Get random future dates
  const { checkinStr, checkoutStr } = getRandomFutureDates();
  console.log(`Test: Using random dates ${checkinStr} to ${checkoutStr}`);

  // Randomly select one of the three rooms
  const rooms = ["Single", "Double", "Suite"];
  const roomName = rooms[Math.floor(Math.random() * rooms.length)];
  console.log(`Test: Selected room ${roomName}`);

  // Step 1: Open webpage and scroll to #booking section
  console.log("Test: Navigating to home");
  await homePage.navigate();

  // Select dates and check availability on home page
  console.log("Test: Selecting dates on home page");
  await homePage.selectDates(checkinStr, checkoutStr);
  console.log("Test: Checking availability");
  await homePage.checkAvailability();

  // Select room
  console.log("Test: Selecting room");
  await homePage.selectRoom(roomName);

  // Wait for reservation page to load
  console.log("Test: Waiting for reservation URL");
  await page.waitForURL(/reservation/);
  console.log("Test: On reservation page");

  // On reservation page: attempt to submit with invalid email (missing @)
  console.log("Test: Submitting reservation with invalid email");
  await reservationPage.submitReservation(
    "John",
    "Doe",
    "johndoegmail.com", // Invalid: missing @
    "123456789012"
  );

  // Assert failure: error message appears, form remains visible
  console.log("Test: Asserting error");
  await expect(
    page.locator("text=must be a well-formed email address")
  ).toBeVisible();
  await expect(page.locator(".room-email")).toBeVisible(); // Form still visible
  console.log("Test: Error asserted successfully");
});

test("TC_UI_005: Failed booking due to incorrect phone", async ({ page }) => {
  console.log("Test: Starting TC_UI_005");
  const homePage = new HomePage(page);
  const reservationPage = new ReservationPage(page);

  // Get random future dates
  const { checkinStr, checkoutStr } = getRandomFutureDates();
  console.log(`Test: Using random dates ${checkinStr} to ${checkoutStr}`);

  // Randomly select one of the three rooms
  const rooms = ["Single", "Double", "Suite"];
  const roomName = rooms[Math.floor(Math.random() * rooms.length)];
  console.log(`Test: Selected room ${roomName}`);

  // Step 1: Open webpage and scroll to #booking section
  console.log("Test: Navigating to home");
  await homePage.navigate();

  // Select dates and check availability on home page
  console.log("Test: Selecting dates on home page");
  await homePage.selectDates(checkinStr, checkoutStr);
  console.log("Test: Checking availability");
  await homePage.checkAvailability();

  // Select room
  console.log("Test: Selecting room");
  await homePage.selectRoom(roomName);

  // Wait for reservation page to load
  console.log("Test: Waiting for reservation URL");
  await page.waitForURL(/reservation/);
  console.log("Test: On reservation page");

  // On reservation page: attempt to submit with invalid phone (too short)
  console.log("Test: Submitting reservation with invalid phone");
  await reservationPage.submitReservation(
    "John",
    "Doe",
    "john.doe@example.com",
    "123" // Invalid: too short (<11)
  );

  // Assert failure: error message appears, form remains visible
  console.log("Test: Asserting error");
  await expect(
    page.locator("text=size must be between 11 and 21")
  ).toBeVisible();
  await expect(page.locator(".room-phone")).toBeVisible(); // Form still visible
  console.log("Test: Error asserted successfully");
});

test("TC_UI_006: Verify booked dates are unavailable", async ({ page }) => {
  console.log("Test: Starting TC_UI_006");
  const homePage = new HomePage(page);
  const reservationPage = new ReservationPage(page);

  // Use fixed dates that may have been booked in prior tests (e.g., from TC_UI_001)
  const checkinStr = "12/15/2025";
  const checkoutStr = "12/16/2025";
  console.log(`Test: Using fixed dates ${checkinStr} to ${checkoutStr}`);

  // Step 1: Go to the main booking page
  console.log("Test: Navigating to home");
  await homePage.navigate();

  // Step 2: Try to select the previously booked check-in and check-out dates
  console.log("Test: Selecting dates on home page");
  await homePage.selectDates(checkinStr, checkoutStr);

  // Step 3: Attempt to proceed with booking for the same room
  console.log("Test: Selecting room");
  await homePage.selectRoom("Single");

  // Wait for reservation page to load
  console.log("Test: Waiting for reservation URL");
  await page.waitForURL(/reservation/);
  console.log("Test: On reservation page");

  // On reservation page: attempt to submit booking
  console.log("Test: Submitting reservation");
  await reservationPage.submitReservation(
    "John",
    "Doe",
    "john.doe@example.com",
    "123456789012"
  );

  // Assert failure: error message appears because dates are booked
  console.log("Test: Asserting booking fails due to booked dates");
  await expect(
    page.locator(
      "text=Application error: a client-side exception has occurred while loading automationintesting.online (see the browser console for more information)."
    )
  ).toBeVisible();
  console.log("Test: Booking correctly failed for booked dates");
});
