import { Page } from "@playwright/test";
import { AdminBasePage } from "./AdminBasePage";
import { RoomRowComponent } from "../../components/admin/RoomRowComponent";
import {
  FEATURE_CHECKBOX_IDS,
  FeatureName,
} from "../../constants/features";
import { SELECTORS } from "../../constants/selectors";

/**
 * Page Object for the admin rooms page.
 * Handles viewing room listings, creating, and editing rooms.
 */
export class AdminRoomsPage extends AdminBasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigates to the admin rooms page.
   */
  async navigate(): Promise<void> {
    await this.goto("/rooms");
  }

  /**
   * Gets all room row components.
   */
  async getRoomRows(): Promise<RoomRowComponent[]> {
    const rows = this.page.locator(SELECTORS.ADMIN.ROOM_LISTING);
    const count = await rows.count();
    return Array.from(
      { length: count },
      (_, i) => new RoomRowComponent(rows.nth(i))
    );
  }

  /**
   * Clicks on a room row by index to navigate to the edit page.
   * @param roomIndex - Index of the room to edit (0-based).
   */
  async clickRoomRow(roomIndex: number): Promise<void> {
    const rows = this.page.locator(SELECTORS.ADMIN.ROOM_LISTING);
    await rows.nth(roomIndex).click();
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
    await this.page.locator(SELECTORS.ADMIN.ROOM_NAME_INPUT).fill(roomName);
    await this.page.locator(SELECTORS.ADMIN.ROOM_TYPE_SELECT).selectOption(type);
    await this.page.locator(SELECTORS.ADMIN.ROOM_ACCESSIBLE_SELECT).selectOption(accessible.toString());
    await this.page.locator(SELECTORS.ADMIN.ROOM_PRICE_INPUT).fill(price.toString());

    // Check feature checkboxes
    for (const feature of features) {
      const checkboxId = this.getCheckboxId(feature);
      if (checkboxId) {
        await this.page.locator(`#${checkboxId}`).check();
      }
    }

    await this.page.locator(SELECTORS.ADMIN.CREATE_ROOM_BUTTON).click();
  }

  /**
   * Helper to get checkbox ID for a feature.
   */
  private getCheckboxId(feature: string): string | null {
    return FEATURE_CHECKBOX_IDS[feature as FeatureName] || null;
  }
}
