import { expect, Page } from '@playwright/test';

export class AuditLogPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/audit');
  }

  async expectAuditVisible() {
    await expect(this.page.getByText(/audit|activity|logs/i)).toBeVisible();
  }
}
