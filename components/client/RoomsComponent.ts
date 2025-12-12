import { Locator, Page } from "@playwright/test";
import { RoomComponent } from "./RoomComponent";

/**
 * Component for the rooms section on the home page.
 * Manages the list of room components.
 */
export class RoomsComponent {
  private rootLocator: Locator;

  constructor(page: Page) {
    this.rootLocator = page.locator("#rooms");
  }

  /**
   * Gets all room components within the rooms section.
   */
  private async getRoomComponents(): Promise<RoomComponent[]> {
    console.log("RoomsComponent: Getting room components");
    const roomCards = this.rootLocator.locator(".room-card");
    const count = await roomCards.count();
    console.log("RoomsComponent: Found", count, "room cards");
    return Array.from(
      { length: count },
      (_, i) => new RoomComponent(roomCards.nth(i))
    );
  }

  /**
   * Selects a room by name and clicks its "Book now" link.
   * @param roomName - Name of the room (e.g., 'Single').
   */
  async selectRoom(roomName: string): Promise<void> {
    console.log("RoomsComponent: Selecting room by name", roomName);
    const rooms = await this.getRoomComponents();
    console.log("RoomsComponent: Retrieved rooms, searching for", roomName);
    for (const room of rooms) {
      const name = await room.getName();
      console.log("RoomsComponent: Checking room name", name);
      if (name === roomName) {
        console.log("RoomsComponent: Found room, clicking book");
        await room.clickBook();
        console.log("RoomsComponent: Clicked book");
        break;
      }
    }
  }
}
