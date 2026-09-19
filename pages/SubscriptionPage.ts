import { expect, Page } from '@playwright/test';

export class SubscriptionPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/subscription');
  }

  async expectTrialVisible() {
    await expect(this.page.getByText(/free trial|trial/i)).toBeVisible();
  }
}
