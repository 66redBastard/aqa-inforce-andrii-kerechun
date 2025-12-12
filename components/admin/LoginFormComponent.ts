import { Locator, Page } from "@playwright/test";

/**
 * Component class for handling login form elements and actions.
 */
export class LoginFormComponent {
  usernameField: Locator;
  passwordField: Locator;
  loginButton: Locator;

  constructor(page: Page) {
    this.usernameField = page.getByLabel("Username");
    this.passwordField = page.getByLabel("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  /**
   * Fills the username field.
   * @param username - The username to enter.
   */
  async fillUsername(username: string): Promise<void> {
    await this.usernameField.fill(username);
  }

  /**
   * Fills the password field.
   * @param password - The password to enter.
   */
  async fillPassword(password: string): Promise<void> {
    await this.passwordField.fill(password);
  }

  /**
   * Clicks the login button.
   */
  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Checks if the login form is visible.
   * @returns True if visible, false otherwise.
   */
  async isVisible(): Promise<boolean> {
    return await this.usernameField.isVisible();
  }
}
