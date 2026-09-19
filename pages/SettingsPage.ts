import { expect, Page } from '@playwright/test';

export class SettingsPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/tenant/settings');
  }

  async expectSettingsVisible() {
    await expect(this.page.getByText(/tenant|workspace|environment/i)).toBeVisible();
  }
}
