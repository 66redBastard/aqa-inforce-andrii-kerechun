import { Page } from "@playwright/test";
import { ClientBasePage } from "../client/ClientBasePage";
import { RoomRowComponent } from "../../components/admin/RoomRowComponent";

/**
 * Page Object for the admin rooms page.
 * Handles viewing room listings and creating new rooms.
 */
export class AdminRoomsPage extends ClientBasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigates to the admin rooms page.
   */
  async navigate(): Promise<void> {
    await this.goto("/admin/rooms");
  }

  /**
   * Gets all room row components.
   */
  async getRoomRows(): Promise<RoomRowComponent[]> {
    const rows = this.page.locator('[data-testid="roomlisting"]');
    const count = await rows.count();
    return Array.from(
      { length: count },
      (_, i) => new RoomRowComponent(rows.nth(i))
    );
  }

  /**
   * Creates a new room with the given details.
   * @param roomName - Room name (e.g., '104').
   * @param type - Room type (e.g., 'Single').
   * @param accessible - Accessibility (true/false).
   * @param price - Room price.
   * @param features - Array of features (e.g., ['WiFi', 'TV']).
   */
  async createRoom(
    roomName: string,
    type: string,
    accessible: boolean,
    price: number,
    features: string[]
  ): Promise<void> {
    await this.page.locator("#roomName").fill(roomName);
    await this.page.locator("#type").selectOption(type);
    await this.page.locator("#accessible").selectOption(accessible.toString());
    await this.page.locator("#roomPrice").fill(price.toString());

    // Check feature checkboxes
    for (const feature of features) {
      const checkboxId = this.getCheckboxId(feature);
      if (checkboxId) {
        await this.page.locator(`#${checkboxId}`).check();
      }
    }

    await this.page.locator("#createRoom").click();
  }

  /**
   * Helper to get checkbox ID for a feature.
   */
  private getCheckboxId(feature: string): string | null {
    const map: { [key: string]: string } = {
      WiFi: "wifiCheckbox",
      TV: "tvCheckbox",
      Radio: "radioCheckbox",
      Refreshments: "refreshCheckbox",
      Safe: "safeCheckbox",
      Views: "viewsCheckbox",
    };
    return map[feature] || null;
  }
}
