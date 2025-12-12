import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/client/HomePage";
import { ReservationPage } from "../../pages/client/ReservationPage";

test("TC_UI_001: Book room with valid data", async ({ page }) => {
  console.log("Test: Starting TC_UI_001");
  const homePage = new HomePage(page);
  const reservationPage = new ReservationPage(page);

  // Calculate dynamic future dates
  const today = new Date();
  const checkin = new Date(today);
  checkin.setDate(today.getDate() + 1); // Tomorrow
  const checkout = new Date(checkin);
  checkout.setDate(checkin.getDate() + 1); // Day after tomorrow
  const checkinStr = checkin.toISOString().split("T")[0]; // YYYY-MM-DD
  const checkoutStr = checkout.toISOString().split("T")[0];

  console.log(`Test: Using dates ${checkinStr} to ${checkoutStr}`);

  // Step 1: Open webpage and scroll to #rooms section
  console.log("Test: Navigating to home");
  await homePage.navigate();

  // Select dates and check availability on home page
  console.log("Test: Selecting dates on home page");
  await homePage.selectDates(checkinStr, checkoutStr);
  console.log("Test: Checking availability");
  await homePage.checkAvailability();

  // Select room (now filtered by dates, redirects to reservation page)
  console.log("Test: Selecting room");
  await homePage.selectRoom("Single");

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
