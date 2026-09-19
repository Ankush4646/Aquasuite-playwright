import { expect, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class DashboardPage extends BasePage {
  readonly pageHeading = this.page.getByRole('heading', { level: 1 });
  readonly logoutButton = this.page.getByRole('button', { name: /logout|sign out/i });

  constructor(page: Page) {
    super(page);
  }

  async expectDashboardVisible() {
    await expect(this.pageHeading).toBeVisible();
  }

  async logout() {
    await this.logoutButton.click();
  }
}
