import { Page } from "@playwright/test";
import { AdminBasePage } from "./AdminBasePage";

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
    await this.page.locator('button:has-text("Edit")').click();
  }

  /**
   * Edits the room with new details.
   * @param newPrice - New room price.
   * @param newFeatures - New array of features.
   */
  async editRoom(newPrice: number, newFeatures: string[]): Promise<void> {
    // Click Edit button to enter edit mode
    console.log("Entering edit mode");
    await this.clickEditButton();

    // Update price
    console.log("Filling price");
    await this.page.locator("#roomPrice").fill(newPrice.toString());

    // Update features (uncheck all, then check new ones)
    const allFeatures = [
      "WiFi",
      "TV",
      "Radio",
      "Refreshments",
      "Safe",
      "Views",
    ];
    for (const feature of allFeatures) {
      const checkboxId = this.getCheckboxId(feature);
      if (checkboxId) {
        await this.page.locator(`#${checkboxId}`).uncheck();
      }
    }
    console.log("Checking new features");
    for (const feature of newFeatures) {
      const checkboxId = this.getCheckboxId(feature);
      if (checkboxId) {
        await this.page.locator(`#${checkboxId}`).check();
      }
    }

    // Click update button
    console.log("Clicking update button");
    await this.page.locator("button").filter({ hasText: "Update" }).click();
    console.log("Update button clicked");
  }

  /**
   * Helper to get checkbox ID for a feature.
   */
  private getCheckboxId(feature: string): string | null {
    const map: { [key: string]: string } = {
      WiFi: "wifiCheckbox",
      TV: "tvCheckbox",
      Radio: "radioCheckbox",
      Refreshments: "refreshmentsCheckbox",
      Safe: "safeCheckbox",
      Views: "viewsCheckbox",
    };
    return map[feature] || null;
  }
}
