import { Locator, Page } from "@playwright/test";

/**
 * Component for the booking card on the reservation page.
 * Handles calendar, price summary, initial reserve button, and booking form.
 */
export class BookingCardComponent {
  private page: Page;
  private rootLocator: Locator;
  private firstnameInput: Locator;
  private lastnameInput: Locator;
  private emailInput: Locator;
  private phoneInput: Locator;
  private finalReserveButton: Locator;
  private cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.rootLocator = page.locator(".booking-card");
    this.firstnameInput = this.page.locator(".room-firstname");
    this.lastnameInput = this.page.locator(".room-lastname");
    this.emailInput = this.page.locator(".room-email");
    this.phoneInput = this.page.locator(".room-phone");
    this.finalReserveButton = this.page.locator(
      'button.btn-primary:has-text("Reserve Now")'
    );
    this.cancelButton = this.page.locator(
      'button.btn-secondary:has-text("Cancel")'
    );
  }

  /**
   * Gets the total price from the price summary.
   */
  async getTotalPrice(): Promise<string> {
    return (
      (await this.rootLocator.locator(".fw-bold").last().textContent()) || ""
    );
  }

  /**
   * Clicks the initial "Reserve Now" button to display the booking form.
   */
  async clickInitialReserveNow(): Promise<void> {
    await this.rootLocator.locator("#doReservation").click();
  }

  /**
   * Checks if the calendar is visible (before form).
   */
  async isCalendarVisible(): Promise<boolean> {
    return await this.rootLocator.locator(".rbc-calendar").isVisible();
  }

  /**
   * Checks if the booking form is visible (after clicking initial Reserve Now).
   */
  async isFormVisible(): Promise<boolean> {
    return await this.firstnameInput.isVisible();
  }

  /**
   * Fills the booking form with user details.
   * @param firstname - First name.
   * @param lastname - Last name.
   * @param email - Email.
   * @param phone - Phone.
   */
  async fillBookingForm(
    firstname: string,
    lastname: string,
    email: string,
    phone: string
  ): Promise<void> {
    await this.firstnameInput.waitFor({ state: "visible" });
    await this.firstnameInput.fill(firstname);
    await this.lastnameInput.fill(lastname);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
  }

  /**
   * Clicks the final "Reserve Now" button in the form.
   */
  async clickFinalReserveNow(): Promise<void> {
    await this.finalReserveButton.click();
  }

  /**
   * Clicks the "Cancel" button in the form.
   */
  async clickCancel(): Promise<void> {
    await this.cancelButton.click();
  }

  // Future: Add method for date selection if needed
  // async selectDates(startDate: string, endDate: string): Promise<void> {
  //   // Simulate drag: click and hold on start date button, move to end date, release
  //   const startButton = this.rootLocator.locator('.rbc-date-cell').filter({ hasText: startDate });
  //   const endButton = this.rootLocator.locator('.rbc-date-cell').filter({ hasText: endDate });
  //   await startButton.click();
  //   await this.page.mouse.down();
  //   const endBox = await endButton.boundingBox();
  //   if (endBox) await this.page.mouse.move(endBox.x + endBox.width / 2, endBox.y + endBox.height / 2);
  //   await this.page.mouse.up();
  // }
}
