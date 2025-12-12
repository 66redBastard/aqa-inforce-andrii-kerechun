import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/client/HomePage";
import { ReservationPage } from "../../pages/client/ReservationPage";
import { getRandomFutureDates } from "../../utillities/dateRandorn";

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
