import { Page } from "@playwright/test";
import { AdminBasePage } from "./AdminBasePage";
import { LoginFormComponent } from "../components/LoginFormComponent";
import { ADMIN_USERNAME, ADMIN_PASSWORD } from "../config/env";

/**
 * Page Object for the admin login page.
 * Handles navigation and login form interactions.
 */
export class AdminLoginPage extends AdminBasePage {
  loginForm: LoginFormComponent;

  constructor(page: Page) {
    super(page);
    this.loginForm = new LoginFormComponent(page);
  }

  /**
   * Navigates to the login page.
   */
  async navigate(): Promise<void> {
    await this.goto("/admin"); // Adjust path if needed based on site structure
  }

  /**
   * Fills the username field.
   * @param username - The username to enter.
   */
  async fillUsername(username: string): Promise<void> {
    await this.loginForm.fillUsername(username);
  }

  /**
   * Fills the password field.
   * @param password - The password to enter.
   */
  async fillPassword(password: string): Promise<void> {
    await this.loginForm.fillPassword(password);
  }

  /**
   * Clicks the login button.
   */
  async clickLoginButton(): Promise<void> {
    await this.loginForm.clickLoginButton();
  }

  /**
   * Performs a full login with provided or default credentials.
   * @param username - Optional username; uses env default if not provided.
   * @param password - Optional password; uses env default if not provided.
   */
  async login(username?: string, password?: string): Promise<void> {
    const user = username || ADMIN_USERNAME;
    const pass = password || ADMIN_PASSWORD;
    await this.fillUsername(user);
    await this.fillPassword(pass);
    await this.clickLoginButton();
  }

  /**
   * Checks if the login form is visible.
   * @returns True if visible, false otherwise.
   */
  async isLoginFormVisible(): Promise<boolean> {
    return await this.loginForm.isVisible();
  }
}
