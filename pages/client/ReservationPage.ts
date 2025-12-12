import { Page } from "@playwright/test";
import { ClientBasePage } from "./ClientBasePage";
import { BookingCardComponent } from "../../components/client/BookingCardComponent";

/**
 * Page Object for the reservation page (after selecting a room).
 * Handles room details and booking submission.
 */
export class ReservationPage extends ClientBasePage {
  private bookingCard: BookingCardComponent;

  // Locators for room details (dynamic for different rooms)
  private roomTitle = this.page.locator("h1.fw-bold");
  private roomPrice = this.page.locator(".text-primary.fs-2");
  private roomDescription = this.page.locator(".mb-4 p").first();
  private roomFeatures = this.page
    .locator(".amenity-icon")
    .locator("xpath=following-sibling::span");

  constructor(page: Page) {
    super(page);
    this.bookingCard = new BookingCardComponent(page);
  }

  /**
   * Navigates to the reservation page (usually via redirect).
   * @param roomId - Room ID (e.g., 1).
   * @param checkin - Check-in date.
   * @param checkout - Check-out date.
   */
  async navigate(
    roomId: number,
    checkin: string,
    checkout: string
  ): Promise<void> {
    await this.goto(
      `/reservation/${roomId}?checkin=${checkin}&checkout=${checkout}`
    );
  }

  /**
   * Gets the room title (e.g., "Single Room").
   */
  async getRoomTitle(): Promise<string> {
    return (await this.roomTitle.textContent()) || "";
  }

  /**
   * Gets the room price per night.
   */
  async getRoomPrice(): Promise<string> {
    return (await this.roomPrice.textContent()) || "";
  }

  /**
   * Gets the room description.
   */
  async getRoomDescription(): Promise<string> {
    return (await this.roomDescription.textContent()) || "";
  }

  /**
   * Gets the list of room features.
   */
  async getRoomFeatures(): Promise<string[]> {
    return await this.roomFeatures.allTextContents();
  }

  /**
   * Gets the total price from the booking card.
   */
  async getTotalPrice(): Promise<string> {
    return await this.bookingCard.getTotalPrice();
  }

  /**
   * Checks if the booking form is visible.
   */
  async isFormVisible(): Promise<boolean> {
    return await this.bookingCard.isFormVisible();
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
    await this.bookingCard.fillBookingForm(firstname, lastname, email, phone);
  }

  /**
   * Submits the reservation: clicks initial Reserve Now, fills form, clicks final Reserve Now.
   * @param firstname - First name.
   * @param lastname - Last name.
   * @param email - Email.
   * @param phone - Phone.
   */
  async submitReservation(
    firstname: string,
    lastname: string,
    email: string,
    phone: string
  ): Promise<void> {
    console.log("ReservationPage: Clicking initial Reserve Now");
    await this.bookingCard.clickInitialReserveNow();
    console.log("ReservationPage: Filling booking form");
    await this.fillBookingForm(firstname, lastname, email, phone);
    console.log("ReservationPage: Clicking final Reserve Now");
    await this.bookingCard.clickFinalReserveNow();
  }
}
