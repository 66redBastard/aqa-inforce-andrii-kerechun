import { Locator, Page } from "@playwright/test";

/**
 * Component for the booking dates section on the home page.
 * Handles date selection and availability check.
 */
export class BookingDatesComponent {
  private rootLocator: Locator;
  private checkinInput: Locator;
  private checkoutInput: Locator;
  private checkAvailabilityButton: Locator;

  constructor(page: Page) {
    this.rootLocator = page.locator("#booking");
    this.checkinInput = this.rootLocator.locator("input.form-control").first();
    this.checkoutInput = this.rootLocator.locator("input.form-control").last();
    this.checkAvailabilityButton =
      this.rootLocator.locator("button.btn-primary");
  }

  /**
   * Selects check-in and check-out dates.
   * @param checkin - Check-in date (e.g., '12/12/2025').
   * @param checkout - Check-out date (e.g., '13/12/2025').
   */
  async selectDates(checkin: string, checkout: string): Promise<void> {
    console.log("BookingDatesComponent: Selecting dates");
    await this.checkinInput.fill(checkin);
    await this.checkoutInput.fill(checkout);
  }

  /**
   * Clicks the check availability button.
   */
  async checkAvailability(): Promise<void> {
    console.log("BookingDatesComponent: Clicking check availability");
    await this.checkAvailabilityButton.click();
  }
}
