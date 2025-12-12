import { Locator } from "@playwright/test";

/**
 * Component for individual room cards.
 * Handles room-specific interactions.
 */
export class RoomComponent {
  private cardLocator: Locator;

  constructor(cardLocator: Locator) {
    this.cardLocator = cardLocator;
  }

  /**
   * Gets the room name from the card title.
   */
  async getName(): Promise<string> {
    console.log("RoomComponent: Getting room name");
    const name = await this.cardLocator.locator(".card-title").textContent();
    console.log("RoomComponent: Room name is", name);
    return name || "";
  }

  /**
   * Clicks the "Book now" link on the room card.
   */
  async clickBook(): Promise<void> {
    console.log("RoomComponent: Clicking book now");
    await this.cardLocator.locator("a.btn-primary").click();
    console.log("RoomComponent: Clicked book now");
  }
}
