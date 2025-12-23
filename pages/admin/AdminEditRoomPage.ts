import { Page } from "@playwright/test";
import { AdminBasePage } from "./AdminBasePage";
import {
  FEATURE_CHECKBOX_IDS,
  FeatureName,
  ALL_FEATURES,
} from "../../constants/features";
import { SELECTORS } from "../../constants/selectors";

/**
 * Page Object for the admin edit room page.
 * Handles viewing and editing room details.
 */
export class AdminEditRoomPage extends AdminBasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigates to the edit room page for a specific room ID.
   */
  async navigate(roomId: number): Promise<void> {
    await this.goto(`/room/${roomId}`);
  }

  /**
   * Clicks the Edit button to enter edit mode.
   */
  async clickEditButton(): Promise<void> {
    await this.page.locator(SELECTORS.ADMIN.EDIT_BUTTON).click();
  }

  /**
   * Edits the room with new details.
   * @param newPrice - New room price.
   * @param newFeatures - New array of features.
   */
  async editRoom(newPrice: number, newFeatures: string[]): Promise<void> {
    // Click Edit button to enter edit mode
    await this.clickEditButton();

    // Update price
    await this.page.locator(SELECTORS.ADMIN.ROOM_PRICE_INPUT).fill(newPrice.toString());

    // Update features (uncheck all, then check new ones)
    for (const feature of ALL_FEATURES) {
      const checkboxId = this.getCheckboxId(feature);
      if (checkboxId) {
        await this.page.locator(`#${checkboxId}`).uncheck();
      }
    }
    for (const feature of newFeatures) {
      const checkboxId = this.getCheckboxId(feature);
      if (checkboxId) {
        await this.page.locator(`#${checkboxId}`).check();
      }
    }

    // Click update button
    await this.page.locator(SELECTORS.ADMIN.UPDATE_BUTTON).filter({ hasText: "Update" }).click();
  }

  /**
   * Helper to get checkbox ID for a feature.
   */
  private getCheckboxId(feature: string): string | null {
    return FEATURE_CHECKBOX_IDS[feature as FeatureName] || null;
  }
}
