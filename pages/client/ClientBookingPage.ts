import { ClientBasePage } from "./ClientBasePage";

export class ClientBookingPage extends ClientBasePage {
  //   private rootLocator = this.page.locator("#rooms");
  private roomSelector = this.page.locator(".room-item");
  private checkinInput = this.page.getByLabel("Check-in");
  private checkoutInput = this.page.getByLabel("Check-out");
  private bookButton = this.page.getByRole("button", { name: "Book" });

  async navigate(): Promise<void> {
    await this.goto("/#rooms");
  }

  /**
   * Selects a room.
   * @param roomName - Name of the room to select.
   */
  async selectRoom(roomName: string): Promise<void> {
    await this.roomSelector.filter({ hasText: roomName }).click();
  }

  /**
   * Fills booking dates.
   * @param checkin - Check-in date.
   * @param checkout - Check-out date.
   */
  async fillDates(checkin: string, checkout: string): Promise<void> {
    await this.checkinInput.fill(checkin);
    await this.checkoutInput.fill(checkout);
  }

  async clickBook(): Promise<void> {
    await this.bookButton.click();
  }

  /**
   * Performs a full booking.
   * @param roomName - Room to book.
   * @param checkin - Check-in date.
   * @param checkout - Check-out date.
   */
  async bookRoom(
    roomName: string,
    checkin: string,
    checkout: string
  ): Promise<void> {
    await this.selectRoom(roomName);
    await this.fillDates(checkin, checkout);
    await this.clickBook();
  }
}
