import { Locator } from "@playwright/test";

/**
 * Component for individual room rows in the admin rooms list.
 * Handles room details and delete action.
 */
export class RoomRowComponent {
  private rowLocator: Locator;

  constructor(rowLocator: Locator) {
    this.rowLocator = rowLocator;
  }

  /**
   * Gets the room name.
   */
  async getRoomName(): Promise<string> {
    return (
      (await this.rowLocator
        .locator("#roomName101, #roomName102, #roomName103")
        .textContent()) || ""
    );
  }

  /**
   * Gets the room type.
   */
  async getType(): Promise<string> {
    return (
      (await this.rowLocator
        .locator("#typeSingle, #typeDouble, #typeSuite")
        .textContent()) || ""
    );
  }

  /**
   * Gets the accessibility status.
   */
  async getAccessible(): Promise<boolean> {
    const text = await this.rowLocator.locator("#accessibletrue").textContent();
    return text === "true";
  }

  /**
   * Gets the room price.
   */
  async getPrice(): Promise<number> {
    const text = await this.rowLocator
      .locator("#roomPrice100, #roomPrice150, #roomPrice225")
      .textContent();
    return parseInt(text || "0", 10);
  }

  /**
   * Gets the room details/features.
   */
  async getDetails(): Promise<string> {
    return (
      (await this.rowLocator
        .locator(
          "#detailsTV\\,WiFi\\,Safe, #detailsTV\\,Radio\\,Safe, #detailsRadio\\,WiFi\\,Safe"
        )
        .textContent()) || ""
    );
  }

  /**
   * Deletes the room.
   */
  async deleteRoom(): Promise<void> {
    await this.rowLocator.locator(".roomDelete").click();
  }
}
