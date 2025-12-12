import { Page } from "@playwright/test";
import { ClientBasePage } from "./ClientBasePage";
import { RoomsComponent } from "../../components/client/RoomsComponent";
import { BookingDatesComponent } from "../../components/client/BookingDatesComponent";

/**
 * Page Object for the client home page.
 * Handles date selection, availability check, and room selection.
 */
export class HomePage extends ClientBasePage {
  private roomsComponent: RoomsComponent;
  private bookingDatesComponent: BookingDatesComponent;

  constructor(page: Page) {
    super(page);
    this.roomsComponent = new RoomsComponent(page);
    this.bookingDatesComponent = new BookingDatesComponent(page);
  }

  /**
   * Navigates to the home page and scrolls to the booking section.
   */
  async navigate(): Promise<void> {
    console.log("HomePage: Navigating to /");
    await this.goto("/");
    console.log("HomePage: Scrolling to #booking");
    await this.page.locator("#booking").scrollIntoViewIfNeeded();
    console.log("HomePage: Booking section visible");
  }

  /**
   * Selects check-in and check-out dates.
   * @param checkin - Check-in date (e.g., '12/12/2025').
   * @param checkout - Check-out date (e.g., '13/12/2025').
   */
  async selectDates(checkin: string, checkout: string): Promise<void> {
    await this.bookingDatesComponent.selectDates(checkin, checkout);
  }

  /**
   * Clicks the check availability button and scrolls to rooms.
   */
  async checkAvailability(): Promise<void> {
    await this.bookingDatesComponent.checkAvailability();
    console.log("HomePage: Scrolling to #rooms after availability check");
    await this.page.locator("#rooms").scrollIntoViewIfNeeded();
    console.log("HomePage: Rooms section visible, waiting for room cards");
    await this.page
      .locator("#rooms .room-card")
      .first()
      .waitFor({ state: "visible" });
    console.log("HomePage: Room cards visible");
  }

  /**
   * Selects a room by name and clicks its "Book now" link.
   * @param roomName - Name of the room.
   */
  async selectRoom(roomName: string): Promise<void> {
    console.log("HomePage: Selecting room", roomName);
    await this.roomsComponent.selectRoom(roomName);
  }
}
