import { Page } from "@playwright/test";

/**
 * Base page class for admin pages, providing common navigation and utilities.
 */
export class AdminBasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to a relative path under the admin base URL.
   * @param path - The path to navigate to (e.g., '/login').
   */
  async goto(path: string): Promise<void> {
    await this.page.goto(path, { waitUntil: "domcontentloaded" });
  }
}
