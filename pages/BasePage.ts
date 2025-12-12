import { Page } from "@playwright/test";
import { BASE_URL } from "../config/env";

export class BasePage {
  protected page: Page;
  protected basePath: string = "";

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string): Promise<void> {
    await this.page.goto(`${BASE_URL}${this.basePath}${path}`, {
      waitUntil: "domcontentloaded",
    });
  }
}
