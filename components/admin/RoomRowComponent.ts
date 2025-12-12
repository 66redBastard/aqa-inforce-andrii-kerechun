import { Locator } from "@playwright/test";

/**
 * Component for individual room rows in the admin rooms list.
 * Handles room details and actions.
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
      (await this.rowLocator.locator('[id^="roomName"]').textContent()) || ""
    );
  }

  /**
   * Gets the room type.
   */
  async getType(): Promise<string> {
    return (await this.rowLocator.locator('[id^="type"]').textContent()) || "";
  }

  /**
   * Gets the accessibility status.
   */
  async getAccessible(): Promise<boolean> {
    const text = await this.rowLocator
      .locator('[id^="accessible"]')
      .textContent();
    return text === "true";
  }

  /**
   * Gets the room price.
   */
  async getPrice(): Promise<number> {
    const text = await this.rowLocator
      .locator('[id^="roomPrice"]')
      .textContent();
    return parseInt(text || "0", 10);
  }

  /**
   * Gets the room details/features.
   */
  async getDetails(): Promise<string> {
    return (
      (await this.rowLocator.locator('[id^="details"]').textContent()) || ""
    );
  }

  /**
   * Edits the room.
   */
  async editRoom(): Promise<void> {
    await this.rowLocator.locator(".roomEdit").click();
  }

  /**
   * Deletes the room.
   */
  async deleteRoom(): Promise<void> {
    await this.rowLocator.locator(".roomDelete").click();
  }
}
