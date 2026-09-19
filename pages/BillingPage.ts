import { expect, Page } from '@playwright/test';

export class BillingPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/billing/invoices');
  }

  async goToBilling() {
    await this.page.getByRole('link', { name: /billing/i }).click();
  }

  async expectPageVisible() {
    await expect(this.page.getByRole('heading', { name: /billing & invoices/i })).toBeVisible();
    await expect(this.page.getByText(/INV-/i).first()).toBeVisible();
  }
}
